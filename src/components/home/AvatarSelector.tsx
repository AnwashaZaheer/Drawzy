import React from 'react';
import { avatars } from '../../data/avatars';
import { cn } from '../../utils/cn';
interface Props { selected: string; onSelect: (avatar: string) => void; }
export const AvatarSelector: React.FC<Props> = ({ selected, onSelect }) => <div className="mb-6"><label className="mb-3 block text-sm font-bold text-gray-700">Choose your avatar</label><div className="flex flex-wrap justify-center gap-3">{avatars.map((avatar) => <button key={avatar} type="button" aria-label={'Choose avatar ' + avatar} aria-pressed={selected === avatar} onClick={() => onSelect(avatar)} className={cn('rounded-2xl p-2 text-3xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600', selected === avatar ? 'scale-110 bg-indigo-100 ring-4 ring-indigo-500' : 'bg-gray-50 hover:scale-105 hover:bg-gray-100')}>{avatar}</button>)}</div></div>;
