import { RoundType } from '../RoundType';

export type TextRoundState = {
    roundName: string,
    roundType: RoundType,
    questions: string[],
    currentQuestionIndex: number,
};