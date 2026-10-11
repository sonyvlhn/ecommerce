import 'server-only';
import { cache } from 'react';
import { query } from '@/lib/db';
import { calculateDiscount } from '@/lib/discount';

// Imagem exibida quando o produto não tem "imagemUrl" cadastrada
const PLACEHOLDER_IMAGE = '/placeholder-product.svg';

// As colunas de data são "timestamp without time zone" gravadas em UTC (Prisma).
// Convertidas para ISO com "Z" no próprio SQL para não depender do fuso do servidor.
const ISO_UTC = `'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'`;

const BASE_SELECT = `
  SELECT
    p.id, p.nome, p.descricao, p.preco, p."descontoPorcentagem", p."imagemUrl",
    to_char(p."createdAt", ${ISO_UTC}) AS "createdAt",
    to_char(p."updatedAt", ${ISO_UTC}) AS "updatedAt",
    c.nome AS categoria,
    c.descricao AS "categoriaDescricao"
  FROM "Produtos" p
  JOIN "Categoria" c ON c.id = p."categoriaId"
`;

// Converte a linha da tabela "Produtos" (colunas do Painel Admin, em português)
// para o formato consumido pelos componentes (Card, Quickview, filtros, página do produto).
function toProduct(row) {
  const discount = calculateDiscount(Number(row.preco), Number(row.descontoPorcentagem));

  return {
    id: row.id,
    name: row.nome,
    description: row.descricao,
    descriptionComplete: row.descricao,
    category: row.categoria,
    categoryDescription: row.categoriaDescricao,
    price: discount.originalPrice,
    discountPercent: discount.discountPercent,
    discountAmount: discount.discountAmount,
    finalPrice: discount.finalPrice,
    hasDiscount: discount.hasDiscount,
    image: row.imagemUrl || PLACEHOLDER_IMAGE,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Lista os produtos com o nome da categoria.
 * @param {{ limit?: number }} [options] limite de registros (ex.: destaques da home)
 */
export async function getProducts({ limit } = {}) {
  const params = [];
  let sql = `${BASE_SELECT} ORDER BY p."createdAt" DESC`;

  if (limit) {
    params.push(limit);
    sql += ` LIMIT $${params.length}`;
  }

  const { rows } = await query(sql, params);
  return rows.map(toProduct);
}

/**
 * Busca um produto pelo id. Retorna null se não existir.
 * Envolvido em `cache` para a página e o generateMetadata compartilharem a mesma consulta.
 */
export const getProductById = cache(async (id) => {
  const { rows } = await query(`${BASE_SELECT} WHERE p.id = $1`, [id]);
  return rows[0] ? toProduct(rows[0]) : null;
});
