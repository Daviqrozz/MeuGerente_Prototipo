/**
 * Meu Gerente Food - Biblioteca de Cálculos Financeiros e Operacionais
 * 
 * Regras estritas:
 * - Funções puras e determinísticas.
 * - TypeScript estrito sem 'any'.
 * - FC (Fator de Correção): pesoBruto / pesoLimpo (perda de limpeza).
 * - IC (Índice de Cocção): pesoPronto / pesoLimpo (perda ou ganho no cozimento).
 * - Nunca confundir margem de contribuição com lucro líquido.
 */

import type { Insumo, FichaTecnica, Canal, EstadoMedida } from "./dados.ts";

/**
 * Calcula o Fator de Correção (FC)
 * FC = peso_bruto / peso_limpo
 * Capta a perda na limpeza do alimento (ex: talos, cascas, aparas).
 * Se pesoLimpo <= 0, retorna 0 para evitar divisão por zero.
 */
export function calcularFC(pesoBruto: number, pesoLimpo: number): number {
  if (pesoLimpo <= 0) return 0;
  return Number((pesoBruto / pesoLimpo).toFixed(4));
}

/**
 * Calcula o Índice de Cocção (IC)
 * IC = peso_pronto / peso_limpo
 * Capta a variação de peso durante o cozimento (perda de água/gordura ou hidratação).
 * Se pesoLimpo <= 0, retorna 0 para evitar divisão por zero.
 */
export function calcularIC(pesoLimpo: number, pesoPronto: number): number {
  if (pesoLimpo <= 0) return 0;
  return Number((pesoPronto / pesoLimpo).toFixed(4));
}

/**
 * Calcula o custo unitário base de um insumo por unidade de receita.
 * - 'kg' -> R$ por grama
 * - 'g'  -> R$ por grama
 * - 'L'  -> R$ por mililitro (ml)
 * - 'ml' -> R$ por mililitro (ml)
 * - 'un' -> R$ por unidade
 */
export function calcularPrecoUnitarioBase(insumo: Insumo): number {
  if (!insumo || insumo.tamanhoEmbalagem <= 0) return 0;

  switch (insumo.unidadeCompra) {
    case "kg":
      // Preço pago dividido pelo peso total em gramas (1kg = 1000g)
      return insumo.precoCompra / (insumo.tamanhoEmbalagem * 1000);
    case "g":
      return insumo.precoCompra / insumo.tamanhoEmbalagem;
    case "L":
      // Preço pago dividido pelo volume total em ml (1L = 1000ml)
      return insumo.precoCompra / (insumo.tamanhoEmbalagem * 1000);
    case "ml":
      return insumo.precoCompra / insumo.tamanhoEmbalagem;
    case "un":
      return insumo.precoCompra / insumo.tamanhoEmbalagem;
    default:
      return insumo.precoCompra / insumo.tamanhoEmbalagem;
  }
}

/**
 * Calcula o custo de um ingrediente na receita aplicando FC e IC conforme o estado da medida:
 * 
 * Se a receita especifica porção PRONTA:
 *   peso_limpo_necessario = peso_pronto_desejado / IC
 *   peso_bruto_a_comprar = peso_limpo_necessario * FC
 *   custo_do_ingrediente = peso_bruto_a_comprar * preco_por_grama_comprada
 * 
 * Se a receita especifica porção LIMPA E CRUA:
 *   peso_bruto_a_comprar = peso_limpo_desejado * FC
 *   custo = peso_bruto_a_comprar * preco_por_grama_comprada
 * 
 * Se a receita especifica porção BRUTA:
 *   custo = peso_bruto * preco_por_grama_comprada
 */
export function calcularCustoIngrediente(
  insumo: Insumo,
  quantidade: number,
  estadoMedida: EstadoMedida,
  fc: number = 1.0,
  ic: number = 1.0
): number {
  if (!insumo || quantidade <= 0) return 0;

  const precoUnitarioBase = calcularPrecoUnitarioBase(insumo);
  const fcEfetivo = fc > 0 ? fc : 1.0;
  const icEfetivo = ic > 0 ? ic : 1.0;

  let pesoBrutoAComprar: number;

  switch (estadoMedida) {
    case "pronto": {
      const pesoLimpoNecessario = quantidade / icEfetivo;
      pesoBrutoAComprar = pesoLimpoNecessario * fcEfetivo;
      break;
    }
    case "limpo": {
      pesoBrutoAComprar = quantidade * fcEfetivo;
      break;
    }
    case "bruto":
    default: {
      pesoBrutoAComprar = quantidade;
      break;
    }
  }

  const custo = pesoBrutoAComprar * precoUnitarioBase;
  // Arredonda para 4 casas decimais para evitar erros de ponto flutuante,
  // mantendo precisão para somatórios
  return Number(custo.toFixed(4));
}

/**
 * Calcula o custo total dos ingredientes de uma Ficha Técnica por porção.
 * custoPorPorcao = somaDosIngredientes / rendimento
 */
export function calcularCustoPrato(
  ficha: FichaTecnica,
  insumos: Insumo[] | Record<string, Insumo>
): number {
  if (!ficha || !ficha.ingredientes || ficha.ingredientes.length === 0) return 0;

  const insumosMap: Record<string, Insumo> = Array.isArray(insumos)
    ? Object.fromEntries(insumos.map((i) => [i.id, i]))
    : insumos;

  const custoTotal = ficha.ingredientes.reduce((acumulado, ing) => {
    const insumo = insumosMap[ing.insumoId];
    if (!insumo) return acumulado;

    const custoIngrediente = calcularCustoIngrediente(
      insumo,
      ing.quantidade,
      ing.estadoMedida,
      ing.fc ?? 1.0,
      ing.ic ?? 1.0
    );

    return acumulado + custoIngrediente;
  }, 0);

  const rendimento = ficha.rendimento > 0 ? ficha.rendimento : 1;
  return Number((custoTotal / rendimento).toFixed(2));
}

/**
 * Calcula a Margem de Contribuição em R$ para um determinado preço, custo e canal:
 * Margem (R$) = Preço - Desconto - Comissões/Taxas - Custo do Prato
 * 
 * Regra: Margem de contribuição NUNCA deve ser chamada de lucro líquido,
 * pois custos fixos (aluguel, folha, luz) ainda precisam ser cobertos.
 */
export function calcularMargemContribuicao(
  preco: number,
  custoPrato: number,
  canal?: Canal
): number {
  if (!canal) {
    return Number((preco - custoPrato).toFixed(2));
  }

  // Normaliza taxa percentual: se fornecida em 0-100 (ex: 23), converte para decimal (0.23)
  const taxaPctDecimal = canal.taxaPercentual > 1
    ? canal.taxaPercentual / 100
    : canal.taxaPercentual;

  const taxaComissao = preco * taxaPctDecimal;
  const taxaFixa = canal.taxaFixa ?? 0;
  const desconto = canal.desconto ?? 0;

  const margem = preco - desconto - taxaComissao - taxaFixa - custoPrato;
  return Number(margem.toFixed(2));
}

/**
 * Calcula a Margem Percentual de contribuição sobre o preço efetivo:
 * Margem % = (Margem em R$ / Preço Efetivo) * 100
 */
export function calcularMargemPercentual(
  margemContribuicao: number,
  precoEfetivo: number
): number {
  if (precoEfetivo <= 0) return 0;
  return Number(((margemContribuicao / precoEfetivo) * 100).toFixed(2));
}

/**
 * Calcula o Preço de Venda Recomendado para atingir uma margem alvo:
 * Fórmula:
 *   Preço = custo_variavel_em_R$ / (1 - taxa_percentual_total - margem_alvo_percentual)
 * 
 * Retorna null se denominador <= 0 (impossibilidade matemática ou taxas inviáveis).
 */
export function calcularPrecoRecomendado(
  custoVariavel: number,
  taxaPercentualTotal: number,
  margemAlvo: number
): number | null {
  // Converte para escala decimal se valores vierem no formato 0-100 (ex: 23% vira 0.23)
  const taxaDecimal = taxaPercentualTotal > 1
    ? taxaPercentualTotal / 100
    : taxaPercentualTotal;

  const margemDecimal = margemAlvo > 1
    ? margemAlvo / 100
    : margemAlvo;

  const denominador = Number((1 - taxaDecimal - margemDecimal).toFixed(6));

  // Bloqueio obrigatório se denominador <= 0
  if (denominador <= 0) {
    return null;
  }

  const preco = custoVariavel / denominador;
  return Number(preco.toFixed(2));
}
