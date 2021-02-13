import * as React from 'react';
import { GameState } from '../../models/GameState';
import styled from 'styled-components';
import { MediaRoundState } from '../../models/Rounds/MediaRoundState';
import { Theme } from '../../Theme';
import { MediaRoundType } from '../../models/Rounds/MediaRoundType';
import { Timer } from '../../components/Timer';
import { getPlayVideoStream, getBaseUrl } from '../../api/localServer';


type MediaRoundProps = {
    gameState: GameState,
    roundState: MediaRoundState
}

type MediaRoundComponentState = {
    videoDuration: number,
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

const RoundName = styled.h2`
    position: absolute;
    top: 410px;
    left: 62px;
    max-width: 215px;
    margin: 0;
    font-size 50px;
    color: ${Theme.primaryAccent};
    text-transform: uppercase;
    font-family: 'Futura';
    font-weight: normal;
    font-style: normal;
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
    max-height: 100%;
    display: block; 
    z-index: 2;
`

const Video = styled.video`
    width: 100%;
    height: 100%;
    display: block; 
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
    color: ${Theme.primaryAccent};
    margin-right:20px;
`

const TimerWrapper = styled.div`
    position: absolute;
    bottom: 243px;
    right: 135px;
    width: 80px;
    height: 440px;
    border: 5px solid ${Theme.primary};
    margin: 0 50px;
    
`

export default class MediaRound extends React.Component<MediaRoundProps, MediaRoundComponentState> {

    videoRef: any;

    state = {
        videoDuration: 0,
    }

    componentDidMount() {
        getPlayVideoStream().subscribe(() => {
            console.log("Video start")
            const { questions, currentQuestionIndex } = this.props.roundState;
            if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
                this.startVideo();
            }
        });
    }

    handleRef = (video: HTMLVideoElement) => {
        this.videoRef = video;
        if (this.videoRef !== null && this.videoRef) {
            this.videoRef.addEventListener('loadedmetadata', () => {
                this.setState({ videoDuration: this.videoRef.duration })
            });
            this.videoRef.addEventListener('ended', () => {
                this.videoRef.load();
            }, false);
        }
    };

    startVideo = () => {
        if (this.videoRef !== null && this.videoRef) {
            this.videoRef.pause();
            this.videoRef.currentTime = 0;
            this.videoRef.play();
        }
    }

    render() {
        const { questionDuration } = this.props.gameState;
        const { roundName, questions, currentQuestionIndex, roundNumber,mediaRoundType, displayQuestion } = this.props.roundState;

        let question = ""
        let questionNumber = ""
        let showTimer = false
        const showQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length;

        if (showQuestion && mediaRoundType === MediaRoundType.Picture) {
            question = questions[currentQuestionIndex];
            questionNumber = "Vraag " + (currentQuestionIndex + 1).toString() +": ";
            showTimer = true
        }

        if (showQuestion && roundNumber === 5 && displayQuestion) {
            question = questions[currentQuestionIndex];
            questionNumber = "Vraag " + (currentQuestionIndex + 1).toString() +": ";
            showTimer = true
        }

        if (showQuestion && roundNumber !== 5 && MediaRoundType.Movie) {
            question = questions[currentQuestionIndex];
            questionNumber = "Vraag " + (currentQuestionIndex + 1).toString() +": ";
            showTimer = true
        }
        let media = null;
        let duration = 0;
        if (showQuestion) {
            if (mediaRoundType === MediaRoundType.Picture) {
                const image = `//${getBaseUrl()}/static/${roundNumber}/${currentQuestionIndex + 1}.jpg`;
                media = <><BackgroundImage backgroundImage={image} /><Image src={image} /></>;
                duration = questionDuration;
            } else {
                media = <Video
                    ref={this.handleRef}
                    poster={`/imgs/blank.png`}
                    src={`//${getBaseUrl()}/static/videos/${roundNumber}_${currentQuestionIndex + 1}.mp4`}
                />
                duration = questionDuration;
            }
        }
        // const showTimer = showQuestion && roundNumber !=5
        return (
            <Root>
                <Title>TRIVIAL TIME RONDE {roundNumber}</Title>
                <RoundName>{roundName}</RoundName>
                <MediaWrapper>
                    <Media>{media}</Media>
                </MediaWrapper>
                {showTimer && <TimerWrapper><Timer key={"mediaquestion" + currentQuestionIndex} duration={duration} /></TimerWrapper>}
                {showQuestion && <Question><QuestionNumber> {questionNumber}</QuestionNumber>{question}</Question>}
            </Root>
        );
    }
}
