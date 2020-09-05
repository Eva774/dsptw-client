import * as React from 'react';
import styled from 'styled-components';
import { previousRound, nextRound } from '../api/localServer';
import { GameState } from '../models/GameState';
import { RoundType } from '../models/RoundType';

import SocketStatus from '../components/SocketStatus';

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

    render() {
        if (!this.props.gameState) {
            return <div>Not connected to server, is the server online?</div>;
        }
        const { roundState } = this.props.gameState;
        const { roundName, roundType } = roundState;

        let round = null;

        switch (roundType) {
            case RoundType.TextRound:
                break;
        }

        return (
            <Wrapper>
                <SocketStatus />
                <h1>{roundName}</h1>
                {round}
            </Wrapper>
        )
    }
}
