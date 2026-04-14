export type MatOption = 'none' | 'single' | 'double';

export interface PricingItem {
  id?: string;
  category: 'glass' | 'mat' | 'frame_wood' | 'frame_metal';
  name: string;
  price_per_united_inch: number;
  base_fee: number;
}

export interface FrameOption {
  id: string;
  name: string;
  category: 'frame_wood' | 'frame_metal';
  price_per_united_inch: number;
  base_fee: number;
}

export interface GlassOption {
  id: string;
  name: string;
  description: string;
  price_per_united_inch: number;
  base_fee: number;
}

export interface MatPricing {
  id: string;
  name: string;
  option: MatOption;
  price_per_united_inch: number;
  base_fee: number;
}

export interface CalculatorState {
  width: string;
  height: string;
  matOption: MatOption;
  matBorderWidth: string;
  selectedGlass: string;
  selectedFrame: string;
}

export interface LeadForm {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface QuoteBreakdown {
  artworkUI: number;
  frameUI: number;
  matCost: number;
  glassCost: number;
  frameCost: number;
  baseFittingFee: number;
  total: number;
}
