import type { GamePlayer } from './types';
export const PlayerCard = ({ player }: { player: GamePlayer }) => <article className={`min-w-36 rounded-2xl border p-3 transition-all ${player.isDrawer ? 'border-indigo-300 bg-indigo-50 shadow-sm' : 'border-gray-100 bg-white'}`}><div className="flex items-start justify-between"><span className="text-2xl">{player.avatar}</span>{player.isDrawer && <span className="rounded-lg bg-indigo-600 px-2 py-0.5 text-xs font-extrabold text-white">Drawing</span>}</div><h3 className="mt-2 font-extrabold text-gray-800">{player.name}</h3><p className="text-sm font-bold text-gray-500">{player.score} pts</p></article>;


