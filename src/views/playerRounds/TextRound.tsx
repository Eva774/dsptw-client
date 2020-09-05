import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';

type TextRoundProps = {
    gameState: GameState,
}

const Root = styled.div`
text-align: center;
`

const Presenters = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const Question = styled.div`
    font-size: 35px;
    text-align: center;
`

const RoundName = styled.h1`
    text-align: center
`
export default class TextRound extends React.Component<TextRoundProps, {}> {

    render() {
        const { presenters } = this.props.gameState;
        const { roundName, questions, currentQuestionIndex } = this.props.gameState.roundState;

        let question = ""
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            question = questions[currentQuestionIndex];
        }

        return (
            <Root>
                <RoundName>{roundName}</RoundName>

                <Presenters>
                    <Camera name={presenters[0].name} cameraLink={presenters[0].cameraLink} />
                    <Camera name={presenters[1].name} cameraLink={presenters[1].cameraLink} />
                </Presenters>
                <Question>{question}</Question>
            </Root>
        );
    }
}
