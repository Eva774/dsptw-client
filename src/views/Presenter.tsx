import * as React from 'react';
import { nextRound, startTime, stopTime, nextPlayer, nextQuestion } from '../api/localServer';
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
import Players from '../components/Players';
import SocketStatus from '../components/SocketStatus';

type PresenterProps = {
    gameState?: GameState
}

export default class Presenter extends React.Component<PresenterProps, {}> {

    toggleTimer = () => {
        if (this.props.gameState?.timerIsRunning) {
            console.log('stopping timer')
            stopTime()
        } else {
            console.log('starting timer')
            startTime();
        }
    }

    render() {
        if (!this.props.gameState) {
            return <div>No props</div>;
        }
        const { currentPlayer, roundState, players, timerIsRunning } = this.props.gameState;
        const { roundName } = roundState;

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
            <div>
                <SocketStatus />
                <h1>{roundName}</h1>
                <div>Current Player: {players[currentPlayer].name}</div>
                <Players players={players} currentPlayer={currentPlayer} />
                <div>timerIsRunning: {timerIsRunning.toString()}</div>
                <button onClick={this.toggleTimer}>{timerIsRunning ? 'Stop timer' : 'Start timer'}</button>
                <button onClick={() => nextPlayer()}>Next Player</button>
                <button onClick={() => nextRound()}>Next Round</button>
                <button onClick={() => nextQuestion()}>Next Question</button>
                {round}
            </div>
        )

    }
}
