import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import FeaturedProducts, { FeaturedProductsFallback } from "@/components/sections/FeaturedProducts";

// Os destaques vêm do banco a cada requisição
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="max-w-355 mx-auto">
      <Hero />
      <Suspense fallback={<FeaturedProductsFallback />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
