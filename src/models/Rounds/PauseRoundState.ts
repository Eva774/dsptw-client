import { RoundType } from '../RoundType';

export type PauseRoundState = {
    roundName: string,
    roundType: RoundType,
    targetTime: Date,
};