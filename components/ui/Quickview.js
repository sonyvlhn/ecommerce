"use client"
import React, { use } from 'react'
import Image from 'next/image';
import { useEffect, useCallback, useRef, useState } from 'react'

export default function Quickview( {product, onClose, isOpen} ) {
    const quickviewRef = useRef(null);

    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
    }, []);

    const handleKeyDown = useCallback((e)=>{
        if (e.key === "Escape") handleClose();
    }, [handleClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, handleKeyDown])

    const handleBackdropClick = (e) => {
        if(quickviewRef.current && !quickviewRef.current.contains(e.target)){
            handleClose();
        }
    }

    if (!isOpen) return null;

  return (
    <div 
    onClick={handleBackdropClick}
    onAnimationEnd={() => {if (isClosing) onClose();}}
    className={`fixed inset-0 z-50
        bg-black/60 dark:bg-black/75 backdrop-blur-sm
        flex items-center justify-center ${isClosing ? "fadeOut" : "fadeIn"}`}>
        <div className="flex justify-center items-center h-screen w-screen">
        <div
        ref={quickviewRef}
        className="grid min-h-0 grid-cols-[minmax(0,45%)_minmax(0,1fr)] grid-rows-[minmax(0,1fr)] max-h-[90vh] overflow-hidden bg-white dark:bg-gray-900 w-2/4 rounded-2xl shadow-2xl dark:shadow-black/50 border border-transparent dark:border-gray-800 transition-colors duration-300">
          <div className="relative min-h-0 min-w-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 45vw, 400px"
              unoptimized
              className="object-cover object-center dark:brightness-[0.92]"
            />
          </div>
          <div className="flex min-h-0 flex-col justify-between m-auto overflow-y-auto">
            <div className=" flex flex-col h-full w-sm py-4 space-y-2.5 overflow-hidden px-3">
              <h1 className="font-extrabold text-2xl text-black dark:text-white">{product.name}</h1>
              <div className="flex items-center justify-between w-full">
                <h2 className="font-medium text-2xl text-black dark:text-sky-300">R$ {product.price.toFixed(2)}</h2>
                <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/70 dark:text-amber-200 mr-5">
                  {product.category}
                </span>
              </div>
              <p className="text-md text-gray-400 dark:text-gray-300 font-thin w-full text-justify ">
                {product.descriptionComplete}
              </p>
            </div>
            <button
            onClick={handleClose}
            className="w-full rounded-full bg-gray-300 dark:bg-gray-600 mb-6 py-1.5 text-gray-700 dark:text-gray-100 max-w-xs mx-auto hover:scale-105 hover:bg-gray-400 dark:hover:bg-gray-500 hover:text-white duration-300 ease-in-out transition-colors">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
