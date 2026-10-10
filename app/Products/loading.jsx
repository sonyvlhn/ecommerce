import ProductsView from "./ProductsView";

// Exibido enquanto os produtos são buscados no banco
export default function Loading() {
  return <ProductsView loading />;
}
