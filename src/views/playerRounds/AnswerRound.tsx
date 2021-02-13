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
    left: 62px;
    max-width: 215px;
    text-align: left;
    color: ${Theme.primaryAccent};
    font-family: 'Phosphate';
    font-size: 60px;
    font-weight: normal;
    font-style: normal;
    margin: 0;
`

const Media = styled.div`
    width: 1280px;
    height: 720px;
    background-color: #201d2c;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BackgroundImage = styled.div`
    position: absolute;
    top: 2.5%;
    left: 1%;
    width: 98%;
    height: 95%;
    ${(props: { backgroundImage: string }) => `background-image: url('${props.backgroundImage}');`}
    background-size: cover;
    z-index: 1;
    filter: blur(15px);
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
    background: linear-gradient(80deg, ${Theme.primary}, ${Theme.primaryAccent});
    padding: 3px;
`
const Question = styled.div`
    position: absolute;
    bottom: 20px;
    color: ${Theme.primary};
    font-size: 85px;
    width: 1920px;
    font-family: 'Avenir LT Std';
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
                <MediaWrapper>
                    <Media>{media}</Media>
                </MediaWrapper>
                {showQuestion && <Question>{question}</Question>}
            </Root>
        );
    }
}
