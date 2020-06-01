import * as React from 'react';
import styled from 'styled-components';
import { PlayerState } from '../models/PlayerState';
import { Theme } from '../Theme'

const Root = styled.div`
    margin: 10px;
`

const Name = styled.h1`
    color: ${(props: { isCurrentPlayer: boolean }) => props.isCurrentPlayer ? Theme.primaryAccent : Theme.primary};
    text-shadow: 2px 2px rgba(0,0,0,0.75);
`

const Time = styled.h2`
    text-shadow: 2px 2px rgba(0,0,0,0.75);
`

type PlayerProps = {
    playerState: PlayerState,
    isCurrentPlayer: boolean,
}

export default class Player extends React.Component<PlayerProps, {}> {

    render() {
        const { playerState, isCurrentPlayer } = this.props;
        // TODO time running animation
        return (
            <Root>
                <Name isCurrentPlayer={isCurrentPlayer}>{playerState.name}</Name>
                <Time>{Math.floor(playerState.time / 1000)}</Time>
            </Root>
        );
    }
}
