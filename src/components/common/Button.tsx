import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'ghost' | 'blue' | 'green'; size?: 'sm' | 'md' | 'lg'; fullWidth?: boolean; isLoading?: boolean; loadingLabel?: string; }

const variants: Record<string, string> = {
  primary: 'bg-crayon-yellow text-ink border-2 border-ink',
  secondary: 'bg-crayon-blue text-white border-2 border-ink',
  blue: 'bg-crayon-blue text-white border-2 border-ink',
  green: 'bg-crayon-green text-ink border-2 border-ink',
  ghost: 'bg-transparent text-ink border-2 border-dashed border-ink/40 hover:border-ink',
};

export const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', size = 'md', fullWidth, isLoading = false, loadingLabel = 'Loading', children, disabled, ...props }) => <button className={cn('inline-flex min-h-11 items-center justify-center rounded-2xl font-bold tracking-wide transition-all duration-150 active:translate-y-[3px] active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crayon-purple disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 select-none', variants[variant], 'shadow-[0_5px_0_0_var(--color-ink)]', {
  'px-4 py-2 text-sm': size === 'sm',
  'px-6 py-3 text-base': size === 'md',
  'px-8 py-4 text-lg': size === 'lg',
  'w-full': fullWidth,
}, className)} disabled={disabled || isLoading} aria-busy={isLoading || undefined} {...props}>{isLoading ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /><span>{loadingLabel}</span></> : children}</button>;