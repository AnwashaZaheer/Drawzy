import { ArrowLeft, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { LoadingState } from '../components/common/LoadingState';
import { fallbackLobby } from '../components/lobby/types';

const validCode = /^[A-Z0-9]{6}$/;

export const JoinRoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCode = (location.state as { roomCode?: string } | null)?.roomCode ?? '';
  const [roomCode, setRoomCode] = useState(initialCode);
  const [error, setError] = useState('');
  const [joining, setJoining] = useState(false);

  useEffect(() => () => undefined, []);

  const join = () => {
    const normalized = roomCode.trim().toUpperCase();
    if (!normalized) { setError('Enter a room code to continue.'); return; }
    if (!validCode.test(normalized)) { setError('Room codes use 6 letters or numbers.'); return; }
    setError('');
    setJoining(true);
    window.setTimeout(() => navigate('/lobby', { state: { ...fallbackLobby, roomCode: normalized } }), 500);
  };

  if ((location.state as { roomError?: boolean } | null)?.roomError) return <div className="min-h-screen bg-gray-50 p-4"><div className="mx-auto flex min-h-screen max-w-md items-center"><ErrorState kind="room" onBackHome={() => navigate('/')} /></div></div>;
  if (joining) return <div className="min-h-screen bg-gray-50 p-4"><div className="mx-auto flex min-h-screen max-w-md items-center"><LoadingState message="Joining your game..." /></div></div>;

  return <div className="min-h-screen bg-gray-50 px-4 py-8 font-sans sm:py-12"><main className="mx-auto w-full max-w-md"><Button variant="ghost" size="sm" onClick={() => navigate('/')} className="mb-7 gap-2"><ArrowLeft className="h-4 w-4" />Back to Home</Button><section className="rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-8"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600"><Users className="h-8 w-8" /></div><h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Join Game</h1><p className="mt-2 font-medium text-gray-600">Enter your friends' room code to join the fun.</p><label htmlFor="room-code" className="mt-7 block text-left text-sm font-extrabold text-gray-700">Room code</label><input id="room-code" value={roomCode} onChange={(event) => { setRoomCode(event.target.value.toUpperCase().slice(0, 6)); setError(''); }} onKeyDown={(event) => { if (event.key === 'Enter') join(); }} placeholder="ABC123" autoComplete="off" className="mt-2 w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-center font-extrabold tracking-[0.25em] text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20" aria-describedby={error ? 'room-code-error' : undefined} aria-invalid={Boolean(error)} />{error && <p id="room-code-error" role="alert" className="mt-2 text-left text-sm font-bold text-red-500">{error}</p>}<Button size="lg" fullWidth onClick={join} className="mt-6 gap-2"><Users className="h-5 w-5" />Join Game</Button></section></main></div>;
};
