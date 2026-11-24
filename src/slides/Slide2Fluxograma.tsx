import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TermHelp } from '../components/TermHelp';

interface Slide2FluxogramaProps {
  onExplainTerm: (termId: string) => void;
}

interface BottleneckInfo {
  id: 'E2' | 'E4' | 'E5' | 'E6';
  etapa: string;
  titulo: string;
  detalhe: string;
  evidencia: string;
  severity: 'red' | 'amber';
}

const BOTTLENECKS: Record<'E2' | 'E4' | 'E5' | 'E6', BottleneckInfo> = {
  E2: {
    id: 'E2',
    etapa: 'Etapa 2 · Agendamento',
    titulo: 'Aceita pedido sem conferir',
    detalhe: 'Recepção agenda mesmo sem CID-10, indicação ou carimbo para não perder o paciente.',
    evidencia: '39% dos atrasos (31/39 de clínicas externas)',
    severity: 'red',
  },
  E4: {
    id: 'E4',
    etapa: 'Etapa 4 · Exame',
    titulo: 'Repetição por falha técnica',
    detalhe: 'Se a imagem não estiver boa na conferência, o técnico precisa repetir o exame.',
    evidencia: '10% dos atrasos da base',
    severity: 'amber',
  },
  E5: {
    id: 'E5',
    etapa: 'Etapa 5 · Fila de Laudos',
    titulo: 'Fila LIFO sem alerta de SLA',
    detalhe: 'Lista mostra exames mais novos no topo; exames da madrugada afundam sem aviso.',
    evidencia: '31% dos atrasos (90,3% no turno Noite)',
    severity: 'red',
  },
  E6: {
    id: 'E6',
    etapa: 'Etapa 6 · Laudo',
    titulo: 'Devolução volta sem prioridade',
    detalhe: 'Pedido incompleto volta à recepção; após contato médico, retorna ao fim da fila.',
    evidencia: 'Duplo atraso no SLA de 48h',
    severity: 'red',
  },
};

export const Slide2Fluxograma: React.FC<Slide2FluxogramaProps> = ({ onExplainTerm }) => {
  const [selected, setSelected] = useState<'E2' | 'E4' | 'E5' | 'E6' | null>('E2');

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-900">
                Fluxo Atual do CDI (7 Etapas)
              </h2>
              <TermHelp label="O que é Fluxograma?" onClick={() => onExplainTerm('fluxograma')} />
              <TermHelp label="LIFO" onClick={() => onExplainTerm('lifo')} />
            </div>
            <p className="text-sm text-slate-500">
              Clique nos 4 pontos pulsantes para inspecionar os gargalos
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Crítico
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Moderado
            </span>
          </div>
        </div>

        {/* Clean Horizontal SVG Flowchart */}
        <div className="overflow-x-auto">
          <svg
            viewBox="0 0 1120 260"
            className="w-full min-w-[900px] h-auto select-none"
            role="img"
            aria-label="Fluxograma do processo CDI com 7 etapas"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Connectors */}
            <line x1="88" y1="90" x2="118" y2="90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="220" y1="90" x2="250" y2="90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="360" y1="90" x2="390" y2="90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="490" y1="90" x2="520" y2="90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* Etapa 4 -> Losango Imagem Boa */}
            <line x1="620" y1="90" x2="646" y2="90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* Losango -> Etapa 5 */}
            <line x1="726" y1="90" x2="758" y2="90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* Loop Não Imagem Boa */}
            <path d="M 686 50 L 686 24 L 570 24 L 570 52" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4 3" markerEnd="url(#arrow)" />
            <text x="628" y="18" textAnchor="middle" fontSize="10" fill="#b45309" fontWeight="600">
              Não (Repete)
            </text>
            <text x="738" y="82" textAnchor="middle" fontSize="10" fill="#059669" fontWeight="600">
              Sim
            </text>

            {/* Etapa 5 -> Etapa 6 */}
            <line x1="862" y1="90" x2="892" y2="90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Etapa 6 -> Losango Pedido Completo (downwards to row 2) */}
            <line x1="942" y1="124" x2="942" y2="156" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* Losango Pedido Completo -> Etapa 7 */}
            <line x1="896" y1="196" x2="852" y2="196" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="875" y="188" textAnchor="middle" fontSize="10" fill="#059669" fontWeight="600">
              Sim
            </text>
            {/* Etapa 7 -> Fim */}
            <line x1="742" y1="196" x2="704" y2="196" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Loop Não Pedido Completo -> volta Etapa 5 */}
            <path d="M 988 196 L 1050 196 L 1050 32 L 810 32 L 810 52" fill="none" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="4 3" markerEnd="url(#arrow)" />
            <text x="1018" y="188" textAnchor="middle" fontSize="10" fill="#be123c" fontWeight="600">
              Não (Devolve)
            </text>

            {/* Oval Início */}
            <rect x="14" y="68" width="72" height="44" rx="22" fill="#0f172a" />
            <text x="50" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">
              Início
            </text>

            {/* Etapa 1 */}
            <rect x="120" y="58" width="100" height="64" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="170" y="84" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b">
              ETAPA 1
            </text>
            <text x="170" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
              Pedido
            </text>

            {/* Etapa 2 */}
            <rect x="252" y="58" width="108" height="64" rx="10" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
            <text x="306" y="84" textAnchor="middle" fontSize="10" fontWeight="700" fill="#e11d48">
              ETAPA 2
            </text>
            <text x="306" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
              Agendamento
            </text>

            {/* Etapa 3 */}
            <rect x="392" y="58" width="98" height="64" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="441" y="84" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b">
              ETAPA 3
            </text>
            <text x="441" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
              Chegada
            </text>

            {/* Etapa 4 */}
            <rect x="522" y="58" width="98" height="64" rx="10" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
            <text x="571" y="84" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">
              ETAPA 4
            </text>
            <text x="571" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
              Exame
            </text>

            {/* Losango Imagem Boa? */}
            <polygon points="686,52 726,90 686,128 646,90" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="686" y="87" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
              Imagem
            </text>
            <text x="686" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
              boa?
            </text>

            {/* Etapa 5 */}
            <rect x="760" y="58" width="102" height="64" rx="10" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
            <text x="811" y="84" textAnchor="middle" fontSize="10" fontWeight="700" fill="#e11d48">
              ETAPA 5
            </text>
            <text x="811" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
              Fila LIFO
            </text>

            {/* Etapa 6 */}
            <rect x="894" y="58" width="98" height="64" rx="10" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
            <text x="943" y="84" textAnchor="middle" fontSize="10" fontWeight="700" fill="#e11d48">
              ETAPA 6
            </text>
            <text x="943" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
              Laudo
            </text>

            {/* Losango Pedido Completo? */}
            <polygon points="942,158 986,196 942,234 898,196" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="942" y="193" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
              Pedido
            </text>
            <text x="942" y="206" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
              ok?
            </text>

            {/* Etapa 7 */}
            <rect x="742" y="164" width="108" height="64" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="796" y="190" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b">
              ETAPA 7
            </text>
            <text x="796" y="208" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
              Liberação
            </text>

            {/* Oval Fim */}
            <rect x="630" y="174" width="72" height="44" rx="22" fill="#0f172a" />
            <text x="666" y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">
              Fim
            </text>

            {/* 4 Pulsing Dots */}
            {[
              { id: 'E2' as const, cx: 356, cy: 60, fill: '#e11d48' },
              { id: 'E4' as const, cx: 616, cy: 60, fill: '#f59e0b' },
              { id: 'E5' as const, cx: 858, cy: 60, fill: '#e11d48' },
              { id: 'E6' as const, cx: 988, cy: 60, fill: '#e11d48' },
            ].map((dot) => (
              <g
                key={dot.id}
                onClick={() => setSelected(dot.id)}
                className="cursor-pointer"
              >
                <circle cx={dot.cx} cy={dot.cy} r="13" fill={dot.fill} opacity="0.22">
                  <animate attributeName="r" values="9;16;9" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle
                  cx={dot.cx}
                  cy={dot.cy}
                  r="8"
                  fill={dot.fill}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Clean Popover Card for Selected Bottleneck */}
      {selected && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  BOTTLENECKS[selected].severity === 'red' ? 'bg-rose-600' : 'bg-amber-500'
                }`}
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {BOTTLENECKS[selected].etapa}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-slate-700">
                {BOTTLENECKS[selected].evidencia}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {BOTTLENECKS[selected].titulo}
            </h3>
            <p className="text-sm text-slate-600">{BOTTLENECKS[selected].detalhe}</p>
          </div>

          <button
            type="button"
            onClick={() => setSelected(null)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

