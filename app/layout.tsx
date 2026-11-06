import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CodeSage AI - AI-Powered Code Review',
  description: 'Understand your code. Find bugs. Write better software. Get instant AI-powered code reviews with actionable insights.',
  keywords: 'code review, AI, debugging, security audit, performance analysis, code quality',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
