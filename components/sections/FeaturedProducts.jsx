import { getProducts } from '@/lib/products';
import FeaturedProductsList from './FeaturedProductsList';

const FEATURED_LIMIT = 4;

// Busca os produtos em destaque no banco e entrega para a lista (client)
export default async function FeaturedProducts() {
  const products = await getProducts({ limit: FEATURED_LIMIT });
  return <FeaturedProductsList products={products} />;
}

export function FeaturedProductsFallback() {
  return <FeaturedProductsList loading />;
}
