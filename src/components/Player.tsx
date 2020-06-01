import * as React from 'react';
import styled from 'styled-components';
import { PlayerState } from '../models/PlayerState';
import { Time } from './Time';
import { Name } from './Name';
import { Dummy } from './Dummy';


const Root = styled.div`
    width: 480px;
`

type PlayerProps = {
    playerState: PlayerState,
    isCurrentPlayer: boolean,
    hideTime: boolean,
}

export default class Player extends React.Component<PlayerProps, {}> {

    render() {
        const { playerState, isCurrentPlayer, hideTime } = this.props;
        // TODO time running animation
        return (
            <Root>
                <Dummy />
                <Name>{playerState.name}</Name>
                {hideTime ? null : <Time isCurrentPlayer={isCurrentPlayer}>{Math.floor(playerState.time / 1000)}</Time>}
            </Root>
        );
    }
}
