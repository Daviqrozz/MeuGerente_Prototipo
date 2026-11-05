import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calcularFC,
  calcularIC,
  calcularPrecoUnitarioBase,
  calcularCustoIngrediente,
  calcularCustoPrato,
  calcularMargemContribuicao,
  calcularMargemPercentual,
  calcularPrecoRecomendado,
} from "../calculos.ts";
import type { Insumo, FichaTecnica, Canal } from "../dados.ts";

describe("Testes Obrigatórios de Cálculos - Meu Gerente Food", () => {
  /**
   * CASO DE TESTE OBRIGATÓRIO 1: Alface
   * R$ 12/kg comprado; 1 kg bruto → 800 g limpo → FC = 1,25.
   * Para 60 g limpos, consome 75 g comprados, custo R$ 0,90.
   */
  it("Caso 1 (Obrigatório): Alface com perda de limpeza (FC = 1,25) e porção limpa", () => {
    const insumoAlface: Insumo = {
      id: "teste-alface",
      nome: "Alface Americana",
      unidadeCompra: "kg",
      precoCompra: 12.0,
      tamanhoEmbalagem: 1, // 1 kg
      fornecedor: "Hortifruti Teste",
      dataAtualizacao: "2026-11-04",
      confirmadoPor: "Teste",
    };

    // Validação do FC: 1000g bruto -> 800g limpo
    const fc = calcularFC(1000, 800);
    assert.equal(fc, 1.25, "O FC deve ser exatamente 1.25 (1000 / 800)");

    // Preço por grama: 12 / 1000 = 0.012
    const precoBase = calcularPrecoUnitarioBase(insumoAlface);
    assert.equal(precoBase, 0.012, "Preço por grama de alface deve ser R$ 0,012");

    // Custo de 60g limpos
    const custo = calcularCustoIngrediente(insumoAlface, 60, "limpo", fc, 1.0);
    assert.equal(custo, 0.9, "60g de alface limpa com FC 1.25 deve custar exatamente R$ 0,90");
  });

  /**
   * CASO DE TESTE OBRIGATÓRIO 2: Frango
   * R$ 20/kg; 1 kg cru e limpo → 750 g cozido → IC = 0,75.
   * Para 150 g cozidos, precisa de 200 g crus, custo R$ 4,00 (se FC = 1).
   */
  it("Caso 2 (Obrigatório): Frango com perda de cocção (IC = 0,75) e porção pronta", () => {
    const insumoFrango: Insumo = {
      id: "teste-frango",
      nome: "Peito de Frango",
      unidadeCompra: "kg",
      precoCompra: 20.0,
      tamanhoEmbalagem: 1, // 1 kg
      fornecedor: "Avícola Teste",
      dataAtualizacao: "2026-11-04",
      confirmadoPor: "Teste",
    };

    // Validação do IC: 1000g limpo -> 750g cozido
    const ic = calcularIC(1000, 750);
    assert.equal(ic, 0.75, "O IC deve ser exatamente 0.75 (750 / 1000)");

    // Preço por grama: 20 / 1000 = 0.02
    const precoBase = calcularPrecoUnitarioBase(insumoFrango);
    assert.equal(precoBase, 0.02, "Preço por grama de frango deve ser R$ 0,02");

    // Custo de 150g pronto (cozido): precisa de 150 / 0.75 = 200g crus -> 200 * 0.02 = R$ 4,00
    const custo = calcularCustoIngrediente(insumoFrango, 150, "pronto", 1.0, ic);
    assert.equal(custo, 4.0, "150g de frango pronto com IC 0.75 deve custar exatamente R$ 4,00");
  });

  it("Caso 3: Ingrediente com ganho de água na cocção (IC > 1)", () => {
    // Ex: Arroz ou grão cru R$ 6,00/kg; 100g cru rende 250g cozido -> IC = 2.5
    const insumoArroz: Insumo = {
      id: "teste-arroz",
      nome: "Arroz Grão",
      unidadeCompra: "kg",
      precoCompra: 6.0,
      tamanhoEmbalagem: 1,
      fornecedor: "Distribuidora",
      dataAtualizacao: "2026-11-04",
      confirmadoPor: "Teste",
    };

    const ic = calcularIC(100, 250); // 2.5
    assert.equal(ic, 2.5);

    // Para 250g pronto, precisa de 250 / 2.5 = 100g cru -> 100 * 0.006 = R$ 0,60
    const custo = calcularCustoIngrediente(insumoArroz, 250, "pronto", 1.0, ic);
    assert.equal(custo, 0.6);
  });

  it("Caso 4: Cálculo de Custo da Ficha Técnica completa", () => {
    const insumos: Insumo[] = [
      {
        id: "pao",
        nome: "Pão Brioche",
        unidadeCompra: "un",
        precoCompra: 24.0,
        tamanhoEmbalagem: 12, // R$ 2,00 cada
        fornecedor: "Padaria",
        dataAtualizacao: "2026-11-04",
        confirmadoPor: "Teste",
      },
      {
        id: "carne",
        nome: "Carne Blend",
        unidadeCompra: "kg",
        precoCompra: 40.0,
        tamanhoEmbalagem: 1, // R$ 0,04/g
        fornecedor: "Açougue",
        dataAtualizacao: "2026-11-04",
        confirmadoPor: "Teste",
      },
      {
        id: "queijo",
        nome: "Cheddar",
        unidadeCompra: "kg",
        precoCompra: 50.0,
        tamanhoEmbalagem: 1, // R$ 0,05/g
        fornecedor: "Laticínio",
        dataAtualizacao: "2026-11-04",
        confirmadoPor: "Teste",
      },
    ];

    const ficha: FichaTecnica = {
      id: "x-burger",
      nomePrato: "X-Burger Teste",
      categoria: "Hambúrgueres",
      rendimento: 1,
      modoPreparo: "Montar pão, carne grelhada e queijo",
      ingredientes: [
        { insumoId: "pao", quantidade: 1, estadoMedida: "bruto" }, // R$ 2,00
        { insumoId: "carne", quantidade: 150, estadoMedida: "limpo", fc: 1.0 }, // 150 * 0.04 = R$ 6,00
        { insumoId: "queijo", quantidade: 40, estadoMedida: "limpo", fc: 1.0 }, // 40 * 0.05 = R$ 2,00
      ],
    };

    const custoTotal = calcularCustoPrato(ficha, insumos);
    assert.equal(custoTotal, 10.0, "Custo do prato deve ser R$ 10,00 (2 + 6 + 2)");
  });

  it("Caso 5: Margem de Contribuição por canal (Salão vs iFood)", () => {
    const custoPrato = 12.0;
    const precoVenda = 35.0;

    const canalSalao: Canal = {
      id: "salao",
      nome: "Salão",
      taxaPercentual: 0.0,
      taxaFixa: 0.0,
      desconto: 0.0,
    };

    const canalIfood: Canal = {
      id: "ifood",
      nome: "iFood",
      taxaPercentual: 0.23, // 23%
      taxaFixa: 1.5, // R$ 1,50
      desconto: 0.0,
    };

    // Salão: 35 - 12 = 23.00
    const margemSalao = calcularMargemContribuicao(precoVenda, custoPrato, canalSalao);
    assert.equal(margemSalao, 23.0);
    const pctSalao = calcularMargemPercentual(margemSalao, precoVenda);
    assert.equal(pctSalao, 65.71);

    // iFood: 35 - (35 * 0.23 = 8.05) - 1.50 - 12 = 35 - 8.05 - 1.50 - 12 = 13.45
    const margemIfood = calcularMargemContribuicao(precoVenda, custoPrato, canalIfood);
    assert.equal(margemIfood, 13.45);
    const pctIfood = calcularMargemPercentual(margemIfood, precoVenda);
    assert.equal(pctIfood, 38.43);
  });

  it("Caso 6: Preço Recomendado e Bloqueio se denominador <= 0", () => {
    const custoVariavel = 15.0;

    // Cenário viável: taxa 20%, margem alvo 30% -> denominador = 1 - 0.20 - 0.30 = 0.50
    // Preço recomendado = 15 / 0.50 = R$ 30,00
    const precoValido = calcularPrecoRecomendado(custoVariavel, 0.2, 0.3);
    assert.equal(precoValido, 30.0);

    // Cenário com percentuais em 0-100 (20 e 30)
    const precoValido100 = calcularPrecoRecomendado(custoVariavel, 20, 30);
    assert.equal(precoValido100, 30.0);

    // Cenário bloqueado: denominador = 1 - 0.70 - 0.30 = 0 -> deve retornar null
    const precoBloqueadoZero = calcularPrecoRecomendado(custoVariavel, 0.7, 0.3);
    assert.equal(precoBloqueadoZero, null, "Denominador zero deve retornar null");

    // Cenário bloqueado: denominador = 1 - 0.70 - 0.40 = -0.10 <= 0 -> deve retornar null
    const precoBloqueadoNegativo = calcularPrecoRecomendado(custoVariavel, 0.7, 0.4);
    assert.equal(precoBloqueadoNegativo, null, "Denominador negativo deve retornar null");
  });
});
