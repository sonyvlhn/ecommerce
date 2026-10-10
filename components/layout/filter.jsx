"use client"
import React, { useCallback, useEffect, useId, useRef, useState } from 'react'

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'name-asc', label: 'Nome (A-Z)' },
]

const inputClass =
  'w-full rounded-lg bg-surface-raised px-3 py-2 text-sm text-heading placeholder:text-subtle ring-1 ring-edge focus:outline-none focus:ring-2 focus:ring-focus transition-colors duration-300 ease-in-out'

const labelClass = 'text-sm font-medium text-body'

// Quantos filtros estão ativos (a busca não conta, ela fica sempre visível)
const countActiveFilters = (filters) =>
  filters.categories.length +
  (filters.minPrice !== '' || filters.maxPrice !== '' ? 1 : 0) +
  (filters.sort !== 'relevance' ? 1 : 0)

const resultLabel = (count) => `${count} ${count === 1 ? 'produto encontrado' : 'produtos encontrados'}`

// Campos compartilhados entre a versão desktop e mobile
function FilterFields({ categories, filters, onChange, showSearch = true, chips = false }) {
  const id = useId()
  const update = (field, value) => onChange({ ...filters, [field]: value })

  const toggleCategory = (category) => {
    const selected = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    update('categories', selected)
  }

  return (
    <>
      {/* Busca */}
      {showSearch && (
        <div className='flex flex-col gap-2'>
          <label htmlFor={`${id}-search`} className={labelClass}>
            Buscar
          </label>
          <input
            id={`${id}-search`}
            type='search'
            placeholder='Nome do produto...'
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            className={inputClass}
          />
        </div>
      )}

      {/* Categorias */}
      <fieldset className='flex flex-col gap-2'>
        <legend className={`${labelClass} mb-2`}>Categorias</legend>
        {chips ? (
          <div className='flex flex-wrap gap-2'>
            {categories.map((category) => {
              const active = filters.categories.includes(category)
              return (
                <button
                  key={category}
                  type='button'
                  aria-pressed={active}
                  onClick={() => toggleCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors duration-300 ease-in-out cursor-pointer ${
                    active
                      ? 'bg-primary text-primary-foreground ring-primary'
                      : 'bg-surface-raised text-body ring-edge'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        ) : (
          categories.map((category) => (
            <label key={category} className='flex items-center gap-2 text-sm text-body cursor-pointer'>
              <input
                type='checkbox'
                checked={filters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
                className='size-4 rounded accent-primary cursor-pointer'
              />
              {category}
            </label>
          ))
        )}
      </fieldset>

      {/* Preço */}
      <div className='flex flex-col gap-2'>
        <span className={labelClass}>Preço (R$)</span>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            inputMode='decimal'
            min='0'
            placeholder='Mín'
            aria-label='Preço mínimo'
            value={filters.minPrice}
            onChange={(e) => update('minPrice', e.target.value)}
            className={inputClass}
          />
          <span className='text-subtle'>–</span>
          <input
            type='number'
            inputMode='decimal'
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
        <label htmlFor={`${id}-sort`} className={labelClass}>
          Ordenar por
        </label>
        <select
          id={`${id}-sort`}
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
    </>
  )
}

// Versão desktop: barra lateral fixa
export default function Filter({ categories = [], filters, onChange, onReset, resultCount }) {
  return (
    <aside className='flex flex-col sticky top-22 self-start w-60 shrink-0 h-[calc(100vh-11vh)] overflow-y-auto bg-surface-muted rounded-xl inset-shadow-sm ring-1 ring-edge-subtle transition-colors duration-300 ease-in-out'>
      <div className='flex items-center justify-between px-5 pt-5 pb-3'>
        <h2 className='text-lg text-heading font-semibold'>Filtros</h2>
        <button
          type='button'
          onClick={onReset}
          className='text-xs text-muted hover:text-heading cursor-pointer transition-colors'
        >
          Limpar
        </button>
      </div>

      <div className='flex flex-col gap-6 px-5 pb-5'>
        <FilterFields categories={categories} filters={filters} onChange={onChange} />

        {typeof resultCount === 'number' && (
          <p className='text-xs text-muted'>{resultLabel(resultCount)}</p>
        )}
      </div>
    </aside>
  )
}

// Versão mobile: barra com busca + botão que abre um painel inferior
export function MobileFilter({ categories = [], filters, onChange, onReset, resultCount }) {
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const panelRef = useRef(null)
  const activeCount = countActiveFilters(filters)

  const handleClose = useCallback(() => {
    setClosing(true)
    setVisible(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const frame = requestAnimationFrame(() => setVisible(true))
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, handleClose])

  return (
    <>
      <div className='sticky top-2 z-30 flex items-center gap-2 rounded-2xl bg-surface-muted/80 backdrop-blur-md p-2 inset-shadow-sm ring-1 ring-edge-subtle transition-colors duration-300 ease-in-out'>
        <div className='relative flex-1 min-w-0'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-subtle'>
            <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
          </svg>
          <input
            type='search'
            placeholder='Buscar produtos...'
            aria-label='Buscar produtos'
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className={`${inputClass} pl-9 py-2.5 rounded-xl`}
          />
        </div>
        <button
          type='button'
          onClick={() => setIsOpen(true)}
          aria-haspopup='dialog'
          className='relative flex shrink-0 items-center gap-1.5 rounded-xl bg-surface-raised px-4 py-2.5 text-sm font-medium text-heading ring-1 ring-edge cursor-pointer transition-colors duration-300 ease-in-out'
        >
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-4'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75' />
          </svg>
          Filtros
          {activeCount > 0 && (
            <span className='absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground'>
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          onClick={(e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) handleClose()
          }}
          className={`fixed inset-0 z-60 flex items-end justify-center bg-overlay backdrop-blur-sm ${closing ? 'fadeOut' : 'fadeIn'}`}
        >
          <div
            ref={panelRef}
            role='dialog'
            aria-modal='true'
            aria-label='Filtros'
            onTransitionEnd={(e) => {
              const isSlide = e.propertyName === 'translate' || e.propertyName === 'transform'
              if (closing && isSlide && e.target === panelRef.current) {
                setIsOpen(false)
                setClosing(false)
              }
            }}
            className={`flex flex-col w-full max-w-xl max-h-[85vh] rounded-t-2xl overflow-hidden bg-surface-subtle shadow-2xl shadow-shadow transition-transform duration-300 ease-in-out ${
              visible && !closing ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className='flex items-center justify-between p-4 bg-surface shadow-md transition-colors duration-300 ease-in-out'>
              <p className='text-2xl font-bold text-heading'>Filtros</p>
              <button
                type='button'
                onClick={handleClose}
                aria-label='Fechar filtros'
                className='p-2 rounded-full hover:bg-surface-hover-strong cursor-pointer transition-colors duration-300 ease-in-out'
              >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-6 text-heading'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            <div className='flex flex-col gap-6 p-4 overflow-y-auto'>
              <FilterFields categories={categories} filters={filters} onChange={onChange} showSearch={false} chips />
            </div>

            <div className='grid grid-cols-2 gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-line bg-surface transition-colors duration-300 ease-in-out'>
              <button
                type='button'
                onClick={onReset}
                className='rounded-full px-4 py-3 text-sm font-medium text-heading bg-background ring-1 ring-edge cursor-pointer transition-colors duration-300 ease-in-out'
              >
                Limpar
              </button>
              <button
                type='button'
                onClick={handleClose}
                className='rounded-full px-4 py-3 text-sm font-medium text-primary-foreground bg-linear-to-tr from-primary to-primary-gradient-to cursor-pointer transition-colors duration-300 ease-in-out'
              >
                {resultCount === 1 ? 'Ver 1 produto' : `Ver ${resultCount} produtos`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
