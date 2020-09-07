import * as React from 'react';
import styled from 'styled-components';
import { previousRound, nextRound } from '../api/localServer';
import { GameState } from '../models/GameState';
import { RoundType } from '../models/RoundType';

import SocketStatus from '../components/SocketStatus';
import TextRound from './presenterRounds/TextRound';
import { TextRoundState } from '../models/Rounds/TextRoundState';

const Wrapper = styled.div`
    font-size: 2em;
`

type PresenterProps = {
    gameState?: GameState
}

export default class Presenter extends React.Component<PresenterProps, {}> {


    render() {
        if (!this.props.gameState) {
            return <div>Not connected to server, is the server online?</div>;
        }
        const { roundState } = this.props.gameState;
        const { roundName, roundType } = roundState;

        let round = null;

        switch (roundType) {
            case RoundType.TextRound:
                round = <TextRound gameState={this.props.gameState} roundState={roundState as TextRoundState} />
                break;
        }

        return (
            <Wrapper>
                <SocketStatus />
                <div>
                    <button onClick={previousRound}>Previous round</button>
                    <button onClick={nextRound}>Next round</button>
                </div>
                <h1>{roundType} - {roundName}</h1>
                {round}
            </Wrapper>
        )
    }
}
