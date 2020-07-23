import * as React from 'react';
import { GameState } from '../models/GameState';
import { DrieZesNegenState } from '../models/Rounds/DrieZesNegenState';
import { RoundName } from '../models/RoundName';
import DrieZesNegen from './playerRounds/DrieZesNegen';
import { OpenDeurState } from '../models/Rounds/OpenDeurState';
import { PuzzelState } from '../models/Rounds/PuzzelState';
import { GallerijState } from '../models/Rounds/GallerijState';
import { CollectiefGeheugenState } from '../models/Rounds/CollectiefGeheugenState';
import { FinaleState } from '../models/Rounds/FinaleState';
import OpenDeur from './playerRounds/OpenDeur';
import Puzzel from './playerRounds/Puzzel';
import Gallerij from './playerRounds/Gallerij';
import CollectiefGeheugen from './playerRounds/CollectiefGeheugen';
import Finale from './playerRounds/Finale';
import Players from '../components/Players';

type PlayerProps = {
    gameState?: GameState
}

export default class PlayerView extends React.Component<PlayerProps, {}> {

    render() {
        if (!this.props.gameState) {
            return <div>No props</div>;
        }
        const { currentPlayer, roundState, timerIsRunning, currentPlayers, episode } = this.props.gameState;
        const { roundName } = roundState;

        const players = this.props.gameState.players.filter((player, i) => currentPlayers.includes(i));

        let round = null;
        switch (roundName) {
            case RoundName.DrieZesNegen:
                round = <DrieZesNegen roundState={roundState as DrieZesNegenState} />;
                break;
            case RoundName.OpenDeur:
                round = <OpenDeur roundState={roundState as OpenDeurState} episode={episode} />;
                break;
            case RoundName.Puzzel:
                round = <Puzzel roundState={roundState as PuzzelState} />;
                break;
            case RoundName.Gallerij:
                round = <Gallerij roundState={roundState as GallerijState} episode={episode} />;
                break;
            case RoundName.CollectiefGeheugen:
                round = <CollectiefGeheugen roundState={roundState as CollectiefGeheugenState} episode={episode} />;
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
