import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';
import { TextRoundState } from '../../models/Rounds/TextRoundState';
import { Title } from '../../components/Title';
import { Theme } from '../../Theme';
import { nextQuestion, previousQuestion } from '../../api/localServer';

type TextRoundProps = {
    gameState: GameState,
    roundState: TextRoundState,
}

export default class TextRound extends React.Component<TextRoundProps, {}> {

    render() {
        const { gameState, roundState } = this.props;
        const { presenters, roundNumber } = gameState;
        const { roundName, questions, currentQuestionIndex } = roundState;

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
