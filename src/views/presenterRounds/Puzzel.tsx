import * as React from 'react';
import { PuzzelState } from '../../models/Rounds/PuzzelState';
import { PresenterAnswer } from '../../components/PresenterAnswer';
import { correctAnswer } from '../../api/localServer';

type PuzzelProps = {
    roundState: PuzzelState
}

export default class Puzzel extends React.Component<PuzzelProps, {}> {

    onAnswerClick = (i: number) => {
        console.log('onAnswerClick', i);
        const { currentPuzzleIndex, puzzles } = this.props.roundState;
        if (!puzzles[currentPuzzleIndex].answers[i].found) {
            correctAnswer(i);
        }
    }

    render() {

        const { puzzles, currentPuzzleIndex } = this.props.roundState;
        const { grid, answers } = puzzles[currentPuzzleIndex];


        const presenterAnswers = puzzles[currentPuzzleIndex].answers.map((answer, i) =>
            <PresenterAnswer key={answer.text + i} found={answer.found} onAnswerClick={() => this.onAnswerClick(i)}>{answer.text}</PresenterAnswer>)
        return (
            <div>
                Puzzel
                <ul>
                    {presenterAnswers}
                </ul>
            </div>
        );
    }
}
