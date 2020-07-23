import * as React from 'react';
import styled from 'styled-components';
import { CollectiefGeheugenState } from '../../models/Rounds/CollectiefGeheugenState';
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

type CollectiefGeheugenProps = {
    roundState: CollectiefGeheugenState,
}

type CollectiefGeheugenComponentState = {
    playerVideoIds: number[],
}

export default class CollectiefGeheugen extends React.Component<CollectiefGeheugenProps, CollectiefGeheugenComponentState> {

    state = {
        // TODO remove -1
        playerVideoIds: [-1],
    }

    onVideoEnd = (videoIndex: number) => {
        setCurrentQuestion(videoIndex);
        this.setState(state => ({
            playerVideoIds: [...state.playerVideoIds, videoIndex],
        }))
        setView(ViewType.Answers);
    }

    render() {
        const { questions, currentQuestionIndex, currentView } = this.props.roundState
        const videos = questions.map((question, i) =>
            <Video poster={`/imgs/${i + 1}.png`} key={i} src={`/static/aflevering2/collectiefgeheugen/${i + 1}.mp4`} onVideoEnd={() => this.onVideoEnd(i)} hasPlayed={this.state.playerVideoIds.indexOf(i) !== -1} />
        )
        if (currentView === ViewType.Videos) {
            return (
                <Videos>
                    {videos}
                </Videos>
            );
        }
        const answers = questions[currentQuestionIndex].answers.map((answer, i) => <Answer key={answer.text + i} score={answer.score} found={answer.found}>{answer.text}</Answer>);
        return <AnswersWrapper><AnswersRow>{answers.slice(0, 3)}</AnswersRow><AnswersRow>{answers.slice(3, 5)}</AnswersRow></AnswersWrapper>
    }
}
