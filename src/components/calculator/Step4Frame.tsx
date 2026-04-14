import { CalculatorState, FrameOption } from '../../types';
import { formatCurrency } from '../../utils/pricing';

interface Props {
  state: CalculatorState;
  frameOptions: FrameOption[];
  onChange: (updates: Partial<CalculatorState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4Frame({ state, frameOptions, onChange, onNext, onBack }: Props) {
  const frameUI = (() => {
    const w = parseFloat(state.width);
    const h = parseFloat(state.height);
    const border = state.matOption !== 'none' ? parseFloat(state.matBorderWidth) || 2 : 0;
    return (w + border * 2) + (h + border * 2);
  })();

  const woodFrames = frameOptions.filter((f) => f.category === 'frame_wood');
  const metalFrames = frameOptions.filter((f) => f.category === 'frame_metal');

  const FrameCard = ({ frame }: { frame: FrameOption }) => {
    const isSelected = state.selectedFrame === frame.id;
    const estimatedCost = frame.base_fee + frame.price_per_united_inch * frameUI;

    return (
      <button
        onClick={() => onChange({ selectedFrame: frame.id })}
        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
          isSelected ? 'border-teal-500 bg-teal-50' : 'border-stone-200 bg-white hover:border-stone-300'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <p className={`font-semibold text-sm ${isSelected ? 'text-teal-700' : 'text-stone-700'}`}>
            {frame.name}
          </p>
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 ${
              isSelected ? 'border-teal-500 bg-teal-500' : 'border-stone-300'
            }`}
          >
            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-stone-400">{formatCurrency(frame.price_per_united_inch)}/UI</p>
          <p className={`font-bold text-sm ${isSelected ? 'text-teal-600' : 'text-stone-500'}`}>
            ~{formatCurrency(estimatedCost)}
          </p>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-stone-800">Frame Style</h2>
        <p className="mt-1 text-stone-500">Select the moulding style for your custom frame.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Wood Frames</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {woodFrames.map((frame) => (
              <FrameCard key={frame.id} frame={frame} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Metal Frames</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metalFrames.map((frame) => (
              <FrameCard key={frame.id} frame={frame} />
            ))}
          </div>
        </div>
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
          disabled={!state.selectedFrame}
          className="flex-[2] py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          View My Quote
        </button>
      </div>
    </div>
  );
}
