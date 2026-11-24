import React from 'react';
import { X, ShieldQuestion, QrCode, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { REPLICA_CRUZADA } from '../data/slidesConfig';

interface ReplicaModalProps {
  open: boolean;
  onClose: () => void;
}

export const ReplicaModal: React.FC<ReplicaModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShieldQuestion className="h-5 w-5 text-slate-900" />
            <h2 className="text-base font-bold text-slate-900">
              Cola de Réplica Cruzada (Tecla R)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {REPLICA_CRUZADA.numerosChaveBanca.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="text-[11px] font-medium text-slate-500">{item.label}</div>
                <div className="mt-1 font-mono text-sm font-bold text-slate-900">
                  {item.valor}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {REPLICA_CRUZADA.perguntasConcorrentes.map((q) => (
              <div
                key={q.titulo}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <h3 className="text-sm font-bold text-slate-900">{q.titulo}</h3>
                <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">"{q.pergunta}"</p>
                <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  <strong className="text-slate-900">Contraponto:</strong> {q.armadilha}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface QrPlateiaModalProps {
  open: boolean;
  onClose: () => void;
}

export const QrPlateiaModal: React.FC<QrPlateiaModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?slide=6`
      : 'http://localhost:5173/?slide=6';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <QrCode className="h-4 w-4" />
            <span>QR Code — Teste Ao Vivo</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 mb-5">
          Escaneie para testar o Portal Clínica Horizonte no celular.
        </p>

        <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-4">
          <QRCodeSVG value={currentUrl} size={220} level="M" />
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-600 break-all">
          <Smartphone className="h-3.5 w-3.5 shrink-0" />
          <span>{currentUrl}</span>
        </div>
      </div>
    </div>
  );
};
