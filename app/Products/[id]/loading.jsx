// Exibido enquanto o produto é buscado no banco
export default function Loading() {
  return (
    <div className="bg-background min-h-screen px-4 pt-6 pb-28 min-[800px]:pt-24 min-[800px]:pb-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="h-5 w-64 rounded shimmer" />
        <div className="grid gap-4 md:grid-cols-2 bg-surface-sunken rounded-3xl p-3 md:p-4 inset-shadow-sm border border-line">
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl shimmer" />
            <div className="flex gap-2 p-1">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="size-16 md:size-20 rounded-xl shimmer" />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-2xl bg-surface-inset p-4 md:p-8">
            <div className="h-6 w-24 rounded-full shimmer" />
            <div className="h-10 w-3/4 rounded shimmer" />
            <div className="h-12 w-1/2 rounded shimmer" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded shimmer" />
              <div className="h-4 w-full rounded shimmer" />
              <div className="h-4 w-2/3 rounded shimmer" />
            </div>
            <div className="mt-auto h-12 w-full rounded-full shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
