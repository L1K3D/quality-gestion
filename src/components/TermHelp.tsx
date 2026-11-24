import React from 'react';
import { HelpCircle } from 'lucide-react';

interface TermHelpProps {
  label?: string;
  onClick: () => void;
}

export const TermHelp: React.FC<TermHelpProps> = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition"
      title="O que é isso?"
    >
      <HelpCircle className="h-3 w-3" />
      {label && <span>{label}</span>}
    </button>
  );
};

