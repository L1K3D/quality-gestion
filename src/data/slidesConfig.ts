import { SlideMeta } from '../types/aurora';

export const SLIDES_META: SlideMeta[] = [
  {
    id: 1,
    shortTitle: '1. A Crise',
    title: 'A Crise em 4 Números',
    rubricBadge: 'Contexto',
  },
  {
    id: 2,
    shortTitle: '2. Fluxograma',
    title: 'Fluxograma do Processo CDI',
    rubricBadge: '10% da Nota',
  },
  {
    id: 3,
    shortTitle: '3. Paretos',
    title: 'Onde Está o Problema',
    rubricBadge: '15% da Nota',
  },
  {
    id: 4,
    shortTitle: '4. Causa Raiz',
    title: 'Ishikawa 6M & 5 Porquês',
    rubricBadge: '20% da Nota',
  },
  {
    id: 5,
    shortTitle: '5. Risco & Plano',
    title: 'FMEA, 5W2H & Orçamento',
    rubricBadge: '40% da Nota',
  },
  {
    id: 6,
    shortTitle: '6. Solução Ao Vivo',
    title: 'Portal Poka-Yoke & Fila FEFO',
    rubricBadge: 'Demo 40s',
  },
];

export const REPLICA_CRUZADA = {
  perguntasConcorrentes: [
    {
      titulo: '1. Capacidade vs. Retrabalho',
      pergunta:
        'Se propuseram contratar mais um radiologista (R$ 42 mil/mês), como explicam o estoque se 5 diurnos já somam 60h/dia para ~118 exames/dia (< 2 exames/h) e o teto é R$ 50 mil para 3 meses?',
      armadilha: 'Estoura o orçamento em 152% (R$ 126 mil/trimestre) sem eliminar os 39% de retrabalho.',
    },
    {
      titulo: '2. Evidência Estratificada',
      pergunta:
        'Qual coluna da base estratifica a falha #1 e comprova o impacto das 2 novas clínicas abertas em agosto?',
      armadilha: 'Origem do pedido: Clínica externa = 31/39 (79,5%), saltando de 6 (Jul) → 16 (Ago) → 17 (Set).',
    },
    {
      titulo: '3. Fila Noturna e Retornos',
      pergunta:
        'Como garantem que um exame da madrugada (#OC-005) ou um retorno regularizado não afunde na fila LIFO?',
      armadilha: 'Troca de LIFO para FEFO + alertas 36h/42h + tag de retorno + repasse às 07h00.',
    },
  ],
  numerosChaveBanca: [
    { label: 'Atraso 2025 → Set/26', valor: '3,1% → 13,5%' },
    { label: 'Pareto Top 2', valor: '39% + 31% = 70%' },
    { label: 'Clínica Externa (Incompleto)', valor: '31/39 (79,5%)' },
    { label: 'Noite / Internação (Fila)', valor: '90,3% / 48,4%' },
    { label: 'Redução FMEA Top 2', valor: '648→54 · 576→32' },
    { label: 'Orçamento & Payback', valor: 'R$ 45.400 / 1 multa' },
  ],
};
