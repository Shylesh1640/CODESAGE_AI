'use client';

import { PROGRAMMING_LANGUAGES } from '@/types/review';
import type { ProgrammingLanguage } from '@/types/review';

interface LanguageSelectorProps {
  value: ProgrammingLanguage;
  onChange: (language: ProgrammingLanguage) => void;
}

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="language" className="block text-sm font-medium text-[var(--foreground)]">
        Programming Language
      </label>
      <select
        id="language"
        value={value}
        onChange={(e) => onChange(e.target.value as ProgrammingLanguage)}
        className="w-full px-4 py-2.5 bg-[var(--input)] text-[var(--foreground)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
      >
        {PROGRAMMING_LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
