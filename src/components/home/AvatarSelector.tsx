import React from 'react';
import { avatars } from '../../data/avatars';
import { cn } from '../../utils/cn';

interface Props {
  selected: string;
  onSelect: (avatar: string) => void;
}

export const AvatarSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-gray-700 mb-3">Choose your avatar</label>
      <div className="flex flex-wrap gap-3 justify-center">
        {avatars.map((avatar) => (
          <button
            key={avatar}
            onClick={() => onSelect(avatar)}
            className={cn(
              "text-3xl p-2 rounded-2xl transition-all",
              selected === avatar
                ? "bg-indigo-100 ring-4 ring-indigo-500 scale-110"
                : "bg-gray-50 hover:bg-gray-100 hover:scale-105"
            )}
          >
            {avatar}
          </button>
        ))}
      </div>
    </div>
  );
};
