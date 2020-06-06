import * as React from 'react';
import styled from 'styled-components';
import { OpenDeurState } from '../../models/Rounds/OpenDeurState';
import { Video } from '../../components/Video';
import { ViewType } from '../../models/ViewType';
import { setView, setCurrentQuestion } from '../../api/localServer';
import { Answer } from '../../components/Answer';

const Videos = styled.div`
    display:flex;
    justify-content: space-around;
    margin-top: 70px;
`

const AnswersWrapper = styled.div`
    margin-top: 100px;
`
const AnswersRow = styled.div`
    margin-top: 70px;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

type OpenDeurProps = {
    roundState: OpenDeurState,
}

type OpenDeurComponentState = {
    playerVideoIds: number[],
}

export default class OpenDeur extends React.Component<OpenDeurProps, OpenDeurComponentState> {

    state = {
        // TODO remove -1
        playerVideoIds: [-1],
    }

    onVideoEnd = (videoIndex: number) => {
        setCurrentQuestion(videoIndex);
        console.log('ended');
        this.setState(state => ({
            playerVideoIds: [...state.playerVideoIds, videoIndex],
        }))
        setView(ViewType.Answers);
    }

    render() {
        const { questions, currentQuestionIndex, currentView } = this.props.roundState
        const videos = questions.map((question, i) =>
            <Video key={i} src={question.videoUrl} onVideoEnd={() => this.onVideoEnd(i)} hasPlayed={this.state.playerVideoIds.indexOf(i) !== -1} />
        )
        if (currentView === ViewType.Videos) {
            return (
                <Videos>
                    {videos}
                </Videos>
            );
        }
        const answers = questions[currentQuestionIndex].answers.map((answer, i) => <Answer key={answer.text + i} score={20} found={answer.found}>{answer.text}</Answer>);
        const answersRow1 = answers.slice(0, 2);
        const answersRow2 = answers.slice(2, 4);
        return <AnswersWrapper><AnswersRow>{answersRow1}</AnswersRow><AnswersRow>{answersRow2}</AnswersRow></AnswersWrapper>
    }
}
