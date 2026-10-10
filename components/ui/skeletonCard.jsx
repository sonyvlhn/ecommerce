import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="relative w-full max-w-80 h-full pb-6 border-3 border-card-border bg-card rounded-3xl sm:rounded-4xl my-2 shadow-lg shadow-shadow flex flex-col group">
      <div className="w-full h-40 sm:h-48 lg:h-52 overflow-hidden rounded-t-3xl sm:rounded-t-4xl mask-b-from-70% mask-b-to-100% shimmer"></div>
      <div className="relative z-10 -mt-14 sm:-mt-20 px-4 sm:px-6 space-y-1 flex flex-col flex-1 min-w-0 pt-4">
        {/* título */}
        <div className="h-6 sm:h-7 shimmer rounded mt-6 sm:mt-10 w-3/4"></div>
        {/* descrição */}
        <div className="h-4 shimmer rounded w-full"></div>

        {/* preço */}
        <div className="flex w-full flex-wrap items-center justify-between gap-2 mt-3">
          <div className="h-7 sm:h-8 w-16 shimmer rounded-full shrink-0"></div>
          <div className="h-7 sm:h-8 w-24 shimmer rounded"></div>
        </div>

        <div className="mt-auto pt-4 border-t border-line">
          {/* botões */}
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="h-9 sm:h-10 w-full rounded-full shimmer"></div>
            <div className="h-9 sm:h-10 w-full rounded-full shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
