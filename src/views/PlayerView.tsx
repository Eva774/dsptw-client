import * as React from 'react';
import { nextRound, startTime, stopTime, nextPlayer } from '../api/localServer';
import { GameState } from '../models/GameState';
import { DrieZesNegenState } from '../models/Rounds/DrieZesNegenState';
import { RoundName } from '../models/RoundName';
import DrieZesNegen from './rounds/DrieZesNegen';
import { OpenDeurState } from '../models/Rounds/OpenDeurState';
import { PuzzelState } from '../models/Rounds/PuzzelState';
import { GallerijState } from '../models/Rounds/GallerijState';
import { CollectiefGeheugenState } from '../models/Rounds/CollectiefGeheugenState';
import { FinaleState } from '../models/Rounds/FinaleState';
import OpenDeur from './rounds/OpenDeur';
import Puzzel from './rounds/Puzzel';
import Gallerij from './rounds/Gallerij';
import CollectiefGeheugen from './rounds/CollectiefGeheugen';
import Finale from './rounds/Finale';
import Player from '../components/Player';
import Players from '../components/Players';

type PlayerProps = {
    gameState?: GameState
}

export default class PlayerView extends React.Component<PlayerProps, {}> {

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

        return (
            <div>
                <Players players={players} currentPlayer={currentPlayer} />
                {round}
            </div>
        )

    }
}
