import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Ticket } from 'lucide-react';

export const QuickJoin = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const handleJoin = (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!normalized) { setError('Enter a room code'); return; }
    if (!/^[A-Z0-9]{6}$/.test(normalized)) { setError('Use 6 letters or numbers'); return; }
    navigate('/join', { state: { roomCode: normalized } });
  };
  return (
    <div className="mx-auto mt-8 w-full max-w-md text-center bg-white border-2 border-dashed border-ink/50 rounded-3xl p-4 rotate-[0.3deg]">
      <p className="mb-3 text-sm font-bold text-ink flex items-center justify-center gap-2">
        <Ticket className="w-4 h-4 text-crayon-orange" />
        got a room code? tap it in fast
      </p>
      <form onSubmit={handleJoin} className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <div className="relative flex-1">
          <label className="sr-only" htmlFor="quick-room-code">Room code</label>
          <input
            id="quick-room-code"
            value={code}
            onChange={(event) => { setCode(event.target.value.toUpperCase().slice(0, 6)); setError(''); }}
            placeholder="ABC123"
            className="w-full rounded-xl bg-canvas border-2 border-ink px-4 py-2 text-center font-bold uppercase tracking-widest text-ink placeholder-ink/40 outline-none focus:border-crayon-green shadow-[inset_0_-3px_0_rgba(34,31,51,0.1)]"
            aria-invalid={Boolean(error)}
          />
          {error && <span className="mt-1 block text-xs font-bold text-crayon-red sm:absolute sm:-bottom-5 sm:left-0 sm:right-0">{error}</span>}
        </div>
        <Button type="submit" variant="green" size="sm" className="rounded-xl px-6">Join!</Button>
      </form>
    </div>
  );
};