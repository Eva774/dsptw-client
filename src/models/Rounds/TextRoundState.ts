import { RoundName } from '../RoundName';
import { RoundType } from '../RoundType';

export type TextRoundState = {
    roundName: RoundName,
    roundType: RoundType,
    questions: string[],
    currentQuestionIndex: number,
};