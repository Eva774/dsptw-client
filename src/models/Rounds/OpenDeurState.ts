import { RoundName } from '../RoundName';

export type OpenDeurState = {
    roundName: RoundName,
    questions: {
        videoUrl: string,
        question: string,
        answers: {
            text: string,
            found: boolean,
        }[],
    }[],
    currentQuestionIndex: number,
};
