import React, { useState, useEffect } from 'react';
import { X, BookOpen, Building2 } from 'lucide-react';
import { CASE_CONTEXT, GLOSSARY_TERMS } from '../data/glossaryData';

interface GlossaryDrawerProps {
  open: boolean;
  initialTab?: 'contexto' | 'glossario';
  highlightTermId?: string | null;
  onClose: () => void;
}

export const GlossaryDrawer: React.FC<GlossaryDrawerProps> = ({
  open,
  initialTab = 'contexto',
  highlightTermId = null,
  onClose,
}) => {
  const [tab, setTab] = useState<'contexto' | 'glossario'>(initialTab);

  useEffect(() => {
    if (open) {
      setTab(initialTab);
    }
  }, [open, initialTab]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl h-full overflow-y-auto bg-white p-7 shadow-2xl border-l border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setTab('contexto')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                tab === 'contexto' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              Contexto do Caso
            </button>
            <button
              type="button"
              onClick={() => setTab('glossario')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                tab === 'glossario' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Glossário Técnico
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {tab === 'contexto' ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">{CASE_CONTEXT.titulo}</h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                {CASE_CONTEXT.resumo}
              </p>
            </div>

            <div className="space-y-3">
              {CASE_CONTEXT.blocos.map((b) => (
                <div
                  key={b.titulo}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="text-xs font-bold text-slate-900">{b.titulo}</div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{b.texto}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {GLOSSARY_TERMS.map((item) => {
              const isHighlighted = highlightTermId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 transition ${
                    isHighlighted
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-200'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{item.term}</h4>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                    {item.definition}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    <strong className="text-slate-700">No Aurora:</strong> {item.inPractice}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

