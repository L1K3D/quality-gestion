import React from 'react';
import {
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
} from 'lucide-react';
import { SlideId } from '../types/aurora';
import { SLIDES_META } from '../data/slidesConfig';

interface TopBarProps {
  currentSlide: SlideId;
  onSelectSlide: (slide: SlideId) => void;
  stageMode: boolean;
  onToggleStageMode: () => void;
  secondsLeft: number;
  timerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onOpenGlossary: () => void;
  onOpenProposal: () => void;
}

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentSlide,
  onSelectSlide,
  stageMode,
  onToggleStageMode,
  secondsLeft,
  timerRunning,
  onToggleTimer,
  onResetTimer,
  onOpenGlossary,
  onOpenProposal,
}) => {
  const slideMeta = SLIDES_META.find((s) => s.id === currentSlide)!;

  const timerTone =
    secondsLeft <= 30
      ? 'text-rose-600 bg-rose-50 border-rose-200'
      : secondsLeft <= 120
      ? 'text-amber-700 bg-amber-50 border-amber-200'
      : 'text-slate-600 bg-white border-slate-200';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 py-3.5">
      <div className="flex items-center gap-3 min-w-0">
        <span className="font-mono text-xs font-semibold text-slate-400">
          {currentSlide}/6
        </span>
        <span className="h-4 w-px bg-slate-200" />
        <h1 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 truncate">
          {slideMeta.title}
        </h1>
        {slideMeta.rubricBadge && (
          <span className="hidden sm:inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
            {slideMeta.rubricBadge}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        {/* Discrete Prev / Next */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5">
          <button
            type="button"
            disabled={currentSlide === 1}
            onClick={() => onSelectSlide((currentSlide - 1) as SlideId)}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Anterior (←)"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={currentSlide === 6}
            onClick={() => onSelectSlide((currentSlide + 1) as SlideId)}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Próximo (→)"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Discrete 10:00 Timer (always accessible, highlighted in Stage Mode) */}
        <div
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-xs font-medium transition ${timerTone}`}
        >
          <span>{formatTime(secondsLeft)}</span>
          <button
            type="button"
            onClick={onToggleTimer}
            className="rounded p-0.5 hover:bg-slate-900/5 transition"
            title={timerRunning ? 'Pausar' : 'Iniciar'}
          >
            {timerRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <button
            type="button"
            onClick={onResetTimer}
            className="rounded p-0.5 hover:bg-slate-900/5 transition"
            title="Reiniciar 10:00"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenProposal}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          title="Abrir Proposta Comercial"
        >
          <FileText className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">Proposta</span>
        </button>

        <button
          type="button"
          onClick={onOpenGlossary}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          title="Contexto do Caso & Glossário (Tecla G)"
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Contexto & Glossário</span>
        </button>

        <button
          type="button"
          onClick={onToggleStageMode}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            stageMode
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          }`}
          title="Modo Palco (F11)"
        >
          {stageMode ? (
            <>
              <Minimize2 className="h-3.5 w-3.5" />
              <span>Sair Palco</span>
            </>
          ) : (
            <>
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Modo Palco (F11)</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
