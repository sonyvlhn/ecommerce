import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import ProductCarousel from "@/components/ui/ProductCarousel";

// Dados vêm do banco a cada requisição (cadastro feito pelo Painel Admin)
export const dynamic = "force-dynamic";

const formatPrice = (value) => `R$ ${value.toFixed(2)}`;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});
const formatDate = (iso) => dateFormatter.format(new Date(iso));

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Produto não encontrado" };
  return { title: `${product.name} | Ecommerce`, description: product.description };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const percent = product.discountPercent.toLocaleString("pt-BR");

  const details = [
    { label: "Categoria", value: product.category },
    product.categoryDescription && { label: "Sobre a categoria", value: product.categoryDescription },
    { label: "Preço original", value: formatPrice(product.price) },
    { label: "Desconto", value: product.hasDiscount ? `${percent}% (${formatPrice(product.discountAmount)})` : "Sem desconto" },
    { label: "Preço final", value: formatPrice(product.finalPrice) },
    { label: "Cadastrado em", value: formatDate(product.createdAt) },
    { label: "Atualizado em", value: formatDate(product.updatedAt) },
    { label: "Código", value: product.id, mono: true },
  ].filter(Boolean);

  return (
    <div className="bg-background min-h-screen px-4 pt-6 pb-28 min-[800px]:pt-24 min-[800px]:pb-12 transition-colors duration-300 ease-in-out">
      <div className="max-w-6xl mx-auto space-y-6">
        <nav aria-label="Navegação estrutural" className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-heading transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/Products" className="hover:text-heading transition-colors">Produtos</Link>
          <span aria-hidden>/</span>
          <span>{product.category}</span>
          <span aria-hidden>/</span>
          <span className="text-heading line-clamp-1">{product.name}</span>
        </nav>

        <section className="grid gap-4 md:grid-cols-2 bg-surface-sunken rounded-3xl p-3 md:p-4 inset-shadow-sm border border-line transition-colors duration-300 ease-in-out">
          <ProductCarousel images={product.images} alt={product.name}>
            {product.hasDiscount && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-linear-to-tr from-primary to-primary-gradient-to px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-md">
                -{percent}%
              </span>
            )}
          </ProductCarousel>

          <div className="flex flex-col gap-6 rounded-2xl bg-surface-inset p-4 md:p-8 transition-colors duration-300 ease-in-out">
            <div className="space-y-3">
              <span className="inline-block rounded-full bg-badge px-3 py-1 text-xs font-bold text-badge-foreground">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-heading">{product.name}</h1>
            </div>

            <div className="space-y-1">
              {product.hasDiscount && (
                <p className="flex items-center gap-2 text-base">
                  <span className="text-muted line-through">{formatPrice(product.price)}</span>
                  <span className="font-semibold text-accent">-{percent}%</span>
                </p>
              )}
              <p className="text-4xl font-semibold text-price">{formatPrice(product.finalPrice)}</p>
              {product.hasDiscount && (
                <p className="text-sm text-accent">Você economiza {formatPrice(product.discountAmount)}</p>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Descrição</h2>
              <p className="whitespace-pre-line leading-relaxed text-body">{product.descriptionComplete}</p>
            </div>

            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground cursor-pointer hover:shadow-md hover:shadow-primary-shadow transition-all duration-200 ease-in-out"
              >
                Adicionar ao carrinho
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
              <Link
                href="/Products"
                className="flex items-center justify-center rounded-full border border-card-button-border bg-card-button px-6 py-3 font-medium text-heading shadow-card-button hover:bg-card-button-hover hover:shadow-card-button-hover transition-all duration-300 ease-in-out"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-surface-sunken p-3 md:p-4 inset-shadow-sm border border-line transition-colors duration-300 ease-in-out">
          <div className="rounded-2xl bg-surface-inset p-4 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-heading">Informações do produto</h2>
            <dl className="divide-y divide-line">
              {details.map(({ label, value, mono }) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-muted">{label}</dt>
                  <dd className={`sm:col-span-2 text-body break-all ${mono ? "font-mono text-sm" : ""}`}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}
