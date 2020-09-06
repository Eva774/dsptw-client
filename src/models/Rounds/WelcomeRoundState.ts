import { RoundName } from '../RoundName';
import { RoundType } from '../RoundType';

export type WelcomeRoundState = {
    roundName: RoundName,
    roundType: RoundType,
    targetTime: Date,
};