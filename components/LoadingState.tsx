'use client';

import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  onCancel?: () => void;
}

export default function LoadingState({ onCancel }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin" />
      <div className="text-center">
        <p className="text-lg font-medium text-[var(--foreground)]">Analyzing your code...</p>
        <p className="text-sm text-[var(--muted)] mt-1">This may take a moment</p>
      </div>
      {onCancel && (
        <button
          onClick={onCancel}
          className="mt-4 px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Cancel Review
        </button>
      )}
    </div>
  );
}
