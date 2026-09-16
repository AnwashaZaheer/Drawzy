import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md' | 'lg'; fullWidth?: boolean; isLoading?: boolean; loadingLabel?: string; }

export const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', size = 'md', fullWidth, isLoading = false, loadingLabel = 'Loading', children, disabled, ...props }) => <button className={cn('inline-flex min-h-11 items-center justify-center rounded-2xl font-bold transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50', { 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg': variant === 'primary', 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200': variant === 'secondary', 'bg-transparent text-gray-600 hover:bg-gray-100': variant === 'ghost', 'px-4 py-2 text-sm': size === 'sm', 'px-6 py-3 text-base': size === 'md', 'px-8 py-4 text-lg': size === 'lg', 'w-full': fullWidth }, className)} disabled={disabled || isLoading} aria-busy={isLoading || undefined} {...props}>{isLoading ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /><span>{loadingLabel}</span></> : children}</button>;
