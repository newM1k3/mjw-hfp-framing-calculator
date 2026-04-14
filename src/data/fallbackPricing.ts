import { GlassOption, FrameOption, MatPricing } from '../types';

export const BASE_FITTING_FEE = 25;

export const GLASS_OPTIONS: GlassOption[] = [
  {
    id: 'standard',
    name: 'Standard Clear',
    description: 'Classic clear glass for everyday framing',
    price_per_united_inch: 0.85,
    base_fee: 0,
  },
  {
    id: 'non_glare',
    name: 'Non-Glare',
    description: 'Diffused surface reduces reflections',
    price_per_united_inch: 1.25,
    base_fee: 10,
  },
  {
    id: 'conservation',
    name: 'Conservation Clear',
    description: 'UV protection preserves artwork over time',
    price_per_united_inch: 1.75,
    base_fee: 15,
  },
  {
    id: 'museum',
    name: 'Museum Glass',
    description: 'Premium UV + anti-reflective, near-invisible',
    price_per_united_inch: 2.95,
    base_fee: 25,
  },
];

export const FRAME_OPTIONS: FrameOption[] = [
  {
    id: 'standard_wood',
    name: 'Standard Wood',
    category: 'frame_wood',
    price_per_united_inch: 1.15,
    base_fee: 0,
  },
  {
    id: 'premium_wood',
    name: 'Premium Wood',
    category: 'frame_wood',
    price_per_united_inch: 2.25,
    base_fee: 10,
  },
  {
    id: 'gallery_wood',
    name: 'Gallery Wood',
    category: 'frame_wood',
    price_per_united_inch: 3.50,
    base_fee: 20,
  },
  {
    id: 'standard_metal',
    name: 'Standard Metal',
    category: 'frame_metal',
    price_per_united_inch: 1.85,
    base_fee: 5,
  },
  {
    id: 'premium_metal',
    name: 'Premium Metal',
    category: 'frame_metal',
    price_per_united_inch: 3.10,
    base_fee: 15,
  },
];

export const MAT_PRICING: MatPricing[] = [
  {
    id: 'none',
    name: 'No Mat',
    option: 'none',
    price_per_united_inch: 0,
    base_fee: 0,
  },
  {
    id: 'single',
    name: 'Single Mat',
    option: 'single',
    price_per_united_inch: 0.65,
    base_fee: 8,
  },
  {
    id: 'double',
    name: 'Double Mat',
    option: 'double',
    price_per_united_inch: 1.10,
    base_fee: 15,
  },
];
