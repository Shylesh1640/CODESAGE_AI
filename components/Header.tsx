'use client';

import { Code2, Github } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--foreground)]">CodeSage AI</h1>
              <p className="text-sm text-[var(--muted)]">Understand your code. Find bugs. Write better software.</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <a
              href="#review"
              className="px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              Review Code
            </a>
            <a
              href="#about"
              className="px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              About
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
