import { RoundName } from '../RoundName';

export type CollectiefGeheugenState = {
    roundName: RoundName,
    currentQuestionIndex: number,
    questions:
    {
        videoUrl: string,
        answers: {
            answer: string,
            found: boolean,
            score?: number,
        }[],
    }[],
};
