import { RoundType } from '../RoundType';
import { MediaRoundType } from './MediaRoundType';

export type MediaRoundState = {
    roundName: string,
    roundNumber: number,
    roundType: RoundType,
    mediaRoundType: MediaRoundType,
    questions: string[],
    currentQuestionIndex: number,
    displayQuestion: boolean,
};