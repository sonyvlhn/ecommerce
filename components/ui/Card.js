import React from "react";
import Image from "next/image";


export default function Card({ product, onQuikView }) {
  return (
    <div className="w-64 md:w-90 pb-7 bg-white dark:bg-gray-900 rounded-2xl my-6 shadow-lg dark:shadow-gray-900/50 transition-colors duration-300 hover:scale-105 hover:transition-transform ease-in-out flex flex-col">
      <Image
        src={product.image}
        alt={product.name}
        width={288}
        height={192}
        unoptimized
        className="w-72 h-48 object-cover overflow-hidden mx-auto -mt-8 rounded-2xl shadow-2xl dark:shadow-black/40"
      />
      <div className="mt-7 px-8 space-y-3 flex flex-col flex-1">
        <h2 className="font-extrabold text-black dark:text-white text-xl md:text-2xl">
          {product.name}
        </h2>
        <p className="font-extralight text-gray-400 dark:text-gray-300 text-sm md:text-base">
          {product.description}
        </p>
        <h3 className="font-bold text-black dark:text-sky-300 text-lg md:text-2xl">
          R$ {product.price.toFixed(2)}
        </h3>
        <div className="flex space-x-3 mt-auto pt-4 justify-end">
          <button className="rounded-sm p-0.5 text-sm md:p-2 w-1/2 bg-sky-600 dark:bg-sky-500 text-white hover:bg-sky-700 dark:hover:bg-sky-600 hover:scale-105 duration-100 ease-in-out">
            Comprar
          </button>
          <button 
          onClick={onQuikView}
          className="rounded-sm p-0.5 text-sm md:p-2 w-1/2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 text-white hover:scale-105 duration-100 ease-in-out">
            Mais detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
