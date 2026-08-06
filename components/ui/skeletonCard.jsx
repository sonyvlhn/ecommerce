import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="w-full max-w-85 pb-6 border-6 border-white dark:border-gray-900 bg-white dark:bg-gray-900 dark:ring-1 dark:ring-gray-700/70 rounded-4xl my-2 shadow-lg dark:shadow-black/30 hover:scale-101 transition-transform duration-300 ease-in-out grid group">
      <div className="w-full h-52 object-cover object-bottom overflow-hidden rounded-t-3xl mask-b-from-70% mask-b-to-100% shimmer"></div>
      <div className="relative z-10 -mt-15 px-6 space-y-3 flex flex-col flex-1 bg-linear-to-t from-white dark:from-gray-900 from-80% to-transparent pt-4">
        {/* título */}
        <div className="h-6 shimmer rounded w-3/4"></div>
        {/* descrição */}
        <div className="h-4 shimmer rounded w-full"></div>

        {/* preço */}
        <div className='flex justify-between'>
          <div className="px-4 py-3 shimmer rounded-full bg-black"></div>
          <div className="h-6 shimmer rounded w-1/2 bg-black"></div>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700/60">
          {/* botões */}
          <div className="flex w-full items-center gap-2">
            <div className="rounded-full w-1/2 text-sm bg-gray-200 dark:bg-gray-700 p-5 shimmer"></div>
            <div className="rounded-full w-1/2 text-sm bg-gray-200 dark:bg-gray-700 p-5 shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  )
}