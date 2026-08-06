import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";

export default function Home() {
  return (
    <div className="max-w-355 mx-auto">
      <Hero />
      <FeaturedProducts />
    </div>
  );
}
