'use client';

import { formatCharacterCount } from '@/lib/utils';
import { MAX_CODE_LENGTH_CONST } from '@/lib/validation';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CodeEditor({ value, onChange, placeholder }: CodeEditorProps) {
  const characterCount = value.length;
  const isNearLimit = characterCount > MAX_CODE_LENGTH_CONST * 0.9;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="code" className="block text-sm font-medium text-[var(--foreground)]">
          Your Code
        </label>
        <span
          className={`text-xs ${
            isNearLimit ? 'text-[var(--warning)]' : 'text-[var(--muted)]'
          }`}
        >
          {formatCharacterCount(characterCount, MAX_CODE_LENGTH_CONST)}
        </span>
      </div>
      <textarea
        id="code"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Paste your code here...'}
        className="w-full h-64 px-4 py-3 bg-[var(--input)] text-[var(--foreground)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-mono text-sm resize-y transition-all"
        spellCheck={false}
      />
    </div>
  );
}
