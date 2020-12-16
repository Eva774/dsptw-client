import { RoundType } from '../RoundType';

export type RankingRoundState = {
    roundName: string,
    roundType: RoundType,
    inputRanking: string,
    currentQuestionIndex: number,
};