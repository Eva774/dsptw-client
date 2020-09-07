import { RoundName } from '../RoundName';
import { RoundType } from '../RoundType';

export type PauseRoundState = {
    roundName: RoundName,
    roundType: RoundType,
    targetTime: Date,
};