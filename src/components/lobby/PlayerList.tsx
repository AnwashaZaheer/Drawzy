import type { Player } from './types';
import { PlayerCard } from './PlayerCard';
import { EmptyPlayerSlot } from './EmptyPlayerSlot';
import { EmptyState } from '../common/EmptyState';
export const PlayerList = ({ players, maxPlayers }: { players: Player[]; maxPlayers: number }) => <section><div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 className="text-2xl font-extrabold text-gray-900">Players</h2><span className="rounded-xl bg-indigo-100 px-3 py-1.5 text-sm font-extrabold text-indigo-700">{players.length} / {maxPlayers} Players</span></div>{players.length === 0 ? <EmptyState kind="players" /> : <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{players.map((player) => <PlayerCard key={player.id} player={player} />)}{Array.from({ length: Math.max(0, maxPlayers - players.length) }, (_, index) => <EmptyPlayerSlot key={'empty-' + index} />)}</div>}</section>;
