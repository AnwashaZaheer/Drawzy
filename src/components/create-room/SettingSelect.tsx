import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SettingSelectProps<T extends string | number> { label: string; options: readonly T[]; value: T; onChange: (value: T) => void; formatOption?: (option: T) => string; }

export const SettingSelect = <T extends string | number>({ label, options, value, onChange, formatOption = String }: SettingSelectProps<T>) => (
  <fieldset><legend className="mb-3 text-sm font-extrabold text-gray-800">{label}</legend><div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">{options.map((option) => { const isSelected = value === option; return <button key={option} type="button" aria-pressed={isSelected} onClick={() => onChange(option)} className={cn('relative min-h-11 rounded-xl border px-3 py-2 text-sm font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600', isSelected ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700')}>{formatOption(option)}{isSelected && <Check className="absolute right-1.5 top-1.5 h-3.5 w-3.5" aria-hidden="true" />}</button>; })}</div></fieldset>
);

