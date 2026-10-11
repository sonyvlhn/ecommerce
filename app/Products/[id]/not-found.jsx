import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-4 pb-28 min-[800px]:pb-0">
      <div className="max-w-md text-center space-y-4 rounded-3xl bg-surface-sunken border border-line inset-shadow-sm p-8">
        <h1 className="text-2xl font-bold text-heading">Produto não encontrado</h1>
        <p className="text-muted">O produto que você procura não existe ou foi removido.</p>
        <Link
          href="/Products"
          className="inline-flex rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:shadow-md hover:shadow-primary-shadow transition-all duration-200 ease-in-out"
        >
          Ver todos os produtos
        </Link>
      </div>
    </div>
  );
}
