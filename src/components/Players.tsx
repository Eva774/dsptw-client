import * as React from 'react';
import styled from 'styled-components';
import { PlayerState } from '../models/PlayerState';
import Player from './Player';
import { Dummy } from './Dummy';
import { Name } from './Name';

const Root = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: center;
`
const DummyWrapper = styled.div`
    width: 480px;
`
type PlayersProps = {
    players: PlayerState[],
    currentPlayers: number[],
    currentPlayer: number,
    presenterName: string,
    presenterCamera: string,
}

export default class Players extends React.Component<PlayersProps, {}> {

    render() {
        const { currentPlayer, currentPlayers, players, presenterName, presenterCamera } = this.props;

        const playersComponent = players.map((player, i) => <Player key={player.name} playerState={player} isCurrentPlayer={currentPlayer === currentPlayers[i]} hideTime={false} />)
        // TODO add presenter info in config and gamestate
        return (
            <Root>
                {playersComponent}
                <DummyWrapper>
                    <Dummy src={presenterCamera} />
                    <Name>{presenterName}</Name>
                </DummyWrapper>
            </Root>
        );
    }
}
