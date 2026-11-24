import React from 'react';
import { SLIDES_META } from '../data/slidesConfig';
import { SlideId } from '../types/aurora';
import { Activity } from 'lucide-react';

interface SidebarProps {
  currentSlide: SlideId;
  onSelectSlide: (slide: SlideId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentSlide, onSelectSlide }) => {
  return (
    <aside className="w-60 shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between p-5">
      <div>
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-900">Aurora CDI Flow</div>
            <div className="text-[11px] text-slate-400">Consultoria N2</div>
          </div>
        </div>

        <nav className="space-y-1">
          {SLIDES_META.map((slide) => {
            const active = slide.id === currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => onSelectSlide(slide.id)}
                className={`w-full text-left rounded-xl px-3 py-2.5 transition flex items-center justify-between ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="text-xs font-semibold">{slide.shortTitle}</span>
                {slide.rubricBadge && (
                  <span
                    className={`text-[10px] ${
                      active ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {slide.rubricBadge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs">
        <div className="text-[11px] font-medium text-slate-500">Meta SLA 48h (90d)</div>
        <div className="mt-1 font-mono text-sm font-bold text-slate-900">86,5% → ≥ 96,5%</div>
      </div>
    </aside>
  );
};
