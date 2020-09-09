import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';
import { TextRoundState } from '../../models/Rounds/TextRoundState';
import { Title } from '../../components/Title';
import { Theme } from '../../Theme';

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
    font-size: 70px;
    width: 1500px;
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
    font-family: 'Avenir LT Std';
    font-weight: normal;
    font-style: normal;
    font-size: 85px;
    text-transform: uppercase;
    margin: 22px 0;
`

const Timer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10%;
    background-image: linear-gradient(${Theme.primaryAccent}, ${Theme.secondary});
    animation : drop 30s infinite, pulse 30s infinite;
    animation-timing-function : linear;

    @keyframes drop {
        0%   { height: 100% }
        100% { height: 0%    }
     }

     @keyframes pulse {
        0%   { -webkit-transform: scale(1)   ; opacity: 1;    }
        80%  { -webkit-transform: scale(1); opacity: 1; }
        82%  { -webkit-transform: scale(1); opacity: 0.25; }
        84%  { -webkit-transform: scale(1); opacity: 1; }
        86%  { -webkit-transform: scale(1); opacity: 0.25; }
        88%  { -webkit-transform: scale(1); opacity: 1; }
        90%  { -webkit-transform: scale(1); opacity: 0.25; }
        92%  { -webkit-transform: scale(1); opacity: 1; }
        94%  { -webkit-transform: scale(1); opacity: 0.25; }
        96%  { -webkit-transform: scale(1); opacity: 1; }
        98%  { -webkit-transform: scale(1); opacity: 0.25; }
        100% { -webkit-transform: scale(1)   ; opacity: 1;    }
     }
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
        const { presenters } = gameState;
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
                    <TimerWrapper>{showQuestion && <Timer className={question} />}</TimerWrapper>
                    <Camera presenter={presenters[1]} namePlace="right" />
                </Presenters>
                {showQuestion && <Question><QuestionNumber>Vraag {currentQuestionIndex + 1}:</QuestionNumber>{question}</Question>}
            </Root>
        );
    }
}
