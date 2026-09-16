import { Palette } from 'lucide-react';
const colors = ['#1f2937', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff'];
export const ColorPicker = ({ color, onChange, disabled }: { color: string; onChange: (color: string) => void; disabled: boolean }) => <div className="flex items-center gap-1.5"><Palette className="h-4 w-4 text-gray-500" />{colors.map((item) => <button key={item} type="button" disabled={disabled} onClick={() => onChange(item)} aria-label={`Use ${item}`} className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 disabled:opacity-40 ${color === item ? 'border-indigo-600 scale-110' : 'border-gray-200'}`} style={{ backgroundColor: item }} />)}</div>;




