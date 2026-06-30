import React from "react";
import Image from "next/image";


export default function Card({ product, onQuickView }) {
  return (
    <div className="w-full max-w-[300px] pb-6 bg-white dark:bg-gray-900 dark:ring-1 dark:ring-gray-700/70 rounded-xl my-5 shadow-lg dark:shadow-black/30 transition-transform duration-300 ease-in-out hover:scale-105 grid group">
      <Image
        src={product.image}
        alt={product.name}
        width={270}
        height={180}
        unoptimized
        className="w-[92%] h-40 object-cover overflow-hidden mx-auto -mt-7 rounded-xl shadow-md dark:shadow-black/40 group-hover:scale-109 duration-300 ease-in-out"
      />
      <div className="mt-6 px-6 space-y-3 flex flex-col flex-1">
        <h2 className="font-extrabold text-black dark:text-white text-xl">
          {product.name}
        </h2>
        <p className="font-extralight text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>
        <h3 className="font-bold text-black dark:text-sky-300 text-lg md:text-xl">
          R$ {product.price.toFixed(2)}
        </h3>
        <div className="flex space-x-2 mt-auto pt-3 justify-end">
          <button className="rounded-sm py-2 px-2.5 text-sm w-1/2 bg-sky-600 dark:bg-sky-500 text-white hover:bg-sky-700 dark:hover:bg-sky-600 hover:scale-105 duration-100 ease-in-out">
            Comprar
          </button>
          <button 
          onClick={onQuickView}
          className="rounded-sm py-2 px-2.5 text-sm w-1/2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 text-white hover:scale-105 duration-100 ease-in-out cursor-pointer">
            Mais detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
