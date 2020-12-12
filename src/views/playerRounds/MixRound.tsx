import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';
import { MixRoundState } from '../../models/Rounds/MixRoundState';
import { Title } from '../../components/Title';
import { Theme } from '../../Theme';
import { Timer } from '../../components/Timer';
import { getBaseUrl } from '../../api/localServer';


type MixRoundProps = {
    gameState: GameState,
    roundState: MixRoundState,
}

const Root = styled.div`
    text-align: center;
`

const Question = styled.div`
    color: ${Theme.primary};
    font-size: 65px;
    width: 1300px;
    font-family: 'Avenir LT Std';
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
    font-family: 'Futura';
    font-weight: normal;
    font-style: normal;
    font-size: 85px;
    text-transform: uppercase;
    margin: 22px 0;
`

const TimerWrapper = styled.div`
    position: absolute;
    width: 80px;
    height: 400px;
    border: 5px solid ${Theme.primary};
    right: ${(props: {isMedia: boolean}) => props.isMedia ? '370px' : '915px'};
    top: 350px;
    z-index: 3;
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
    max-height: 100%;
    display: block; 
    z-index: 2;
`

const Media = styled.div`
    width: 900px;
    height: 400px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MediaWrapper = styled.div`
    position: absolute;
    top: 350px;
    left: 500px;
    max-width: 900px;
    max-height: 410px;
    padding: 1rem;
    background: linear-gradient(80deg, ${Theme.primary}, ${Theme.primaryAccent});
    padding: 5px;
    z-index: 3;
`

export default class MixRound extends React.Component<MixRoundProps, {}> {

        
    render() {
        const { gameState, roundState } = this.props;
        const { presenters, questionDuration } = gameState;
        const { roundName, questions, currentQuestionIndex, roundNumber } = roundState;

        let question = Object()
        const showQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length;
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            question = questions[currentQuestionIndex];
        }

        
        let toShow = null;
        let media = false;
        const smallCamera = false;
        if (currentQuestionIndex > 0 && currentQuestionIndex < questions.length && question.image != "" ) { 

            const image = `//${getBaseUrl()}/static/${roundName}/${question.image}.jpg`;
            media = true;
            toShow =      
            <Root>
            <MediaWrapper>
            <Media><><BackgroundImage backgroundImage={image} /><Image src={image} /></></Media>
            </MediaWrapper>
            </Root>;
            
        } 




        return (
            <Root>
                <Title>TRIVIAL TIME RONDE {roundNumber}</Title>
                <RoundName>{roundName}</RoundName>
                {toShow}
                <TimerWrapper isMedia = {media}>{showQuestion && <Timer key={"question" + currentQuestionIndex} className={question} duration={questionDuration} />}</TimerWrapper>
                {showQuestion && <Question><QuestionNumber>Vraag {currentQuestionIndex + 1}:</QuestionNumber>{question.text}</Question>}
            </Root>
        );
    }
}
