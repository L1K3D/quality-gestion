import json
from collections import Counter, defaultdict
from pathlib import Path
import openpyxl

BASE_DIR = Path(__file__).resolve().parent.parent
EXCEL_PATH = BASE_DIR / "Base de dados" / "Caso1_CentroMedicoAurora_Base.xlsx"
OUTPUT_PATH = BASE_DIR / "src" / "data" / "auroraData.json"


def build_pareto(counter: Counter, total: int, key_name: str) -> list[dict]:
    items = sorted(counter.items(), key=lambda x: (-x[1], x[0]))
    result = []
    cum_count = 0
    for name, count in items:
        cum_count += count
        pct = round((count / total) * 100, 1) if total else 0.0
        cum_pct = round((cum_count / total) * 100, 1) if total else 0.0
        result.append({
            key_name: name,
            "count": count,
            "percent": pct,
            "cumulativeCount": cum_count,
            "cumulativePercent": cum_pct,
        })
    return result


def main() -> None:
    wb = openpyxl.load_workbook(EXCEL_PATH, data_only=True)
    ws = wb["Dados"]

    headers = [cell.value for cell in ws[1]]
    records = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        if not any(row):
            continue
        rec = dict(zip(headers, row))
        records.append({
            "id": str(rec["ID"]).strip(),
            "mes": str(rec["Mês"]).strip(),
            "turno": str(rec["Turno"]).strip(),
            "origem": str(rec["Origem do pedido"]).strip(),
            "tipoExame": str(rec["Tipo de exame"]).strip(),
            "motivo": str(rec["Motivo do atraso"]).strip(),
        })

    total = len(records)
    motivo_counter = Counter(r["motivo"] for r in records)
    pareto_geral = build_pareto(motivo_counter, total, "motivo")

    # Stratified Pareto: Pedido médico incompleto by Origem do pedido
    incompleto_records = [r for r in records if r["motivo"] == "Pedido médico incompleto"]
    incompleto_origem_counter = Counter(r["origem"] for r in incompleto_records)
    pareto_estratificado = build_pareto(
        incompleto_origem_counter, len(incompleto_records), "origem"
    )

    # Evidences
    fila_records = [r for r in records if r["motivo"] == "Fila de laudos"]
    fila_noite = sum(1 for r in fila_records if r["turno"] == "Noite")
    fila_internacao = sum(1 for r in fila_records if r["origem"] == "Internação")

    meses_ordem = ["Julho", "Agosto", "Setembro"]
    incompleto_mes = {
        m: sum(1 for r in incompleto_records if r["mes"] == m)
        for m in meses_ordem
    }
    jul = incompleto_mes["Julho"]
    set_val = incompleto_mes["Setembro"]
    crescimento_pct = round(((set_val - jul) / jul) * 100, 1) if jul else 0.0

    # Cross-tabs for dynamic explorer
    dimensoes = {
        "origem": sorted({r["origem"] for r in records}),
        "turno": ["Manhã", "Tarde", "Noite"],
        "mes": meses_ordem,
        "tipoExame": sorted({r["tipoExame"] for r in records}),
    }

    estratificacoes = {}
    for motivo in motivo_counter:
        sub = [r for r in records if r["motivo"] == motivo]
        estratificacoes[motivo] = {
            "total": len(sub),
            "porOrigem": build_pareto(Counter(r["origem"] for r in sub), len(sub), "categoria"),
            "porTurno": build_pareto(Counter(r["turno"] for r in sub), len(sub), "categoria"),
            "porMes": build_pareto(Counter(r["mes"] for r in sub), len(sub), "categoria"),
            "porTipoExame": build_pareto(Counter(r["tipoExame"] for r in sub), len(sub), "categoria"),
        }

    # Global stratified (all motivos)
    estratificacoes["Todos"] = {
        "total": total,
        "porOrigem": build_pareto(Counter(r["origem"] for r in records), total, "categoria"),
        "porTurno": build_pareto(Counter(r["turno"] for r in records), total, "categoria"),
        "porMes": build_pareto(Counter(r["mes"] for r in records), total, "categoria"),
        "porTipoExame": build_pareto(Counter(r["tipoExame"] for r in records), total, "categoria"),
    }

    oc005 = next((r for r in records if r["id"] == "OC-005"), None)

    output = {
        "metadata": {
            "totalRegistros": total,
            "fonte": "Caso1_CentroMedicoAurora_Base.xlsx (aba Dados)",
            "universoTrimestre": 1140,
        },
        "paretoGeral": pareto_geral,
        "paretoEstratificado": pareto_estratificado,
        "evidencias": {
            "pedidoIncompleto": {
                "total": len(incompleto_records),
                "clinicaExternaCount": incompleto_origem_counter.get("Clínica externa", 0),
                "clinicaExternaPct": round(
                    (incompleto_origem_counter.get("Clínica externa", 0) / len(incompleto_records)) * 100, 1
                ),
                "evolucaoMensal": [
                    {"mes": m, "count": incompleto_mes[m]} for m in meses_ordem
                ],
                "crescimentoJulSetPct": crescimento_pct,
            },
            "filaLaudos": {
                "total": len(fila_records),
                "noiteCount": fila_noite,
                "noitePct": round((fila_noite / len(fila_records)) * 100, 1),
                "internacaoCount": fila_internacao,
                "internacaoPct": round((fila_internacao / len(fila_records)) * 100, 1),
            },
            "oc005": oc005,
        },
        "dimensoes": dimensoes,
        "estratificacoes": estratificacoes,
        "registros": records,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {OUTPUT_PATH} with {total} records.")
    print("Pareto Geral:", [(x["motivo"], x["count"], x["percent"]) for x in pareto_geral])
    print("Pareto Estratificado:", [(x["origem"], x["count"], x["percent"]) for x in pareto_estratificado])
    print("Fila Noite:", fila_noite, "/", len(fila_records), "Fila Internação:", fila_internacao, "/", len(fila_records))
    print("Evolução Incompleto:", incompleto_mes, "Crescimento %:", crescimento_pct)
    print("OC-005:", oc005)


if __name__ == "__main__":
    main()

