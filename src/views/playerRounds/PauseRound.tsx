import * as React from 'react';
import { GameState } from '../../models/GameState';
import styled from 'styled-components';
import { PauseRoundState } from '../../models/Rounds/PauseRoundState';
import { Theme } from '../../Theme';

type PauseRoundProps = {
    gameState: GameState,
    roundState: PauseRoundState,
}
type WelcomeRoundInternalState = {
    timeLeft: number,
}
const Root = styled.div`
    text-align: center;
`
const Clock = styled.p`
    margin-top: 550px;
    color: ${Theme.primaryAccent};
    font-family: 'Phosphate';
    font-size: 180px;
`
const Titel = styled.h2`
    position: absolute;
    top: 120px;
    left: 200px;
    max-width: 800px;
    text-align: left;
    font-size: 65px;
    color: ${Theme.primary};
    text-transform: uppercase;
    font-family: 'Avenir Book';
    font-weight: normal;
`

const StartTimeWrapper = styled.h2`
    position: absolute;
    max-width: 1000px;
    text-align: left;
    top: 350px;
    left: 200px;
    color: ${Theme.primary};
    font-size: 65px;
    text-transform: uppercase;
    font-family: 'Avenir Book';
    text-align: right;
    font-weight: normal;
`
function prefix(input: number) {
    return input < 10 ? "0" + input.toString() : input.toString();
}

export default class PauseRound extends React.Component<PauseRoundProps, WelcomeRoundInternalState> {
    state = {
        timeLeft: 0
    }

    timer: number | undefined;

    componentDidMount() {
        this.timer = setInterval(() => {
            const targetTime = new Date(this.props.roundState.targetTime);
            const currentTime = new Date();
            const timeLeft = targetTime.getTime() - currentTime.getTime();

            this.setState({
                timeLeft
            });
        }, 1000)
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {
        const targetTime = new Date(this.props.roundState.targetTime);
        const { timeLeft } = this.state;

        const minutesLeft = Math.floor(timeLeft / 60000);
        const secondsLeft = Math.floor((timeLeft % 60000 / 1000));
        let clock = prefix(minutesLeft) + ':' + prefix(secondsLeft);

        const printTime = `${prefix(targetTime.getHours())}:${prefix(targetTime.getMinutes())}`;

        if (timeLeft <= 0) {
            clock = 'NU'
        }

        return (
            <Root>
                <Titel>Pakt u een hapje en een drankje!</Titel>
                <StartTimeWrapper>We herbeginnen om {printTime}</StartTimeWrapper>
                <Clock>
                    {clock}
                </Clock>
            </Root>
        );
    }
}
