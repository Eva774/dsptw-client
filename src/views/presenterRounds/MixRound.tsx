import * as React from 'react';
import { GameState } from '../../models/GameState';
import { MixRoundState } from '../../models/Rounds/MixRoundState';
import { nextQuestion, previousQuestion } from '../../api/localServer';

type MixRoundProps = {
    gameState: GameState,
    roundState: MixRoundState,
}

export default class MixRound extends React.Component<MixRoundProps, {}> {

    render() {
        const { roundState } = this.props;
        const { questions, currentQuestionIndex } = roundState;

        let question = Object();
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            question = questions[currentQuestionIndex];
        }

        return (
            <div>
                <div>Vraag {currentQuestionIndex + 1}: {question.text}</div>
                <button onClick={previousQuestion}>Previous question</button>
                <button onClick={nextQuestion}>Next question</button>
            </div>
        );
    }
}
