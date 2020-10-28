import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';
import { TextRoundState } from '../../models/Rounds/TextRoundState';
import { Title } from '../../components/Title';
import { Theme } from '../../Theme';
import { Timer } from '../../components/Timer';

type TextRoundProps = {
    gameState: GameState,
    roundState: TextRoundState,
}

const Root = styled.div`
    text-align: center;
`

const Presenters = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Question = styled.div`
    color: ${Theme.primary};
    font-size: 65px;
    width: 1300px;
    font-family: 'Avenir LT Std';
    font-weight: normal;
    font-style: normal;
    margin: 40px auto 0 auto;
`

const QuestionNumber = styled.span`
    color: ${Theme.secondary};
    margin-right:20px;
`

const RoundName = styled.h1`
    color: ${Theme.primaryAccent};
    font-family: 'Spooky Skeleton';
    font-weight: normal;
    font-style: normal;
    font-size: 85px;
    text-transform: uppercase;
    margin: 22px 0;
`

const TimerWrapper = styled.div`
    position: relative;
    width: 120px;
    height: 400px;
    border: 5px solid ${Theme.primary};
    margin: 0 50px;
`

export default class TextRound extends React.Component<TextRoundProps, {}> {

    render() {
        const { gameState, roundState } = this.props;
        const { presenters, questionDuration } = gameState;
        const { roundName, questions, currentQuestionIndex, roundNumber } = roundState;

        let question = ""
        const showQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length;
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            question = questions[currentQuestionIndex];
        }

        return (
            <Root>
                <Title>Trivial Time Ronde {roundNumber}</Title>
                <RoundName>{roundName}</RoundName>
                <Presenters>
                    <Camera presenter={presenters[0]} namePlace="left" />
                    <TimerWrapper>{showQuestion && <Timer key={"question" + currentQuestionIndex} className={question} duration={questionDuration} />}</TimerWrapper>
                    <Camera presenter={presenters[1]} namePlace="right" />
                </Presenters>
                {showQuestion && <Question><QuestionNumber>Vraag {currentQuestionIndex + 1}:</QuestionNumber>{question}</Question>}
            </Root>
        );
    }
}
