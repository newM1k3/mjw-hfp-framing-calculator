import { useState } from 'react';
import { Frame } from 'lucide-react';
import { CalculatorState } from './types';
import { calculateQuote } from './utils/pricing';
import { usePricing } from './hooks/usePricing';
import StepIndicator from './components/calculator/StepIndicator';
import Step1Dimensions from './components/calculator/Step1Dimensions';
import Step2Mat from './components/calculator/Step2Mat';
import Step3Glass from './components/calculator/Step3Glass';
import Step4Frame from './components/calculator/Step4Frame';
import Step5Quote from './components/calculator/Step5Quote';

const STEP_LABELS = ['Dimensions', 'Mat', 'Glass', 'Frame', 'Quote'];

const INITIAL_STATE: CalculatorState = {
  width: '',
  height: '',
  matOption: 'none',
  matBorderWidth: '2',
  selectedGlass: 'standard',
  selectedFrame: '',
};

export default function App() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);
  const { glassOptions, frameOptions, matPricing, loading } = usePricing();

  const update = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const reset = () => {
    setStep(1);
    setState(INITIAL_STATE);
  };

  const quote = calculateQuote(state, glassOptions, frameOptions, matPricing);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center">
            <Frame size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-stone-800 leading-tight">Custom Framing Calculator</h1>
            <p className="text-xs text-stone-400">Get an instant estimate for your project</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-stone-100">
            <StepIndicator currentStep={step} totalSteps={5} labels={STEP_LABELS} />
          </div>

          <div className="p-6 sm:p-8">
            {loading && step === 1 && (
              <div className="flex items-center gap-2 mb-6 p-3 bg-teal-50 rounded-lg">
                <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-teal-600">Loading pricing data...</p>
              </div>
            )}

            {step === 1 && (
              <Step1Dimensions
                state={state}
                onChange={update}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2Mat
                state={state}
                onChange={update}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <Step3Glass
                state={state}
                glassOptions={glassOptions}
                onChange={update}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <Step4Frame
                state={state}
                frameOptions={frameOptions}
                onChange={update}
                onNext={() => setStep(5)}
                onBack={() => setStep(3)}
              />
            )}
            {step === 5 && quote && (
              <Step5Quote
                state={state}
                quote={quote}
                glassOptions={glassOptions}
                frameOptions={frameOptions}
                onBack={() => setStep(4)}
                onReset={reset}
              />
            )}
          </div>
        </div>

        {step > 1 && step < 5 && quote && (
          <div className="mt-4 px-5 py-3 bg-white rounded-xl border border-stone-100 shadow-sm flex items-center justify-between">
            <p className="text-sm text-stone-500">Running estimate</p>
            <p className="text-lg font-bold text-teal-600">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(quote.total)}
            </p>
          </div>
        )}

        <p className="text-center text-xs text-stone-400 mt-6">
          Estimates are for planning purposes only. Final pricing confirmed at time of order.
        </p>
      </main>
    </div>
  );
}
