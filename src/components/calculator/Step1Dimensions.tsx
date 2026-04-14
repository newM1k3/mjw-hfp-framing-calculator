import { Ruler } from 'lucide-react';
import { CalculatorState } from '../../types';

interface Props {
  state: CalculatorState;
  onChange: (updates: Partial<CalculatorState>) => void;
  onNext: () => void;
}

export default function Step1Dimensions({ state, onChange, onNext }: Props) {
  const width = parseFloat(state.width);
  const height = parseFloat(state.height);
  const unitedInches = width > 0 && height > 0 ? width + height : null;

  const isValid = width > 0 && height > 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-stone-800">Artwork Dimensions</h2>
        <p className="mt-1 text-stone-500">Enter the size of your artwork (not the frame).</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Width (inches)</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              step="0.25"
              value={state.width}
              onChange={(e) => onChange({ width: e.target.value })}
              placeholder="e.g. 16"
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl text-stone-800 placeholder-stone-300 focus:outline-none focus:border-teal-400 transition-colors text-lg font-medium"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">in</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Height (inches)</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              step="0.25"
              value={state.height}
              onChange={(e) => onChange({ height: e.target.value })}
              placeholder="e.g. 20"
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl text-stone-800 placeholder-stone-300 focus:outline-none focus:border-teal-400 transition-colors text-lg font-medium"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">in</span>
          </div>
        </div>
      </div>

      {unitedInches !== null && (
        <div className="flex items-center gap-3 p-4 bg-teal-50 border border-teal-100 rounded-xl">
          <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
            <Ruler size={18} className="text-teal-600" />
          </div>
          <div>
            <p className="text-xs text-teal-600 font-medium uppercase tracking-wide">United Inches</p>
            <p className="text-teal-800 font-bold text-lg">{unitedInches} UI</p>
          </div>
          <p className="ml-auto text-xs text-stone-400">{state.width}" × {state.height}"</p>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!isValid}
        className="w-full py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-base tracking-wide"
      >
        Continue to Mat Selection
      </button>
    </div>
  );
}
