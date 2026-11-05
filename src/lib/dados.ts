/**
 * Meu Gerente Food - Dados de Exemplo (Hamburgueria Fictícia Demo)
 * 
 * ATENÇÃO: Todos os dados neste arquivo são dados de exemplo para fins
 * de demonstração do sistema "Meu Gerente Food" e validação de cálculos.
 */

export const IS_DEMO = true;

export const DEMO_CONFIG = {
  nomeRestaurante: "Burger Craft Demo",
  segmento: "Hamburgueria Artesanal Independente",
  unidades: 2,
  periodoReferencia: "Novembro/2026",
  avisoLegal: "Dados simulados para demonstração comercial e prototipagem.",
} as const;

export type UnidadeCompra = "kg" | "g" | "L" | "ml" | "un";
export type EstadoMedida = "bruto" | "limpo" | "pronto";
export type StatusTarefa = "pendente" | "em_andamento" | "concluida";

export interface Insumo {
  id: string;
  nome: string;
  unidadeCompra: UnidadeCompra;
  precoCompra: number; // Preço pago na embalagem (em R$)
  tamanhoEmbalagem: number; // Quantidade de unidades ou peso/volume na embalagem
  fornecedor: string;
  dataAtualizacao: string; // YYYY-MM-DD
  confirmadoPor: string;
  categoria?: "proteina" | "panificacao" | "queijo" | "hortifruti" | "molho" | "embalagem" | "outros";
}

export interface IngredienteFicha {
  insumoId: string;
  quantidade: number; // Em gramas (kg/g), ml (L/ml) ou unidades (un)
  estadoMedida: EstadoMedida;
  fc?: number; // Fator de Correção (perda de limpeza: pesoBruto / pesoLimpo)
  ic?: number; // Índice de Cocção (rendimento de cocção: pesoPronto / pesoLimpo)
  observacao?: string;
}

export interface FichaTecnica {
  id: string;
  nomePrato: string;
  categoria: string;
  ingredientes: IngredienteFicha[];
  rendimento: number; // Quantidade de porções geradas pela receita
  modoPreparo: string;
}

export interface Canal {
  id: string;
  nome: string;
  taxaPercentual: number; // Percentual de comissão/taxa do canal (ex: 0.23 para 23% ou 23)
  taxaFixa: number; // Taxa fixa por transação em R$
  desconto: number; // Desconto médio concedido em R$
  descricao?: string;
}

export interface Tarefa {
  id: string;
  titulo: string;
  responsavel: string;
  prazo: string; // YYYY-MM-DD
  status: StatusTarefa;
  alertaOrigem: string;
  prioridade: "alta" | "media" | "baixa";
}

// ==========================================
// SEED: 18 Insumos Realistas
// ==========================================
export const INSUMOS_EXEMPLO: Insumo[] = [
  {
    id: "ins-01",
    nome: "Pão Brioche Artesanal",
    unidadeCompra: "un",
    precoCompra: 24.0,
    tamanhoEmbalagem: 12, // R$ 2,00 por pão
    fornecedor: "Padaria Bella Vista",
    dataAtualizacao: "2026-11-01",
    confirmadoPor: "Carlos (Compras)",
    categoria: "panificacao",
  },
  {
    id: "ins-02",
    nome: "Pão Australiano",
    unidadeCompra: "un",
    precoCompra: 27.0,
    tamanhoEmbalagem: 12, // R$ 2,25 por pão
    fornecedor: "Padaria Bella Vista",
    dataAtualizacao: "2026-11-01",
    confirmadoPor: "Carlos (Compras)",
    categoria: "panificacao",
  },
  {
    id: "ins-03",
    nome: "Blend Bovino (Peito e Fraldinha)",
    unidadeCompra: "kg",
    precoCompra: 38.0,
    tamanhoEmbalagem: 1, // R$ 38,00 / kg = R$ 0,038 / g
    fornecedor: "Frigorífico Boi Nobre",
    dataAtualizacao: "2026-11-03",
    confirmadoPor: "Mariana (Chefe de Cozinha)",
    categoria: "proteina",
  },
  {
    id: "ins-04",
    nome: "Peito de Frango Desossado",
    unidadeCompra: "kg",
    precoCompra: 20.0,
    tamanhoEmbalagem: 1, // R$ 20,00 / kg = R$ 0,020 / g
    fornecedor: "Avícola Central",
    dataAtualizacao: "2026-11-02",
    confirmadoPor: "Carlos (Compras)",
    categoria: "proteina",
  },
  {
    id: "ins-05",
    nome: "Bacon em Fatias Defumado",
    unidadeCompra: "kg",
    precoCompra: 42.0,
    tamanhoEmbalagem: 1, // R$ 42,00 / kg = R$ 0,042 / g
    fornecedor: "Frigorífico Boi Nobre",
    dataAtualizacao: "2026-11-01",
    confirmadoPor: "Mariana (Chefe de Cozinha)",
    categoria: "proteina",
  },
  {
    id: "ins-06",
    nome: "Queijo Cheddar Fatiado Especial",
    unidadeCompra: "kg",
    precoCompra: 48.0,
    tamanhoEmbalagem: 1, // R$ 48,00 / kg = R$ 0,048 / g
    fornecedor: "Laticínios da Serra",
    dataAtualizacao: "2026-11-03",
    confirmadoPor: "Mariana (Chefe de Cozinha)",
    categoria: "queijo",
  },
  {
    id: "ins-07",
    nome: "Queijo Mussarela Fatiado",
    unidadeCompra: "kg",
    precoCompra: 36.0,
    tamanhoEmbalagem: 1, // R$ 36,00 / kg = R$ 0,036 / g
    fornecedor: "Laticínios da Serra",
    dataAtualizacao: "2026-11-02",
    confirmadoPor: "Carlos (Compras)",
    categoria: "queijo",
  },
  {
    id: "ins-08",
    nome: "Alface Americana Fresca",
    unidadeCompra: "kg",
    precoCompra: 12.0,
    tamanhoEmbalagem: 1, // R$ 12,00 / kg = R$ 0,012 / g
    fornecedor: "Hortifruti Bom Jesus",
    dataAtualizacao: "2026-11-04",
    confirmadoPor: "Mariana (Chefe de Cozinha)",
    categoria: "hortifruti",
  },
  {
    id: "ins-09",
    nome: "Tomate Italiano",
    unidadeCompra: "kg",
    precoCompra: 8.5,
    tamanhoEmbalagem: 1, // R$ 8,50 / kg = R$ 0,0085 / g
    fornecedor: "Hortifruti Bom Jesus",
    dataAtualizacao: "2026-11-04",
    confirmadoPor: "Mariana (Chefe de Cozinha)",
    categoria: "hortifruti",
  },
  {
    id: "ins-10",
    nome: "Cebola Roxa",
    unidadeCompra: "kg",
    precoCompra: 7.0,
    tamanhoEmbalagem: 1, // R$ 7,00 / kg = R$ 0,007 / g
    fornecedor: "Hortifruti Bom Jesus",
    dataAtualizacao: "2026-10-30",
    confirmadoPor: "Carlos (Compras)",
    categoria: "hortifruti",
  },
  {
    id: "ins-11",
    nome: "Picles de Pepino Fatiado",
    unidadeCompra: "kg",
    precoCompra: 26.0,
    tamanhoEmbalagem: 2, // 2kg por R$ 26,00 = R$ 0,013 / g
    fornecedor: "Conservas do Sul",
    dataAtualizacao: "2026-10-28",
    confirmadoPor: "Carlos (Compras)",
    categoria: "hortifruti",
  },
  {
    id: "ins-12",
    nome: "Maionese Especial da Casa",
    unidadeCompra: "L",
    precoCompra: 30.0,
    tamanhoEmbalagem: 2, // 2L por R$ 30,00 = R$ 0,015 / ml
    fornecedor: "Produção Interna",
    dataAtualizacao: "2026-11-04",
    confirmadoPor: "Mariana (Chefe de Cozinha)",
    categoria: "molho",
  },
  {
    id: "ins-13",
    nome: "Molho Barbecue Artesanal",
    unidadeCompra: "L",
    precoCompra: 34.0,
    tamanhoEmbalagem: 2, // 2L por R$ 34,00 = R$ 0,017 / ml
    fornecedor: "Molhos & Sabores",
    dataAtualizacao: "2026-11-01",
    confirmadoPor: "Carlos (Compras)",
    categoria: "molho",
  },
  {
    id: "ins-14",
    nome: "Batata Palito Congelada Pré-Frita 9mm",
    unidadeCompra: "kg",
    precoCompra: 28.0,
    tamanhoEmbalagem: 2.5, // 2.5kg por R$ 28,00 = R$ 0,0112 / g
    fornecedor: "Distribuidora Congelados",
    dataAtualizacao: "2026-11-02",
    confirmadoPor: "Carlos (Compras)",
    categoria: "outros",
  },
  {
    id: "ins-15",
    nome: "Óleo Vegetal para Fritura",
    unidadeCompra: "L",
    precoCompra: 120.0,
    tamanhoEmbalagem: 18, // 18L por R$ 120,00 = R$ 0,00667 / ml
    fornecedor: "Distribuidora de Alimentos",
    dataAtualizacao: "2026-10-25",
    confirmadoPor: "Carlos (Compras)",
    categoria: "outros",
  },
  {
    id: "ins-16",
    nome: "Caixa Térmica Kraft para Hambúrguer",
    unidadeCompra: "un",
    precoCompra: 85.0,
    tamanhoEmbalagem: 100, // R$ 0,85 por caixa
    fornecedor: "Embalagens Express",
    dataAtualizacao: "2026-10-29",
    confirmadoPor: "Carlos (Compras)",
    categoria: "embalagem",
  },
  {
    id: "ins-17",
    nome: "Papel Acoplado Térmico para Lanche",
    unidadeCompra: "un",
    precoCompra: 45.0,
    tamanhoEmbalagem: 500, // R$ 0,09 por folha
    fornecedor: "Embalagens Express",
    dataAtualizacao: "2026-10-29",
    confirmadoPor: "Carlos (Compras)",
    categoria: "embalagem",
  },
  {
    id: "ins-18",
    nome: "Sacola Kraft Delivery Grande com Alça",
    unidadeCompra: "un",
    precoCompra: 120.0,
    tamanhoEmbalagem: 100, // R$ 1,20 por sacola
    fornecedor: "Embalagens Express",
    dataAtualizacao: "2026-10-29",
    confirmadoPor: "Carlos (Compras)",
    categoria: "embalagem",
  },
];

// ==========================================
// SEED: 4 Fichas Técnicas Detalhadas
// ==========================================
export const FICHAS_EXEMPLO: FichaTecnica[] = [
  {
    id: "ficha-01",
    nomePrato: "Cheeseburger Clássico",
    categoria: "Hambúrgueres",
    rendimento: 1,
    modoPreparo:
      "Selar o pão brioche com manteiga na chapa. Grelhar o blend bovino de 160g até ponto desejado (perda média 20%), cobrir com 2 fatias de queijo cheddar e abafar para derreter. Aplicar 20g de maionese especial na base do pão e montar.",
    ingredientes: [
      { insumoId: "ins-01", quantidade: 1, estadoMedida: "bruto" }, // Pão Brioche (1 un)
      { insumoId: "ins-03", quantidade: 160, estadoMedida: "limpo", fc: 1.0, ic: 0.8 }, // Blend 160g cru
      { insumoId: "ins-06", quantidade: 40, estadoMedida: "limpo", fc: 1.0, ic: 1.0 }, // Cheddar 40g
      { insumoId: "ins-12", quantidade: 20, estadoMedida: "limpo", fc: 1.0, ic: 1.0 }, // Maionese 20ml
      { insumoId: "ins-17", quantidade: 1, estadoMedida: "bruto" }, // Papel acoplado
    ],
  },
  {
    id: "ficha-02",
    nomePrato: "Burger Salada Especial",
    categoria: "Hambúrgueres",
    rendimento: 1,
    modoPreparo:
      "Tostar pão brioche. Grelhar blend bovino 160g com queijo cheddar derretido. Lavar e sanitizar a alface e cortar tomates. Montar na ordem: base do pão, maionese, alface limpa (60g), tomate fatiado (40g), hambúrguer com queijo e topo do pão.",
    ingredientes: [
      { insumoId: "ins-01", quantidade: 1, estadoMedida: "bruto" }, // Pão Brioche (1 un)
      { insumoId: "ins-03", quantidade: 160, estadoMedida: "limpo", fc: 1.0, ic: 0.8 }, // Blend 160g
      { insumoId: "ins-06", quantidade: 30, estadoMedida: "limpo", fc: 1.0, ic: 1.0 }, // Cheddar 30g
      // Caso de teste obrigatório da regra: Alface com FC = 1.25 (1kg bruto -> 800g limpo, 60g limpos = R$ 0,90)
      { insumoId: "ins-08", quantidade: 60, estadoMedida: "limpo", fc: 1.25, ic: 1.0, observacao: "60g limpos necessitam 75g comprados" },
      { insumoId: "ins-09", quantidade: 40, estadoMedida: "limpo", fc: 1.15, ic: 1.0 }, // Tomate
      { insumoId: "ins-10", quantidade: 15, estadoMedida: "limpo", fc: 1.2, ic: 1.0 }, // Cebola roxa
      { insumoId: "ins-12", quantidade: 20, estadoMedida: "limpo", fc: 1.0, ic: 1.0 }, // Maionese
      { insumoId: "ins-17", quantidade: 1, estadoMedida: "bruto" }, // Papel acoplado
    ],
  },
  {
    id: "ficha-03",
    nomePrato: "Chicken Crispy Burger",
    categoria: "Hambúrgueres",
    rendimento: 1,
    modoPreparo:
      "Empanar o filé de frango limpo e fritar em imersão até atingir 150g pronto e crocante. Tostar pão brioche, aplicar maionese especial generosa, alface e frango quente com mussarela derretida.",
    ingredientes: [
      { insumoId: "ins-01", quantidade: 1, estadoMedida: "bruto" }, // Pão Brioche
      // Caso de teste obrigatório da regra: Frango com IC = 0.75 (1kg cru -> 750g cozido, 150g cozidos necessitam 200g crus = R$ 4,00)
      { insumoId: "ins-04", quantidade: 150, estadoMedida: "pronto", fc: 1.0, ic: 0.75, observacao: "150g pronto necessitam 200g crus" },
      { insumoId: "ins-07", quantidade: 30, estadoMedida: "limpo", fc: 1.0, ic: 1.0 }, // Mussarela
      { insumoId: "ins-08", quantidade: 40, estadoMedida: "limpo", fc: 1.25, ic: 1.0 }, // Alface americana
      { insumoId: "ins-12", quantidade: 25, estadoMedida: "limpo", fc: 1.0, ic: 1.0 }, // Maionese especial
      { insumoId: "ins-17", quantidade: 1, estadoMedida: "bruto" }, // Papel acoplado
    ],
  },
  {
    id: "ficha-04",
    nomePrato: "Bacon Smash Duplo",
    categoria: "Hambúrgueres",
    rendimento: 1,
    modoPreparo:
      "Pressionar 2 bolas de 90g de blend na chapa bem quente para formar crosta (smash). Colocar 1 fatia de cheddar sobre cada carne. Adicionar fatias de bacon crocante frito, picles e molho barbecue.",
    ingredientes: [
      { insumoId: "ins-01", quantidade: 1, estadoMedida: "bruto" }, // Pão Brioche
      { insumoId: "ins-03", quantidade: 180, estadoMedida: "limpo", fc: 1.0, ic: 0.75 }, // 2x 90g smash
      { insumoId: "ins-06", quantidade: 40, estadoMedida: "limpo", fc: 1.0, ic: 1.0 }, // 2 fatias cheddar
      { insumoId: "ins-05", quantidade: 40, estadoMedida: "pronto", fc: 1.0, ic: 0.65 }, // Bacon pronto crocante
      { insumoId: "ins-11", quantidade: 20, estadoMedida: "limpo", fc: 1.0, ic: 1.0 }, // Picles pepino
      { insumoId: "ins-13", quantidade: 25, estadoMedida: "limpo", fc: 1.0, ic: 1.0 }, // Barbecue
      { insumoId: "ins-17", quantidade: 1, estadoMedida: "bruto" }, // Papel acoplado
    ],
  },
];

// ==========================================
// SEED: 3 Canais de Venda com Taxas Distintas
// ==========================================
export const CANAIS_EXEMPLO: Canal[] = [
  {
    id: "canal-salao",
    nome: "Salão (Consumo Local)",
    taxaPercentual: 0.0, // Sem comissão de canal (apenas recebimento no balcão)
    taxaFixa: 0.0,
    desconto: 0.0,
    descricao: "Venda direta no salão, sem taxa de intermediação de aplicativo",
  },
  {
    id: "canal-delivery-proprio",
    nome: "Delivery Próprio (WhatsApp / Cardápio Digital)",
    taxaPercentual: 0.035, // 3.5% taxa de gateway de pagamento online
    taxaFixa: 0.0,
    desconto: 0.0,
    descricao: "Pedidos recebidos direto pela loja com entrega própria",
  },
  {
    id: "canal-ifood",
    nome: "iFood (Marketplace + Logística)",
    taxaPercentual: 0.23, // 23% comissão de intermediação e entrega
    taxaFixa: 1.5, // R$ 1,50 taxa de transação financeira e serviço
    desconto: 0.0,
    descricao: "Canal marketplace de alto volume porém com forte retenção de margem",
  },
];

// ==========================================
// SEED: 4 Tarefas e Alertas Operacionais
// ==========================================
export const TAREFAS_EXEMPLO: Tarefa[] = [
  {
    id: "tar-01",
    titulo: "Renegociar peito de frango com Avícola Central (subiu 18% no pedido)",
    responsavel: "Carlos (Compras)",
    prazo: "2026-11-08",
    status: "pendente",
    alertaOrigem: "Aumento de preço de insumo acima da tolerância (+18%)",
    prioridade: "alta",
  },
  {
    id: "tar-02",
    titulo: "Verificar corte e limpeza de alface na praça fria (FC subiu para 1.35)",
    responsavel: "Mariana (Chefe de Cozinha)",
    prazo: "2026-11-06",
    status: "em_andamento",
    alertaOrigem: "Variação de Fator de Correção (desperdício de limpeza)",
    prioridade: "alta",
  },
  {
    id: "tar-03",
    titulo: "Ajustar preço de venda do Bacon Smash no iFood (margem atual em 16%, meta é 22%)",
    responsavel: "Roberto (Dono)",
    prazo: "2026-11-07",
    status: "pendente",
    alertaOrigem: "Margem de contribuição comprimida por taxas do canal iFood",
    prioridade: "media",
  },
  {
    id: "tar-04",
    titulo: "Treinar equipe matutina no porcionamento padrão do blend bovino",
    responsavel: "Mariana (Chefe de Cozinha)",
    prazo: "2026-11-05",
    status: "concluida",
    alertaOrigem: "Desvio na pesagem de porções identificado no fechamento semanal",
    prioridade: "baixa",
  },
];

