import { RoundType } from '../RoundType';

export type MediaRoundState = {
    roundName: string,
    roundType: RoundType,
    questions: string[],
    currentQuestionIndex: number,
};