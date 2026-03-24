import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="w-64 md:w-90 pb-7 bg-white rounded-2xl dark:bg-gray-900 my-4">
      <div className="max-w-70 h-48 object-cover overflow-hidden mx-auto -mt-8 rounded-2xl shadow-2xl shimmer"></div>
      <div className="mt-7 px-8 space-y-3">
        <div className="h-7 shimmer rounded w-3/4"></div>
        <div className="h-4 shimmer rounded w-full"></div>
        <div className="h-7 shimmer rounded w-1/2"></div>
        <div className="flex space-x-3 mt-4">
          <div className="rounded-sm p-5 text-sm w-1/2 bg-gray-200 shimmer"></div>
          <div className="rounded-sm p-5 text-sm w-1/2 bg-gray-200 shimmer"></div>
        </div>
      </div>
    </div>
  )
}