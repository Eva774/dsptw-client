import * as React from 'react';
import { GameState } from '../../models/GameState';
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


const Question = styled.div`
    color: ${Theme.primary};
    font-size: 65px;
    width: 1300px;
    font-family: 'Avenir Book';
    font-weight: normal;
    font-style: normal;
    position: absolute;
    top: 800px;
    left: 310px;
`

const QuestionNumber = styled.span`
    color: ${Theme.primaryAccent};
    margin-right:20px;
`

const RoundName = styled.h1`
    color: ${Theme.primaryAccent};
    font-family: 'Avenir Book';
    font-weight: normal;
    font-style: normal;
    font-size: 85px;
    text-transform: uppercase;
    margin: -10px 0;
`

const TimerWrapper = styled.div`
    position: absolute;
    width: 80px;
    height: 400px;
    border: 5px solid ${Theme.secondary};
    left: 915px;
    top: 350px;
`

export default class TextRound extends React.Component<TextRoundProps, {}> {

    render() {
        const { gameState, roundState } = this.props;
        const { questionDuration } = gameState;
        const { roundName, questions, currentQuestionIndex, roundNumber } = roundState;

        let question = ""
        const showQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length;
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            question = questions[currentQuestionIndex];
        }


        return (
            <Root>
                <Title>TRIVIAL TIME RONDE {roundNumber}</Title>
                <RoundName>{roundName}</RoundName>
                <TimerWrapper>{showQuestion && <Timer key={"question" + currentQuestionIndex} className={question} duration={questionDuration} />}</TimerWrapper>
                {showQuestion && <Question><QuestionNumber>Vraag {currentQuestionIndex + 1}:</QuestionNumber>{question}</Question>}
            </Root>
        );
    }
}
