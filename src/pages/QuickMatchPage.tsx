import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shuffle } from 'lucide-react';
import type { LobbyState, Player } from '../components/lobby/types';
import { avatars } from '../data/avatars';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const generateCode = () =>
  Array.from({ length: 6 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join('');

const STRANGER_NAMES = ['Nova', 'Pixel', 'Mira', 'Ziggy', 'Rio', 'Cleo', 'Frost', 'Luna', 'Dash', 'Rico', 'Juno', 'Onyx'];
const STATUSES = ['scouting for doodlers...', 'found a few suspicious artists...', 'rounding up your strangers...'];

interface QuickMatchRouteState {
  nickname?: string;
  avatar?: string;
}

export const QuickMatchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname, avatar } = (location.state as QuickMatchRouteState | null) ?? {};
  const name = nickname?.trim() ?? '';
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!name || !avatar) {
      navigate('/', { replace: true });
      return;
    }
    const statusTimers = STATUSES.slice(1).map((_, i) => window.setTimeout(() => setStatusIndex(i + 1), 500 * (i + 1)));
    const goTimer = window.setTimeout(() => {
      const me: Player = { id: 'player-' + Date.now(), name, avatar, isHost: true, isReady: true };
      const namePool = STRANGER_NAMES.filter((n) => n !== name);
      const avatarPool = avatars.filter((a) => a !== avatar);
      const strangers: Player[] = [];
      while (strangers.length < 3 && namePool.length && avatarPool.length) {
        const strangerName = namePool.splice(Math.floor(Math.random() * namePool.length), 1)[0];
        const strangerAvatar = avatarPool.splice(Math.floor(Math.random() * avatarPool.length), 1)[0];
        strangers.push({ id: 'stranger-' + Date.now() + '-' + strangers.length, name: strangerName, avatar: strangerAvatar, isHost: false, isReady: true });
      }
      const state: LobbyState = {
        roomCode: generateCode(),
        maxPlayers: 8,
        rounds: 3,
        drawingTime: 60,
        wordChoices: 3,
        language: 'English',
        isPrivate: false,
        players: [me, ...strangers],
      };
      navigate('/lobby', { replace: true, state });
    }, 500 * STATUSES.length);

    return () => {
      statusTimers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(goTimer);
    };
  }, [name, avatar, navigate]);

  return (
    <div className="min-h-screen dotted-paper flex flex-col items-center justify-center p-4">
      <div className="paper-card p-10 max-w-md w-full text-center rotate-[-0.5deg]">
        <div className="w-20 h-20 bg-crayon-purple border-2 border-ink rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_0_var(--color-ink)] rotate-6 animate-bounce-soft">
          <Shuffle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2 rotate-[1deg]">Play with Strangers</h1>
        <p className="text-ink/60 font-semibold mb-3">matching you up{name ? `, ${name}` : ''}...</p>
        <div className="mx-auto mt-3 h-3 w-48 rounded-full bg-ink/10 overflow-hidden">
          <div className="h-full bg-crayon-purple rounded-full animate-pulse transition-all" style={{ width: `${((statusIndex + 1) / STATUSES.length) * 100}%` }} />
        </div>
        <p className="mt-3 text-sm font-bold text-ink/60">{STATUSES[statusIndex]}</p>
      </div>
    </div>
  );
};