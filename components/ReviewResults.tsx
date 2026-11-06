'use client';

import { useEffect, useRef } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import { useState } from 'react';

interface ReviewResultsProps {
  content: string;
  isStreaming: boolean;
}

export default function ReviewResults({ content, isStreaming }: ReviewResultsProps) {
  const [copied, setCopied] = useState(false);
  const resultsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStreaming) {
      resultsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [content, isStreaming]);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!content && !isStreaming) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 bg-[var(--card)] rounded-full mb-4">
          <CheckCircle2 className="w-12 h-12 text-[var(--muted)]" />
        </div>
        <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">Ready to Review</h3>
        <p className="text-sm text-[var(--muted)] max-w-md">
          Enter your code on the left, select your programming language and review type, then click
          "Review Code" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">Review Results</h3>
          {isStreaming && (
            <span className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse" />
              Streaming...
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          disabled={!content}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[var(--foreground)] bg-[var(--input)] hover:bg-[var(--card-hover)] border border-[var(--border)] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="bg-[var(--input)] border border-[var(--border)] rounded-lg p-6 overflow-auto max-h-[600px]">
        <div className="markdown-content prose prose-invert max-w-none">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--foreground)]">
            {content}
          </pre>
        </div>
        <div ref={resultsEndRef} />
      </div>

      {!isStreaming && content && (
        <div className="text-xs text-[var(--muted)] text-center pt-2">
          Review completed
        </div>
      )}
    </div>
  );
}
