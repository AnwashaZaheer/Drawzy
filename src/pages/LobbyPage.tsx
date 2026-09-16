import { Gamepad2, Pencil } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { GameSettingsSummary } from '../components/lobby/GameSettingsSummary';
import { InviteButton } from '../components/lobby/InviteButton';
import { LobbyHeader } from '../components/lobby/LobbyHeader';
import { PlayerList } from '../components/lobby/PlayerList';
import { RoomCodeCard } from '../components/lobby/RoomCodeCard';
import { fallbackLobby, type LobbyState } from '../components/lobby/types';

export const LobbyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = location.state as Partial<LobbyState> | null;
  const [copyError, setCopyError] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!incoming?.roomCode) return <div className="min-h-screen bg-gray-50 p-4"><div className="mx-auto flex min-h-screen max-w-md items-center"><ErrorState kind="room" onBackHome={() => navigate('/')} /></div></div>;

  const state: LobbyState = { ...fallbackLobby, ...incoming, players: incoming.players ?? fallbackLobby.players };
  const players = state.players ?? [];
  const copy = async (text: string, kind: 'code' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      const setCopied = kind === 'code' ? setCopiedCode : setCopiedLink;
      setCopied(true); setCopyError('');
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setCopyError('Unable to copy. Please copy manually.'); }
  };

  return <div className="min-h-screen bg-gray-50 font-sans selection:bg-indigo-200"><LobbyHeader onBack={() => navigate('/')} /><main className="mx-auto w-full max-w-5xl px-4 pb-10 pt-7 sm:px-6 sm:pt-10"><div className="relative mb-8 text-center sm:mb-10"><Pencil className="absolute -top-3 left-[20%] h-6 w-6 -rotate-25 text-yellow-400" aria-hidden="true" /><h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">You're in the game!</h1><p className="mt-3 text-base font-medium text-gray-600 sm:text-lg">Invite your friends and get ready to draw.</p></div><div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]"><div className="space-y-6"><RoomCodeCard code={state.roomCode} copied={copiedCode} onCopy={() => void copy(state.roomCode, 'code')} /><PlayerList players={players} maxPlayers={state.maxPlayers} /></div><div className="space-y-5"><GameSettingsSummary settings={state} /><InviteButton copied={copiedLink} onCopy={() => void copy('https://doodlerush.com/room/' + state.roomCode, 'link')} /><div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"><Button size="lg" fullWidth onClick={() => navigate('/game', { state: { ...state, players } })} className="gap-2 text-lg"><Gamepad2 className="h-5 w-5" />Start Game</Button><p className="mt-3 text-center text-sm font-medium text-gray-500">All players can join before the game starts.</p></div>{copyError && <p role="alert" className="text-center text-sm font-bold text-red-500">{copyError}</p>}</div></div><button type="button" onClick={() => navigate('/')} className="mx-auto mt-10 block min-h-11 text-sm font-bold text-gray-500 transition-colors hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">← Leave Room</button></main></div>;
};
