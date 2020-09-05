import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';

type MediaRoundProps = {
    gameState: GameState,
}

const Root = styled.div`
text-align: center;
`

const Presenter1 = styled.div`
    position: absolute;
    margin-top: 20px;
    right: 20px;

`

const Presenter2 = styled.div`
    position: absolute;
    left: 20px;
    bottom: 20px
`

const QuestionNumber = styled.div`
    position: absolute;
    font-size: 35px;
    text-align: center;
    bottom: 20px;
    right: 20px
`

const RoundName = styled.h1`
    text-align: center
`
export default class MediaRound extends React.Component<MediaRoundProps, {}> {

    render() {
        const { presenters } = this.props.gameState;
        const { roundName, questions, currentQuestionIndex } = this.props.gameState.roundState;

        let question = ""
        let questionNumber = ""
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            question = questions[currentQuestionIndex];
            questionNumber = (currentQuestionIndex + 1).toString();
        }



        return (
            <Root>
                <RoundName>{roundName}</RoundName>

                <Presenter1>
                    <Camera name={presenters[0].name} cameraLink={presenters[0].cameraLink} />
                </Presenter1>
                <Presenter2>
                    <Camera name={presenters[1].name} cameraLink={presenters[1].cameraLink} />
                </Presenter2>
                <QuestionNumber>{questionNumber}</QuestionNumber>
            </Root>
        );
    }
}
