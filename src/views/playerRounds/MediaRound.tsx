import * as React from 'react';
import { GameState } from '../../models/GameState';
import SmallCamera from '../../components/SmallCamera';
import styled from 'styled-components';
import { MediaRoundState } from '../../models/Rounds/MediaRoundState';
import { Theme } from '../../Theme';

type MediaRoundProps = {
    gameState: GameState,
    roundState: MediaRoundState
}

const Root = styled.div`
`

const Presenter1 = styled.div`
    position: absolute;
    left: 35px;
    bottom: 170px
`

const Presenter2 = styled.div`
    position: absolute;
    top: 60px;
    right: 35px;
`

const Title = styled.h1`
    position: absolute;
    top: 50px;
    left: 62px;
    max-width: 215px;
    text-align: left;
    color: ${Theme.primary};
    text-shadow: 3px 3px ${Theme.primaryAccent}, 0px 0px 20px ${Theme.primaryAccent};
    font-family: 'Neon Tubes 2';
    font-size: 65px;
    font-weight: normal;
    font-style: normal;
    margin: 0;
`

const RoundName = styled.h2`
    position: absolute;
    top: 410px;
    left: 62px;
    max-width: 215px;
    margin: 0;
    font-size 50px;
    color: ${Theme.primaryAccent};
    text-transform: uppercase;
    font-family: 'Avenir LT Std';
    font-weight: normal;
    font-style: normal;
`

const Media = styled.div`
    width: 1280px;
    height: 720px;
    background-color: black;
`

const MediaWrapper = styled.div`
    position: absolute;
    top: 110px;
    left: 320px;
    max-width: 1280px;
    max-height: 720px;
    padding: 1rem;
    position: relative;
    background: linear-gradient(80deg, #F52F95, ${Theme.secondary});
    padding: 3px;
`

const Question = styled.div`
    position: absolute;
    right: 50px;
    bottom: 20px;
    color: ${Theme.primary};
    font-size: 85px;
    width: 1400px;
    font-family: 'Avenir LT Std';
    font-weight: normal;
    font-style: normal;
    text-align: right;
`

const QuestionNumber = styled.span`
    color: ${Theme.secondary};
    margin-right:20px;
`

export default class MediaRound extends React.Component<MediaRoundProps, {}> {

    render() {
        const { presenters } = this.props.gameState;
        const { roundName, questions, currentQuestionIndex, roundNumber } = this.props.roundState;

        let question = ""
        let questionNumber = ""
        const showQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length;
        if (showQuestion) {
            question = questions[currentQuestionIndex];
            questionNumber = (currentQuestionIndex + 1).toString();
        }

        return (
            <Root>
                <Title>Trivial Time Ronde {roundNumber}</Title>
                <RoundName>{roundName}</RoundName>
                <MediaWrapper>
                    <Media></Media>
                </MediaWrapper>
                <Presenter1>
                    <SmallCamera presenter={presenters[0]} />
                </Presenter1>
                <Presenter2>
                    <SmallCamera presenter={presenters[1]} />
                </Presenter2>
                {showQuestion && <Question><QuestionNumber>Vraag {currentQuestionIndex + 1}:</QuestionNumber>{question}</Question>}
            </Root>
        );
    }
}
