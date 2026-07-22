import React from "react";
import Image from "next/image";


export default function Card({ product, onQuickView }) {
  return (
    <div className="w-full max-w-75 pb-6 border-6 border-white dark:border-gray-900 bg-white dark:bg-gray-900 dark:ring-1 dark:ring-gray-700/70 rounded-xl my-2 shadow-lg dark:shadow-black/30 hover:scale-105 transition-transform duration-300 ease-in-out grid group">
      <Image
        src={product.image}
        alt={product.name}
        width={270}
        height={180}
        unoptimized
        className="w-full h-52 object-cover object-bottom overflow-hidden rounded-t-md"
      />
      <div className="relative z-10 -mt-15 px-6 space-y-3 flex flex-col flex-1 bg-linear-to-t from-white dark:from-gray-900 from-80% to-transparent pt-4">
        <h2 className="font-extrabold text-black dark:text-white text-xl mt-10 ">
          {product.name}
        </h2>
        <p className="font-extralight text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700/60">
          <h3 className="font-bold text-black dark:text-white text-2xl">
            R$ {product.price.toFixed(2)}
          </h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center p-2.5 rounded-lg bg-linear-to-br from-slate-900 to-slate-600 hover:from-slate-800 hover:to-slate-500 dark:from-white dark:to-zinc-100 dark:hover:from-zinc-100 dark:hover:to-zinc-200 text-white dark:text-black theme-transition transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer shadow-sm shadow-sky-500/10 dark:shadow-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </button>
            <button
              onClick={onQuickView}
              className="flex items-center justify-center p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 theme-transition transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer shadow-sm"
              title="Mais detalhes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
