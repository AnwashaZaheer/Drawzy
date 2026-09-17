import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import type { LobbyState, Player } from '../components/lobby/types';

interface JoinRouteState {
  roomCode?: string;
  nickname?: string;
  avatar?: string;
}

export const JoinRoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode, nickname, avatar } = (location.state as JoinRouteState | null) ?? {};
  const name = nickname?.trim() ?? '';

  useEffect(() => {
    if (!roomCode || !name || !avatar) {
      navigate('/', { replace: true });
      return;
    }
    const player: Player = { id: 'player-' + Date.now(), name, avatar, isHost: false, isReady: true };
    const state: LobbyState = {
      roomCode,
      maxPlayers: 8,
      rounds: 3,
      drawingTime: 60,
      wordChoices: 3,
      language: 'English',
      isPrivate: true,
      players: [player],
    };
    navigate('/lobby', { replace: true, state });
  }, [roomCode, name, avatar, navigate]);

  return (
    <div className="min-h-screen dotted-paper flex flex-col items-center justify-center p-4">
      <div className="paper-card p-10 max-w-md w-full text-center rotate-[1deg]">
        <div className="w-20 h-20 bg-crayon-blue border-2 border-ink rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_0_var(--color-ink)] -rotate-6 animate-bounce-soft">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2 rotate-[1deg]">Join Game</h1>
        <p className="text-ink/60 font-semibold mb-3">joining room {roomCode ?? '...'} as {name || '...'}</p>
        <div className="mx-auto mt-3 h-3 w-48 rounded-full bg-ink/10 overflow-hidden">
          <div className="h-full w-1/2 bg-crayon-green rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};