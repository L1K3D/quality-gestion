import React from 'react';
import { X, FileText, Printer, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ProposalModalProps {
  open: boolean;
  onClose: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-7 py-4">
          <div className="flex items-center gap-2.5">
            <FileText className="h-5 w-5 text-slate-900" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Proposta Comercial — Aurora CDI Flow
              </h2>
              <p className="text-[11px] text-slate-500">
                Centro Médico Aurora · Projeto de 90 dias · Validade: 15 dias úteis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-900 hover:text-white transition"
            >
              <Printer className="h-3.5 w-3.5" />
              Imprimir / PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-7 space-y-6">
          {/* KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <div className="text-[11px] font-medium text-slate-500">Investimento Total</div>
              <div className="mt-1 font-mono text-lg font-bold text-slate-900">R$ 45.400</div>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5">
              <div className="text-[11px] font-medium text-emerald-700">Economia no Teto</div>
              <div className="mt-1 font-mono text-lg font-bold text-emerald-700">R$ 4.600</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <div className="text-[11px] font-medium text-slate-500">Meta SLA 48h (90d)</div>
              <div className="mt-1 font-mono text-lg font-bold text-slate-900">86,5% → ≥96,5%</div>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-3.5">
              <div className="text-[11px] font-medium text-sky-800">Payback</div>
              <div className="mt-1 font-mono text-lg font-bold text-sky-900">1 multa (R$ 45k)</div>
            </div>
          </div>

          {/* 1. Diagnóstico Executivo */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. Diagnóstico Executivo
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              O atraso de laudos acima de 48h saltou de <strong>3,1% (2025)</strong> para{' '}
              <strong>13,5% (Set/2026)</strong>, gerando multa de <strong>R$ 45.000</strong>. A base de
              100 ocorrências comprova que <strong>70% dos atrasos</strong> vêm de{' '}
              <strong>Pedidos Incompletos (39%</strong>, sendo 79,5% de clínicas externas) e{' '}
              <strong>Fila LIFO sem alerta (31%</strong>, sendo 90,3% no turno da noite). Os 5
              radiologistas diurnos somam 60h/dia para ~118 exames/dia (&lt; 2 exames/h) — portanto, o
              gargalo é operacional, não de falta de médicos.
            </p>
          </div>

          {/* 2. Escopo e Investimento */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              2. Escopo dos Entregáveis & Cronograma (90 Dias)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase">
                    <th className="py-2.5 px-3">Frente</th>
                    <th className="py-2.5 px-3">Entregável</th>
                    <th className="py-2.5 px-3">Prazo</th>
                    <th className="py-2.5 px-3 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      1. Portal Clínicas (Poka-Yoke)
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      Bloqueio automático na origem sem CID-10, indicação (≥15 chars) ou CRM
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">Semanas 1–4</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      R$ 25.000,00
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      2. Fila Inteligente FEFO
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      Ordenação por vencimento de SLA, alertas 36h/42h e tag Retorno Prioritário
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">Semanas 1–3</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      R$ 18.000,00
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      3. Treinamento Recepção (4h)
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      1 turma prática para 6 recepcionistas sobre checklist e conferência D-1
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">Semana 2</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      R$ 2.400,00
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      4. Repasse Matinal 07h00
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      Protocolo diário de 10 min na troca de turno para absorção do estoque noturno
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">Imediato</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                      R$ 0,00
                    </td>
                  </tr>
                  <tr className="bg-slate-900 text-white">
                    <td colSpan={3} className="py-2.5 px-3 font-bold">
                      INVESTIMENTO TOTAL (3 PRIMEIROS MESES)
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-sm font-extrabold text-emerald-400">
                      R$ 45.400,00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Garantias & Condições */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Condições Comerciais & Governança</span>
              </div>
              <p className="text-emerald-900 leading-relaxed">
                <strong>Pagamento:</strong> À vista (R$ 45.400,00) ou parcelado em{' '}
                <strong>3× de R$ 15.133,33</strong> sem juros (Meses 1, 2 e 3, vinculadas às
                entregas e ao acompanhamento semanal de SLA).
              </p>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-rose-900">
                <ShieldAlert className="h-4 w-4 text-rose-600" />
                <span>Alternativa Descartada</span>
              </div>
              <p className="text-rose-900 leading-relaxed">
                Contratação de 1 radiologista adicional (R$ 42.000/mês) custaria{' '}
                <strong>R$ 126.000 em 3 meses (+152% acima do teto)</strong> sem eliminar o retrabalho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

