import Header from '@/components/Header';
import ReviewWorkspace from '@/components/ReviewWorkspace';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Header />
      <section id="review">
        <ReviewWorkspace />
      </section>

      <section id="about" className="container mx-auto px-4 py-16 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            About CodeSage AI
          </h2>
          <p className="text-[var(--muted)] mb-6">
            CodeSage AI is an advanced AI-powered code review tool designed to help developers write
            better, safer, and more efficient code. Using state-of-the-art language models, we analyze
            your code for bugs, security vulnerabilities, performance issues, and code quality concerns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-lg">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Bug Detection</h3>
              <p className="text-sm text-[var(--muted)]">
                Identify logical errors and potential runtime issues before they reach production
              </p>
            </div>
            <div className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-lg">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Security Analysis</h3>
              <p className="text-sm text-[var(--muted)]">
                Detect vulnerabilities and security risks following industry best practices
              </p>
            </div>
            <div className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-lg">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Performance Tips</h3>
              <p className="text-sm text-[var(--muted)]">
                Get actionable recommendations to optimize your code for better performance
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--card)] mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-[var(--muted)]">
            <p>© 2024 CodeSage AI. Built with Next.js and OpenAI.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
