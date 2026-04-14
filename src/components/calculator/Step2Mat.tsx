import { Layers } from 'lucide-react';
import { CalculatorState, MatOption } from '../../types';

interface Props {
  state: CalculatorState;
  onChange: (updates: Partial<CalculatorState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MAT_CHOICES: { value: MatOption; label: string; description: string }[] = [
  { value: 'none', label: 'No Mat', description: 'Frame directly around artwork' },
  { value: 'single', label: 'Single Mat', description: 'One mat border — clean and classic' },
  { value: 'double', label: 'Double Mat', description: 'Two layered mats for added depth' },
];

export default function Step2Mat({ state, onChange, onNext, onBack }: Props) {
  const hasMat = state.matOption !== 'none';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-stone-800">Mat Selection</h2>
        <p className="mt-1 text-stone-500">A mat board creates visual separation between artwork and frame.</p>
      </div>

      <div className="space-y-3">
        {MAT_CHOICES.map(({ value, label, description }) => (
          <button
            key={value}
            onClick={() => onChange({ matOption: value })}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              state.matOption === value
                ? 'border-teal-500 bg-teal-50'
                : 'border-stone-200 bg-white hover:border-stone-300'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                state.matOption === value ? 'bg-teal-500' : 'bg-stone-100'
              }`}
            >
              <Layers size={18} className={state.matOption === value ? 'text-white' : 'text-stone-400'} />
            </div>
            <div>
              <p className={`font-semibold ${state.matOption === value ? 'text-teal-700' : 'text-stone-700'}`}>
                {label}
              </p>
              <p className="text-sm text-stone-400">{description}</p>
            </div>
            <div className="ml-auto">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  state.matOption === value ? 'border-teal-500 bg-teal-500' : 'border-stone-300'
                }`}
              >
                {state.matOption === value && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>
          </button>
        ))}
      </div>

      {hasMat && (
        <div className="p-5 bg-stone-50 rounded-xl border border-stone-200">
          <label className="block text-sm font-semibold text-stone-700 mb-3">Mat Border Width (inches)</label>
          <div className="flex items-center gap-4">
            {[1.5, 2, 2.5, 3, 4].map((val) => (
              <button
                key={val}
                onClick={() => onChange({ matBorderWidth: String(val) })}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  state.matBorderWidth === String(val)
                    ? 'bg-teal-500 text-white'
                    : 'bg-white border-2 border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                {val}"
              </button>
            ))}
          </div>
          <div className="mt-3 relative">
            <input
              type="number"
              min="0.5"
              max="8"
              step="0.25"
              value={state.matBorderWidth}
              onChange={(e) => onChange({ matBorderWidth: e.target.value })}
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-teal-400 transition-colors text-sm"
              placeholder="Custom width..."
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">in</span>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 border-2 border-stone-200 text-stone-600 font-semibold rounded-xl hover:border-stone-300 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-[2] py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all duration-200"
        >
          Continue to Glass
        </button>
      </div>
    </div>
  );
}
