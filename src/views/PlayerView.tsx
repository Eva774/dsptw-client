import * as React from 'react';
import styled from 'styled-components';
import AudioPlayer from '../components/Audioplayer';
import TextRound from './playerRounds/TextRound';
import MediaRound from './playerRounds/MediaRound';
import WelcomeRound from './playerRounds/WelcomeRound';
import PauseRound from './playerRounds/PauseRound';
import TalkingRound from './playerRounds/TalkingRound';
import RankingRound from './playerRounds/RankingRound';
import { GameState } from '../models/GameState';
import { RoundType } from '../models/RoundType';
import { TextRoundState } from '../models/Rounds/TextRoundState';
import { MediaRoundState } from '../models/Rounds/MediaRoundState';
import { WelcomeRoundState } from '../models/Rounds/WelcomeRoundState';
import { PauseRoundState } from '../models/Rounds/PauseRoundState';
import { TalkingRoundState } from '../models/Rounds/TalkingRoundState';


type PlayerViewProps = {
    gameState?: GameState
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

export default class PlayerView extends React.Component<PlayerViewProps, {}> {

    render() {
        if (!this.props.gameState) {
            return <div>Not connected to server, is the server online?</div>;
        }
        const { gameState } = this.props;
        const { roundState } = gameState;
        const { roundType } = roundState;

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
            case RoundType.TalkingRound:
                round = <TalkingRound gameState={gameState} roundState={roundState as TalkingRoundState} />
        }

        const backgroundType = roundType === RoundType.WelcomeRound ? '2' : '1';

        return (
            <Root backgroundType={backgroundType}>
                <AudioPlayer />
                {round}
            </Root >
        )

    }
}
