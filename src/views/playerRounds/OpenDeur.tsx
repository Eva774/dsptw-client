import * as React from 'react';
import { OpenDeurState } from '../../models/Rounds/OpenDeurState';
import Video from '../../components/Video';
import styled from 'styled-components';

const Videos = styled.div`
    display:flex;
    justify-content: space-around;
    margin-top: 70px;
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
        playerVideoIds: [-1]
    }

    onVideoEnd = (videoIndex: number) => {
        console.log('ended');
        this.setState(state => ({
            playerVideoIds: [...state.playerVideoIds, videoIndex]
        }))
        // this.stateplayerVideoIds.push(videoIndex)
    }

    render() {
        const videos = this.props.roundState.questions.map((question, i) =>
            <Video key={i} src={question.videoUrl} onVideoEnd={() => this.onVideoEnd(i)} hasPlayed={this.state.playerVideoIds.indexOf(i) !== -1} />
        )
        return (
            <Videos>
                {videos}
            </Videos>
        );
    }
}
