import { getProducts } from "@/lib/products";
import ProductsView from "./ProductsView";

// Os produtos vêm do banco a cada requisição (cadastro feito pelo Painel Admin)
export const dynamic = "force-dynamic";

export default async function Products() {
  const products = await getProducts();
  return <ProductsView products={products} />;
}
