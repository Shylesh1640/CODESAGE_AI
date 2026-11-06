import type { ProgrammingLanguage, ReviewType, ValidationError } from '@/types/review';

const MAX_CODE_LENGTH = 20000;
const VALID_LANGUAGES: ProgrammingLanguage[] = [
  'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp',
  'go', 'rust', 'php', 'html', 'css', 'sql', 'other'
];
const VALID_REVIEW_TYPES: ReviewType[] = ['complete', 'bugs', 'security', 'performance', 'quality'];

export function validateReviewRequest(
  code: string,
  language: string,
  reviewType: string
): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  // Validate code
  const trimmedCode = code.trim();
  if (!trimmedCode) {
    errors.push({
      field: 'code',
      message: 'Please enter some code before starting your review.',
    });
  } else if (trimmedCode.length > MAX_CODE_LENGTH) {
    errors.push({
      field: 'code',
      message: `Your code exceeds the maximum allowed length of ${MAX_CODE_LENGTH.toLocaleString()} characters.`,
    });
  }

  // Validate language
  if (!language || !VALID_LANGUAGES.includes(language as ProgrammingLanguage)) {
    errors.push({
      field: 'language',
      message: 'Please select a valid programming language.',
    });
  }

  // Validate review type
  if (!reviewType || !VALID_REVIEW_TYPES.includes(reviewType as ReviewType)) {
    errors.push({
      field: 'reviewType',
      message: 'Please select a valid review type.',
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function isValidLanguage(language: string): language is ProgrammingLanguage {
  return VALID_LANGUAGES.includes(language as ProgrammingLanguage);
}

export function isValidReviewType(reviewType: string): reviewType is ReviewType {
  return VALID_REVIEW_TYPES.includes(reviewType as ReviewType);
}

export const MAX_CODE_LENGTH_CONST = MAX_CODE_LENGTH;
