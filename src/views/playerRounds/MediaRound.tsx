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
    videoDone: boolean,
}

const Root = styled.div`
`

const Title = styled.h1`
    position: absolute;
    top: 69px;
    left: 30px;
    max-width: 215px;
    text-align: left;
    color: ${Theme.primary};
    font-family: 'Phosphate';
    font-size: 60px;
    font-weight: 150;
    line-height: 100%;
`

const RoundName = styled.h2`
    position: absolute;
    top: 370px;
    left: 30px;
    max-width: 215px;
    margin: 0;
    font-size: 50px;
    color: ${Theme.primaryAccent};
    text-transform: uppercase;
    font-family: 'Avenir Book';
    font-weight: normal;
    font-style: normal;
`

const Media = styled.div`
    width: 1280px;
    height: 720px;
    top: 180px;
    background-color: #000000;
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
    background: ${Theme.secondary};
    padding: 5px;
`
const Question = styled.div`
    position: absolute;
    right: 50px;
    bottom: 140px;
    color: ${Theme.primary};
    font-size: 85px;
    width: 1400px;
    font-family: 'Avenir Book';
`

const QuestionNumber = styled.span`
    color: ${Theme.primaryAccent};
    margin-right:20px;
`

const TimerWrapper = styled.div`
    position: absolute;
    bottom: 363px;
    right: 135px;
    width: 80px;
    height: 440px;
    border: 5px solid ${Theme.secondary};
    margin: 0 50px;
    
`

export default class MediaRound extends React.Component<MediaRoundProps, MediaRoundComponentState> {

    videoRef: any;

    state = {
        videoDuration: 0,
        videoDone: false,
    }

    componentDidMount() {
        getPlayVideoStream().subscribe(() => {
            console.log("Video start")
            const { questions, currentQuestionIndex } = this.props.roundState;
            if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
                this.setState({videoDone: false})
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
                this.setState({videoDone: true})
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
        const { videoDuration, videoDone } = this.state
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

        if (showQuestion && roundNumber === 2 && videoDone && displayQuestion ) {
            question = questions[currentQuestionIndex];
            questionNumber = "Vraag " + (currentQuestionIndex + 1).toString() +": ";
            showTimer = true
        }

        if (showQuestion && roundNumber !== 2 && MediaRoundType.Movie) {
            question = questions[currentQuestionIndex];
            questionNumber = "Vraag " + (currentQuestionIndex + 1).toString() +": ";
            showTimer = true
        }

        let media = null;
        if (showQuestion) {
            if (mediaRoundType === MediaRoundType.Picture) {
                const image = `//${getBaseUrl()}/static/images/${roundNumber}_${currentQuestionIndex + 1}.jpg`;
                media = <><BackgroundImage backgroundImage={image} /><Image src={image} /></>;
            } else {
                media = <Video
                    ref={this.handleRef}
                    poster={`/imgs/blank.png`}
                    src={`//${getBaseUrl()}/static/videos/${roundNumber}_${currentQuestionIndex + 1}.webm`}
                />
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
                {showTimer && <TimerWrapper><Timer key={"mediaquestion" + currentQuestionIndex} duration={questionDuration} /></TimerWrapper>}
                {showQuestion && <Question><QuestionNumber> {questionNumber}</QuestionNumber>{question}</Question>}
            </Root>
        );
    }
}
