import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import type { LobbyState, Player } from '../components/lobby/types';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const generateCode = () =>
  Array.from({ length: 6 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join('');

export const CreateRoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname, avatar } = (location.state as { nickname?: string; avatar?: string } | null) ?? {};
  const host = nickname?.trim() ?? '';

  useEffect(() => {
    if (!host || !avatar) {
      navigate('/', { replace: true });
      return;
    }
    const hostPlayer: Player = { id: 'host-' + Date.now(), name: host, avatar, isHost: true, isReady: true };
    const state: LobbyState = {
      roomCode: generateCode(),
      maxPlayers: 8,
      rounds: 3,
      drawingTime: 60,
      wordChoices: 3,
      language: 'English',
      isPrivate: true,
      players: [hostPlayer],
    };
    navigate('/lobby', { replace: true, state });
  }, [host, avatar, navigate]);

  return (
    <div className="min-h-screen dotted-paper flex flex-col items-center justify-center p-4">
      <div className="paper-card p-10 max-w-md w-full text-center rotate-[-1deg]">
        <div className="w-20 h-20 bg-crayon-pink border-2 border-ink rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_0_var(--color-ink)] rotate-6 animate-bounce-soft">
          <Pencil className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2 rotate-[-1deg]">Create Game</h1>
        <p className="text-ink/60 font-semibold mb-3">setting up your room{host ? `, ${host}` : ''}...</p>
        <div className="mx-auto mt-3 h-3 w-48 rounded-full bg-ink/10 overflow-hidden">
          <div className="h-full w-1/2 bg-crayon-blue rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};