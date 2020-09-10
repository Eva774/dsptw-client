import * as React from 'react';
import { GameState } from '../../models/GameState';
import { TextRoundState } from '../../models/Rounds/TextRoundState';
import { nextQuestion, previousQuestion } from '../../api/localServer';

type TextRoundProps = {
    gameState: GameState,
    roundState: TextRoundState,
}

export default class TextRound extends React.Component<TextRoundProps, {}> {

    render() {
        const { roundState } = this.props;
        const { questions, currentQuestionIndex } = roundState;

        let question = ""
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            question = questions[currentQuestionIndex];
        }

        return (
            <div>
                <div>Vraag {currentQuestionIndex + 1}: {question}</div>
                <button onClick={previousQuestion}>Previous question</button>
                <button onClick={nextQuestion}>Next question</button>
            </div>
        );
    }
}
