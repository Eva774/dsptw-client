import { RoundState } from './Rounds/RoundState';
import { PresenterState } from './PresenterState';

export type GameState = {
    roundNumber: 0,
    roundState: RoundState,
    presenters: PresenterState[],
};
