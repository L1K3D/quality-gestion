export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Ferramenta da Qualidade' | 'Operação & Fluxo' | 'Gestão & Negócio';
  definition: string;
  inPractice: string;
}

export const CASE_CONTEXT = {
  titulo: 'Contexto do Caso: Centro Médico Aurora',
  resumo:
    'O Centro Médico Aurora é um hospital privado de médio porte (180 leitos). Seu Centro de Diagnóstico por Imagem (CDI) realiza cerca de 3.500 exames/mês (Raio-X, Ultrassom, Tomografia e Ressonância) para pacientes internados, ambulatório e clínicas externas parceiras.',
  blocos: [
    {
      titulo: '1. O Gatilho da Crise (Agosto/2026)',
      texto:
        'O prazo contratual (SLA) para liberar laudos é de 48 horas. Em 2025, apenas 3,1% atrasavam. Em agosto de 2026, o hospital fechou parceria com 2 novas clínicas (+18% de pedidos externos) e o atraso disparou para 13,5% em setembro (480 laudos atrasados no mês).',
    },
    {
      titulo: '2. O Impacto Financeiro e Clínico',
      texto:
        'O maior convênio aplicou uma multa de R$ 45.000, as reclamações na ouvidoria quase quadruplicaram e pacientes internados estão ficando mais tempo no leito esperando laudo para receber alta.',
    },
    {
      titulo: '3. A Equipe e a Armadilha',
      texto:
        'O CDI tem 6 radiologistas (5 diurnos das 7h–19h e 1 noturno das 19h–7h), 14 técnicos e 6 recepcionistas. A diretoria suspeitava que faltavam médicos, mas 5 diurnos somam 60h/dia para ~118 exames/dia (< 2 exames/h). Contratar mais 1 médico custaria R$ 42 mil/mês (R$ 126 mil em 3 meses), estourando o orçamento.',
    },
    {
      titulo: '4. A Missão da Consultoria',
      texto:
        'Diagnosticar as causas reais com base nos 100 atrasos amostrados no Excel, priorizar os riscos e propor um plano de ação que caiba no orçamento aprovado de R$ 50.000 para os primeiros 3 meses.',
    },
  ],
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'sla',
    term: 'SLA (Acordo de Nível de Serviço)',
    category: 'Operação & Fluxo',
    definition:
      'Prazo máximo combinado com o cliente ou convênio para entregar um serviço dentro do padrão.',
    inPractice:
      'No Aurora, o SLA é de 48 horas após o exame. Estourar esse prazo gerou multa de R$ 45.000.',
  },
  {
    id: 'lifo',
    term: 'LIFO (Last-In, First-Out)',
    category: 'Operação & Fluxo',
    definition:
      'Regra de fila em que o último item a entrar é o primeiro a sair (mais recentes no topo).',
    inPractice:
      'Faz os exames feitos na madrugada (#OC-005) afundarem na lista conforme novos exames chegam de manhã.',
  },
  {
    id: 'fefo',
    term: 'FEFO (First-Expired, First-Out)',
    category: 'Operação & Fluxo',
    definition:
      'Regra de fila que prioriza quem está mais perto do vencimento do prazo.',
    inPractice:
      'Coloca exames com 36h–44h decorridas no topo da lista para serem laudados antes de estourar 48h.',
  },
  {
    id: 'poka-yoke',
    term: 'Poka-Yoke (À prova de erros)',
    category: 'Operação & Fluxo',
    definition:
      'Dispositivo ou trava simples que impede que um erro humano avance no processo.',
    inPractice:
      'No Portal da Clínica Horizonte, bloqueia o envio do pedido se faltar CID-10, indicação clínica ou CRM.',
  },
  {
    id: 'fluxograma',
    term: 'Fluxograma de Processo',
    category: 'Ferramenta da Qualidade',
    definition:
      'Mapa visual das etapas em sequência usando Oval (Início/Fim), Retângulo (Atividade) e Losango (Decisão Sim/Não).',
    inPractice:
      'Mapeia as 7 etapas do CDI e expõe onde o processo falha: Etapas 2, 4, 5 e 6.',
  },
  {
    id: 'folha-verificacao',
    term: 'Folha de Verificação',
    category: 'Ferramenta da Qualidade',
    definition:
      'Tabela estruturada para contar quantas vezes cada tipo de falha ocorreu em uma amostra.',
    inPractice:
      'Conta os 100 laudos atrasados do Excel por motivo, revelando a frequência e o % acumulado.',
  },
  {
    id: 'pareto',
    term: 'Gráfico de Pareto (Regra 80/20)',
    category: 'Ferramenta da Qualidade',
    definition:
      'Barras em ordem decrescente + linha de % acumulado para mostrar as poucas causas que geram a maior parte do problema.',
    inPractice:
      'Pedido incompleto (39%) + Fila de laudos (31%) somam 70% de todos os atrasos do Aurora.',
  },
  {
    id: 'pareto-estratificado',
    term: 'Pareto Estratificado',
    category: 'Ferramenta da Qualidade',
    definition:
      'Subdivisão ("zoom") da falha principal por outra variável (origem, turno, mês) para descobrir onde ela se concentra.',
    inPractice:
      'Ao dividir Pedido incompleto por Origem, vê-se que 79,5% (31/39) vêm das Clínicas externas.',
  },
  {
    id: 'ishikawa',
    term: 'Diagrama de Ishikawa (6M)',
    category: 'Ferramenta da Qualidade',
    definition:
      'Espinha de peixe que organiza as causas possíveis em 6 categorias: Método, Material, Mão de obra, Máquina, Medida e Meio ambiente.',
    inPractice:
      'Estrutura todas as causas por trás dos 39% de pedidos incompletos e dos 31% de retenção na fila.',
  },
  {
    id: '5-porques',
    term: 'Escada dos 5 Porquês',
    category: 'Ferramenta da Qualidade',
    definition:
      'Técnica de perguntar "por quê?" em sequência até sair do sintoma e achar a causa raiz acionável.',
    inPractice:
      'Mostra que o problema não é "falta de médicos", mas ausência de portal digital e de fila FEFO.',
  },
  {
    id: 'fmea',
    term: 'Matriz FMEA e NPR (S × O × D)',
    category: 'Ferramenta da Qualidade',
    definition:
      'Avalia riscos multiplicando Severidade (S), Ocorrência (O) e Detecção (D) de 1 a 10. O resultado é o NPR.',
    inPractice:
      'Prioriza os 2 maiores riscos (NPR 648 e 576) e comprova a queda para 54 (-91,7%) e 32 (-94,4%) após as ações.',
  },
  {
    id: '5w2h',
    term: 'Plano de Ação 5W2H',
    category: 'Ferramenta da Qualidade',
    definition:
      'Quadro executivo com 7 perguntas: O quê, Por quê, Onde, Quando, Quem, Como e Quanto custa.',
    inPractice:
      'Organiza as 4 ações da consultoria somando R$ 45.400 (dentro do teto de R$ 50.000).',
  },
  {
    id: 'payback',
    term: 'Payback',
    category: 'Gestão & Negócio',
    definition:
      'Tempo ou marco em que o retorno financeiro gerado pelo projeto empata com o investimento feito.',
    inPractice:
      'O plano custa R$ 45.400; evitar apenas 1 multa contratual (R$ 45.000) já paga o projeto.',
  },
  {
    id: 'replica',
    term: 'Réplica Cruzada',
    category: 'Gestão & Negócio',
    definition:
      'Etapa da disputa em que grupos concorrentes fazem perguntas entre si para testar a solidez dos dados e do orçamento.',
    inPractice:
      'Acessível pela tecla R com 3 perguntas estratégicas e números-chave da base.',
  },
];

