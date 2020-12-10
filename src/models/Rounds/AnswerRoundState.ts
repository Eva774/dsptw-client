import { RoundType } from '../RoundType';

export type AnswerRoundState = {
    roundName: string,
    roundNumber: number,
    roundType: RoundType,
    questions: string[],
    currentQuestionIndex: number,
};