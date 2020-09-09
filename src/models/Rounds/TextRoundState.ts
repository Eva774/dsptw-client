import { RoundType } from '../RoundType';

export type TextRoundState = {
    roundName: string,
    roundNumber: number,
    roundType: RoundType,
    questions: string[],
    currentQuestionIndex: number,
};