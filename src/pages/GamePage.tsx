import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chat } from '../components/game/Chat';
import type { ChatEntry } from '../components/game/ChatMessage';
import { DrawingCanvas } from '../components/game/DrawingCanvas';
import { DrawingToolbar } from '../components/game/DrawingToolbar';
import { GameHeader } from '../components/game/GameHeader';
import { PlayerSidebar } from '../components/game/PlayerSidebar';
import { WordDisplay } from '../components/game/WordDisplay';
import { WordSelector } from '../components/game/WordSelector';
import { mockPlayers, type BrushSize, type GameRouteState, type Tool } from '../components/game/types';

const initialMessages: ChatEntry[] = [{ id: '1', name: 'Alex', text: 'Is it a house?' }, { id: '2', name: 'Sarah', text: 'Is it a car?' }, { id: '3', name: 'John', text: 'Rocket?' }, { id: '4', name: 'System', text: '🎉 Sarah guessed correctly!', system: true }];

export const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const route = useMemo(() => (location.state as GameRouteState | null) ?? {}, [location.state]);
  const round = route.round ?? 1;
  const totalRounds = route.rounds ?? 3;
  const [isDrawer, setIsDrawer] = useState(true);
  const [word, setWord] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(route.drawingTime ?? 60);
  const [tool, setTool] = useState<Tool>('brush');
  const [color, setColor] = useState('#1f2937');
  const [size, setSize] = useState<BrushSize>('medium');
  const [undo, setUndo] = useState(false);
  const [redo, setRedo] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const completedRef = useRef(false);
  const actions = useRef<{ undo: () => void; redo: () => void; clear: () => void } | null>(null);
  const players = route.players?.map((player, index) => ({ ...player, score: player.score ?? [120, 80, 60, 40][index] ?? 0, isDrawer: index === 0 })) ?? mockPlayers;
  const status = timeLeft === 0 ? 'Time’s up!' : word ? (isDrawer ? 'Drawing in progress' : 'Guess the word') : 'Choosing a word';

  useEffect(() => {
    if (!word || timeLeft === 0) return undefined;
    const id = window.setInterval(() => setTimeLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(id);
  }, [word, timeLeft]);
  useEffect(() => {
    if (timeLeft !== 0 || completedRef.current) return;
    completedRef.current = true;
    const results = players.map((player, index) => ({ id: player.id, name: player.name, avatar: player.avatar, points: [100, 80, 60, 40][index] ?? 20, totalScore: player.score + ([100, 80, 60, 40][index] ?? 20) }));
    const state = { ...route, players: results, round, rounds: totalRounds, word: word ?? 'ROCKET' };
    window.setTimeout(() => navigate(round >= totalRounds ? '/final-results' : '/round-results', { state }), 600);
  }, [navigate, players, round, route, timeLeft, totalRounds, word]);

  const send = (text: string) => {
    const correct = word !== null && text.toLowerCase() === word.toLowerCase();
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    setMessages((current) => [...current, { id, name: 'You', text }, ...(correct ? [{ id: id + '-correct', name: 'System', text: '🎉 You guessed correctly!', system: true }] : [])]);
  };
  const selectWord = (selected: string) => { setWord(selected); setTimeLeft(route.drawingTime ?? 60); completedRef.current = false; };

  return <div className="min-h-screen bg-gray-50 font-sans"><GameHeader round={round} totalRounds={totalRounds} timeLeft={timeLeft} status={status} /><main className="mx-auto max-w-[1500px] p-3 sm:p-5"><div className="mb-4 lg:hidden"><PlayerSidebar players={players} /></div><div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)_310px]"><div className="hidden lg:block"><PlayerSidebar players={players} /></div><section className="min-w-0 space-y-4"><div className="flex justify-end"><button type="button" onClick={() => setIsDrawer((value) => !value)} className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-extrabold text-gray-600 transition hover:bg-indigo-100 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Demo: {isDrawer ? 'Drawer mode' : 'Guesser mode'}</button></div>{isDrawer && !word ? <WordSelector onSelect={selectWord} /> : <><DrawingCanvas tool={tool} color={color} size={size} disabled={!isDrawer || !word || timeLeft === 0} actionsRef={actions} onHistoryChange={(canUndo, canRedo) => { setUndo(canUndo); setRedo(canRedo); }} /><DrawingToolbar tool={tool} color={color} size={size} onTool={setTool} onColor={setColor} onSize={setSize} onUndo={() => actions.current?.undo()} onRedo={() => actions.current?.redo()} onClear={() => actions.current?.clear()} disabled={!isDrawer || !word || timeLeft === 0} canUndo={undo} canRedo={redo} /><WordDisplay isDrawer={isDrawer} drawerName={players.find((player) => player.isDrawer)?.name ?? 'Alex'} word={word} status={status} /></>}</section><Chat messages={messages} onSend={send} /></div></main></div>;
};

