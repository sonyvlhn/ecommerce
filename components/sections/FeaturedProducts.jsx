'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from "react";
import products from '@/data/products.json'
import Card from '@/components/ui/Card'
import SkeletonCard from '../ui/skeletonCard';
import Quickview from '@/components/ui/Quickview';
import useWindowSize from '@/app/Products/useWindowSize';

export default function FeaturedProducts() {

    const { isMobile } = useWindowSize();
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    const handleCloseQuickView = () => {
        setIsQuickViewOpen(false);
        setSelectedProduct(null);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // isMobile começa como null (antes da 1ª medição no cliente): usamos o
    // layout de grid como padrão para casar com o HTML renderizado no servidor.
    const listClasses = isMobile
        ? 'flex flex-nowrap overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth overscroll-x-contain'
        : 'grid grid-cols-4 xl:grid-cols-4 justify-items-center';
    const itemClasses = isMobile
        ? 'w-[80%] shrink-0 snap-start'
        : 'w-full';

    return (
        <div className='bg-surface-sunken rounded-2xl p-1 inset-shadow-sm border border-line mb-24 md:mb-8 mx-4 md:mx-4 transition-colors duration-300 ease-in-out'>
            <div className='p-4 flex justify-between items-center'>
                <h2 className='text-2xl font-semibold text-muted tracking-tight ml-4 pt-4 transition-colors duration-300 ease-in-out'>Produtos em Destaque</h2>
                <Link href='/Products' className='flex items-center gap-2  text-accent cursor-pointer hover:bg-surface-sunken-hover hover:rounded-full py-2 px-3 transition-all hover:duration-500'>Ver todos
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </Link>
            </div>
                <div className={`${listClasses} p-4 gap-4 md:gap-8 md:p-10 lg:p-6 mb-4 bg-surface-inset rounded-2xl transition-colors duration-300 ease-in-out w-full`}>
                {loading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className={`${itemClasses} flex justify-center`}>
                        <SkeletonCard />
                      </div>
                    ))
                : products.map((product) => (
                    <div key={product.id} className={`${itemClasses} flex justify-center`}>
                      <Card
                        product={product}
                        onQuickView={() => handleQuickView(product)}
                      />
                    </div>
                  ))}
            </div>
            {isQuickViewOpen && selectedProduct && (
                <Quickview
                    product={selectedProduct}
                    onClose={handleCloseQuickView}
                    isOpen={isQuickViewOpen}
                />
            )}
        </div>
    )
}
