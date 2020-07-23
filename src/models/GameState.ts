import { PlayerState } from './PlayerState';
import { RoundState } from './Rounds/RoundState';

export type GameState = {
    episode: number,
    currentPlayers: number[],
    currentPlayer: number,
    roundState: RoundState,
    players: PlayerState[],
    timerIsRunning: boolean,
};
