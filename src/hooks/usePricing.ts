import { useState, useEffect } from 'react';
import pb from '../lib/pocketbase';
import { GlassOption, FrameOption, MatPricing } from '../types';
import { GLASS_OPTIONS, FRAME_OPTIONS, MAT_PRICING } from '../data/fallbackPricing';

interface PricingData {
  glassOptions: GlassOption[];
  frameOptions: FrameOption[];
  matPricing: MatPricing[];
  loading: boolean;
}

export function usePricing(): PricingData {
  const [glassOptions, setGlassOptions] = useState<GlassOption[]>(GLASS_OPTIONS);
  const [frameOptions, setFrameOptions] = useState<FrameOption[]>(FRAME_OPTIONS);
  const [matPricing, setMatPricing] = useState<MatPricing[]>(MAT_PRICING);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPricing() {
      try {
        const records = await pb.collection('framing_pricing').getFullList({ sort: 'name' });

        if (records.length > 0) {
          const glass: GlassOption[] = [];
          const frames: FrameOption[] = [];

          for (const r of records) {
            if (r.category === 'glass') {
              glass.push({
                id: r.id,
                name: r.name,
                description: r.description || '',
                price_per_united_inch: r.price_per_united_inch,
                base_fee: r.base_fee,
              });
            } else if (r.category === 'frame_wood' || r.category === 'frame_metal') {
              frames.push({
                id: r.id,
                name: r.name,
                category: r.category,
                price_per_united_inch: r.price_per_united_inch,
                base_fee: r.base_fee,
              });
            } else if (r.category === 'mat') {
              // mat pricing is not overridden from PB in this version
            }
          }

          if (glass.length > 0) setGlassOptions(glass);
          if (frames.length > 0) setFrameOptions(frames);
        }
      } catch {
        // Use fallback data
      } finally {
        setLoading(false);
      }
    }

    fetchPricing();
  }, []);

  return { glassOptions, frameOptions, matPricing, loading };
}
