import React from 'react';
import { avatars } from '../../data/avatars';
import { cn } from '../../utils/cn';
interface Props { selected: string; onSelect: (avatar: string) => void; }
const slotTints = ['bg-crayon-pink/20', 'bg-crayon-blue/20', 'bg-crayon-green/20', 'bg-crayon-yellow/25', 'bg-crayon-purple/20'];
export const AvatarSelector: React.FC<Props> = ({ selected, onSelect }) => (
  <div>
    <label className="mb-3 block text-sm font-bold text-ink uppercase tracking-wide">Pick your doodle avatar</label>
    <div className="flex flex-wrap justify-center gap-2.5">
      {avatars.map((avatar, i) => (
        <button
          key={avatar}
          type="button"
          aria-label={'Choose avatar ' + avatar}
          aria-pressed={selected === avatar}
          onClick={() => onSelect(avatar)}
          className={cn(
            'rounded-2xl p-2 text-3xl border-2 border-ink transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crayon-purple',
            slotTints[i % slotTints.length],
            selected === avatar
              ? 'scale-110 rotate-6 shadow-[3px_3px_0_0_var(--color-ink)]'
              : 'hover:scale-105 hover:-rotate-3 hover:shadow-[2px_2px_0_0_var(--color-ink)]'
          )}
        >
          {avatar}
        </button>
      ))}
    </div>
    <p className="mt-2 text-xs text-ink/50 text-center font-medium">the others will see this one, choose wisely 😉</p>
  </div>
);