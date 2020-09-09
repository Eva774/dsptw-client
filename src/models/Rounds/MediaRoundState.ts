import { RoundType } from '../RoundType';

export type MediaRoundState = {
    roundName: string,
    roundNumber: number,
    roundType: RoundType,
    questions: string[],
    currentQuestionIndex: number,
};