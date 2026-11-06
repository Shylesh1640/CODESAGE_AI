'use client';

import { REVIEW_TYPES } from '@/types/review';
import type { ReviewType } from '@/types/review';

interface ReviewTypeSelectorProps {
  value: ReviewType;
  onChange: (reviewType: ReviewType) => void;
}

export default function ReviewTypeSelector({ value, onChange }: ReviewTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="reviewType" className="block text-sm font-medium text-[var(--foreground)]">
        Review Type
      </label>
      <div className="grid grid-cols-1 gap-2">
        {REVIEW_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => onChange(type.value)}
            className={`text-left px-4 py-3 rounded-lg border transition-all ${
              value === type.value
                ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
                : 'bg-[var(--input)] border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]'
            }`}
          >
            <div className="font-medium">{type.label}</div>
            <div className={`text-sm ${value === type.value ? 'text-white/80' : 'text-[var(--muted)]'}`}>
              {type.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
