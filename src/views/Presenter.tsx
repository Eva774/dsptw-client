import * as React from 'react';
import styled from 'styled-components';
import { previousRound, nextRound, setWelcomeTargetTime, setPauseTargetTime } from '../api/localServer';
import { GameState } from '../models/GameState';
import { RoundType } from '../models/RoundType';

import SocketStatus from '../components/SocketStatus';
import TextRound from './presenterRounds/TextRound';
import { TextRoundState } from '../models/Rounds/TextRoundState';
import MediaRound from './presenterRounds/MediaRound';
import { MediaRoundState } from '../models/Rounds/MediaRoundState';
import { MixRoundState } from '../models/Rounds/MixRoundState';
import MixRound from './presenterRounds/MixRound';

const Wrapper = styled.div`
    font-size: 2em;
`

type PresenterProps = {
    gameState?: GameState
}

type PresenterState = {
    pauseTargetTime: string,
    welcomeTargetTime: string,
}

export default class Presenter extends React.Component<PresenterProps, PresenterState> {

    state = {
        welcomeTargetTime: "",
        pauseTargetTime: "",
    }

    setWelcomeTargetTimeState = (e: any) => {
        this.setState({
            welcomeTargetTime: e.target.value
        });
    }

    setPauseTargetTimeState = (e: any) => {
        this.setState({
            pauseTargetTime: e.target.value
        });
    }

    setWelcomeTargetTime = () => {
        setWelcomeTargetTime(this.state.welcomeTargetTime);
    }

    setPauseTargetTime = () => {
        setPauseTargetTime(this.state.pauseTargetTime);
    }

    render() {
        if (!this.props.gameState) {
            return <div>Not connected to server, is the server online?</div>;
        }
        const { roundState } = this.props.gameState;
        const { roundName, roundType } = roundState;

        const { welcomeTargetTime, pauseTargetTime } = this.state;

        let round = null;

        switch (roundType) {
            case RoundType.TextRound:
                round = <TextRound gameState={this.props.gameState} roundState={roundState as TextRoundState} />
                break;
            case RoundType.MediaRound:
                round = <MediaRound gameState={this.props.gameState} roundState={roundState as MediaRoundState} />
                break;
            case RoundType.MixRound:
                round = <MixRound gameState={this.props.gameState} roundState={roundState as MixRoundState} />
                break;
            case RoundType.AnswerRound:
                round = <TextRound gameState={this.props.gameState} roundState={roundState as TextRoundState} />
                break;

        }

        return (
            <Wrapper>
                <SocketStatus />
                <h1>{roundType} - {roundName}</h1>
                <div>
                    Welcome round Target Time: <input type="time" onChange={this.setWelcomeTargetTimeState} value={welcomeTargetTime}></input>
                    <button onClick={this.setWelcomeTargetTime}>Submit</button>
                </div>
                <div>
                    Pause round Target Time: <input type="time" onChange={this.setPauseTargetTimeState} value={pauseTargetTime}></input>
                    <button onClick={this.setPauseTargetTime}>Submit</button>
                </div>
                <div>
                    <button onClick={previousRound}>Previous round</button>
                    <button onClick={nextRound}>Next round</button>
                </div>
                {round}
            </Wrapper>
        )
    }
}
