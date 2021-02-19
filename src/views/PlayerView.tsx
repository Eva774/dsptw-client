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
import { MixRoundState } from '../models/Rounds/MixRoundState';
import { RankingRoundState } from '../models/Rounds/RankingRoundState';
import MixRound from './playerRounds/MixRound';
import Presenters from '../components/Presenters';
import EndRound from './playerRounds/EndRound';
import AnswerRound from './playerRounds/AnswerRound';
import { AnswerRoundState } from '../models/Rounds/AnswerRoundState';


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
    background-image: url('/imgs/background${(props: { backgroundType: string }) => props.backgroundType}.jpg');
    background-size: contain;
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
        let smallCamera = false;
        let showCamera = false;
        switch (roundType) {
            case RoundType.TextRound:
                round = <TextRound gameState={gameState} roundState={roundState as TextRoundState} />;
                showCamera = true;
                break;
            case RoundType.MediaRound:
                round = <MediaRound gameState={gameState} roundState={roundState as MediaRoundState} />;
                showCamera = true;
                smallCamera = true;
                break;
            case RoundType.WelcomeRound:
                round = <WelcomeRound gameState={gameState} roundState={roundState as WelcomeRoundState} />;
                break;
            case RoundType.PauseRound:
                round = <PauseRound gameState={gameState} roundState={roundState as PauseRoundState} />;
                break;
            case RoundType.EndRound:
                round = <EndRound />;
                break;
            case RoundType.RankingRound:
                round = <RankingRound gameState={gameState} roundState={roundState as RankingRoundState}/>;
                showCamera = true;
                smallCamera = true;
                break;
            case RoundType.TalkingRound:
                round = <TalkingRound gameState={gameState} roundState={roundState as TalkingRoundState} />;
                showCamera = true;
                break;
            case RoundType.MixRound: 
                round = <MixRound gameState={gameState} roundState={roundState as MixRoundState} />;
                showCamera = true;
                break;
            case RoundType.AnswerRound:
                round = <AnswerRound gameState = {gameState} roundState={roundState as AnswerRoundState} />;
                showCamera = true;
                smallCamera = true;
                break;

        }

        let backgroundType = '3'

        if (roundType === RoundType.TextRound || roundType === RoundType.MixRound){
            backgroundType = '1'

        }
        else if (roundType === RoundType.WelcomeRound || roundType === RoundType.PauseRound ){
            backgroundType = '2'
        }
       
        const presenterCameras = <Presenters smallCamera = {smallCamera} gameState = {gameState} show = {showCamera}/>;

        return (
            <Root backgroundType={backgroundType}>
                <AudioPlayer />
                {round}
                {presenterCameras}
            </Root >
        )

    }
}
