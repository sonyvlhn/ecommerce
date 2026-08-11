"use client";
import products from "@/data/products.json";
import Card from "@/components/ui/Card";
import SkeletonCard from "@/components/ui/skeletonCard";
import Quickview from "@/components/ui/Quickview";
import { useState, useEffect } from "react";
import Filter from "@/components/layout/filter";
import useWindowSize from "./useWindowSize";


  export default function Products() {
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { isMobile } = useWindowSize();


  // Abrindo o QuickView
  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Fechando o QuickView
  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  // Simulando o tempo de requisição
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-zinc-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out pb-5">
      <div className={isMobile ? `${"pt-6 flex flex-col md:flex-row justify-center gap-4 px-2 md:px-4 w-full max-w-364 mx-auto transition-colors duration-300 ease-in-out mb-16"}`:`${"pt-22 flex flex-row md:flex-row gap-4 px-2 md:px-4 w-full max-w-364 mx-auto transition-colors duration-300 ease-in-out"}`}>

        <Filter />
        <div className="flex-1 min-w-0">
          {isMobile && <h2 className="text-xl text-black dark:text-white font-semibold p-3 text-center mb-3">Confira nossos produtos</h2>}
          <div className="w-full">
            <section className="w-full md:mb-0 pb-4 mt-3 md:mt-0 bg-gray-200 inset-shadow-sm rounded-xl dark:bg-gray-900 transition-colors duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-items-center p-4 sm:p-6 lg:p-8 gap-6 sm:gap-8 dark:bg-gray-800 rounded-2xl transition-colors duration-300 ease-in-out w-full">
                {loading
                  ? Array(6)
                      .fill(0)
                      .map((_, index) => <SkeletonCard key={index} />)
                  : products.map((product) => (
                      <Card
                        key={product.id}
                        product={product}
                        onQuickView={() => handleQuickView(product)}
                      />
                    ))}
              </div>
            </section>
          </div>
        </div>

      </div>
      {isQuickViewOpen && selectedProduct && (
        <Quickview
          product={selectedProduct}
          onClose={handleCloseQuickView}
          isOpen={isQuickViewOpen}
        />
      )}
    </div>
  );
}