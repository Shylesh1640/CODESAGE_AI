'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="p-3 bg-red-500/10 rounded-full">
        <AlertCircle className="w-12 h-12 text-[var(--error)]" />
      </div>
      <div className="text-center max-w-md">
        <p className="text-lg font-medium text-[var(--foreground)]">Something went wrong</p>
        <p className="text-sm text-[var(--muted)] mt-2">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-6 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
