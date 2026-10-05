import React from "react";
import Image from "next/image";


export default function Card({ product, onQuickView }) {
  return (
    <div className="relative cursor-pointer w-full max-w-80 h-full pb-6 border-3 border-white/20 dark:border-gray-800/20 bg-[#f8f8f8] dark:bg-gray-950/60 dark:backdrop-blur-md rounded-3xl sm:rounded-4xl my-2 shadow-lg dark:shadow-black/50 transition-transform duration-200 ease-in-out hover:scale-101 flex flex-col group">
      <Image
        loading='eager'
        src={product.image}
        alt={product.name}
        width={270}
        height={180}
        unoptimized
        className="w-full h-40 sm:h-48 lg:h-52 object-cover object-[50%_70%] overflow-hidden rounded-t-3xl sm:rounded-t-4xl mask-b-from-70% mask-b-to-100%"
      />
      <button className="absolute right-2 top-2 rounded-full bg-white dark:bg-gray-900 p-2 cursor-pointer shadow-sm shadow-gray-200/10 dark:shadow-black/30 ring-1 ring-transparent dark:ring-white/10 transition-[background-color,box-shadow,--tw-ring-color] duration-300 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-slate-700 hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400 transition-all duration-300 ease-in-out hover:scale-110 hover:fill-rose-500">
          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </button>
      <div className="relative z-10 -mt-14 sm:-mt-20 px-4 sm:px-6 space-y-1 flex flex-col flex-1 min-w-0 pt-4">
        <div className="pointer-events-none absolute inset-0 -z-10 backdrop-blur-xs mask-[linear-gradient(to_top,gray_80%,transparent)]" />
        <h2 className="font-semibold text-black dark:text-white text-lg sm:text-xl mt-6 sm:mt-10 line-clamp-1 transition-colors duration-300 ease-in-out">
          {product.name}
        </h2>
        <p className="font-extralight text-gray-500 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 transition-colors duration-300 ease-in-out">
          {product.description}
        </p>
        <div className="flex w-full flex-wrap items-center justify-between gap-2 mt-3">
          <div className="bg-linear-to-tr from-0% to-100% from-slate-900 to-slate-600 text-white dark:from-slate-100 dark:to-slate-200 dark:text-slate-900 dark:inset-shadow-xs rounded-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs shrink-0 transition-colors duration-300 ease-in-out">-20%</div>
          <h3 className="text-black dark:text-white text-lg sm:text-xl whitespace-nowrap transition-colors duration-300 ease-in-out">
            R$ {product.price.toFixed(2)}
          </h3>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800/60 transition-colors duration-300 ease-in-out">
          <div className="grid grid-cols-2 items-center gap-2">
            <button className="flex min-w-0 w-full items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/80 dark:bg-gray-900/60 dark:hover:bg-gray-900/80 backdrop-blur-md text-gray-900 dark:text-white text-xs sm:text-sm font-medium transition-all duration-300 ease-in-out cursor-pointer border border-white/80 dark:border-white/20 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.15),0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.25),0_4px_12px_rgba(0,0,0,0.4)]">
              <span className="truncate">Tamanho</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3.5 sm:size-4 shrink-0 text-gray-600 dark:text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <button className="flex min-w-0 w-full items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/80 hover:bg-[#f7f7f7] dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm font-medium transition-all duration-300 ease-in-out cursor-pointer border border-white dark:border-gray-800 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.15),0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.25),0_4px_12px_rgba(0,0,0,0.4)]">
              <span className="truncate">Adicionar</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 sm:size-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
