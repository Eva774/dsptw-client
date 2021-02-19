import * as React from 'react';
import { GameState } from '../../models/GameState';
import styled from 'styled-components';
import { TalkingRoundState } from '../../models/Rounds/TalkingRoundState';
import { Title } from '../../components/Title';
import { Theme } from '../../Theme';


type TalkingRoundProps = {
    gameState: GameState,
    roundState: TalkingRoundState,
}

const Root = styled.div`
    text-align: center;
`


const RoundName = styled.h1`
    color: ${Theme.primaryAccent};
    font-family: 'Avenir Book';
    font-size: 85px;
    text-transform: uppercase;
    margin: 22px 0;
`

const NameLeft = styled.div`
    position: absolute;
    top: 750px;
    left: 500px;
    width: 350px;
    text-align: center;
    font-size: 70px;
    font-family: 'Avenir Book';
    margin: 30px 20px;
    color: ${Theme.primary};
`
const NameRight = styled.div`
    position: absolute;
    top: 750px;
    right: 500px;
    width: 350px;
    text-align: center;
    font-size: 70px;
    font-family: 'Avenir Book';
    margin: 30px 20px;
    color: ${Theme.primary};
`
export default class TalkingRound extends React.Component<TalkingRoundProps, {}> {

    render() {
        const { gameState, roundState } = this.props;
        const { presenters } = gameState;
        const { roundName } = roundState;

        return (
            <Root>
                <Title>TRIVIAL TIME</Title>
                <RoundName>{roundName}</RoundName>
                <NameLeft>{presenters[0].name}</NameLeft>
                <NameRight>{presenters[1].name}</NameRight>
            </Root>
        );
    }
}
