import 'server-only';
import { query } from '@/lib/db';

// Imagem exibida quando o produto não tem "imagemUrl" cadastrada
const PLACEHOLDER_IMAGE = '/placeholder-product.svg';

// Converte a linha da tabela "Produtos" (colunas do Painel Admin, em português)
// para o formato consumido pelos componentes (Card, Quickview, filtros).
function toProduct(row) {
  return {
    id: row.id,
    name: row.nome,
    description: row.descricao,
    descriptionComplete: row.descricao,
    category: row.categoria,
    price: Number(row.preco),
    image: row.imagemUrl || PLACEHOLDER_IMAGE,
  };
}

/**
 * Lista os produtos com o nome da categoria.
 * @param {{ limit?: number }} [options] limite de registros (ex.: destaques da home)
 */
export async function getProducts({ limit } = {}) {
  const params = [];
  let sql = `
    SELECT p.id, p.nome, p.descricao, p.preco, p."imagemUrl", c.nome AS categoria
    FROM "Produtos" p
    JOIN "Categoria" c ON c.id = p."categoriaId"
    ORDER BY p."createdAt" DESC
  `;

  if (limit) {
    params.push(limit);
    sql += ` LIMIT $${params.length}`;
  }

  const { rows } = await query(sql, params);
  return rows.map(toProduct);
}
