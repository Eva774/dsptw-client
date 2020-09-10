import * as React from 'react';
import { GameState } from '../../models/GameState';
import SmallCamera from '../../components/SmallCamera';
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
    max-width: 100%;
    max-height: 100%;
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

const TimerWrapper = styled.div`
    position: absolute;
    bottom: 243px;
    right: 125px;
    width: 100px;
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
        const { presenters, questionDuration } = this.props.gameState;
        const { roundName, questions, currentQuestionIndex, roundNumber, mediaRoundType } = this.props.roundState;

        let question = ""
        let questionNumber = ""
        const showQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length;
        if (showQuestion) {
            question = questions[currentQuestionIndex];
            questionNumber = (currentQuestionIndex + 1).toString();
        }

        let media = null;
        let duration = 0;
        if (showQuestion) {
            if (mediaRoundType === MediaRoundType.Picture) {
                const image = `//${getBaseUrl()}/static/photos/${currentQuestionIndex + 1}.jpg`;
                media = <><BackgroundImage backgroundImage={image} /><Image src={image} /></>;
                duration = questionDuration;
            } else {
                media = <Video
                    ref={this.handleRef}
                    poster={`/imgs/blank.png`}
                    src={`//${getBaseUrl()}/static/videos/${currentQuestionIndex + 1}.mp4`}
                />
                duration = this.state.videoDuration;
            }
        }

        return (
            <Root>
                <Title>Trivial Time Ronde {roundNumber}</Title>
                <RoundName>{roundName}</RoundName>
                <MediaWrapper>
                    <Media>{media}</Media>
                </MediaWrapper>
                <Presenter1>
                    <SmallCamera presenter={presenters[0]} />
                </Presenter1>
                <Presenter2>
                    <SmallCamera presenter={presenters[1]} />
                </Presenter2>
                {showQuestion && <TimerWrapper><Timer key={"mediaquestion" + currentQuestionIndex} duration={duration} /></TimerWrapper>}
                {showQuestion && <Question><QuestionNumber>Vraag {questionNumber}:</QuestionNumber>{question}</Question>}
            </Root>
        );
    }
}
