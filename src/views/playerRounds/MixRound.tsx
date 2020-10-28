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
    width: 750px;
    height: 400px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MediaWrapper = styled.div`
    position: relative;
    max-width: 750px;
    max-height: 400px;
    padding: 1rem;
    background: linear-gradient(80deg, ${Theme.primary}, ${Theme.primaryAccent});
    padding: 3px;
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
        console.log(question.text)
        if (question.image != "") { 

            const image = `//${getBaseUrl()}/static/${roundName}/${question.image}.jpg`;
            console.log(image)
            toShow = 
            <Presenters>            
            <MediaWrapper>
            <Media><><BackgroundImage backgroundImage={image} /><Image src={image} /></></Media>
            </MediaWrapper>
            <TimerWrapper>{showQuestion && <Timer key={"question" + currentQuestionIndex} className={question} duration={questionDuration} />}</TimerWrapper>
            </Presenters>;

        } 
        else {
            toShow =
            <Presenters>
                <Camera presenter={presenters[0]} namePlace="left" />
                <TimerWrapper>{showQuestion && <Timer key={"question" + currentQuestionIndex} className={question} duration={questionDuration} />}</TimerWrapper>
                <Camera presenter={presenters[1]} namePlace="right" />
            </Presenters>;
            console.log(currentQuestionIndex)

        };



        // const media = <><BackgroundImage backgroundImage={image} /><Image src={image} /></>;
        // const duration = questionDuration;

        return (
            <Root>
                <Title>Trivial Time Ronde {roundNumber}</Title>
                <RoundName>{roundName}</RoundName>
                {toShow}
                {/* <Presenters>
                    <Camera presenter={presenters[0]} namePlace="left" />
                    <TimerWrapper>{showQuestion && <Timer key={"question" + currentQuestionIndex} className={question} duration={questionDuration} />}</TimerWrapper>
                    <Camera presenter={presenters[1]} namePlace="right" />
                </Presenters> */}
                {showQuestion && <Question><QuestionNumber>Vraag {currentQuestionIndex + 1}:</QuestionNumber>{question.text}</Question>}
            </Root>
        );
    }
}
