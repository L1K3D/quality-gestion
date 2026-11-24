export interface AuroraRecord {
  id: string;
  mes: string;
  turno: string;
  origem: string;
  tipoExame: string;
  motivo: string;
}

export interface ParetoGeralItem {
  motivo: string;
  count: number;
  percent: number;
  cumulativeCount: number;
  cumulativePercent: number;
}

export interface ParetoEstratificadoItem {
  origem: string;
  count: number;
  percent: number;
  cumulativeCount: number;
  cumulativePercent: number;
}

export interface EstratificadoCategoriaItem {
  categoria: string;
  count: number;
  percent: number;
  cumulativeCount: number;
  cumulativePercent: number;
}

export interface AuroraData {
  metadata: {
    totalRegistros: number;
    fonte: string;
    universoTrimestre: number;
  };
  paretoGeral: ParetoGeralItem[];
  paretoEstratificado: ParetoEstratificadoItem[];
  evidencias: {
    pedidoIncompleto: {
      total: number;
      clinicaExternaCount: number;
      clinicaExternaPct: number;
      evolucaoMensal: { mes: string; count: number }[];
      crescimentoJulSetPct: number;
    };
    filaLaudos: {
      total: number;
      noiteCount: number;
      noitePct: number;
      internacaoCount: number;
      internacaoPct: number;
    };
    oc005: AuroraRecord | null;
  };
  dimensoes: {
    origem: string[];
    turno: string[];
    mes: string[];
    tipoExame: string[];
  };
  estratificacoes: Record<
    string,
    {
      total: number;
      porOrigem: EstratificadoCategoriaItem[];
      porTurno: EstratificadoCategoriaItem[];
      porMes: EstratificadoCategoriaItem[];
      porTipoExame: EstratificadoCategoriaItem[];
    }
  >;
  registros: AuroraRecord[];
}

export interface QueueExam {
  id: string;
  paciente: string;
  exame: string;
  origem: 'Internação' | 'Ambulatório' | 'Clínica externa';
  turno: 'Noite' | 'Manhã' | 'Tarde';
  convenio: string;
  elapsedMinutes: number;
  isReturnPriority?: boolean;
  cid: string;
  indicacao: string;
  crm: string;
  status: 'pendente' | 'laudado';
  arrivalOrder: number;
}

export type SlideId = 1 | 2 | 3 | 4 | 5 | 6;

export interface SlideMeta {
  id: SlideId;
  shortTitle: string;
  title: string;
  rubricBadge?: string;
}
