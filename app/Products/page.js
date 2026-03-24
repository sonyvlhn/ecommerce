"use client";
import products from "@/data/products.json";
import Card from "@/components/ui/Card";
import SkeletonCard from "@/components/ui/skeletonCard";
import Quickview from "@/components/ui/Quickview";
import { useState, useEffect } from "react";

export default function Products() {
  const [loading, setLoading] = useState(true);

  const [selectecProduct, setSelectedProduct] = useState(null);

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  //Abrindo o quickview
  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  }
  //Fechando o QuickView
  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  }

  //Simulando o tempo de requisição
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans  dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      <h1 className="text-4xl font-bold text-center my-8">Nossos Produtos</h1>
      <section className="flex min-h-screen w-full max-w-[1300px] flex-col items-center justify-between bg-gray-200 rounded-2xl  dark:bg-gray-900 sm:items-start transition-colors duration-300 ease-in-out">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center p-16 gap-8 dark:bg-gray-800 rounded-2xl transition-colors duration-300 ease-in-out w-full">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : products.map((product) => (
                <Card 
                key={product.id} 
                product={product}
                onQuikView={() => handleQuickView(product)} />
              ))}
        </div>

        {isQuickViewOpen && selectecProduct && (
          <Quickview
          product={selectecProduct}
          onClose={handleCloseQuickView}
          isOpen={isQuickViewOpen}/>
        )}
      </section>
    </div>
  );
}
