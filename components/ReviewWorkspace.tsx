'use client';

import { useState, useRef } from 'react';
import LanguageSelector from './LanguageSelector';
import ReviewTypeSelector from './ReviewTypeSelector';
import CodeEditor from './CodeEditor';
import ReviewResults from './ReviewResults';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { validateReviewRequest } from '@/lib/validation';
import type { ProgrammingLanguage, ReviewType } from '@/types/review';
import { Sparkles, RotateCcw } from 'lucide-react';

const EXAMPLE_CODE = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}`;

export default function ReviewWorkspace() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<ProgrammingLanguage>('javascript');
  const [reviewType, setReviewType] = useState<ReviewType>('complete');
  const [context, setContext] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleReview = async () => {
    // Reset states
    setError('');
    setValidationErrors([]);
    setReviewContent('');

    // Validate
    const validation = validateReviewRequest(code, language, reviewType);
    if (!validation.valid) {
      setValidationErrors(validation.errors.map((e) => e.message));
      return;
    }

    // Start review
    setIsReviewing(true);
    setIsStreaming(true);

    // Create abort controller for cancellation
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim(),
          language,
          reviewType,
          context: context.trim() || undefined,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 'Unable to connect to the AI service. Please try again.'
        );
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;
        setReviewContent(accumulatedContent);
      }

      setIsStreaming(false);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Review cancelled');
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
      setReviewContent('');
    } finally {
      setIsReviewing(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleClear = () => {
    setCode('');
    setContext('');
    setReviewContent('');
    setError('');
    setValidationErrors([]);
  };

  const handleLoadExample = () => {
    setCode(EXAMPLE_CODE);
    setLanguage('javascript');
    setReviewType('bugs');
  };

  const handleRetry = () => {
    setError('');
    handleReview();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Code Input */}
        <div className="space-y-6">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Code Input</h2>

            <div className="space-y-4">
              <LanguageSelector value={language} onChange={setLanguage} />

              <ReviewTypeSelector value={reviewType} onChange={setReviewType} />

              <CodeEditor
                value={code}
                onChange={setCode}
                placeholder="Paste your code here..."
              />

              <div className="space-y-2">
                <label htmlFor="context" className="block text-sm font-medium text-[var(--foreground)]">
                  Context (Optional)
                </label>
                <textarea
                  id="context"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Describe what your code is supposed to do..."
                  className="w-full h-20 px-4 py-3 bg-[var(--input)] text-[var(--foreground)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm resize-none transition-all"
                />
              </div>

              {validationErrors.length > 0 && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  {validationErrors.map((error, index) => (
                    <p key={index} className="text-sm text-[var(--error)]">
                      {error}
                    </p>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleReview}
                  disabled={isReviewing}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5" />
                  {isReviewing ? 'Reviewing...' : 'Review Code'}
                </button>

                <button
                  onClick={handleClear}
                  disabled={isReviewing}
                  className="px-6 py-3 bg-[var(--input)] hover:bg-[var(--card-hover)] text-[var(--foreground)] font-medium border border-[var(--border)] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {!code && (
                <button
                  onClick={handleLoadExample}
                  className="w-full px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] border border-dashed border-[var(--border)] rounded-lg transition-colors"
                >
                  Load Example Code
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="space-y-6">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 min-h-[600px]">
            {error ? (
              <ErrorState message={error} onRetry={handleRetry} />
            ) : isReviewing && !reviewContent ? (
              <LoadingState onCancel={handleCancel} />
            ) : (
              <ReviewResults content={reviewContent} isStreaming={isStreaming} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
