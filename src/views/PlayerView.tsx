import * as React from 'react';
import { GameState } from '../models/GameState';
import { RoundType } from '../models/RoundType';
import TitleCard from '../components/TitleCard';
import AudioPlayer from '../components/Audioplayer';
import { getEventStream } from '../api/localServer';
import { GameEvent } from '../models/GameEvent';
import TextRound from './playerRounds/TextRound';
import MediaRound from './playerRounds/MediaRound';
import WelcomeRound from './playerRounds/WelcomeRound';
import PauseRound from './playerRounds/PauseRound';
import styled from 'styled-components';
import RankingRound from './playerRounds/RankingRound';
import { TextRoundState } from '../models/Rounds/TextRoundState';
import { MediaRoundState } from '../models/Rounds/MediaRoundState';
import { WelcomeRoundState } from '../models/Rounds/WelcomeRoundState';
import { PauseRoundState } from '../models/Rounds/PauseRoundState';

type PlayerViewProps = {
    gameState?: GameState
}

type PlayerViewState = {
    showTitleCard: boolean
}

const Root = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #cccccc;
    background-image: url('/imgs/background${(props: { backgroundType: string }) => props.backgroundType}.png');
`

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
        const { presenters, roundState } = gameState;
        const { roundName, roundType } = roundState;


        let round = null;
        switch (roundType) {
            case RoundType.TextRound:
                round = <TextRound gameState={gameState} roundState={roundState as TextRoundState} />
                break;
            case RoundType.MediaRound:
                round = <MediaRound gameState={gameState} roundState={roundState as MediaRoundState} />
                break;
            case RoundType.WelcomeRound:
                round = <WelcomeRound gameState={gameState} roundState={roundState as WelcomeRoundState} />
                break;
            case RoundType.PauseRound:
                round = <PauseRound gameState={gameState} roundState={roundState as PauseRoundState} />
                break;
            case RoundType.RankingRound:
                round = <RankingRound gameState={gameState} />
                break;
        }

        const backgroundType = roundType === RoundType.WelcomeRound ? '2' : '1';

        return (
            <Root backgroundType={backgroundType}>
                <AudioPlayer />
                {this.state.showTitleCard ? <TitleCard roundName={roundName} /> : null}
                {round}
            </Root >
        )

    }
}
