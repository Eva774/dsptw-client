import { RoundState } from './Rounds/RoundState';
import { PresenterState } from './PresenterState';

export type GameState = {
    roundNumber: number,
    roundState: RoundState,
    presenters: PresenterState[],
};
