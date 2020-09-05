import { RoundName } from '../RoundName';
import { RoundType } from '../RoundType';

export type MediaRoundState = {
    roundName: RoundName,
    roundType: RoundType,
    questions: string[],
    currentQuestionIndex: number,
};