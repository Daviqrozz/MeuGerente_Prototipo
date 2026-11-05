# Regra de Projeto — Meu Gerente Food (Protótipo)

## Contexto

Você está ajudando a construir um **protótipo visual e funcional** de um sistema de gestão financeira e operacional para restaurantes, com foco em hamburguerias independentes (1 a 3 lojas). O objetivo é uma demonstração de 5 a 10 minutos para os primeiros clientes, com meta de entrega em até 1 semana.

O produto se chama provisoriamente **"Meu Gerente"** ou **"Meu Gerente Food"** (nome a validar). Não é um cardápio digital nem um ERP gigante: é um **gerente financeiro operacional** que mostra onde o lucro escapa e sugere ações.

## Stack obrigatória

- **Next.js 14+ (App Router) + TypeScript**
- **Tailwind CSS** para estilo
- **shadcn/ui** para componentes de interface
- **Lucide React** para ícones
- **Recharts** para gráficos
- **Dados de exemplo em arquivo TS** (`src/lib/dados.ts`), sem banco de dados nesta fase
- **Zod** para validação de formulários, se necessário
- 
- **Deploy na Vercel**

Não usar: Django, banco de dados real, autenticação, integração com iFood/Saipos/Cardápio Web, WhatsApp oficial, OCR, Open Finance ou IA treinada nesta fase.

## Princípios de código

1. **Cálculos em funções puras.** Toda lógica de FC, IC, custo, margem e preço deve ficar em `src/lib/calculos.ts`, separada dos componentes. Nada de cálculo dentro de JSX.
2. **TypeScript estrito.** Tipar todos os dados, funções e props. Sem `any`.
3. **Componentes pequenos e reutilizáveis.** Um componente por responsabilidade.
4. **Dados de exemplo sempre marcados como "demo".** Toda tela deve deixar claro que os números são fictícios.
5. **Nada de LLM como calculadora.** Toda conta é determinística, em código TypeScript puro.
6. **Português simples na interface.** Evitar jargão: "CMV" vira "quanto custa fazer cada lanche"; "ruptura" vira "ficar sem ingrediente"; "dashboard" vira "resumo do dia".

## Escopo da demo (P0)

Construir apenas estas telas/fluxos:

1. **Dashboard** — 3 a 5 informações: vendas do dia, margem estimada, maior problema, tarefas urgentes, pedidos atrasados (só se houver dado).
2. **Insumos** — cadastro com nome, unidade, preço, embalagem, fornecedor, data e quem cadastrou.
3. **Ficha técnica** — peso bruto (PB), peso limpo (PL), peso pronto (PP), FC, IC, custo por porção.
4. **Margem por canal** — salão, delivery próprio, iFood, com taxas e descontos separados.
5. **Calculadora de preço** — preço sugerido por objetivo de margem, com bloqueio se o denominador for ≤ 0.
6. **Tarefas e alertas** — responsável, prazo, status, histórico.
7. **WhatsApp simulado** — 5 perguntas-modelo com respostas baseadas nos dados de exemplo, sem envio real.

## Fórmulas obrigatórias

```
FC = peso_bruto / peso_limpo
IC = peso_pronto / peso_limpo

Se a receita especifica porção PRONTA:
  peso_limpo_necessario = peso_pronto_desejado / IC
  peso_bruto_a_comprar = peso_limpo_necessario * FC
  custo_do_ingrediente = peso_bruto_a_comprar * preco_por_grama_comprada

Se a receita especifica porção LIMPA E CRUA:
  peso_bruto_a_comprar = peso_limpo_desejado * FC

Se a receita especifica porção BRUTA:
  custo = peso_bruto * preco_por_grama_comprada

Margem de contribuição (R$) =
  preço líquido − insumos − embalagem − taxas/comissões − impostos − outros custos variáveis

Margem percentual = margem de contribuição / preço efetivamente recebido

Preço recomendado =
  custo_variavel_em_R$ / (1 − taxa_percentual_total − margem_alvo_percentual)
  (bloquear se denominador ≤ 0)
```

## Regras de negócio

- **Nunca** chamar margem de contribuição de "lucro líquido". Aluguel, despesas fixas e parte da folha ainda precisam ser cobertos.
- **FC e IC são distintos.** FC capta perda na limpeza; IC capta perda/ganho no cozimento. Não aplicar os dois como se fossem a mesma coisa.
- **Não aplicar FC/IC duas vezes** na mesma receita.
- **Sem dado, não inventar.** Se faltar informação (ex: tempo de preparo sem integração), mostrar "não medido".
- **Todo alerta vira tarefa** com responsável, prazo e possibilidade de marcar como concluído.
- **Distinguir dado real, estimativa e demonstração** em toda tela.

## Estrutura de pastas

```
src/
  app/
    page.tsx              → dashboard
    insumos/page.tsx      → cadastro de insumos
    fichas/page.tsx       → ficha técnica com FC/IC
    margem/page.tsx       → margem por canal
    calculadora/page.tsx  → precificação
    tarefas/page.tsx      → alertas e tarefas
    whatsapp/page.tsx     → agente simulado
  lib/
    calculos.ts           → funções puras de FC, IC, custo, margem
    dados.ts              → seed da hamburgueria fictícia
  components/
    Card.tsx, Tabela.tsx, Botao.tsx, etc.
```

## Critérios de aceite da demo

1. Ficha técnica calcula corretamente uma porção com perda de limpeza (FC > 1), uma com perda de cocção (IC < 1) e uma com ganho de água (IC > 1).
2. Ao alterar o preço de compra do frango, custo do prato, margem e alerta atualizam automaticamente.
3. Canais com diferentes taxas geram margens diferentes.
4. O dono entende a situação no dashboard em até 2 minutos.
5. Nenhuma tela confunde margem com lucro líquido.
6. O agente simulado não inventa dados que não existem.
7. Todo alerta tem ação, responsável e prazo.

## Exemplos de teste obrigatórios

- **Alface:** R$ 12/kg comprado; 1 kg bruto → 800 g limpo → FC = 1,25. Para 60 g limpos, consome 75 g comprados, custo R$ 0,90.
- **Frango:** R$ 20/kg; 1 kg cru e limpo → 750 g cozido → IC = 0,75. Para 150 g cozidos, precisa de 200 g crus, custo R$ 4,00 (se FC = 1).

Esses dois casos devem passar nos testes antes de qualquer entrega.

## O que NÃO fazer

- Não criar autenticação, multi-tenancy ou permissões.
- Não integrar API real de iFood, Saipos, Cardápio Web ou WhatsApp.
- Não usar IA/LLM para calcular nada.
- Não prometer "análise inteligente" sem deixar claro que é regra simples, não algoritmo treinado.
- Não adicionar função que aumente trabalho de cadastro sem retorno claro para o dono.
- Não usar banco de dados nesta fase.
