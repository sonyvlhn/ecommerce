import 'server-only';
import { cache } from 'react';
import { query } from '@/lib/db';
import { calculateDiscount } from '@/lib/discount';

// Imagem exibida quando o produto não tem "imagemUrl" cadastrada
const PLACEHOLDER_IMAGE = '/placeholder-product.svg';

// As colunas de data são "timestamp without time zone" gravadas em UTC (Prisma).
// Convertidas para ISO com "Z" no próprio SQL para não depender do fuso do servidor.
const ISO_UTC = `'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'`;

// Galeria do produto (tabela "ProdutoImagem"), na ordem definida no Painel Admin
const GALLERY_ORDER = `ORDER BY i.ordem, i."createdAt"`;

// Imagem destaque: "imagemUrl" do produto ou, na falta dela, a primeira da galeria
const baseSelect = (extraColumns = '') => `
  SELECT
    p.id, p.nome, p.descricao, p.preco, p."descontoPorcentagem",
    COALESCE(
      p."imagemUrl",
      (SELECT i.url FROM "ProdutoImagem" i WHERE i."produtoId" = p.id ${GALLERY_ORDER} LIMIT 1)
    ) AS "imagemUrl",
    to_char(p."createdAt", ${ISO_UTC}) AS "createdAt",
    to_char(p."updatedAt", ${ISO_UTC}) AS "updatedAt",
    c.nome AS categoria,
    c.descricao AS "categoriaDescricao"${extraColumns}
  FROM "Produtos" p
  JOIN "Categoria" c ON c.id = p."categoriaId"
`;

// Destaque primeiro, seguida das demais imagens da galeria (sem repetir a destaque)
function buildGallery(featured, gallery = []) {
  const urls = [featured, ...gallery].filter(Boolean);
  const unique = [...new Set(urls)];
  return unique.length ? unique : [PLACEHOLDER_IMAGE];
}

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
  let sql = `${baseSelect()} ORDER BY p."createdAt" DESC`;

  if (limit) {
    params.push(limit);
    sql += ` LIMIT $${params.length}`;
  }

  const { rows } = await query(sql, params);
  return rows.map(toProduct);
}

/**
 * Busca um produto pelo id, incluindo a galeria de imagens. Retorna null se não existir.
 * Envolvido em `cache` para a página e o generateMetadata compartilharem a mesma consulta.
 */
export const getProductById = cache(async (id) => {
  const gallery = `,
    ARRAY(SELECT i.url FROM "ProdutoImagem" i WHERE i."produtoId" = p.id ${GALLERY_ORDER}) AS imagens`;
  const { rows } = await query(`${baseSelect(gallery)} WHERE p.id = $1`, [id]);
  if (!rows[0]) return null;

  return {
    ...toProduct(rows[0]),
    images: buildGallery(rows[0].imagemUrl, rows[0].imagens),
  };
});
