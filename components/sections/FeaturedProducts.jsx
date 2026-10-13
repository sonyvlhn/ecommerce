import { getProducts } from '@/lib/products';
import FeaturedProductsList from './FeaturedProductsList';

const FEATURED_LIMIT = 4;

// Busca só os produtos marcados como destaque ("emDestaque") e entrega para a lista (client)
export default async function FeaturedProducts() {
  const products = await getProducts({ featured: true, limit: FEATURED_LIMIT });
  return <FeaturedProductsList products={products} />;
}

export function FeaturedProductsFallback() {
  return <FeaturedProductsList loading />;
}
