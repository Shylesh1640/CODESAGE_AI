export type ProgrammingLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'c'
  | 'cpp'
  | 'csharp'
  | 'go'
  | 'rust'
  | 'php'
  | 'html'
  | 'css'
  | 'sql'
  | 'other';

export type ReviewType =
  | 'complete'
  | 'bugs'
  | 'security'
  | 'performance'
  | 'quality';

export interface ReviewRequest {
  code: string;
  language: ProgrammingLanguage;
  reviewType: ReviewType;
  context?: string;
}

export interface ReviewResponse {
  content: string;
  completed: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export const PROGRAMMING_LANGUAGES: { value: ProgrammingLanguage; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'other', label: 'Other' },
];

export const REVIEW_TYPES: { value: ReviewType; label: string; description: string }[] = [
  {
    value: 'complete',
    label: 'Complete Review',
    description: 'Comprehensive analysis covering all aspects',
  },
  {
    value: 'bugs',
    label: 'Bug Detection',
    description: 'Focus on logical errors and potential bugs',
  },
  {
    value: 'security',
    label: 'Security Audit',
    description: 'Identify security vulnerabilities and risks',
  },
  {
    value: 'performance',
    label: 'Performance Analysis',
    description: 'Analyze performance bottlenecks and optimizations',
  },
  {
    value: 'quality',
    label: 'Code Quality',
    description: 'Review readability, maintainability, and best practices',
  },
];
