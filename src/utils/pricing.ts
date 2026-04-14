import { CalculatorState, QuoteBreakdown, GlassOption, FrameOption, MatPricing } from '../types';
import { BASE_FITTING_FEE } from '../data/fallbackPricing';

export function calculateQuote(
  state: CalculatorState,
  glassOptions: GlassOption[],
  frameOptions: FrameOption[],
  matPricing: MatPricing[]
): QuoteBreakdown | null {
  const width = parseFloat(state.width);
  const height = parseFloat(state.height);

  if (!width || !height || width <= 0 || height <= 0) return null;

  const glass = glassOptions.find((g) => g.id === state.selectedGlass);
  const frame = frameOptions.find((f) => f.id === state.selectedFrame);
  const mat = matPricing.find((m) => m.option === state.matOption);

  if (!glass || !frame || !mat) return null;

  const artworkUI = width + height;

  const borderWidth = state.matOption !== 'none' ? parseFloat(state.matBorderWidth) || 2 : 0;
  const outerWidth = width + borderWidth * 2;
  const outerHeight = height + borderWidth * 2;
  const frameUI = outerWidth + outerHeight;

  const matCost = state.matOption !== 'none'
    ? mat.base_fee + mat.price_per_united_inch * artworkUI
    : 0;

  const glassCost = glass.base_fee + glass.price_per_united_inch * frameUI;
  const frameCost = frame.base_fee + frame.price_per_united_inch * frameUI;
  const baseFittingFee = BASE_FITTING_FEE;

  const total = baseFittingFee + matCost + glassCost + frameCost;

  return {
    artworkUI,
    frameUI,
    matCost,
    glassCost,
    frameCost,
    baseFittingFee,
    total,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
