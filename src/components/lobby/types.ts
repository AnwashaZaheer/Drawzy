export interface Player { id: string; name: string; avatar: string; isHost: boolean; isReady: boolean; }
export interface GameSettings { maxPlayers: number; rounds: number; drawingTime: number; wordChoices: number; language: string; isPrivate: boolean; }
export interface LobbyState extends GameSettings { roomCode: string; players?: Player[]; }
export const mockPlayers: Player[] = [{ id: '1', name: 'Abid', avatar: '\u{1F600}', isHost: true, isReady: true }, { id: '2', name: 'Alex', avatar: '\u{1F60E}', isHost: false, isReady: true }, { id: '3', name: 'Sarah', avatar: '\u{1F431}', isHost: false, isReady: true }, { id: '4', name: 'John', avatar: '\u{1F98A}', isHost: false, isReady: false }];
export const fallbackLobby: LobbyState = { roomCode: 'X7K92P', maxPlayers: 8, rounds: 3, drawingTime: 60, wordChoices: 3, language: 'English', isPrivate: true, players: mockPlayers };
