# PROPOSTA COMERCIAL DE CONSULTORIA E IMPLANTAÇÃO OPERACIONAL
**Projeto:** Aurora CDI Flow — Eliminação de Atrasos de Laudos (SLA ≤ 48h)  
**Cliente:** Centro Médico Aurora (Hospital 180 leitos · CDI ~3.500 exames/mês)  
**Horizonte do Contrato:** 90 dias (3 primeiros meses)  
**Orçamento Teto do Cliente:** R$ 50.000,00  
**Investimento Proposto:** **R$ 45.400,00** *(economia de R$ 4.600,00 no teto)*

---

## 1. Sumário Executivo & Diagnóstico
Entre 2025 e setembro de 2026, o índice de laudos liberados fora do prazo contratual de **48 horas** saltou de **3,1% para 13,5%** (480 atrasos em setembro; 1.140 no 3º trimestre), resultando em **multa de R$ 45.000,00**, aumento de quase 4x nas reclamações da ouvidoria e retenção de altas hospitalares.

A análise estatística da amostra oficial de **100 laudos atrasados** comprova que **70% do problema** decorre de apenas duas falhas operacionais — e **não de falta de capacidade médica** (os 5 radiologistas diurnos somam 60h/dia para ~118 exames/dia, menos de 2 exames/hora):

1. **Pedido médico incompleto (39% dos atrasos):** **79,5% (31/39)** têm origem em **Clínicas externas**, saltando de 6 casos em julho para 17 em setembro (**+183,3%**) após a entrada de 2 novas clínicas parceiras em agosto (+18% de volume externo).
2. **Fila de laudos sem prioridade / LIFO (31% dos atrasos):** **90,3% (28/31)** ocorrem no **turno da noite** e **48,4% (15/31)** na **Internação**, pois o sistema ordena os exames mais novos no topo e não possui alertas de vencimento nem passagem de plantão às 07h00.

---

## 2. Escopo da Solução (4 Frentes Integradas)

| Frente | Entregável | Prazo | Responsável | Investimento |
| :--- | :--- | :--- | :--- | ---: |
| **1. Portal Clínicas Parceiras (*Poka-Yoke*)** | Portal web padronizado com bloqueio automático na origem se faltar **CID-10**, **Indicação Clínica (≥ 15 caracteres)** ou **CRM/Assinatura**. | Semanas 1–4 | Fornecedor TI + Coord. CDI | **R$ 25.000,00** |
| **2. Fila Inteligente RIS/PACS (FEFO)** | Substituição da fila LIFO por **FEFO** (mais perto de 48h no topo), **alertas visuais em 36h e 42h** e tag de **Retorno Prioritário**. | Semanas 1–3 | Fornecedor RIS + Equipe CDI | **R$ 18.000,00** |
| **3. Treinamento Recepção (4h)** | Workshop prático para as **6 recepcionistas** (1 turma) sobre checklist de conferência D-1 e atendimento sem retrabalho. | Semana 2 | Instrutor + Sup. Juliana Prado | **R$ 2.400,00** |
| **4. Repasse Matinal às 07h00** | Protocolo diário de 10 minutos na troca de turno (`07h00–07h10`) para os 5 diurnos absorverem o estoque da madrugada. | Imediato (Dia 1) | Coord. Médico + Plantonista | **R$ 0,00** |
| **TOTAL DO PROJETO (3 MESES)** | — | **90 dias** | — | **R$ 45.400,00** |

---

## 3. Alternativa Analisada e Descartada
- **Contratação de 1 Radiologista adicional (R$ 42.000,00/mês com encargos):** Descartada. Custaria **R$ 126.000,00 nos 3 meses** (**+152% acima do teto aprovado** de R$ 50.000,00), sem resolver a entrada de pedidos incompletos das clínicas nem a ordenação LIFO da fila.

---

## 4. Resultados Esperados, Metas e Retorno (ROI)
- **Indicador Principal:** `% de laudos liberados no prazo de 48h`
  - **Linha de base (Set/2026):** `86,5%`
  - **Meta contratual (90 dias):** **`≥ 96,5%`** (medição **semanal** pelo Coordenador do CDI)
- **Redução de Risco (Matriz FMEA):**
  - Risco #1 — Fila LIFO e acúmulo noturno: **NPR 648 → 54 (-91,7%)**
  - Risco #2 — Pedido incompleto sem conferência: **NPR 576 → 32 (-94,4%)**
- **Payback Imediato:** O investimento total de **R$ 45.400,00** é integralmente pago ao evitar **1 única multa contratual (R$ 45.000,00)**, gerando economia adicional com redução de tempo de internação e retenção das clínicas parceiras.

---

## 5. Condições Comerciais
- **Pagamento:** À vista (R$ 45.400,00) ou parcelado em **3× de R$ 15.133,33** sem juros (Meses 1, 2 e 3, vinculadas às entregas e ao acompanhamento semanal de SLA).
- **Acompanhamento:** Meses 2 e 3 com medição semanal do SLA e suporte ao repasse das 07h00 sem custo adicional.
- **Validade da Proposta:** 15 dias úteis.

