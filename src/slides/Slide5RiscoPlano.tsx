import React, { useState } from 'react';
import { ArrowRight, Table, ShieldAlert, X, CheckCircle2, Calculator } from 'lucide-react';
import { TermHelp } from '../components/TermHelp';

interface Slide5RiscoPlanoProps {
  onExplainTerm: (termId: string) => void;
}

const FMEA_ROWS = [
  {
    etapa: 'Etapa 5',
    falha: 'Fila LIFO sem alerta SLA e acúmulo noturno',
    s: 9,
    o: 8,
    d: 9,
    antes: 648,
    depois: 54,
    justificativa: 'S=9 (multa/alta), O=8 (90,3% noite), D=9 (sem alerta). Cai com FEFO + alertas 36h/42h.',
  },
  {
    etapa: 'Etapa 2',
    falha: 'Pedido incompleto aceito sem conferência',
    s: 8,
    o: 9,
    d: 8,
    antes: 576,
    depois: 32,
    justificativa: 'S=8 (devolução certa), O=9 (39% da base), D=8 (só visto no laudo). Cai com Poka-Yoke.',
  },
  {
    etapa: 'Etapa 6',
    falha: 'Retorno regularizado volta ao fim da fila',
    s: 7,
    o: 6,
    d: 7,
    antes: 294,
    depois: null,
    justificativa: 'S=7 (agrava atraso), O=6 (pós-devolução), D=7 (sem tag de retorno).',
  },
  {
    etapa: 'Etapas 2/3',
    falha: 'Pendência de convênio / erro de cadastro',
    s: 6,
    o: 4,
    d: 5,
    antes: 120,
    depois: null,
    justificativa: 'S=6 (atraso moderado), O=4 (15% somados), D=5 (checagem no balcão).',
  },
  {
    etapa: 'Etapa 4',
    falha: 'Falha técnica na aquisição / repetição',
    s: 6,
    o: 4,
    d: 4,
    antes: 96,
    depois: null,
    justificativa: 'S=6 (rechamar paciente), O=4 (10% da base), D=4 (técnico vê na hora).',
  },
];

interface ActionBreakdownLine {
  papel: string;
  horas: string;
  horario: string;
  valorHora: string;
  subtotal: string;
}

interface ActionItem {
  id: string;
  titulo: string;
  custo: number;
  custoTexto: string;
  porQue: string;
  onde: string;
  quando: string;
  quem: string;
  como: string;
  breakdown: ActionBreakdownLine[];
}

const ACTIONS: ActionItem[] = [
  {
    id: 'portal',
    titulo: 'Portal Eletrônico Clínicas',
    custo: 25000,
    custoTexto: 'R$ 25.000',
    porQue: 'Eliminar 39% de pedidos incompletos',
    onde: 'Clínicas parceiras',
    quando: 'Semanas 1–4',
    quem: 'TI + Coordenação CDI',
    como: 'Trava Poka-Yoke (CID, indicação, CRM)',
    breakdown: [
      {
        papel: 'Analista de Desenvolvimento / Integração (Fornecedor)',
        horas: '100h',
        horario: 'Sem. 1–4 (08h–13h)',
        valorHora: 'R$ 180/h',
        subtotal: 'R$ 18.000,00',
      },
      {
        papel: 'Analista de UX / Segurança & Homologação (Fornecedor)',
        horas: '35h',
        horario: 'Sem. 3–4 (14h–17h30)',
        valorHora: 'R$ 200/h',
        subtotal: 'R$ 7.000,00',
      },
      {
        papel: 'Coord. CDI (Rad.) + Sup. Recepção (validação interna)',
        horas: '4h',
        horario: '08h–09h (turno 7h–19h)',
        valorHora: 'R$ 250/h · R$ 35/h',
        subtotal: 'R$ 0,00 (já na folha)',
      },
    ],
  },
  {
    id: 'fefo',
    titulo: 'Fila FEFO + Alertas SLA 48h',
    custo: 18000,
    custoTexto: 'R$ 18.000',
    porQue: 'Eliminar 31% de retenção LIFO',
    onde: 'Sistema PACS/RIS',
    quando: 'Semanas 1–3',
    quem: 'TI / Fornecedor RIS',
    como: 'Ordenar por SLA + alertas 36h/42h',
    breakdown: [
      {
        papel: 'Analista de Sistemas RIS/PACS (Regras FEFO & Prioridade)',
        horas: '60h',
        horario: 'Sem. 1–2 (09h–15h)',
        valorHora: 'R$ 200/h',
        subtotal: 'R$ 12.000,00',
      },
      {
        papel: 'Analista de QA / Implantação (Alertas 36h/42h)',
        horas: '30h',
        horario: 'Sem. 3 (09h–15h)',
        valorHora: 'R$ 200/h',
        subtotal: 'R$ 6.000,00',
      },
      {
        papel: '1 Radiologista + 1 Recepcionista (testes operacionais)',
        horas: '2h',
        horario: '14h–16h (turno 7h–19h)',
        valorHora: 'R$ 250/h · R$ 35/h',
        subtotal: 'R$ 0,00 (já na folha)',
      },
    ],
  },
  {
    id: 'treino',
    titulo: 'Treinamento Recepção 4h',
    custo: 2400,
    custoTexto: 'R$ 2.400',
    porQue: 'Padronizar conferência D-1',
    onde: 'Recepção CDI',
    quando: 'Semana 2',
    quem: 'Sup. Juliana Prado',
    como: 'Workshop prático (1 turma)',
    breakdown: [
      {
        papel: 'Instrutor / Consultor de Qualidade (4h aula + 4h preparo)',
        horas: '8h',
        horario: 'Sem. 2 (13h–17h)',
        valorHora: 'R$ 300/h',
        subtotal: 'R$ 2.400,00',
      },
      {
        papel: '6 Recepcionistas participantes (equipe CDI)',
        horas: '24h (6 × 4h)',
        horario: '13h–17h (turno 7h–19h)',
        valorHora: 'R$ 35/h',
        subtotal: 'R$ 0,00 (R$ 840 já na folha)',
      },
    ],
  },
  {
    id: 'repasse',
    titulo: 'Repasse Matinal 07h00',
    custo: 0,
    custoTexto: 'R$ 0',
    porQue: 'Absorver estoque da madrugada',
    onde: 'Sala de Laudos',
    quando: 'Imediato',
    quem: 'Coord. + Plantonista',
    como: 'Passagem de plantão de 10 min',
    breakdown: [
      {
        papel: '1 Radiologista Noturno (19h–7h) + 5 Diurnos (7h–19h)',
        horas: '10 min/dia',
        horario: '07h00–07h10 (troca de turno)',
        valorHora: 'R$ 250/h',
        subtotal: 'R$ 0,00 (sem hora extra)',
      },
    ],
  },
];

const BUDGET_CAP = 50000;

export const Slide5RiscoPlano: React.FC<Slide5RiscoPlanoProps> = ({ onExplainTerm }) => {
  const [activeMap, setActiveMap] = useState<Record<string, boolean>>({
    portal: true,
    fefo: true,
    treino: true,
    repasse: true,
  });
  const [includeDiscarded, setIncludeDiscarded] = useState(false);
  const [fmeaModalOpen, setFmeaModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null);

  const totalCost =
    ACTIONS.reduce((acc, a) => acc + (activeMap[a.id] ? a.custo : 0), 0) +
    (includeDiscarded ? 126000 : 0);
  const overBudget = totalCost > BUDGET_CAP;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Block: Queda de Risco FMEA */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">
                  Queda de Risco (FMEA)
                </h2>
                <TermHelp label="O que é?" onClick={() => onExplainTerm('fmea')} />
              </div>
              <span className="text-xs font-medium text-slate-400">Antes → Depois</span>
            </div>

            <div className="space-y-4">
              {/* Top 1 */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Fila LIFO (Etapa 5)</span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-700">
                    -91,7%
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3 font-mono">
                  <span className="text-2xl font-bold text-rose-600">648</span>
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                  <span className="text-2xl font-bold text-emerald-600">54</span>
                </div>
              </div>

              {/* Top 2 */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">
                    Pedido Incompleto (Etapa 2)
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-700">
                    -94,4%
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3 font-mono">
                  <span className="text-2xl font-bold text-rose-600">576</span>
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                  <span className="text-2xl font-bold text-emerald-600">32</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFmeaModalOpen(true)}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
          >
            <ShieldAlert className="h-4 w-4" />
            Ver Matriz FMEA Completa (5 Falhas)
          </button>
        </div>

        {/* Right Block: Orçamento & 5W2H */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Orçamento & Plano 5W2H
                  </h2>
                  <TermHelp label="O que é?" onClick={() => onExplainTerm('5w2h')} />
                </div>
                <p className="text-sm text-slate-500">
                  Simulador "E Se?" ·{' '}
                  <span
                    className={`font-mono font-bold ${
                      overBudget ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    R$ {totalCost.toLocaleString('pt-BR')}
                  </span>{' '}
                  de R$ 50.000
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCalcModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  Memória de Cálculo
                </button>
                <button
                  type="button"
                  onClick={() => setPlanModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
                >
                  <Table className="h-3.5 w-3.5" />
                  Tabela 5W2H Completa
                </button>
              </div>
            </div>

            {/* 4 Interactive Cards (click card for item calculation popup) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ACTIONS.map((act) => {
                const active = activeMap[act.id];
                return (
                  <div
                    key={act.id}
                    onClick={() => setSelectedAction(act)}
                    className={`cursor-pointer rounded-xl border p-4 flex items-center justify-between gap-3 transition hover:border-slate-900 ${
                      active
                        ? 'border-slate-300 bg-white'
                        : 'border-slate-200 bg-slate-50 opacity-50'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{act.titulo}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          {act.custoTexto}
                        </span>
                        <span className="text-[11px] font-medium text-blue-700">
                          Ver cálculo →
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={active}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() =>
                        setActiveMap((prev) => ({ ...prev, [act.id]: !prev[act.id] }))
                      }
                      className="h-4 w-4 accent-slate-900 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>

            {/* Badge Ação Descartada + Card Meta */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => setIncludeDiscarded((v) => !v)}
                className={`text-left rounded-xl border px-4 py-3 text-xs font-semibold transition ${
                  includeDiscarded
                    ? 'border-rose-500 bg-rose-600 text-white'
                    : 'border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100'
                }`}
              >
                Ação Descartada: Contratar Médico (R$ 126 mil/3m)
              </button>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 flex items-center gap-2.5 text-xs text-emerald-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>SLA 48h:</strong> 86,5% → ≥ 96,5% em 90 dias (semanal)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Matriz FMEA Completa */}
      {fmeaModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
          onClick={() => setFmeaModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Matriz FMEA Completa (5 Modos de Falha)
              </h3>
              <button
                type="button"
                onClick={() => setFmeaModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase">
                  <th className="py-2 pr-3">Etapa</th>
                  <th className="py-2 pr-3">Modo de Falha</th>
                  <th className="py-2 px-2 text-center">S</th>
                  <th className="py-2 px-2 text-center">O</th>
                  <th className="py-2 px-2 text-center">D</th>
                  <th className="py-2 px-2 text-right">Antes</th>
                  <th className="py-2 pl-2 text-right">Depois</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FMEA_ROWS.map((r) => (
                  <tr key={r.etapa + r.falha}>
                    <td className="py-3 pr-3 font-semibold text-slate-700 whitespace-nowrap">
                      {r.etapa}
                    </td>
                    <td className="py-3 pr-3">
                      <div className="font-semibold text-slate-900">{r.falha}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{r.justificativa}</div>
                    </td>
                    <td className="py-3 px-2 text-center font-mono">{r.s}</td>
                    <td className="py-3 px-2 text-center font-mono">{r.o}</td>
                    <td className="py-3 px-2 text-center font-mono">{r.d}</td>
                    <td className="py-3 px-2 text-right font-mono font-bold text-rose-600">
                      {r.antes}
                    </td>
                    <td className="py-3 pl-2 text-right font-mono font-bold text-emerald-600">
                      {r.depois ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Tabela 5W2H Completa */}
      {planModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
          onClick={() => setPlanModalOpen(false)}
        >
          <div
            className="w-full max-w-5xl max-h-[88vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Tabela 5W2H Completa (7 Colunas)
              </h3>
              <button
                type="button"
                onClick={() => setPlanModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase">
                    <th className="py-2 pr-3">O quê</th>
                    <th className="py-2 pr-3">Por quê</th>
                    <th className="py-2 pr-3">Onde</th>
                    <th className="py-2 pr-3">Quando</th>
                    <th className="py-2 pr-3">Quem</th>
                    <th className="py-2 pr-3">Como</th>
                    <th className="py-2 text-right">Quanto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ACTIONS.map((a) => (
                    <tr key={a.id}>
                      <td className="py-3 pr-3 font-semibold text-slate-900">{a.titulo}</td>
                      <td className="py-3 pr-3 text-slate-600">{a.porQue}</td>
                      <td className="py-3 pr-3 text-slate-700">{a.onde}</td>
                      <td className="py-3 pr-3 text-slate-700">{a.quando}</td>
                      <td className="py-3 pr-3 text-slate-700">{a.quem}</td>
                      <td className="py-3 pr-3 text-slate-600">{a.como}</td>
                      <td className="py-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                        {a.custoTexto}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Memória de Cálculo Detalhada */}
      {calcModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
          onClick={() => setCalcModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Memória de Cálculo Detalhada do Orçamento (3 Meses)
                </h3>
                <p className="text-xs text-slate-500">
                  Baseada integralmente na tabela de valores de referência do Dossiê
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCalcModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 1. Tabela de Composição por Item (Analistas, Horários e Valor/Hora) */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                1. Memória de Cálculo por Item (Equipe, Horários & Valor da Hora)
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase">
                      <th className="py-2.5 px-3">Item do Plano</th>
                      <th className="py-2.5 px-3">Analistas / Equipe</th>
                      <th className="py-2.5 px-3">Horário / Carga</th>
                      <th className="py-2.5 px-3">Valor da Hora / Base</th>
                      <th className="py-2.5 px-3 text-right">Custo no Plano</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        1. Portal Eletrônico Clínicas (Poka-Yoke)
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        Fornecedor TI (implantação) + Sup. Recepção e Coord. CDI (validação)
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600">
                        Semanas 1–4 · Validação 08h–09h (4h na jornada 7h–19h)
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        Pacote único: <strong>R$ 25.000</strong> · Interno: Recepção R$ 35/h + Rad. R$ 250/h (já na jornada)
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                        R$ 25.000,00
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        2. Ajuste Sistema (Fila FEFO + Alertas 36h/42h)
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        Analista Fornecedor RIS/PACS + 1 Radiologista + 1 Recepcionista (teste)
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600">
                        Semanas 1–3 · Testes 14h–16h (2h na jornada 7h–19h)
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        Pacote único: <strong>R$ 18.000</strong> · Teste interno: Rad. R$ 250/h + Rec. R$ 35/h (sem extra)
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                        R$ 18.000,00
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        3. Treinamento Recepção (Checklist D-1)
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        Instrutor (1 turma) + 6 Recepcionistas (Sup. Juliana Prado)
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600">
                        Semana 2 · 4h totais (13h–17h dentro do turno 7h–19h)
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        Turma: <strong>R$ 2.400</strong> · Hora recepcionista: <strong>R$ 35/h</strong> (6 × 4h = R$ 840 já na folha)
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                        R$ 2.400,00
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        4. Repasse Matinal (Passagem de Plantão)
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        1 Radiologista noturno (19h–7h) + 5 Radiologistas diurnos (7h–19h)
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600">
                        Diário · 07h00–07h10 (10 min na troca de turno)
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        Hora radiologista: <strong>R$ 250/h</strong> · Sem hora extra (capacidade 60h/dia p/ ~118 exames)
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                        R$ 0,00
                      </td>
                    </tr>
                    <tr className="bg-slate-900 text-white">
                      <td colSpan={4} className="py-2.5 px-3 font-bold">
                        TOTAL DO PLANO NOS 3 PRIMEIROS MESES (Mês 1: R$ 45.400 · Meses 2 e 3: R$ 0)
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-sm font-extrabold text-emerald-400 whitespace-nowrap">
                        R$ 45.400,00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Resumo Teto, Folga e Sensibilidade */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="text-[11px] font-medium text-slate-500">Teto Aprovado (3m)</div>
                <div className="mt-1 font-mono text-lg font-bold text-slate-900">R$ 50.000,00</div>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5">
                <div className="text-[11px] font-medium text-emerald-700">Folga Orçamentária</div>
                <div className="mt-1 font-mono text-lg font-bold text-emerald-700">
                  R$ 4.600,00 (9,2%)
                </div>
              </div>
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-3.5">
                <div className="text-[11px] font-medium text-sky-800">Payback (1 Multa Evitada)</div>
                <div className="mt-1 font-mono text-lg font-bold text-sky-900">R$ 45.000,00</div>
              </div>
            </div>

            {/* 3. Nota de Sensibilidade + Comparativo Ação Descartada */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="font-bold text-slate-900 mb-1">
                  Teste de Sensibilidade (Horas de Recepção)
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Mesmo contabilizando as horas da equipe durante o treinamento (
                  <span className="font-mono font-semibold">6 recepcionistas × 4h × R$ 35/h = R$ 840</span>
                  ), o custo total seria <span className="font-mono font-semibold">R$ 46.240</span> — ainda{' '}
                  <strong>R$ 3.760 abaixo do teto</strong>.
                </p>
              </div>

              <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4">
                <div className="font-bold text-rose-900 mb-1">
                  Por que a Contratação foi Descartada?
                </div>
                <p className="text-rose-800 leading-relaxed">
                  1 radiologista adicional ={' '}
                  <span className="font-mono font-semibold">3 meses × R$ 42.000 = R$ 126.000</span>{' '}
                  (<strong>+152% acima do teto</strong> isoladamente, ou R$ 171.400 somado ao plano), sem eliminar os 39% de retrabalho.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup Específico por Item do Plano */}
      {selectedAction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
          onClick={() => setSelectedAction(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Memória de Cálculo Específica · {selectedAction.quando}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedAction.titulo}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedAction.porQue} · {selectedAction.como}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAction(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase">
                    <th className="py-2.5 px-3">Analista / Profissional</th>
                    <th className="py-2.5 px-3">Horas</th>
                    <th className="py-2.5 px-3">Horário</th>
                    <th className="py-2.5 px-3">Valor/Hora</th>
                    <th className="py-2.5 px-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedAction.breakdown.map((line) => (
                    <tr key={line.papel}>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{line.papel}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                        {line.horas}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                        {line.horario}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                        {line.valorHora}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                        {line.subtotal}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900 text-white">
                    <td colSpan={4} className="py-2.5 px-3 font-bold">
                      TOTAL DO ITEM NO ORÇAMENTO
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-sm font-extrabold text-emerald-400">
                      {selectedAction.custoTexto},00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

