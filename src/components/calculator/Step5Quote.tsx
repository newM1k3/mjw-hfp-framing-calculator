import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { CalculatorState, LeadForm, QuoteBreakdown, GlassOption, FrameOption } from '../../types';
import { formatCurrency } from '../../utils/pricing';
import pb from '../../lib/pocketbase';

interface Props {
  state: CalculatorState;
  quote: QuoteBreakdown;
  glassOptions: GlassOption[];
  frameOptions: FrameOption[];
  onBack: () => void;
  onReset: () => void;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Step5Quote({ state, quote, glassOptions, frameOptions, onBack, onReset }: Props) {
  const [lead, setLead] = useState<LeadForm>({ name: '', email: '', phone: '', notes: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const glass = glassOptions.find((g) => g.id === state.selectedGlass);
  const frame = frameOptions.find((f) => f.id === state.selectedFrame);

  const isFormValid = lead.name.trim() && lead.email.trim();

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setStatus('loading');
    try {
      await pb.collection('quote_requests').create({
        width: parseFloat(state.width),
        height: parseFloat(state.height),
        mat_option: state.matOption,
        mat_border_width: state.matOption !== 'none' ? parseFloat(state.matBorderWidth) : 0,
        glass_selection: glass?.name || '',
        frame_selection: frame?.name || '',
        estimated_total: quote.total,
        customer_name: lead.name,
        customer_email: lead.email,
        customer_phone: lead.phone,
        notes: lead.notes,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-stone-800">Quote Request Sent!</h2>
        <p className="text-stone-500 max-w-sm mx-auto">
          We've received your request and will be in touch within 1 business day with a final quote.
        </p>
        <button
          onClick={onReset}
          className="mt-4 px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all"
        >
          Start New Quote
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-stone-800">Your Estimate</h2>
        <p className="mt-1 text-stone-500">Review your selections and request a final quote.</p>
      </div>

      <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden">
        <div className="px-5 py-4 bg-white border-b border-stone-100">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Quote Summary</p>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className="text-stone-500">Artwork Size</span>
            <span className="text-stone-700 font-medium text-right">{state.width}" × {state.height}"</span>
            <span className="text-stone-500">Mat</span>
            <span className="text-stone-700 font-medium text-right capitalize">
              {state.matOption === 'none' ? 'None' : `${state.matOption} (${state.matBorderWidth}")`}
            </span>
            <span className="text-stone-500">Glass</span>
            <span className="text-stone-700 font-medium text-right">{glass?.name}</span>
            <span className="text-stone-500">Frame</span>
            <span className="text-stone-700 font-medium text-right">{frame?.name}</span>
          </div>
          <div className="border-t border-stone-200 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-stone-500">
              <span>Base Fitting Fee</span>
              <span>{formatCurrency(quote.baseFittingFee)}</span>
            </div>
            {quote.matCost > 0 && (
              <div className="flex justify-between text-stone-500">
                <span>Mat</span>
                <span>{formatCurrency(quote.matCost)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-500">
              <span>Glass</span>
              <span>{formatCurrency(quote.glassCost)}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Frame</span>
              <span>{formatCurrency(quote.frameCost)}</span>
            </div>
          </div>
          <div className="border-t-2 border-stone-200 pt-3 flex justify-between items-center">
            <span className="text-lg font-bold text-stone-800">Estimated Total</span>
            <span className="text-2xl font-bold text-teal-600">{formatCurrency(quote.total)}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-stone-400 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
        This is an estimate. Final price may vary based on specific moulding selection and artwork condition.
      </p>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-stone-700">Request This Frame</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">Name *</label>
            <input
              type="text"
              value={lead.name}
              onChange={(e) => setLead({ ...lead, name: e.target.value })}
              placeholder="Your name"
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl text-stone-800 placeholder-stone-300 focus:outline-none focus:border-teal-400 transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">Email *</label>
            <input
              type="email"
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl text-stone-800 placeholder-stone-300 focus:outline-none focus:border-teal-400 transition-colors text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-1.5">Phone (optional)</label>
          <input
            type="tel"
            value={lead.phone}
            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
            placeholder="(555) 000-0000"
            className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl text-stone-800 placeholder-stone-300 focus:outline-none focus:border-teal-400 transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-1.5">Notes (optional)</label>
          <textarea
            value={lead.notes}
            onChange={(e) => setLead({ ...lead, notes: e.target.value })}
            placeholder="Tell us about your artwork or any special requirements..."
            rows={3}
            className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl text-stone-800 placeholder-stone-300 focus:outline-none focus:border-teal-400 transition-colors text-sm resize-none"
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
          <AlertCircle size={16} />
          <span>Something went wrong. Please try again or contact us directly.</span>
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
          onClick={handleSubmit}
          disabled={!isFormValid || status === 'loading'}
          className="flex-[2] py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {status === 'loading' && <Loader2 size={18} className="animate-spin" />}
          {status === 'loading' ? 'Sending...' : 'Request This Frame'}
        </button>
      </div>
    </div>
  );
}
