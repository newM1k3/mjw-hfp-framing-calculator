import { Sparkles, Shield, Eye, Gem } from 'lucide-react';
import { CalculatorState, GlassOption } from '../../types';
import { formatCurrency } from '../../utils/pricing';

interface Props {
  state: CalculatorState;
  glassOptions: GlassOption[];
  onChange: (updates: Partial<CalculatorState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const GLASS_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  standard: Eye,
  non_glare: Sparkles,
  conservation: Shield,
  museum: Gem,
};

const GLASS_BADGES: Record<string, string> = {
  non_glare: 'Popular',
  conservation: 'UV Protection',
  museum: 'Best',
};

export default function Step3Glass({ state, glassOptions, onChange, onNext, onBack }: Props) {
  const frameUI = (() => {
    const w = parseFloat(state.width);
    const h = parseFloat(state.height);
    const border = state.matOption !== 'none' ? parseFloat(state.matBorderWidth) || 2 : 0;
    return (w + border * 2) + (h + border * 2);
  })();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-stone-800">Glass Selection</h2>
        <p className="mt-1 text-stone-500">Choose the glazing that best protects and presents your artwork.</p>
      </div>

      <div className="space-y-3">
        {glassOptions.map((glass) => {
          const Icon = GLASS_ICONS[glass.id] || Eye;
          const badge = GLASS_BADGES[glass.id];
          const isSelected = state.selectedGlass === glass.id;
          const estimatedCost = glass.base_fee + glass.price_per_united_inch * frameUI;

          return (
            <button
              key={glass.id}
              onClick={() => onChange({ selectedGlass: glass.id })}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'bg-teal-500' : 'bg-stone-100'
                }`}
              >
                <Icon size={18} className={isSelected ? 'text-white' : 'text-stone-400'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-semibold ${isSelected ? 'text-teal-700' : 'text-stone-700'}`}>
                    {glass.name}
                  </p>
                  {badge && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                      {badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-400 truncate">{glass.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`font-bold ${isSelected ? 'text-teal-600' : 'text-stone-600'}`}>
                  {formatCurrency(estimatedCost)}
                </p>
                <p className="text-xs text-stone-400">est.</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 border-2 border-stone-200 text-stone-600 font-semibold rounded-xl hover:border-stone-300 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!state.selectedGlass}
          className="flex-[2] py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          Continue to Frame Style
        </button>
      </div>
    </div>
  );
}
