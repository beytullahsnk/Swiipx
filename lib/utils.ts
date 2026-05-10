import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with proper deduplication.
 * Used by all shadcn components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
