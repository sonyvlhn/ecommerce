import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="w-full max-w-[300px] pb-6 bg-white rounded-xl dark:bg-gray-900 dark:ring-1 dark:ring-gray-700/70 my-5">
      <div className="w-[92%] h-40 mx-auto -mt-7 rounded-xl shadow-xl shimmer"></div>
      <div className="mt-6 px-6 space-y-3">
        <div className="h-6 shimmer rounded w-3/4"></div>
        <div className="h-4 shimmer rounded w-full"></div>
        <div className="h-6 shimmer rounded w-1/2"></div>
        <div className="flex space-x-2 mt-3">
          <div className="rounded-sm py-3.5 text-sm w-1/2 bg-gray-200 dark:bg-gray-700 shimmer"></div>
          <div className="rounded-sm py-3.5 text-sm w-1/2 bg-gray-200 dark:bg-gray-700 shimmer"></div>
        </div>
      </div>
    </div>
  )
}