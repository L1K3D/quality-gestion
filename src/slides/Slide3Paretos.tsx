import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { Table, X } from 'lucide-react';
import rawData from '../data/auroraData.json';
import { AuroraData } from '../types/aurora';
import { TermHelp } from '../components/TermHelp';

const data = rawData as AuroraData;

interface Slide3ParetosProps {
  onExplainTerm: (termId: string) => void;
}

export const Slide3Paretos: React.FC<Slide3ParetosProps> = ({ onExplainTerm }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Pareto Geral */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">Pareto Geral</h2>
                <TermHelp label="O que é?" onClick={() => onExplainTerm('pareto')} />
              </div>
              <p className="text-sm text-slate-500">Top 2 causas somam 70% dos atrasos</p>
            </div>
            <span className="rounded-full bg-blue-900 px-3 py-1 font-mono text-xs font-bold text-white">
              70% acumulado
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data.paretoGeral}
                margin={{ top: 10, right: 16, left: -12, bottom: 24 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="motivo"
                  tick={{ fontSize: 11, fill: '#475569' }}
                  interval={0}
                  angle={-14}
                  textAnchor="end"
                  height={50}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#475569' }} axisLine={false} tickLine={false} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  unit="%"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(value: number, name: string) =>
                    name === 'cumulativePercent' ? [`${value}%`, '% Acumulado'] : [value, 'Casos']
                  }
                />
                <Bar yAxisId="left" dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={44}>
                  {data.paretoGeral.map((entry, idx) => (
                    <Cell key={entry.motivo} fill={idx < 2 ? '#1e3a8a' : '#cbd5e1'} />
                  ))}
                </Bar>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cumulativePercent"
                  stroke="#0f172a"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#0f172a' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Pareto Estratificado */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">
                  Pareto Estratificado (Origem)
                </h2>
                <TermHelp label="O que é?" onClick={() => onExplainTerm('pareto-estratificado')} />
              </div>
              <p className="text-sm text-slate-500">
                Pedido incompleto: 79,5% em Clínica externa
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition shrink-0"
            >
              <Table className="h-3.5 w-3.5" />
              Ver Tabela & Justificativa
            </button>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data.paretoEstratificado}
                margin={{ top: 10, right: 16, left: -12, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="origem"
                  tick={{ fontSize: 12, fill: '#475569' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#475569' }} axisLine={false} tickLine={false} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  unit="%"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(value: number, name: string) =>
                    name === 'cumulativePercent' ? [`${value}%`, '% Acumulado'] : [value, 'Casos']
                  }
                />
                <Bar yAxisId="left" dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={64}>
                  {data.paretoEstratificado.map((entry, idx) => (
                    <Cell key={entry.origem} fill={idx === 0 ? '#1e3a8a' : '#cbd5e1'} />
                  ))}
                </Bar>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cumulativePercent"
                  stroke="#0f172a"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#0f172a' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Side Drawer: Folha de Verificação (100 casos) & Justificativa */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full max-w-xl h-full overflow-y-auto bg-white p-7 shadow-2xl border-l border-slate-200 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-base font-bold text-slate-900">
                Folha de Verificação & Justificativa
              </h3>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed space-y-2">
              <div className="font-bold text-slate-900">Por que estratificar por Origem do Pedido?</div>
              <p>
                Entre os 39 pedidos incompletos, <strong>31 (79,5%)</strong> vieram de{' '}
                <strong>Clínicas externas</strong>, contra 15,4% do Ambulatório e 5,1% da Internação.
              </p>
              <p>
                A evolução mensal comprova o impacto das 2 novas parcerias em agosto:{' '}
                <strong>Julho: 6 → Agosto: 16 → Setembro: 17 (+183,3%)</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Folha de Verificação Completa (n = {data.metadata.totalRegistros})
              </h4>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500">
                    <th className="py-2 font-semibold">Motivo do Atraso</th>
                    <th className="py-2 text-right font-semibold">Qtd</th>
                    <th className="py-2 text-right font-semibold">%</th>
                    <th className="py-2 text-right font-semibold">% Acum.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.paretoGeral.map((row) => (
                    <tr key={row.motivo}>
                      <td className="py-2.5 text-slate-800">{row.motivo}</td>
                      <td className="py-2.5 text-right font-mono">{row.count}</td>
                      <td className="py-2.5 text-right font-mono">
                        {row.percent.toFixed(1).replace('.', ',')}%
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold text-slate-900">
                        {row.cumulativePercent.toFixed(1).replace('.', ',')}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

