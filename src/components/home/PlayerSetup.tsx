import React from 'react';
import { AvatarSelector } from './AvatarSelector';

interface Props {
  nickname: string;
  setNickname: (name: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
}

export const PlayerSetup: React.FC<Props> = ({ nickname, setNickname, avatar, setAvatar }) => {
  return (
    <div className="paper-card p-6 sm:p-8 mb-6 max-w-md mx-auto w-full rotate-[-0.4deg]">
      <div className="flex items-center gap-3 mb-6 justify-center">
        <span className="w-3 h-3 rounded-full bg-crayon-pink border-2 border-ink" />
        <span className="w-3 h-3 rounded-full bg-crayon-yellow border-2 border-ink" />
        <span className="w-3 h-3 rounded-full bg-crayon-green border-2 border-ink" />
      </div>
      <h2 className="text-3xl font-bold mb-1 text-center rotate-[-1deg]">Ready to play?</h2>
      <p className="text-sm text-ink/60 text-center mb-6 font-medium rotate-[0.5deg]">give yourself a silly name & pick a doodle</p>

      <div className="mb-6">
        <label className="block text-sm font-bold text-ink mb-2 uppercase tracking-wide" htmlFor="nickname">
          Your nickname
        </label>
        <div className="relative">
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value.slice(0, 20))}
            placeholder="e.g. Captain Scribble"
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-ink focus:border-crayon-blue transition-colors outline-none font-semibold text-ink placeholder-ink/40 shadow-[inset_0_-3px_0_rgba(34,31,51,0.12)]"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/50">
            {nickname.length}/20
          </span>
        </div>
      </div>

      <AvatarSelector selected={avatar} onSelect={setAvatar} />
    </div>
  );
};