import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';
import { TalkingRoundState } from '../../models/Rounds/TalkingRoundState';
import { Title } from '../../components/Title';
import { Theme } from '../../Theme';
import Presenters from '../../components/Presenters';

type TalkingRoundProps = {
    gameState: GameState,
    roundState: TalkingRoundState,
}

const Root = styled.div`
    text-align: center;
`


const RoundName = styled.h1`
    color: ${Theme.primaryAccent};
    font-family: 'Spooky Skeleton';
    font-weight: normal;
    font-style: normal;
    font-size: 85px;
    text-transform: uppercase;
    margin: 22px 0;
`

export default class TalkingRound extends React.Component<TalkingRoundProps, {}> {

    render() {
        const { gameState, roundState } = this.props;
        const { presenters } = gameState;
        const { roundName } = roundState;

        return (
            <Root>
                <Title>Trivial Time</Title>
                <RoundName>{roundName}</RoundName>
                {/* <Presenters>
                    <Camera presenter={presenters[0]} namePlace="left" />

                    <Camera presenter={presenters[1]} namePlace="right" />
                </Presenters> */}
            </Root>
        );
    }
}
