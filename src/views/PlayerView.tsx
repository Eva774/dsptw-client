import * as React from 'react';
import { GameState } from '../models/GameState';
import { RoundType } from '../models/RoundType';
import TitleCard from '../components/TitleCard';
import AudioPlayer from '../components/Audioplayer';
import { getEventStream } from '../api/localServer';
import { GameEvent } from '../models/GameEvent';
import TextRound from './playerRounds/TextRound';
import MediaRound from './playerRounds/MediaRound';
import styled from 'styled-components';

type PlayerViewProps = {
    gameState?: GameState
}

type PlayerViewState = {
    showTitleCard: boolean
}

const Title = styled.h1`
    text-align: center;
    font-size: 50px
`

export default class PlayerView extends React.Component<PlayerViewProps, PlayerViewState> {

    state = {
        showTitleCard: false,
    }

    componentDidMount() {
        getEventStream().subscribe((gameEvent: any) => {
            console.log(gameEvent)
            switch (gameEvent) {
                case GameEvent.NextRound:
                    this.setState({ showTitleCard: true });
                    setTimeout(() => this.setState({ showTitleCard: false }), 5000);
                    break;
            }
        });
    }

    render() {
        if (!this.props.gameState) {
            return <div>Not connected to server, is the server online?</div>;
        }
        const { gameState } = this.props;
        const { roundState, roundNumber } = gameState;
        const { roundName, roundType } = roundState;


        let round = null;
        switch (roundType) {
            case RoundType.TextRound:
                round = <TextRound gameState={gameState} />
                break;
            case RoundType.MediaRound:
                round = <MediaRound gameState={gameState} />
                break;
        }

        return (
            <div>
                <AudioPlayer />
                <Title> Trivial Time!!! Ronde {roundNumber + 1}</Title>
                {this.state.showTitleCard ? <TitleCard roundName={roundName} /> : null}
                {round}
            </div>
        )

    }
}
