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
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6 max-w-md mx-auto w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ready to play?</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="nickname">
          Your nickname
        </label>
        <div className="relative">
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value.slice(0, 20))}
            placeholder="Enter your nickname..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-semibold text-gray-800 placeholder-gray-400"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
            {nickname.length}/20
          </span>
        </div>
      </div>

      <AvatarSelector selected={avatar} onSelect={setAvatar} />
    </div>
  );
};
