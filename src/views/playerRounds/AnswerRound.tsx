import * as React from 'react';
import { GameState } from '../../models/GameState';
import styled from 'styled-components';
import { AnswerRoundState } from '../../models/Rounds/AnswerRoundState';
import { Theme } from '../../Theme';
import { getBaseUrl } from '../../api/localServer';

type AnswerRoundProps = {
    gameState: GameState,
    roundState: AnswerRoundState
}

const Root = styled.div`
`

const Title = styled.h1`
    position: absolute;
    top: 50px;
    left: 35px;
    max-width: 215px;
    text-align: left;
    color: ${Theme.primaryAccent};
    font-family: 'Phosphate';
    font-size: 60px;
    margin: 0;
`
const RoundName = styled.h2`
    position: absolute;
    top: 280px;
    left: 35px;
    max-width: 215px;
    margin: -10px 0;
    font-size 50px;
    color: ${Theme.primaryAccent};
    text-transform: uppercase;
    font-family: 'Avenir Book';
    font-weight: normal;
    font-style: normal;
`

const Media = styled.div`
    width: 1280px;
    height: 720px;
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BackgroundImage = styled.div`
    position: absolute;
    top:0%;
    left: 0%;
    width: 100%;
    height: 100%;
    // ${(props: { backgroundImage: string }) => `background-image: url('${props.backgroundImage}');`}
    background-color: ${Theme.secondary};
    background-size: cover;
    z-index: 1;
    // filter: blur(15px);
`

const Image = styled.img`
    max-width: 100%;
    height: 100%;
    display: block; 
    z-index: 2;
`

const MediaWrapper = styled.div`
    position: absolute;
    top: 110px;
    left: 320px;
    max-width: 1280px;
    max-height: 720px;
    padding: 1rem;
    position: relative;
    background: ${Theme.secondary};
    padding: 5px; 
`
const Question = styled.div`
    position: absolute;
    bottom: 140px;
    color: ${Theme.primary};
    font-size: 85px;
    width: 1920px;
    font-family: 'Avenir Book';
    font-weight: normal;
    font-style: normal;
    text-align: center;
`


export default class AnswerRound extends React.Component<AnswerRoundProps, {}> {

    render() {
        const { roundName, questions, currentQuestionIndex } = this.props.roundState;

        let question = ""
        const showQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length;
        if (showQuestion) {
            question = questions[currentQuestionIndex];
        }

        let media = null;
        if (showQuestion) {
                const image = `//${getBaseUrl()}/static/${roundName}/${currentQuestionIndex + 1}.jpg`;
                media = <><BackgroundImage backgroundImage={image} /><Image src={image} /></>;
        }

        return (
            <Root>
                <Title>TRIVIAL TIME</Title>
                <RoundName>{roundName}</RoundName>
                <MediaWrapper>
                    <Media>{media}</Media>
                </MediaWrapper>
                {showQuestion && <Question>{question}</Question>}
            </Root>
        );
    }
}
