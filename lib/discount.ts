// Cálculo de desconto dos produtos.
// Os valores são calculados em centavos (inteiros) para evitar erros de ponto
// flutuante, como 599.9 * 0.85 = 509.91499999999996.

export interface DiscountResult {
  /** Preço cheio, sem desconto */
  originalPrice: number;
  /** Percentual aplicado, já limitado entre 0 e 100 */
  discountPercent: number;
  /** Valor abatido do preço original */
  discountAmount: number;
  /** Preço final, com desconto */
  finalPrice: number;
  /** true quando há desconto efetivo (> 0) */
  hasDiscount: boolean;
}

const toCents = (value: number): number => Math.round(value * 100);
const fromCents = (cents: number): number => cents / 100;

/** Garante um percentual válido: números inválidos viram 0 e o resto fica entre 0 e 100. */
export function normalizePercent(percent: number): number {
  if (!Number.isFinite(percent)) return 0;
  return Math.min(Math.max(percent, 0), 100);
}

/**
 * Aplica um desconto percentual sobre um preço.
 * @example calculateDiscount(599.9, 15) // { originalPrice: 599.9, discountAmount: 89.99, finalPrice: 509.91, ... }
 */
export function calculateDiscount(price: number, percent: number): DiscountResult {
  const originalCents = toCents(Number.isFinite(price) && price > 0 ? price : 0);
  const discountPercent = normalizePercent(percent);
  const discountCents = Math.round((originalCents * discountPercent) / 100);
  const finalCents = originalCents - discountCents;

  return {
    originalPrice: fromCents(originalCents),
    discountPercent,
    discountAmount: fromCents(discountCents),
    finalPrice: fromCents(finalCents),
    hasDiscount: discountCents > 0,
  };
}
