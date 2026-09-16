export interface GamePlayer { id: string; name: string; avatar: string; score: number; isDrawer: boolean; }
export interface GameSettings { maxPlayers: number; rounds: number; drawingTime: number; wordChoices: number; language: string; isPrivate: boolean; }
export interface GameRouteState extends Partial<GameSettings> { roomCode?: string; players?: GamePlayer[]; round?: number; }
export type Tool = 'brush' | 'eraser'; export type BrushSize = 'small' | 'medium' | 'large';
export const mockPlayers: GamePlayer[] = [{ id: '1', name: 'Abid', avatar: '😀', score: 120, isDrawer: true }, { id: '2', name: 'Alex', avatar: '😎', score: 80, isDrawer: false }, { id: '3', name: 'Sarah', avatar: '🐱', score: 60, isDrawer: false }, { id: '4', name: 'John', avatar: '🦊', score: 40, isDrawer: false }];
