import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { TermHelp } from '../components/TermHelp';

interface Slide4CausaRaizProps {
  onExplainTerm: (termId: string) => void;
}

interface CaseRootCause {
  id: 'incompleto' | 'fila';
  badgeEvidencia: string;
  efeitoLinha1: string;
  efeitoLinha2: string;
  seisM: { nome: string; texto: string }[];
  cincoPorques: string[];
}

const CASES: Record<'incompleto' | 'fila', CaseRootCause> = {
  incompleto: {
    id: 'incompleto',
    badgeEvidencia: '79,5% Clínicas Externas · +183% Jul→Set',
    efeitoLinha1: '39% Pedido',
    efeitoLinha2: 'Incompleto',
    seisM: [
      { nome: 'Método', texto: 'Agenda sem conferir' },
      { nome: 'Material', texto: 'Papel e e-mail livre' },
      { nome: 'Mão de obra', texto: 'Medo de perder cliente' },
      { nome: 'Máquina', texto: 'Sem portal Poka-Yoke' },
      { nome: 'Medida', texto: 'Sem taxa de devolução' },
      { nome: 'Meio ambiente', texto: '+18% volume externo' },
    ],
    cincoPorques: [
      '1. Laudo atrasa porque radiologista devolve o pedido.',
      '2. Devolve porque falta CID-10, indicação ou CRM.',
      '3. Recepção agenda incompleto para não perder paciente.',
      '4. Clínicas enviam papel/e-mail em formatos livres.',
      '5. Raiz: falta portal padronizado com bloqueio Poka-Yoke.',
    ],
  },
  fila: {
    id: 'fila',
    badgeEvidencia: '90,3% Turno Noite · 48,4% Internação',
    efeitoLinha1: '31% Fila de',
    efeitoLinha2: 'Laudos',
    seisM: [
      { nome: 'Método', texto: 'Fila LIFO (novos topo)' },
      { nome: 'Máquina', texto: 'Sem alertas SLA 48h' },
      { nome: 'Mão de obra', texto: '1 noturno vs. 5 diurnos' },
      { nome: 'Medida', texto: 'Sem controle de aging' },
      { nome: 'Material', texto: 'Madrugada acumula' },
      { nome: 'Meio ambiente', texto: 'Foco pronto-socorro' },
    ],
    cincoPorques: [
      '1. Exames da madrugada estouram o prazo de 48h.',
      '2. Equipe diurna não puxa os exames noturnos.',
      '3. Sistema exibe os mais recentes no topo (LIFO).',
      '4. Não há alerta visual de vencimento de SLA.',
      '5. Raiz: falta fila FEFO + repasse às 07h00.',
    ],
  },
};

export const Slide4CausaRaiz: React.FC<Slide4CausaRaizProps> = ({ onExplainTerm }) => {
  const [tab, setTab] = useState<'incompleto' | 'fila'>('incompleto');
  const current = CASES[tab];

  const topBones = [
    { xTop: 118, xSpine: 185, item: current.seisM[0] },
    { xTop: 282, xSpine: 349, item: current.seisM[1] },
    { xTop: 446, xSpine: 513, item: current.seisM[2] },
  ];

  const bottomBones = [
    { xBot: 118, xSpine: 185, item: current.seisM[3] },
    { xBot: 282, xSpine: 349, item: current.seisM[4] },
    { xBot: 446, xSpine: 513, item: current.seisM[5] },
  ];

  return (
    <div className="space-y-6">
      {/* Top Selector + Numerical Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setTab('incompleto')}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
              tab === 'incompleto'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Pedido Incompleto - 39%
          </button>
          <button
            type="button"
            onClick={() => setTab('fila')}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
              tab === 'fila'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Fila de Laudos - 31%
          </button>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-800">
          <Database className="h-3.5 w-3.5" />
          <span>{current.badgeEvidencia}</span>
        </div>
      </div>

      {/* Main Split: Real SVG Fishbone + Escada dos 5 Porquês */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-7 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Diagrama de Ishikawa (Espinha de Peixe · 6M)
            </h2>
            <TermHelp label="O que é?" onClick={() => onExplainTerm('ishikawa')} />
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 740 360"
              className="w-full min-w-[580px] h-auto select-none"
              role="img"
              aria-label="Diagrama de Ishikawa em formato de espinha de peixe"
            >
              <defs>
                <marker
                  id="fish-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
                </marker>
              </defs>

              {/* Tail Fin */}
              <polygon
                points="14,142 52,180 14,218 28,180"
                fill="#e2e8f0"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />

              {/* Central Spine */}
              <line
                x1="46"
                y1="180"
                x2="564"
                y2="180"
                stroke="#0f172a"
                strokeWidth="3.5"
                markerEnd="url(#fish-arrow)"
              />

              {/* Fish Head (Effect) */}
              <path
                d="M 572,130 C 645,130 715,152 722,180 C 715,208 645,230 572,230 Z"
                fill="#e11d48"
              />
              <circle cx="688" cy="168" r="4" fill="#ffffff" />
              <text
                x="634"
                y="175"
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
                fill="#ffffff"
              >
                {current.efeitoLinha1}
              </text>
              <text
                x="634"
                y="194"
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
                fill="#ffffff"
              >
                {current.efeitoLinha2}
              </text>

              {/* Top 3 Diagonal Ribs */}
              {topBones.map(({ xTop, xSpine, item }) => (
                <g key={item.nome}>
                  {/* Diagonal rib */}
                  <line
                    x1={xTop}
                    y1="52"
                    x2={xSpine}
                    y2="180"
                    stroke="#1e3a8a"
                    strokeWidth="2.4"
                  />
                  {/* Category Pill at top */}
                  <rect
                    x={xTop - 56}
                    y="16"
                    width="112"
                    height="28"
                    rx="8"
                    fill="#0f172a"
                  />
                  <text
                    x={xTop}
                    y="34"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="#ffffff"
                  >
                    {item.nome}
                  </text>
                  {/* Sub-bone horizontal */}
                  <line
                    x1={xTop - 52}
                    y1="112"
                    x2={xTop + 31}
                    y2="112"
                    stroke="#64748b"
                    strokeWidth="1.6"
                  />
                  <rect
                    x={xTop - 92}
                    y="92"
                    width="128"
                    height="24"
                    rx="6"
                    fill="#f8fafc"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                  <text
                    x={xTop - 28}
                    y="108"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="600"
                    fill="#334155"
                  >
                    {item.texto}
                  </text>
                </g>
              ))}

              {/* Bottom 3 Diagonal Ribs */}
              {bottomBones.map(({ xBot, xSpine, item }) => (
                <g key={item.nome}>
                  {/* Diagonal rib */}
                  <line
                    x1={xBot}
                    y1="308"
                    x2={xSpine}
                    y2="180"
                    stroke="#1e3a8a"
                    strokeWidth="2.4"
                  />
                  {/* Category Pill at bottom */}
                  <rect
                    x={xBot - 56}
                    y="316"
                    width="112"
                    height="28"
                    rx="8"
                    fill="#0f172a"
                  />
                  <text
                    x={xBot}
                    y="334"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="#ffffff"
                  >
                    {item.nome}
                  </text>
                  {/* Sub-bone horizontal */}
                  <line
                    x1={xBot - 52}
                    y1="248"
                    x2={xBot + 31}
                    y2="248"
                    stroke="#64748b"
                    strokeWidth="1.6"
                  />
                  <rect
                    x={xBot - 92}
                    y="244"
                    width="128"
                    height="24"
                    rx="6"
                    fill="#f8fafc"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                  <text
                    x={xBot - 28}
                    y="260"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="600"
                    fill="#334155"
                  >
                    {item.texto}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Escada dos 5 Porquês */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-7">
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Escada dos 5 Porquês
            </h2>
            <TermHelp label="O que é?" onClick={() => onExplainTerm('5-porques')} />
          </div>

          <div className="space-y-3">
            {current.cincoPorques.map((line, idx) => (
              <div
                key={line}
                className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                  idx === 4
                    ? 'border-rose-200 bg-rose-50 text-rose-900 font-semibold'
                    : 'border-slate-200 bg-slate-50 text-slate-800'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
