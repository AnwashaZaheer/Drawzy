import React, { useState } from 'react';
import { Button } from '../common/Button';

export const QuickJoin = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Enter a code');
      return;
    }
    setError('');
    // Mock join
    alert(`Joining room: ${code}`);
  };

  return (
    <div className="max-w-md mx-auto w-full mt-8 text-center">
      <p className="text-sm font-bold text-gray-500 mb-3">Have a room code?</p>
      <form onSubmit={handleJoin} className="flex gap-2 justify-center max-w-xs mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
            placeholder="ABC123"
            className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none font-bold text-center uppercase tracking-widest text-gray-800"
          />
          {error && <span className="absolute -bottom-5 left-0 right-0 text-xs text-red-500 font-bold">{error}</span>}
        </div>
        <Button type="submit" size="sm" className="px-6 rounded-xl">Join</Button>
      </form>
    </div>
  );
};
