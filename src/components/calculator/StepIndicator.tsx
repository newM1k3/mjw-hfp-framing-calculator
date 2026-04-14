import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-stone-200 z-0" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-teal-500 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
        {labels.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return (
            <div key={i} className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-teal-500 text-white'
                    : isActive
                    ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                    : 'bg-white text-stone-400 border-2 border-stone-200'
                }`}
              >
                {isCompleted ? <Check size={14} /> : stepNum}
              </div>
              <span
                className={`mt-2 text-xs font-medium hidden sm:block ${
                  isActive ? 'text-teal-600' : isCompleted ? 'text-teal-500' : 'text-stone-400'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
