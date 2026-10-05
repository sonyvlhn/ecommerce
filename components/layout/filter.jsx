import React from 'react'

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'name-asc', label: 'Nome (A-Z)' },
]

const inputClass =
  'w-full rounded-lg bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 ring-1 ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors duration-300 ease-in-out'

export default function Filter({ categories = [], filters, onChange, onReset, resultCount }) {
  const update = (field, value) => onChange({ ...filters, [field]: value })

  const toggleCategory = (category) => {
    const selected = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    update('categories', selected)
  }

  return (
    <aside className='hidden md:flex flex-col sticky top-22 self-start w-60 shrink-0 h-[calc(100vh-11vh)] overflow-y-auto bg-gray-200 dark:bg-gray-900 rounded-xl inset-shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-300 ease-in-out'>
      <div className='flex items-center justify-between px-5 pt-5 pb-3'>
        <h2 className='text-lg text-black dark:text-white font-semibold'>Filtros</h2>
        <button
          type='button'
          onClick={onReset}
          className='text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors'
        >
          Limpar
        </button>
      </div>

      <div className='flex flex-col gap-6 px-5 pb-5'>
        {/* Busca */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='filter-search' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Buscar
          </label>
          <input
            id='filter-search'
            type='search'
            placeholder='Nome do produto...'
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Categorias */}
        <fieldset className='flex flex-col gap-2'>
          <legend className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Categorias</legend>
          {categories.map((category) => (
            <label key={category} className='flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200 cursor-pointer'>
              <input
                type='checkbox'
                checked={filters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
                className='size-4 rounded accent-slate-800 dark:accent-slate-200 cursor-pointer'
              />
              {category}
            </label>
          ))}
        </fieldset>

        {/* Preço */}
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Preço (R$)</span>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              min='0'
              placeholder='Mín'
              aria-label='Preço mínimo'
              value={filters.minPrice}
              onChange={(e) => update('minPrice', e.target.value)}
              className={inputClass}
            />
            <span className='text-gray-400'>–</span>
            <input
              type='number'
              min='0'
              placeholder='Máx'
              aria-label='Preço máximo'
              value={filters.maxPrice}
              onChange={(e) => update('maxPrice', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Ordenação */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='filter-sort' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Ordenar por
          </label>
          <select
            id='filter-sort'
            value={filters.sort}
            onChange={(e) => update('sort', e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {typeof resultCount === 'number' && (
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            {resultCount} {resultCount === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </p>
        )}
      </div>
    </aside>
  )
}
