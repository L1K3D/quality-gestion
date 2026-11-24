import json
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "src" / "data" / "auroraData.json"
OUT_PDF = BASE_DIR / "Apresentacao_Aurora_CDI_Flow_N2.pdf"

# 16:9 Widescreen (13.333 x 7.5 in = 960 x 540 pt)
W, H = 960, 540

BG = colors.HexColor("#F8FAFC")
WHITE = colors.white
BORDER = colors.HexColor("#E2E8F0")
NAVY = colors.HexColor("#0F172A")
BLUE = colors.HexColor("#1E3A8A")
SKY = colors.HexColor("#0284C7")
SLATE = colors.HexColor("#475569")
MUTED = colors.HexColor("#94A3B8")
ROSE = colors.HexColor("#E11D48")
ROSE_BG = colors.HexColor("#FFF1F2")
AMBER = colors.HexColor("#D97706")
AMBER_BG = colors.HexColor("#FFFBEB")
EMERALD = colors.HexColor("#059669")
EMERALD_BG = colors.HexColor("#ECFDF5")


def draw_bg(c: canvas.Canvas, slide_num: int, total_slides: int, title: str, badge: str = "") -> None:
    c.setFillColor(BG)
    c.rect(0, 0, W, H, stroke=0, fill=1)

    # Top header bar
    c.setFillColor(WHITE)
    c.rect(0, H - 54, W, 54, stroke=0, fill=1)
    c.setStrokeColor(BORDER)
    c.setLineWidth(1)
    c.line(0, H - 54, W, H - 54)

    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(32, H - 32, f"{slide_num}/{total_slides}")

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(72, H - 33, title)

    if badge:
        bw = c.stringWidth(badge, "Helvetica-Bold", 9) + 18
        c.setFillColor(colors.HexColor("#F1F5F9"))
        c.roundRect(W - 32 - bw, H - 39, bw, 20, 10, stroke=0, fill=1)
        c.setFillColor(SLATE)
        c.setFont("Helvetica-Bold", 9)
        c.drawCentredString(W - 32 - bw / 2, H - 32, badge)

    # Footer
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(32, 16, "Aurora CDI Flow · Gestão da Qualidade (N2) · Centro Médico Aurora")
    c.drawRightString(W - 32, 16, "Disciplina: Gestão da Qualidade · Prof. Dayvisson Nóbrega")


def draw_card(c: canvas.Canvas, x: float, y: float, w: float, h: float, fill=WHITE, stroke=BORDER, radius: float = 10) -> None:
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(1)
    c.roundRect(x, y, w, h, radius, stroke=1, fill=1)


def wrap_text(c: canvas.Canvas, text: str, max_w: float, font_name: str, font_size: float) -> list[str]:
    words = text.split()
    lines = []
    cur = ""
    for w in words:
        test = f"{cur} {w}".strip()
        if c.stringWidth(test, font_name, font_size) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_wrapped(c: canvas.Canvas, text: str, x: float, y: float, max_w: float, font_name: str, font_size: float, leading: float = 13, color=SLATE) -> float:
    c.setFont(font_name, font_size)
    c.setFillColor(color)
    for line in wrap_text(c, text, max_w, font_name, font_size):
        c.drawString(x, y, line)
        y -= leading
    return y


def slide_1_crise(c: canvas.Canvas) -> None:
    draw_bg(c, 1, 8, "1. A Organização e a Crise", "Contexto")

    # Subtitle card
    draw_card(c, 32, 424, W - 64, 48)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(48, 452, "Centro Médico Aurora — Hospital privado (180 leitos) · CDI realiza ~3.500 exames/mês (SLA 48h)")
    c.setFillColor(SLATE)
    c.setFont("Helvetica", 9.5)
    c.drawString(48, 435, "Equipe: 6 radiologistas (5 diurnos 7h–19h + 1 noturno 19h–7h), 14 técnicos e 6 recepcionistas. Integrantes: [Inserir nomes do grupo]")

    # 4 Big Numbers
    kpis = [
        ("3,1% -> 13,5%", "Salto nos atrasos em Set/26", ROSE),
        ("R$ 45.000", "Multa aplicada pelo convênio", NAVY),
        ("+18%", "Alta após 2 clínicas em Ago/26", AMBER),
        ("R$ 50.000", "Orçamento aprovado (3 meses)", EMERALD),
    ]
    cw = (W - 64 - 36) / 4
    for i, (val, lbl, col) in enumerate(kpis):
        x = 32 + i * (cw + 12)
        draw_card(c, x, 314, cw, 96)
        c.setFillColor(col)
        c.setFont("Helvetica-Bold", 20)
        c.drawString(x + 16, 366, val)
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 10)
        c.drawString(x + 16, 336, lbl)

    # Left: Line chart Escalada
    draw_card(c, 32, 40, 560, 258)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(48, 274, "Escalada dos Laudos Atrasados (> 48h)")
    c.setFillColor(SLATE)
    c.setFont("Helvetica", 9.5)
    c.drawString(48, 258, "1.140 laudos atrasados no 3º trimestre de 2026 (Jul: 290 · Ago: 370 · Set: 480)")

    # Chart axes
    gx, gy, gw, gh = 86, 82, 470, 150
    c.setStrokeColor(BORDER)
    c.line(gx, gy, gx + gw, gy)
    for pct in [0, 5, 10, 15]:
        yy = gy + (pct / 16.0) * gh
        c.setStrokeColor(colors.HexColor("#F1F5F9"))
        c.line(gx, yy, gx + gw, yy)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8.5)
        c.drawRightString(gx - 8, yy - 3, f"{pct}%")

    pts = [("2025", 3.1), ("Jul/26", 8.4), ("Ago/26", 10.6), ("Set/26", 13.5)]
    coords = []
    for idx, (lbl, val) in enumerate(pts):
        px = gx + 45 + idx * 125
        py = gy + (val / 16.0) * gh
        coords.append((px, py, lbl, val))

    c.setStrokeColor(NAVY)
    c.setLineWidth(2.5)
    for i in range(len(coords) - 1):
        c.line(coords[i][0], coords[i][1], coords[i + 1][0], coords[i + 1][1])

    for px, py, lbl, val in coords:
        c.setFillColor(ROSE)
        c.circle(px, py, 4.5, stroke=0, fill=1)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawCentredString(px, py + 10, f"{str(val).replace('.', ',')}%")
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 9)
        c.drawCentredString(px, gy - 15, lbl)

    # Right: Hipótese da Diretoria
    draw_card(c, 608, 40, 320, 258)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(624, 274, "Hipótese da Diretoria (Descartada)")

    draw_card(c, 624, 158, 288, 96, fill=ROSE_BG, stroke=colors.HexColor("#FECDD3"))
    c.setFillColor(ROSE)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(636, 234, "Contratar +1 Radiologista (R$ 42 mil/mês)")
    draw_wrapped(
        c,
        "Custa R$ 126.000 em 3 meses (+152% acima do teto de R$ 50.000) e não elimina pedidos incompletos nem a fila LIFO.",
        636, 216, 264, "Helvetica", 9.5, 13, NAVY
    )

    draw_card(c, 624, 54, 288, 92, fill=EMERALD_BG, stroke=colors.HexColor("#A7F3D0"))
    c.setFillColor(EMERALD)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(636, 126, "Capacidade Real Diurna")
    draw_wrapped(
        c,
        "5 radiologistas diurnos somam 60h/dia para ~118 exames/dia (< 2 exames/h). O gargalo é de processo, não de capacidade.",
        636, 108, 264, "Helvetica", 9.5, 13, NAVY
    )
    c.showPage()


def slide_2_fluxograma(c: canvas.Canvas) -> None:
    draw_bg(c, 2, 8, "2. Fluxograma do Processo CDI (AS-IS)", "10% da Nota")

    draw_card(c, 32, 190, W - 64, 274)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(48, 442, "7 Etapas do Dossiê com Pontos de Falha Marcados")
    c.setFillColor(SLATE)
    c.setFont("Helvetica", 9.5)
    c.drawString(48, 426, "Simbologia padrão: Oval (Início/Fim) · Retângulo (Etapa) · Losango (Decisão Sim/Não)")

    # Row 1 y=355
    # Oval Início
    c.setFillColor(NAVY)
    c.roundRect(48, 338, 60, 34, 17, stroke=0, fill=1)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawCentredString(78, 352, "Início")

    steps_r1 = [
        (128, "ETAPA 1", "Pedido", WHITE, BORDER, False, None),
        (234, "ETAPA 2", "Agendamento", ROSE_BG, ROSE, True, ROSE),
        (340, "ETAPA 3", "Chegada", WHITE, BORDER, False, None),
        (446, "ETAPA 4", "Exame", AMBER_BG, AMBER, True, AMBER),
    ]
    for sx, tag, name, fl, st, mark, mcol in steps_r1:
        draw_card(c, sx, 330, 88, 50, fill=fl, stroke=st, radius=8)
        c.setFillColor(st if mark else MUTED)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawCentredString(sx + 44, 364, tag)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawCentredString(sx + 44, 346, name)
        if mark and mcol:
            c.setFillColor(mcol)
            c.circle(sx + 84, 378, 6, stroke=0, fill=1)

    # Arrows row 1
    c.setStrokeColor(MUTED)
    c.setLineWidth(1.4)
    for ax in [108, 216, 322, 428, 534]:
        c.line(ax, 355, ax + 18, 355)

    # Diamond Imagem boa?
    dx, dy = 582, 355
    p = c.beginPath()
    p.moveTo(dx, dy + 28)
    p.lineTo(dx + 30, dy)
    p.lineTo(dx, dy - 28)
    p.lineTo(dx - 30, dy)
    p.close()
    c.setFillColor(BG)
    c.setStrokeColor(MUTED)
    c.drawPath(p, stroke=1, fill=1)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(dx, dy + 2, "Imagem")
    c.drawCentredString(dx, dy - 8, "boa?")

    # Loop Não Imagem Boa
    c.setStrokeColor(AMBER)
    c.line(dx, dy + 28, dx, 400)
    c.line(dx, 400, 490, 400)
    c.line(490, 400, 490, 380)
    c.setFillColor(AMBER)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(536, 404, "Não (Repete)")

    c.setStrokeColor(MUTED)
    c.line(612, 355, 640, 355)
    c.setFillColor(EMERALD)
    c.drawString(615, 362, "Sim")

    # Etapa 5 & 6
    for sx, tag, name in [(642, "ETAPA 5", "Fila LIFO"), (750, "ETAPA 6", "Laudo")]:
        draw_card(c, sx, 330, 90, 50, fill=ROSE_BG, stroke=ROSE, radius=8)
        c.setFillColor(ROSE)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawCentredString(sx + 45, 364, tag)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawCentredString(sx + 45, 346, name)
        c.circle(sx + 86, 378, 6, stroke=0, fill=1)

    c.setStrokeColor(MUTED)
    c.line(732, 355, 750, 355)
    c.line(795, 330, 795, 294)

    # Diamond Pedido ok?
    dx2, dy2 = 795, 266
    p2 = c.beginPath()
    p2.moveTo(dx2, dy2 + 28)
    p2.lineTo(dx2 + 32, dy2)
    p2.lineTo(dx2, dy2 - 28)
    p2.lineTo(dx2 - 32, dy2)
    p2.close()
    c.setFillColor(BG)
    c.setStrokeColor(MUTED)
    c.drawPath(p2, stroke=1, fill=1)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(dx2, dy2 + 2, "Pedido")
    c.drawCentredString(dx2, dy2 - 8, "ok?")

    # Loop Não Pedido ok -> volta Etapa 5
    c.setStrokeColor(ROSE)
    c.line(dx2 + 32, dy2, 876, dy2)
    c.line(876, dy2, 876, 400)
    c.line(876, 400, 687, 400)
    c.line(687, 400, 687, 380)
    c.setFillColor(ROSE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(830, dy2 + 6, "Não (Devolve)")

    # Sim -> Etapa 7 -> Fim
    c.setStrokeColor(MUTED)
    c.line(dx2 - 32, dy2, 728, dy2)
    c.setFillColor(EMERALD)
    c.drawString(735, dy2 + 6, "Sim")

    draw_card(c, 634, 241, 94, 50, fill=WHITE, stroke=BORDER, radius=8)
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawCentredString(681, 275, "ETAPA 7")
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawCentredString(681, 257, "Liberação")

    c.setStrokeColor(MUTED)
    c.line(634, 266, 608, 266)
    c.setFillColor(NAVY)
    c.roundRect(548, 249, 60, 34, 17, stroke=0, fill=1)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawCentredString(578, 263, "Fim")

    # 4 Failure cards at bottom
    fails = [
        ("Etapa 2 · Agendamento", "Aceita pedido incompleto sem conferir (39% dos atrasos).", ROSE),
        ("Etapa 4 · Exame", "Repetição por falha técnica de imagem (10% dos atrasos).", AMBER),
        ("Etapa 5 · Fila LIFO", "Mais novos no topo; exames da madrugada afundam (31%).", ROSE),
        ("Etapa 6 · Laudo", "Devolução por falta de CID/CRM volta ao fim da fila.", ROSE),
    ]
    fw = (W - 64 - 36) / 4
    for i, (ft, fd, fc) in enumerate(fails):
        fx = 32 + i * (fw + 12)
        draw_card(c, fx, 46, fw, 126)
        c.setFillColor(fc)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(fx + 14, 148, ft)
        draw_wrapped(c, fd, fx + 14, 126, fw - 28, "Helvetica", 9.5, 13, SLATE)

    c.showPage()


def slide_3_pareto_geral(c: canvas.Canvas, data: dict) -> None:
    draw_bg(c, 3, 8, "3. Folha de Verificação & Pareto Geral", "15% da Nota")

    # Left: Folha de Verificação (100 registros)
    draw_card(c, 32, 46, 360, 418)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(48, 438, "Folha de Verificação (n = 100)")
    c.setFillColor(SLATE)
    c.setFont("Helvetica", 9.5)
    c.drawString(48, 422, "Amostra sorteada entre os 1.140 atrasos do trimestre")

    # Table header
    ty = 390
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(48, ty, "MOTIVO DO ATRASO")
    c.drawRightString(278, ty, "QTD")
    c.drawRightString(326, ty, "%")
    c.drawRightString(376, ty, "ACUM.")
    c.setStrokeColor(BORDER)
    c.line(48, ty - 6, 376, ty - 6)

    y = ty - 26
    for idx, row in enumerate(data["paretoGeral"]):
        if idx < 2:
            c.setFillColor(colors.HexColor("#EFF6FF"))
            c.rect(44, y - 6, 336, 22, stroke=0, fill=1)
        c.setFillColor(NAVY if idx < 2 else SLATE)
        c.setFont("Helvetica-Bold" if idx < 2 else "Helvetica", 9)
        c.drawString(48, y, row["motivo"][:32])
        c.drawRightString(278, y, str(row["count"]))
        c.drawRightString(326, y, f"{row['percent']:.0f}%")
        c.setFillColor(BLUE if idx < 2 else SLATE)
        c.drawRightString(376, y, f"{row['cumulativePercent']:.0f}%")
        y -= 28

    draw_card(c, 48, 64, 328, 52, fill=NAVY, stroke=NAVY, radius=8)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(62, 94, "Regra 80/20 (Top 2 Causas)")
    c.setFillColor(colors.HexColor("#93C5FD"))
    c.setFont("Helvetica", 9.5)
    c.drawString(62, 76, "Pedido incompleto + Fila de laudos = 70% dos atrasos")

    # Right: Pareto Geral Bar + Cumulative Curve
    draw_card(c, 408, 46, 520, 418)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(428, 438, "Gráfico 1 — Pareto Geral dos Atrasos")
    c.setFillColor(SLATE)
    c.setFont("Helvetica", 9.5)
    c.drawString(428, 422, "Barras em ordem decrescente + linha de percentual acumulado")

    gx, gy, gw, gh = 452, 118, 440, 270
    c.setStrokeColor(BORDER)
    c.line(gx, gy, gx + gw, gy)
    for v in [0, 10, 20, 30, 40]:
        yy = gy + (v / 45.0) * gh
        c.setStrokeColor(colors.HexColor("#F1F5F9"))
        c.line(gx, yy, gx + gw, yy)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8.5)
        c.drawRightString(gx - 6, yy - 3, str(v))

    bw = 44
    gap = 26
    cum_pts = []
    for idx, row in enumerate(data["paretoGeral"]):
        bx = gx + 18 + idx * (bw + gap)
        bh = (row["count"] / 45.0) * gh
        c.setFillColor(BLUE if idx < 2 else colors.HexColor("#CBD5E1"))
        c.roundRect(bx, gy, bw, bh, 4, stroke=0, fill=1)

        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9)
        c.drawCentredString(bx + bw / 2, gy + bh + 6, str(row["count"]))

        # X label wrapped
        lbl = row["motivo"].replace("Autorização do convênio pendente", "Autoriz. convênio").replace("Falha na realização do exame", "Falha no exame").replace("Erro de digitação no laudo", "Erro digitação").replace("Pedido médico incompleto", "Pedido incompleto")
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 7.8)
        c.drawCentredString(bx + bw / 2, gy - 14, lbl[:16])

        cx = bx + bw / 2
        cy = gy + (row["cumulativePercent"] / 100.0) * gh
        cum_pts.append((cx, cy, row["cumulativePercent"]))

    c.setStrokeColor(NAVY)
    c.setLineWidth(2)
    for i in range(len(cum_pts) - 1):
        c.line(cum_pts[i][0], cum_pts[i][1], cum_pts[i + 1][0], cum_pts[i + 1][1])
    for cx, cy, pct in cum_pts:
        c.setFillColor(NAVY)
        c.circle(cx, cy, 3.5, stroke=0, fill=1)
        c.setFont("Helvetica-Bold", 8)
        c.drawCentredString(cx, cy + 8, f"{pct:.0f}%")

    c.showPage()


def slide_4_pareto_estratificado(c: canvas.Canvas, data: dict) -> None:
    draw_bg(c, 4, 8, "4. Pareto Estratificado: Onde o Problema Acontece", "15% da Nota")

    # Left: Stratified chart
    draw_card(c, 32, 46, 520, 418)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(48, 438, "Gráfico 2 — 'Pedido médico incompleto' por Origem")
    c.setFillColor(SLATE)
    c.setFont("Helvetica", 9.5)
    c.drawString(48, 422, "Estratificação da falha #1 (n = 39) pela coluna 'Origem do pedido'")

    gx, gy, gw, gh = 92, 106, 420, 280
    c.setStrokeColor(BORDER)
    c.line(gx, gy, gx + gw, gy)

    bw = 86
    gap = 48
    cum_pts = []
    for idx, row in enumerate(data["paretoEstratificado"]):
        bx = gx + 36 + idx * (bw + gap)
        bh = (row["count"] / 35.0) * gh
        c.setFillColor(BLUE if idx == 0 else colors.HexColor("#CBD5E1"))
        c.roundRect(bx, gy, bw, bh, 6, stroke=0, fill=1)

        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 11)
        c.drawCentredString(bx + bw / 2, gy + bh + 8, f"{row['count']} ({str(row['percent']).replace('.', ',')}%)")

        c.setFillColor(SLATE)
        c.setFont("Helvetica-Bold", 9)
        c.drawCentredString(bx + bw / 2, gy - 16, row["origem"])

        cx = bx + bw / 2
        cy = gy + (row["cumulativePercent"] / 100.0) * gh
        cum_pts.append((cx, cy, row["cumulativePercent"]))

    c.setStrokeColor(NAVY)
    c.setLineWidth(2)
    for i in range(len(cum_pts) - 1):
        c.line(cum_pts[i][0], cum_pts[i][1], cum_pts[i + 1][0], cum_pts[i + 1][1])
    for cx, cy, pct in cum_pts:
        c.setFillColor(NAVY)
        c.circle(cx, cy, 4, stroke=0, fill=1)

    # Right: Justificativa & Evolução Mensal
    draw_card(c, 568, 46, 360, 418)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(586, 438, "Justificativa da Coluna Escolhida")
    draw_wrapped(
        c,
        "Ao estratificar os 39 pedidos incompletos pela coluna 'Origem do pedido', comprova-se que 31 casos (79,5%) vêm de Clínicas externas — resultado direto das 2 novas parcerias abertas em agosto/2026 (+18% no volume externo).",
        586, 412, 324, "Helvetica", 10, 14.5, SLATE
    )

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(586, 316, "Evolução Mensal (Pedido Incompleto)")
    evol = data["evidencias"]["pedidoIncompleto"]["evolucaoMensal"]
    ew = 96
    for i, item in enumerate(evol):
        ex = 586 + i * (ew + 14)
        draw_card(c, ex, 224, ew, 76, fill=ROSE_BG if i > 0 else BG, stroke=ROSE if i > 0 else BORDER, radius=8)
        c.setFillColor(SLATE)
        c.setFont("Helvetica-Bold", 9)
        c.drawCentredString(ex + ew / 2, 280, item["mes"])
        c.setFillColor(ROSE if i > 0 else NAVY)
        c.setFont("Helvetica-Bold", 20)
        c.drawCentredString(ex + ew / 2, 246, str(item["count"]))

    draw_card(c, 586, 66, 324, 134, fill=EMERALD_BG, stroke=colors.HexColor("#A7F3D0"), radius=10)
    c.setFillColor(EMERALD)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(602, 178, "Evidência Adicional — Fila de Laudos (31%)")
    draw_wrapped(
        c,
        "• Turno Noite: 28 de 31 casos (90,3%)\n• Origem Internação: 15 de 31 casos (48,4%)\n• Caso emblemático: #OC-005 (Ressonância, Noite, Internação).",
        602, 156, 292, "Helvetica", 9.5, 15, NAVY
    )

    c.showPage()


def draw_fishbone(c: canvas.Canvas, x: float, y: float, w: float, h: float, ms: list[tuple[str, str]], head_l1: str, head_l2: str) -> None:
    """Draw a vector fishbone (Ishikawa 6M) inside the given box."""
    spine_y = y + h / 2
    tail_x = x + 10
    head_x = x + w - 82

    # Tail fin
    p_tail = c.beginPath()
    p_tail.moveTo(tail_x, spine_y - 16)
    p_tail.lineTo(tail_x + 18, spine_y)
    p_tail.lineTo(tail_x, spine_y + 16)
    p_tail.lineTo(tail_x + 7, spine_y)
    p_tail.close()
    c.setFillColor(colors.HexColor("#E2E8F0"))
    c.setStrokeColor(MUTED)
    c.setLineWidth(1)
    c.drawPath(p_tail, stroke=1, fill=1)

    # Central spine
    c.setStrokeColor(NAVY)
    c.setLineWidth(2.2)
    c.line(tail_x + 14, spine_y, head_x, spine_y)

    # Fish head (rounded polygon)
    c.setFillColor(ROSE)
    c.roundRect(head_x, spine_y - 24, 76, 48, 18, stroke=0, fill=1)
    c.setFillColor(WHITE)
    c.circle(head_x + 64, spine_y + 8, 2.2, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawCentredString(head_x + 36, spine_y + 4, head_l1)
    c.drawCentredString(head_x + 36, spine_y - 8, head_l2)

    # 3 top ribs + 3 bottom ribs
    rib_xs = [(x + 68, x + 98), (x + 164, x + 194), (x + 260, x + 290)]
    for idx, (rx_outer, rx_spine) in enumerate(rib_xs):
        # Top rib
        m_top, txt_top = ms[idx]
        top_y = y + h - 22
        c.setStrokeColor(BLUE)
        c.setLineWidth(1.5)
        c.line(rx_outer, top_y, rx_spine, spine_y)
        c.setFillColor(NAVY)
        c.roundRect(rx_outer - 34, top_y, 68, 16, 4, stroke=0, fill=1)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 7.2)
        c.drawCentredString(rx_outer, top_y + 5, m_top)
        # Sub-bone
        mid_y = (top_y + spine_y) / 2 + 4
        mid_x = (rx_outer + rx_spine) / 2 - 2
        c.setStrokeColor(SLATE)
        c.setLineWidth(1)
        c.line(mid_x - 36, mid_y, mid_x, mid_y)
        c.setFillColor(NAVY)
        c.setFont("Helvetica", 7.2)
        c.drawRightString(mid_x - 3, mid_y + 3, txt_top)

        # Bottom rib
        m_bot, txt_bot = ms[idx + 3]
        bot_y = y + 22
        c.setStrokeColor(BLUE)
        c.setLineWidth(1.5)
        c.line(rx_outer, bot_y, rx_spine, spine_y)
        c.setFillColor(NAVY)
        c.roundRect(rx_outer - 34, bot_y - 16, 68, 16, 4, stroke=0, fill=1)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 7.2)
        c.drawCentredString(rx_outer, bot_y - 11, m_bot)
        # Sub-bone
        mid_yb = (bot_y + spine_y) / 2 - 4
        c.setStrokeColor(SLATE)
        c.setLineWidth(1)
        c.line(mid_x - 36, mid_yb, mid_x, mid_yb)
        c.setFillColor(NAVY)
        c.setFont("Helvetica", 7.2)
        c.drawRightString(mid_x - 3, mid_yb + 3, txt_bot)


def slide_5_ishikawa(c: canvas.Canvas) -> None:
    draw_bg(c, 5, 8, "5. Causa Raiz: Ishikawa 6M & 5 Porquês", "20% da Nota")

    cases = [
        {
            "x": 32,
            "title": "Falha #1: Pedido Incompleto (39%)",
            "badge": "79,5% Clínicas Externas · +183% Jul->Set",
            "h1": "39% Pedido",
            "h2": "Incompleto",
            "ms": [
                ("Método", "Sem conferir"),
                ("Material", "Papel/e-mail"),
                ("Mão de obra", "Medo perder"),
                ("Máquina", "Sem Poka-Yoke"),
                ("Medida", "Sem indicador"),
                ("Meio amb.", "+18% externo"),
            ],
            "porques": [
                "1. Laudo atrasa pois radiologista devolve o pedido.",
                "2. Devolve por falta de CID-10, indicação ou CRM.",
                "3. Recepção agenda incompleto para não perder paciente.",
                "4. Clínicas enviam formulários livres em papel/e-mail.",
                "5. Raiz: falta portal padronizado com bloqueio na origem.",
            ],
        },
        {
            "x": 492,
            "title": "Falha #2: Fila de Laudos (31%)",
            "badge": "90,3% Turno Noite · 48,4% Internação",
            "h1": "31% Fila",
            "h2": "de Laudos",
            "ms": [
                ("Método", "Fila LIFO"),
                ("Máquina", "Sem alerta 48h"),
                ("Mão de obra", "1 noit. vs 5 dia"),
                ("Medida", "Sem aging"),
                ("Material", "Madrugada para"),
                ("Meio amb.", "Foco PS noite"),
            ],
            "porques": [
                "1. Exames da madrugada estouram o prazo de 48h.",
                "2. Equipe diurna não puxa o estoque da noite.",
                "3. Sistema mostra os mais novos no topo (LIFO).",
                "4. Não há alerta visual de vencimento de prazo.",
                "5. Raiz: falta fila FEFO + repasse formal às 07h00.",
            ],
        },
    ]

    for cs in cases:
        x = cs["x"]
        draw_card(c, x, 42, 436, 426)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(x + 18, 444, cs["title"])

        draw_card(c, x + 18, 414, 400, 20, fill=EMERALD_BG, stroke=colors.HexColor("#A7F3D0"), radius=6)
        c.setFillColor(EMERALD)
        c.setFont("Helvetica-Bold", 8.8)
        c.drawCentredString(x + 218, 420, cs["badge"])

        # Real Fishbone Diagram
        draw_fishbone(c, x + 14, 240, 408, 166, cs["ms"], cs["h1"], cs["h2"])

        # 5 Porquês
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(x + 18, 224, "Escada dos 5 Porquês:")
        py = 204
        for i, pq in enumerate(cs["porques"]):
            is_root = i == 4
            draw_card(c, x + 18, py - 14, 400, 24, fill=ROSE_BG if is_root else BG, stroke=ROSE if is_root else BORDER, radius=5)
            c.setFillColor(ROSE if is_root else NAVY)
            c.setFont("Helvetica-Bold" if is_root else "Helvetica", 8.5)
            c.drawString(x + 26, py - 6, pq)
            py -= 32

    c.showPage()


def slide_6_fmea(c: canvas.Canvas) -> None:
    draw_bg(c, 6, 8, "6. Matriz FMEA — Antes & Depois", "15% da Nota")

    draw_card(c, 32, 186, W - 64, 278)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(48, 438, "5 Modos de Falha do Fluxograma (NPR = S × O × D)")

    # Header
    hy = 408
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(48, hy, "ETAPA")
    c.drawString(115, hy, "MODO DE FALHA & JUSTIFICATIVA")
    c.drawCentredString(580, hy, "S")
    c.drawCentredString(618, hy, "O")
    c.drawCentredString(656, hy, "D")
    c.drawRightString(754, hy, "NPR ANTES")
    c.drawRightString(884, hy, "NPR DEPOIS")
    c.setStrokeColor(BORDER)
    c.line(48, hy - 6, 908, hy - 6)

    rows = [
        ("Etapa 5", "Fila LIFO sem alerta SLA e acúmulo noturno (90,3% noite; sem aviso)", 9, 8, 9, 648, "54 (-91,7%)"),
        ("Etapa 2", "Pedido incompleto aceito sem conferência (39% base; visto só no laudo)", 8, 9, 8, 576, "32 (-94,4%)"),
        ("Etapa 6", "Retorno regularizado volta ao fim da fila sem prioridade", 7, 6, 7, 294, "—"),
        ("Etapas 2/3", "Pendência de convênio / erro de cadastro (15% somados)", 6, 4, 5, 120, "—"),
        ("Etapa 4", "Falha técnica na aquisição / repetição (técnico confere na hora)", 6, 4, 4, 96, "—"),
    ]
    ry = 376
    for idx, (et, fl, s, o, d, npr, dep) in enumerate(rows):
        if idx < 2:
            c.setFillColor(colors.HexColor("#F8FAFC"))
            c.rect(44, ry - 10, 868, 28, stroke=0, fill=1)
        c.setFillColor(BLUE if idx < 2 else SLATE)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(48, ry, et)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold" if idx < 2 else "Helvetica", 9)
        c.drawString(115, ry, fl)
        c.setFont("Helvetica", 9.5)
        c.drawCentredString(580, ry, str(s))
        c.drawCentredString(618, ry, str(o))
        c.drawCentredString(656, ry, str(d))
        c.setFillColor(ROSE if npr >= 500 else SLATE)
        c.setFont("Helvetica-Bold", 10)
        c.drawRightString(754, ry, str(npr))
        c.setFillColor(EMERALD if dep != "—" else MUTED)
        c.drawRightString(884, ry, dep)
        ry -= 36

    # Top 2 Recalculation cards
    c1 = ("Risco #1: Fila LIFO (648 -> 54 | -91,7%)", "S=9 (mantido) · O cai 8->3 com fila FEFO + repasse 07h00 · D cai 9->2 com alertas 36h/42h.")
    c2 = ("Risco #2: Pedido Incompleto (576 -> 32 | -94,4%)", "S=8 (mantido) · O cai 9->2 com trava Poka-Yoke no portal · D cai 8->2 com validação na origem.")
    for idx, (ct, cd) in enumerate([c1, c2]):
        cx = 32 + idx * 454
        draw_card(c, cx, 46, 442, 120, fill=EMERALD_BG, stroke=colors.HexColor("#A7F3D0"))
        c.setFillColor(EMERALD)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(cx + 18, 138, ct)
        draw_wrapped(c, cd, cx + 18, 114, 406, "Helvetica", 10, 14.5, NAVY)

    c.showPage()


def slide_7_plano_5w2h(c: canvas.Canvas) -> None:
    draw_bg(c, 7, 8, "7. Plano 5W2H, Orçamento & Indicador", "25% da Nota")

    draw_card(c, 32, 196, W - 64, 268)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(48, 438, "Plano de Ação 5W2H (Total: R$ 45.400 de R$ 50.000)")

    hy = 408
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(48, hy, "O QUÊ")
    c.drawString(248, hy, "POR QUÊ")
    c.drawString(424, hy, "ONDE / QUANDO")
    c.drawString(574, hy, "QUEM")
    c.drawString(694, hy, "COMO")
    c.drawRightString(908, hy, "QUANTO")
    c.setStrokeColor(BORDER)
    c.line(48, hy - 6, 908, hy - 6)

    actions = [
        ("Portal Eletrônico Clínicas", "Eliminar 39% incompletos", "Clínicas · Sem. 1–4", "TI + Coord. CDI", "Trava Poka-Yoke CID/CRM", "R$ 25.000"),
        ("Ajuste Sistema (FEFO + Alertas)", "Eliminar 31% fila LIFO", "RIS/PACS · Sem. 1–3", "TI / Fornecedor", "Fila FEFO + alertas 36h/42h", "R$ 18.000"),
        ("Treinamento Recepção (4h)", "Conferência D-1", "Recepção · Sem. 2", "Sup. Juliana", "1 turma (6 recepcionistas)", "R$ 2.400"),
        ("Repasse Matinal 07h00", "Absorver estoque noite", "CDI · Imediato", "Coord. + Médicos", "10 min na troca de turno", "R$ 0"),
    ]
    ry = 374
    for oq, pq, oq2, qm, cm, qt in actions:
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(48, ry, oq)
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 8.5)
        c.drawString(248, ry, pq)
        c.drawString(424, ry, oq2)
        c.drawString(574, ry, qm)
        c.drawString(694, ry, cm)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawRightString(908, ry, qt)
        ry -= 36

    draw_card(c, 48, 208, 860, 28, fill=NAVY, stroke=NAVY, radius=6)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(60, 218, "ORÇAMENTO TOTAL (3 MESES): R$ 45.400,00  ·  Folga no teto de R$ 50.000: R$ 4.600,00 (9,2%)")

    # Bottom 2 cards: Ação Descartada + Indicador e Meta
    draw_card(c, 32, 46, 442, 134, fill=ROSE_BG, stroke=colors.HexColor("#FECDD3"))
    c.setFillColor(ROSE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(50, 152, "Ação Descartada: Contratar 1 Radiologista")
    draw_wrapped(
        c,
        "Custo: R$ 42.000/mês × 3 meses = R$ 126.000 (+152% acima do teto). Não resolve os 39% de pedidos incompletos nem a fila LIFO.",
        50, 128, 406, "Helvetica", 10, 15, NAVY
    )

    draw_card(c, 486, 46, 442, 134, fill=EMERALD_BG, stroke=colors.HexColor("#A7F3D0"))
    c.setFillColor(EMERALD)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(504, 152, "Indicador, Meta & Frequência")
    draw_wrapped(
        c,
        "Indicador: % de laudos liberados no prazo de 48h.\nAtual (Set/26): 86,5%  ->  Meta: >= 96,5% em 90 dias.\nMedição: Semanal, pelo Coordenador do CDI.",
        504, 128, 406, "Helvetica", 10, 15, NAVY
    )

    c.showPage()


def slide_8_conclusao(c: canvas.Canvas) -> None:
    draw_bg(c, 8, 8, "8. Solução Operacional, ROI & Conclusão", "Entrega Final")

    draw_card(c, 32, 204, 442, 260)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, 436, "Protótipo 1 — Portal Clínica Horizonte (Poka-Yoke)")
    draw_wrapped(
        c,
        "• Bloqueio automático na origem se faltar CID-10, Indicação Clínica (>= 15 caracteres) ou CRM/Assinatura.\n• Elimina o retrabalho da recepção na Etapa 2 e as devoluções na Etapa 6 (39% dos atrasos).\n• Padroniza o recebimento das 2 novas clínicas parceiras.",
        50, 406, 406, "Helvetica", 10, 16, SLATE
    )

    draw_card(c, 486, 204, 442, 260)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(504, 436, "Protótipo 2 — Fila Inteligente CDI (FEFO + Alertas)")
    draw_wrapped(
        c,
        "• Substitui a fila LIFO por ordenação FEFO (exames próximos de 48h no topo).\n• Alertas visuais em 36h (amarelo) e 42h (vermelho) + tag RETORNO PRIORITÁRIO.\n• Resgata exames noturnos de internação (#OC-005) no repasse das 07h00.",
        504, 406, 406, "Helvetica", 10, 16, SLATE
    )

    draw_card(c, 32, 46, W - 64, 138, fill=NAVY, stroke=NAVY)
    c.setFillColor(colors.HexColor("#34D399"))
    c.setFont("Helvetica-Bold", 12)
    c.drawString(52, 154, "CONCLUSÃO EXECUTIVA & PAYBACK IMEDIATO")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(52, 122, "Investimento Total: R$ 45.400  =  Payback em 1 multa evitada (R$ 45.000)")
    c.setFillColor(colors.HexColor("#CBD5E1"))
    c.setFont("Helvetica", 10.5)
    c.drawString(52, 90, "Economia de R$ 4.600 no teto  ·  Condição comercial: à vista ou 3x de R$ 15.133,33  ·  SLA 86,5% -> >= 96,5% em 90 dias.")
    c.drawString(52, 68, "Redução de risco FMEA > 91% (648->54 e 576->32)  ·  Plataforma ao vivo: Aurora CDI Flow.")

    c.showPage()


def main() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    c = canvas.Canvas(str(OUT_PDF), pagesize=(W, H))
    c.setTitle("Aurora CDI Flow - Apresentação N2 Gestão da Qualidade")
    c.setAuthor("Grupo Consultoria Aurora CDI")

    slide_1_crise(c)
    slide_2_fluxograma(c)
    slide_3_pareto_geral(c, data)
    slide_4_pareto_estratificado(c, data)
    slide_5_ishikawa(c)
    slide_6_fmea(c)
    slide_7_plano_5w2h(c)
    slide_8_conclusao(c)

    c.save()
    print(f"PDF generated: {OUT_PDF} ({OUT_PDF.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
