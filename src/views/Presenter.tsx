import * as React from 'react';
import styled from 'styled-components';
import { nextRound, startTime, stopTime, nextQuestion, nextStartingPlayer, nextPlayerToComplete, showAllAnsers, setPlayerName, setPlayerTime, setPlayerCameraLink } from '../api/localServer';
import { GameState } from '../models/GameState';
import { DrieZesNegenState } from '../models/Rounds/DrieZesNegenState';
import { RoundName } from '../models/RoundName';
import DrieZesNegen from './presenterRounds/DrieZesNegen';
import { OpenDeurState } from '../models/Rounds/OpenDeurState';
import { PuzzelState } from '../models/Rounds/PuzzelState';
import { GallerijState } from '../models/Rounds/GallerijState';
import { CollectiefGeheugenState } from '../models/Rounds/CollectiefGeheugenState';
import { FinaleState } from '../models/Rounds/FinaleState';
import OpenDeur from './presenterRounds/OpenDeur';
import Puzzel from './presenterRounds/Puzzel';
import Gallerij from './presenterRounds/Gallerij';
import CollectiefGeheugen from './presenterRounds/CollectiefGeheugen';
import Finale from './presenterRounds/Finale';
import SocketStatus from '../components/SocketStatus';
// import { setScene, openConnection } from '../api/obs';

const Wrapper = styled.div`
    font-size: 2em;
`

type PresenterProps = {
    gameState?: GameState
}

type PresenterState = {
    playerNames: string[],
    playerTimes: number[],
    playerCameraLinks: string[],
    showEditor: boolean,
}

export default class Presenter extends React.Component<PresenterProps, PresenterState> {

    state = {
        playerNames: [
            "",
            "",
            "",
        ],
        playerTimes: [
            60000,
            60000,
            60000,
        ],
        playerCameraLinks: [
            "",
            "",
            "",
        ],
        showEditor: false
    }

    componentDidMount() {
        // openConnection();
    }

    toggleTimer = () => {
        if (this.props.gameState?.timerIsRunning) {
            console.log('stopping timer')
            stopTime()
        } else {
            console.log('starting timer')
            startTime();
        }
    }

    onNameChange = (index: number, name: string) => {
        this.setState(state => {

            const playerNames = [...state.playerNames];
            playerNames[index] = name;
            return { playerNames };
        });
    }

    setPlayerName = (index: number) => {
        setPlayerName(index, this.state.playerNames[index]);
    }

    onTimeChange = (index: number, timeString: string) => {
        const time = Number.parseInt(timeString);
        this.setState(state => {
            const playerTimes = [...state.playerTimes];
            playerTimes[index] = time;
            return { playerTimes };
        });
    }

    setPlayerTime = (index: number) => {
        setPlayerTime(index, this.state.playerTimes[index]);
    }

    onCameraLinkChange = (index: number, videoLink: string) => {
        this.setState(state => {
            const playerCameraLinks = [...state.playerCameraLinks];
            playerCameraLinks[index] = videoLink;
            return { playerCameraLinks };
        });
    }

    setCameraLink = (index: number) => {
        setPlayerCameraLink(index, this.state.playerCameraLinks[index]);
    }

    render() {
        if (!this.props.gameState) {
            return <div>Not connected to server, is the server online?</div>;
        }
        const { currentPlayer, roundState, players, timerIsRunning } = this.props.gameState;
        const { roundName } = roundState;

        const playersComponent = players.map((player, i) => <li key={player.name + i} style={currentPlayer === i ? {
            textDecoration: 'underline'
        } : {}}>
            {player.name} - {Math.floor(player.time / 1000)}
        </li>)

        const editor = players.map((player, i) => <li key={player.name + i} style={currentPlayer === i ? {
            textDecoration: 'underline'
        } : {}}>
            {player.name} - {Math.floor(player.time / 1000)}
            <input type="text" value={this.state.playerNames[i]} onChange={(e) => this.onNameChange(i, e.target.value)} /><button onClick={() => this.setPlayerName(i)}>Set name</button>
            <input type="number" value={this.state.playerTimes[i]} onChange={(e) => this.onTimeChange(i, e.target.value)} /><button onClick={() => this.setPlayerTime(i)}>Set time</button>
            <input type="text" value={this.state.playerCameraLinks[i]} onChange={(e) => this.onCameraLinkChange(i, e.target.value)} /><button onClick={() => this.setCameraLink(i)}>Set Camera</button>
        </li>)

        let round = null;
        switch (roundName) {
            case RoundName.DrieZesNegen:
                round = <DrieZesNegen roundState={roundState as DrieZesNegenState} />;
                break;
            case RoundName.OpenDeur:
                round = <OpenDeur roundState={roundState as OpenDeurState} />;
                break;
            case RoundName.Puzzel:
                round = <Puzzel roundState={roundState as PuzzelState} />;
                break;
            case RoundName.Gallerij:
                round = <Gallerij roundState={roundState as GallerijState} />;
                break;
            case RoundName.CollectiefGeheugen:
                round = <CollectiefGeheugen roundState={roundState as CollectiefGeheugenState} />;
                break;
            case RoundName.Finale:
                round = <Finale roundState={roundState as FinaleState} />;
                break;
        }

        // TODO add lobby "round" before playing the first round 
        return (
            <Wrapper>
                <SocketStatus />
                <h1>{roundName}</h1>
                <ul>{playersComponent}</ul>
                <button onClick={() => { this.setState(state => ({ showEditor: !state.showEditor })) }}>Toggle editor</button>
                {this.state.showEditor ? <ul>{editor}</ul> : null}
                <div>timerIsRunning: {timerIsRunning.toString()}</div>
                <button onClick={this.toggleTimer}>{timerIsRunning ? 'Stop timer' : 'Start timer'}</button>
                <button onClick={() => nextStartingPlayer()}>Next Starting player</button>
                <button onClick={() => nextPlayerToComplete()}>Next complete player</button>
                <button onClick={() => nextRound()}>Next Round</button>
                <hr />
                {round}
            </Wrapper>
        )

    }
}
