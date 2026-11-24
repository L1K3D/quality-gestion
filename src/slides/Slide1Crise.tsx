import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { HelpCircle, X, XCircle, CheckCircle2, BookOpen } from 'lucide-react';

interface Slide1CriseProps {
  onOpenContext: () => void;
}

const ATRASO_SERIES = [
  { periodo: '2025', taxa: 3.1, detalhe: 'Média histórica' },
  { periodo: 'Jul/26', taxa: 8.4, detalhe: '290 / 3.450 exames' },
  { periodo: 'Ago/26', taxa: 10.6, detalhe: '370 / 3.500 exames' },
  { periodo: 'Set/26', taxa: 13.5, detalhe: '480 / 3.550 exames' },
];

export const Slide1Crise: React.FC<Slide1CriseProps> = ({ onOpenContext }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const bigNumbers = [
    {
      valor: '3,1% → 13,5%',
      label: 'Salto nos atrasos em Set/26',
      accent: 'text-rose-600',
    },
    {
      valor: 'R$ 45.000',
      label: 'Multa aplicada pelo convênio',
      accent: 'text-slate-900',
    },
    {
      valor: '+18%',
      label: 'Alta de pedidos (2 clínicas em Ago/26)',
      accent: 'text-amber-600',
    },
    {
      valor: 'R$ 50.000',
      label: 'Orçamento aprovado para 3 meses',
      accent: 'text-emerald-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Big Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bigNumbers.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-slate-300"
          >
            <div className={`font-mono text-2xl sm:text-3xl font-bold tracking-tight ${item.accent}`}>
              {item.valor}
            </div>
            <div className="mt-2 text-sm text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Line Chart + Discrete Button */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Escalada dos Laudos Atrasados (&gt; 48h)
            </h2>
            <p className="text-sm text-slate-500">1.140 atrasos no 3º trimestre de 2026</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onOpenContext}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <BookOpen className="h-4 w-4" />
              Entender o Contexto
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
            >
              <HelpCircle className="h-4 w-4" />
              Testar Hipótese da Diretoria
            </button>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ATRASO_SERIES} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="periodo"
                tick={{ fontSize: 13, fill: '#475569' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 16]}
                unit="%"
                tick={{ fontSize: 13, fill: '#475569' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.08)',
                  fontSize: '13px',
                }}
                formatter={(value: number, _name: string, props: { payload?: { detalhe: string } }) => [
                  `${value}% (${props.payload?.detalhe})`,
                  'Atraso',
                ]}
              />
              <ReferenceLine
                y={3.5}
                stroke="#10b981"
                strokeDasharray="4 4"
                label={{
                  value: 'Meta ≤ 3,5%',
                  position: 'insideTopRight',
                  fill: '#059669',
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="taxa"
                stroke="#0f172a"
                strokeWidth={3}
                dot={{ r: 5, fill: '#e11d48', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Modal: Hipótese da Diretoria */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-900">
                Hipótese da Diretoria: "Faltam Radiologistas?"
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 flex items-start gap-3">
                <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-800">
                  <strong>Contratar 1 médico (R$ 42 mil/mês):</strong> custa{' '}
                  <span className="font-mono font-bold text-rose-700">R$ 126.000</span> em 3 meses —{' '}
                  <strong>estoura o orçamento em 152%</strong> sem resolver o retrabalho.
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-800">
                  <strong>Capacidade real diurna:</strong> 5 radiologistas somam{' '}
                  <span className="font-mono font-bold">60h/dia</span> para ~118 exames/dia (
                  <span className="font-mono font-bold">&lt; 2 exames/h</span>). O gargalo é de processo.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

