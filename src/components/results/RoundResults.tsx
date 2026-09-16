import { ArrowRight, PartyPopper } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { RoundScoreCard, type RoundScore } from './RoundScoreCard';

const mockResults: RoundScore[] = [{ id: '1', name: 'Abid', avatar: '😀', points: 100, totalScore: 220 }, { id: '3', name: 'Sarah', avatar: '🐱', points: 80, totalScore: 140 }, { id: '2', name: 'Alex', avatar: '😎', points: 60, totalScore: 140 }, { id: '4', name: 'John', avatar: '🦊', points: 40, totalScore: 80 }];
export interface ResultsState { word?: string; players?: RoundScore[]; round?: number; rounds?: number; roomCode?: string; drawingTime?: number; maxPlayers?: number; wordChoices?: number; language?: string; isPrivate?: boolean; }
export interface RoundResultsProps { word?: string; results?: RoundScore[]; gameState?: ResultsState; }

export const RoundResults = ({ word, results, gameState }: RoundResultsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = gameState ?? (location.state as ResultsState | null) ?? {};
  const revealedWord = word ?? state.word ?? 'ROCKET';
  const rankedResults = [...(results ?? state.players ?? mockResults)].sort((first, second) => second.points - first.points);
  const nextState = { ...state, players: rankedResults.map((player) => ({ id: player.id, name: player.name, avatar: player.avatar, score: player.totalScore, isDrawer: false })), round: (state.round ?? 1) + 1 };
  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-4 py-10 font-sans"><span className="absolute left-[13%] top-[18%] h-3 w-3 animate-bounce rounded-full bg-yellow-300" aria-hidden="true" /><span className="absolute right-[14%] top-[27%] h-2.5 w-2.5 animate-pulse rounded-full bg-pink-300" aria-hidden="true" /><span className="absolute bottom-[18%] left-[20%] h-3 w-3 rotate-45 bg-indigo-200" aria-hidden="true" /><section className="relative w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-lg shadow-indigo-100/50 sm:p-8"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600"><PartyPopper className="h-7 w-7" /></div><h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Round Complete!</h1><p className="mt-3 text-sm font-bold text-gray-500">The word was</p><p className="mt-1 text-3xl font-extrabold tracking-[0.14em] text-indigo-600 sm:text-4xl">{revealedWord.toUpperCase()}</p><ol className="mt-7 space-y-3 text-left">{rankedResults.map((player, index) => <RoundScoreCard key={player.id} player={player} rank={index + 1} />)}</ol><div className="mt-7 space-y-3"><Button size="lg" fullWidth onClick={() => navigate('/game', { state: nextState })} className="gap-2 text-lg">Next Round <ArrowRight className="h-5 w-5" /></Button><Button variant="ghost" fullWidth onClick={() => navigate('/')} className="text-sm">Leave Game</Button></div></section></main>;
};
