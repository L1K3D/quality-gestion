# Roteiro de Apresentação (10:00) — Aurora CDI Flow
**Integrantes:** Você (`[Seu Nome]`), Erikson, Heitor e William  
**Tempo Total:** 10 minutos (usar o cronômetro da plataforma em **Modo Palco · `F11`**)  
**Regra da Banca:** Todos devem saber explicar qualquer parte nas perguntas da Réplica Cruzada.

---

## Parte 1 — Você (`00:00 – 02:20` · ~2m20s)
**Telas:** Tela 1 (`A Crise em 4 Números`) e Tela 2 (`Fluxograma do Processo`)

### Tela 1 — A Crise em 4 Números (`00:00 – 01:15`)
- **Fala:**
  > "Bom dia/boa noite, banca e colegas. Nós somos a consultoria do caso **Centro Médico Aurora** — um hospital privado de 180 leitos cujo CDI realiza cerca de **3.500 exames por mês** com prazo contratual (**SLA**) de **48 horas**.
  >
  > Em 2025, apenas **3,1%** dos laudos atrasavam. Em setembro de 2026, esse índice saltou para **13,5%** — são 480 laudos atrasados só em setembro e 1.140 no trimestre. Isso já gerou uma **multa de R$ 45.000** do maior convênio, quase quadruplicou as reclamações na ouvidoria e coincidiu com a abertura de 2 novas clínicas parceiras em agosto, que elevaram os pedidos externos em **+18%**. Temos um orçamento aprovado de **R$ 50.000 para 3 meses**."
- **Ação na tela:** Clique em **"Testar Hipótese da Diretoria"**.
  > "A diretoria suspeitava que faltavam médicos. Mas ao testar a hipótese, vemos que os **5 radiologistas diurnos** somam **60 horas/dia** para ~**118 exames/dia** (menos de 2 exames/hora). Contratar mais 1 radiologista a **R$ 42 mil/mês** custaria **R$ 126.000 em 3 meses** — estourando o orçamento em **152%** sem resolver o problema."

### Tela 2 — Fluxograma do Processo (`01:15 – 02:20`)
- **Fala:**
  > "Para entender onde o processo trava, mapeamos as **7 etapas** do CDI no fluxograma padrão: do pedido até a liberação do laudo."
- **Ação na tela:** Clique nos pontos pulsantes das **Etapas 2, 5 e 6**.
  > "Identificamos 4 gargalos críticos:
  > 1. **Etapa 2 (Agendamento):** a recepção aceita pedidos incompletos sem conferir para não perder o paciente.
  > 2. **Etapa 4 (Exame):** eventuais repetições por falha técnica de imagem.
  > 3. **Etapa 5 (Fila LIFO):** o sistema exibe os exames **mais novos no topo**, sem nenhum alerta de SLA — enterrando os exames da madrugada.
  > 4. **Etapa 6 (Laudo):** quando falta CID, indicação ou CRM, o médico devolve à recepção e, ao retornar, o exame volta para o **fim da fila sem prioridade**.
  >
  > Passo a palavra para o **Erikson**, que vai mostrar o peso numérico de cada falha nos Paretos."

---

## Parte 2 — Erikson (`02:20 – 04:50` · ~2m30s)
**Tela:** Tela 3 (`Onde Está o Problema` — Folha de Verificação, Pareto Geral e Pareto Estratificado)

### Folha de Verificação & Pareto Geral (`02:20 – 03:35`)
- **Ação na tela:** Clique em **"Ver Tabela & Justificativa"** para mostrar a Folha de Verificação (100 registros) rapidamente, depois feche.
- **Fala:**
  > "Obrigado. Analisamos os **100 laudos atrasados** da base oficial do Excel na Folha de Verificação e montamos o **Pareto Geral**.
  >
  > Seguindo o princípio 80/20, apenas **duas causas concentram 70% de todos os atrasos**:
  > - **Pedido médico incompleto:** **39%** (39 casos);
  > - **Fila de laudos:** **31%** (31 casos).
  > As outras 4 causas — falha técnica (10%), erro de cadastro (8%), autorização pendente (7%) e erro de digitação (5%) — somam os outros 30%."

### Pareto Estratificado (`03:35 – 04:50`)
- **Fala:**
  > "Para atacar o maior problema (39%), estratificamos **Pedido médico incompleto** pela coluna **Origem do pedido** — visível no gráfico da direita.
  >
  > O resultado é contundente: **79,5% (31 de 39 casos)** vêm de **Clínicas externas**, contra apenas 15,4% do ambulatório e 5,1% da internação. E olhando a evolução mensal na base, os pedidos incompletos saltaram de **6 em julho** para **16 em agosto** e **17 em setembro** — um aumento de **+183%**, comprovando o impacto direto das duas novas clínicas abertas em agosto.
  >
  > Além disso, ao cruzar os 31 casos de **Fila de laudos**, **90,3% (28/31)** ocorrem no **turno da noite** e **48,4% (15/31)** são de **internação**. Passo para o **Heitor**, que vai detalhar as causas raízes e os riscos."

---

## Parte 3 — Heitor (`04:50 – 07:20` · ~2m30s)
**Telas:** Tela 4 (`Causa Raiz: Ishikawa 6M & 5 Porquês`) e Tela 5 — Bloco Esquerdo (`Matriz FMEA`)

### Tela 4 — Ishikawa 6M & 5 Porquês (`04:50 – 06:10`)
- **Fala (Aba 1: Pedido Incompleto - 39%):**
  > "Com base nos dados, aplicamos o **Ishikawa (6M)** e os **5 Porquês** nas duas falhas principais.
  >
  > Na **Falha #1 (Pedido Incompleto — 39%)**, vemos na espinha de peixe causas em Método (agendamento sem conferência), Material (papel e e-mail em formatos livres), Mão de obra (receio de recusar) e Máquina (ausência de trava digital). Descendo nos **5 Porquês**, chegamos à causa raiz acionável: **falta um portal eletrônico padronizado com bloqueio *Poka-Yoke* na origem**."
- **Ação na tela:** Clique na aba **"2. Fila de Laudos - 31%"**.
- **Fala (Aba 2: Fila de Laudos - 31%):**
  > "Na **Falha #2 (Fila de Laudos — 31%)**, a evidência mostra **90,3% no turno da noite** e **48,4% em internação**. À noite há apenas 1 radiologista priorizando o pronto-socorro. Quando os 5 diurnos chegam às 7h, pegam o topo da fila **LIFO** (os mais recentes), afundando os exames da madrugada sem nenhum alerta. A causa raiz é a **regra LIFO sem alertas de SLA + ausência de repasse formal às 07h00**."

### Tela 5 (Bloco Esquerdo) — Matriz FMEA Antes & Depois (`06:10 – 07:20`)
- **Ação na tela:** Avance para a Tela 5 e clique brevemente em **"Ver Matriz FMEA Completa (5 Falhas)"** para mostrar os 5 modos de falha, depois feche.
- **Fala:**
  > "Na **Matriz FMEA**, pontuamos de 1 a 10 Severidade, Ocorrência e Detecção dos 5 modos de falha do fluxograma (`NPR = S × O × D`).
  >
  > Os dois maiores riscos críticos são:
  > 1. **Fila LIFO sem alerta (Etapa 5):** NPR **648** (`9 × 8 × 9`). Com fila FEFO, repasse às 07h00 e alertas em 36h/42h, Ocorrência cai `8 → 3` e Detecção `9 → 2`, reduzindo o NPR para **54 (-91,7%)**.
  > 2. **Pedido incompleto aceito (Etapa 2):** NPR **576** (`8 × 9 × 8`). Com o bloqueio *Poka-Yoke* no portal, Ocorrência cai `9 → 2` e Detecção `8 → 2`, reduzindo o NPR para **32 (-94,4%)**.
  >
  > Passo para o **William**, que apresenta o plano de ação, orçamento e a solução rodando ao vivo."

---

## Parte 4 — William (`07:20 – 10:00` · ~2m40s)
**Telas:** Tela 5 — Bloco Direito (`5W2H & Orçamento`) e Tela 6 (`Solução Ao Vivo` + `Proposta`)

### Tela 5 (Bloco Direito) — Plano 5W2H, Orçamento & Meta (`07:20 – 08:25`)
- **Ação na tela:** Mostre os 4 cards (pode clicar em **"Ver cálculo →"** de 1 item ou em **"Memória de Cálculo"** / **"Tabela 5W2H Completa"** rapidamente).
- **Fala:**
  > "Nosso **Plano 5W2H** ataca exatamente as duas causas raízes dentro do teto de **R$ 50.000**:
  > 1. **Portal Eletrônico Clínicas (*Poka-Yoke*):** **R$ 25.000** (valor único);
  > 2. **Ajuste Sistema (Fila FEFO + Alertas 36h/42h + Prioridade Retorno):** **R$ 18.000** (valor único);
  > 3. **Treinamento Recepção (4h · 1 turma):** **R$ 2.400**;
  > 4. **Repasse Matinal às 07h00 (10 min/dia na troca de turno):** **R$ 0**.
  >
  > Total nos 3 meses: **R$ 45.400**, deixando **R$ 4.600 de folga** no teto — contra **R$ 126.000** da contratação descartada. Nossa meta de indicador é elevar o **% de laudos no prazo de 48h** de **86,5% para ≥ 96,5% em 90 dias**, com medição **semanal** pelo Coordenador do CDI."

### Tela 6 — Demonstração Ao Vivo (`08:25 – 10:00`)
- **Ação na tela (30 segundos):**
  1. Na esquerda (**Portal Clínica Horizonte**), clique em **"Simular Erro (Sem CID)"** → mostre a trava vermelha *Poka-Yoke*.
  2. Clique em **"Enviar Pedido Válido"** → mostre o protocolo `AUR-884` entrando na fila ao lado.
  3. Na direita (**Fila Inteligente CDI**), alterne de **"Fila Antiga (LIFO)"** para **"Nova Fila (FEFO + Alertas)"** → mostre o `#OC-005` (`44h 20m`) subindo para o topo em alerta crítico e clique em **"Liberar Laudo"** para mostrar o SLA subindo ao vivo.
- **Fala de Fechamento:**
  > "Na prática, o portal impede que pedidos incompletos entrem no hospital, e a fila FEFO garante que nenhum exame da madrugada estoure as 48h.
  >
  > Em resumo: nosso plano custa **R$ 45.400** (com opção de **3× de R$ 15.133,33** na proposta comercial), reduz os riscos críticos em **mais de 91%** e tem **payback imediato ao evitar apenas 1 multa de R$ 45.000**. Muito obrigado, estamos abertos às perguntas!"

---

## Cola Rápida para Perguntas da Banca (Todos os 4)
- **Se perguntarem sobre a hora da recepção no treinamento:** `6 recepcionistas × 4h × R$ 35/h = R$ 840` (dentro da jornada `7h–19h`). Mesmo somando, iria a `R$ 46.240` — ainda abaixo de `R$ 50.000`.
- **Se perguntarem o atalho de Réplica Cruzada:** Pressionar **`R`** na plataforma abre as 3 perguntas estratégicas contra concorrentes e os números-chave da base.

