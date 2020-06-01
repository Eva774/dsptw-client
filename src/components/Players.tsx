import * as React from 'react';
import styled from 'styled-components';
import { PlayerState } from '../models/PlayerState';
import Player from './Player';

const Root = styled.div`
    display: flex;
    justify-content: space-around;
    text-align: center;
`

type PlayersProps = {
    players: PlayerState[],
    currentPlayer: number
}

export default class Players extends React.Component<PlayersProps, {}> {

    render() {
        const { currentPlayer, players } = this.props;

        const playersComponent = players.map((player, i) => <Player key={player.name} playerState={player} isCurrentPlayer={currentPlayer === i} />)
        return (
            <Root>
                {playersComponent}
            </Root>
        );
    }
}
