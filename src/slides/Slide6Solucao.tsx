import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  QrCode,
  ShieldQuestion,
  RotateCcw,
} from 'lucide-react';
import { QueueExam } from '../types/aurora';
import { TermHelp } from '../components/TermHelp';

interface Slide6SolucaoProps {
  exams: QueueExam[];
  onInjectExam: (exam: QueueExam) => void;
  onReleaseExam: (examId: string) => void;
  onResetDemo: () => void;
  onOpenReplica: () => void;
  onOpenQr: () => void;
  onExplainTerm: (termId: string) => void;
}

function formatElapsed(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

export const Slide6Solucao: React.FC<Slide6SolucaoProps> = ({
  exams,
  onInjectExam,
  onReleaseExam,
  onResetDemo,
  onOpenReplica,
  onOpenQr,
  onExplainTerm,
}) => {
  const [paciente, setPaciente] = useState('Dona Helena Vasconcelos');
  const [exame, setExame] = useState('TC Crânio');
  const [cid, setCid] = useState('');
  const [indicacao, setIndicacao] = useState('');
  const [crm, setCrm] = useState('');
  const [blockedMsg, setBlockedMsg] = useState<string | null>(null);
  const [sentProtocol, setSentProtocol] = useState<string | null>(null);

  const [queueMode, setQueueMode] = useState<'FEFO' | 'LIFO'>('FEFO');

  const handleSimulateError = () => {
    setCid('');
    setIndicacao('');
    setCrm('');
    setSentProtocol(null);
    setBlockedMsg('Bloqueio Poka-Yoke: CID-10, Indicação e CRM obrigatórios.');
  };

  const handleSendValid = () => {
    const validCid = cid.trim() || 'R51';
    const validInd = indicacao.trim() || 'Cefaleia intensa há 10 dias.';
    const validCrm = crm.trim() || 'CRM-SP 118.432';
    setCid(validCid);
    setIndicacao(validInd);
    setCrm(validCrm);
    setBlockedMsg(null);

    const id = 'AUR-884';
    onInjectExam({
      id,
      paciente: paciente.trim() || 'Dona Helena Vasconcelos',
      exame,
      origem: 'Clínica externa',
      turno: 'Manhã',
      convenio: 'Bradesco',
      elapsedMinutes: 5,
      cid: validCid,
      indicacao: validInd,
      crm: validCrm,
      status: 'pendente',
      arrivalOrder: Date.now(),
    });
    setSentProtocol(id);
  };

  const pending = exams.filter((e) => e.status === 'pendente');
  const signedCount = exams.filter((e) => e.status === 'laudado').length;

  const sortedPending = [...pending].sort((a, b) =>
    queueMode === 'FEFO'
      ? b.elapsedMinutes - a.elapsedMinutes
      : b.arrivalOrder - a.arrivalOrder
  );

  const liveSla = Math.min(97.5, 86.5 + signedCount * 2.5);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Portal Clínica Horizonte (Poka-Yoke) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-7 flex flex-col justify-between">
          <div>
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Portal Clínica Horizonte (Poka-Yoke)
                </h2>
                <TermHelp label="Poka-Yoke?" onClick={() => onExplainTerm('poka-yoke')} />
              </div>
              <p className="text-xs text-slate-500">Validação digital na origem</p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    Paciente
                  </label>
                  <input
                    type="text"
                    value={paciente}
                    onChange={(e) => setPaciente(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    Exame
                  </label>
                  <select
                    value={exame}
                    onChange={(e) => setExame(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  >
                    <option value="TC Crânio">TC Crânio</option>
                    <option value="RM Lombar">RM Lombar</option>
                    <option value="USG Abdômen">USG Abdômen</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    CID-10 *
                  </label>
                  <input
                    type="text"
                    value={cid}
                    onChange={(e) => setCid(e.target.value)}
                    placeholder="Ex: R51"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    CRM *
                  </label>
                  <input
                    type="text"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    placeholder="CRM-SP 118.432"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Indicação Clínica *
                </label>
                <input
                  type="text"
                  value={indicacao}
                  onChange={(e) => setIndicacao(e.target.value)}
                  placeholder="Sintomas e hipótese diagnóstica"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {blockedMsg && (
              <div className="mt-4 rounded-xl border border-rose-300 bg-rose-50 px-3.5 py-2.5 flex items-center gap-2 text-xs font-semibold text-rose-800">
                <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />
                <span>{blockedMsg}</span>
              </div>
            )}

            {sentProtocol && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Protocolo {sentProtocol} enviado à fila ao lado.</span>
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSimulateError}
              className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
            >
              Simular Erro (Sem CID)
            </button>
            <button
              type="button"
              onClick={handleSendValid}
              className="rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              Enviar Pedido Válido
            </button>
          </div>
        </div>

        {/* Right: Fila Inteligente CDI (SLA 48h) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setQueueMode('LIFO')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      queueMode === 'LIFO'
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Fila Antiga (LIFO)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQueueMode('FEFO')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      queueMode === 'FEFO'
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Nova Fila (FEFO + Alertas)
                  </button>
                </div>
                <TermHelp
                  label="LIFO / FEFO?"
                  onClick={() => onExplainTerm(queueMode === 'LIFO' ? 'lifo' : 'fefo')}
                />
              </div>

              <div className="text-right">
                <span className="text-[11px] font-medium text-slate-400 mr-2">SLA 48h</span>
                <span className="font-mono text-lg font-bold text-emerald-600">
                  {liveSla.toFixed(1).replace('.', ',')}%
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              {sortedPending.map((ex) => {
                const isCritical = queueMode === 'FEFO' && ex.elapsedMinutes >= 42 * 60;
                const isWarning =
                  queueMode === 'FEFO' && ex.elapsedMinutes >= 36 * 60 && !isCritical;

                return (
                  <div
                    key={ex.id}
                    className={`rounded-xl border px-4 py-3 flex items-center justify-between gap-3 transition ${
                      isCritical
                        ? 'border-rose-400 bg-rose-50/70'
                        : isWarning
                        ? 'border-amber-300 bg-amber-50/50'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500">{ex.id}</span>
                        <span className="text-sm font-semibold text-slate-900 truncate">
                          {ex.paciente}
                        </span>
                        {isCritical && (
                          <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white">
                            CRÍTICO
                          </span>
                        )}
                        {ex.isReturnPriority && (
                          <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                            RETORNO
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {ex.exame} · {ex.origem} ({ex.turno})
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-xs font-bold ${
                          isCritical ? 'text-rose-600' : 'text-slate-600'
                        }`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        {formatElapsed(ex.elapsedMinutes)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onReleaseExam(ex.id)}
                        className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 transition"
                      >
                        Liberar Laudo
                      </button>
                    </div>
                  </div>
                );
              })}

              {sortedPending.length === 0 && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center text-xs font-semibold text-emerald-800">
                  Fila zerada dentro do SLA de 48h!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Discrete Footer Shortcuts */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="text-xs text-slate-400">
          Investimento: <strong className="text-slate-700">R$ 45.400</strong> (Payback = 1 multa de R$ 45.000)
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetDemo}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Resetar Demo
          </button>
          <button
            type="button"
            onClick={onOpenReplica}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition"
          >
            <ShieldQuestion className="h-3.5 w-3.5" />
            Tecla R · Réplica
          </button>
          <button
            type="button"
            onClick={onOpenQr}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition"
          >
            <QrCode className="h-3.5 w-3.5" />
            QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

