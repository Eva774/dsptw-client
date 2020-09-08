import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';
import { WelcomeRoundState } from '../../models/Rounds/WelcomeRoundState';

type WelcomeRoundProps = {
    gameState: GameState,
    roundState: WelcomeRoundState,
}

type WelcomeRoundInternalState = {
    timeLeft: number,
}

const Root = styled.div`
    text-align: center;
`
const Clock = styled.p`
    text-align: center;
    font-size: 80px;
    top-margin:40px
`
const Titel = styled.div`
    margin: 120px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

function prefix(input: number) {
    return input < 10 ? "0" + input.toString() : input.toString();
}


export default class WelcomeRound extends React.Component<WelcomeRoundProps, WelcomeRoundInternalState> {

    state = {
        timeLeft: 0
    }

    componentDidMount() {
        setInterval(() => {
            const targetTime = new Date(this.props.roundState.targetTime);
            const currentTime = new Date();
            const timeLeft = targetTime.getTime() - currentTime.getTime();

            console.log(timeLeft)
            this.setState({
                timeLeft
            });
        }, 1000)
    }

    render() {
        const targetTime = new Date(this.props.roundState.targetTime);
        const { timeLeft } = this.state;

        const minutesLeft = Math.floor(timeLeft / 60000);
        const secondsLeft = Math.floor((timeLeft % 60000 / 1000));
        let clock = prefix(minutesLeft) + ':' + prefix(secondsLeft);

        const printTime = `${prefix(targetTime.getHours())}:${prefix(targetTime.getMinutes())}`;

        if (timeLeft <= 0) {
            clock = 'We beginnen zo meteen'
        }

        return (
            <Root>
                <Titel>
                    <h1> Trivial time!!</h1>
                    <h1> We beginnen om {printTime}</h1>
                </Titel>
                <Clock>
                    {clock}
                </Clock>
            </Root>
        );
    }
}
