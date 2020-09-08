import { RoundType } from '../RoundType';

export type WelcomeRoundState = {
    roundName: string,
    roundType: RoundType,
    targetTime: Date,
};