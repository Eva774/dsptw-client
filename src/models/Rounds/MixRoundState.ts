import { RoundType } from '../RoundType';

export type MixRoundState = {
    roundName: string,
    roundNumber: number,
    roundType: RoundType,
    questions: object[],
    currentQuestionIndex: number,
};