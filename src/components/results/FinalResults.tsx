import { ArrowRight, Home, Trophy } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import type { ResultsState } from './RoundResults';

export interface FinalScore { id: string; name: string; avatar: string; score: number; }
const mockLeaderboard: FinalScore[] = [{ id: '1', name: 'Abid', avatar: '😀', score: 420 }, { id: '3', name: 'Sarah', avatar: '🐱', score: 350 }, { id: '2', name: 'Alex', avatar: '😎', score: 290 }, { id: '4', name: 'John', avatar: '🦊', score: 210 }];
export interface FinalResultsProps { leaderboard?: FinalScore[]; gameState?: ResultsState; }

export const FinalResults = ({ leaderboard, gameState }: FinalResultsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = gameState ?? (location.state as ResultsState | null) ?? {};
  const incoming = leaderboard ?? state.players?.map((player) => ({ id: player.id, name: player.name, avatar: player.avatar, score: player.totalScore })) ?? mockLeaderboard;
  const standings = [...incoming].sort((first, second) => second.score - first.score);
  const winner = standings[0];
  const playAgainState = { ...state, round: 1, players: standings.map((player, index) => ({ ...player, isDrawer: index === 0 })) };
  const medals = ['🥇', '🥈', '🥉'];
  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-4 py-10 font-sans"><span className="absolute left-[12%] top-[16%] h-3 w-3 animate-bounce rounded-full bg-yellow-300" aria-hidden="true" /><span className="absolute right-[14%] top-[21%] h-3 w-3 animate-pulse rounded-full bg-pink-300" aria-hidden="true" /><span className="absolute bottom-[14%] left-[17%] h-3 w-3 rotate-45 bg-indigo-200" aria-hidden="true" /><section className="relative w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-lg shadow-indigo-100/50 sm:p-8"><h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Game Over!</h1><div className="mt-5 rounded-3xl border border-yellow-200 bg-yellow-50 p-5"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-yellow-500 shadow-sm"><Trophy className="h-6 w-6" /></div><p className="mt-3 text-sm font-extrabold text-yellow-700">🏆 Winner</p><div className="mt-3 text-6xl" role="img" aria-label={winner.name + "'s avatar"}>{winner.avatar}</div><h2 className="mt-2 text-2xl font-extrabold tracking-wide text-gray-900">{winner.name.toUpperCase()}</h2><p className="mt-1 text-sm font-extrabold tracking-[0.12em] text-indigo-600">{winner.score} POINTS</p></div><section className="mt-7 text-left" aria-labelledby="leaderboard-heading"><h3 id="leaderboard-heading" className="mb-3 text-lg font-extrabold text-gray-900">Final Leaderboard</h3><ol className="space-y-2">{standings.map((player, index) => <li key={player.id} className={['flex items-center gap-3 rounded-2xl border px-4 py-3', index === 0 ? 'border-yellow-200 bg-yellow-50' : 'border-gray-100 bg-white'].join(' ')}><span className="w-7 text-xl">{medals[index] ?? (index + 1) + '.'}</span><span className="text-2xl">{player.avatar}</span><span className="flex-1 font-extrabold text-gray-800">{player.name}</span><span className="font-extrabold text-indigo-700">{player.score}</span></li>)}</ol></section><p className="mt-6 text-sm font-medium text-gray-500">Great game! Ready for another round?</p><div className="mt-5 space-y-3"><Button size="lg" fullWidth onClick={() => navigate('/game', { state: playAgainState })} className="gap-2 text-lg">Play Again <ArrowRight className="h-5 w-5" /></Button><Button variant="secondary" fullWidth onClick={() => navigate('/')} className="gap-2"><Home className="h-4 w-4" />Back to Home</Button></div></section></main>;
};
