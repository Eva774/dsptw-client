import * as React from 'react';
import { GameState } from '../../models/GameState';
import styled from 'styled-components';
import { WelcomeRoundState } from '../../models/Rounds/WelcomeRoundState';
import { Theme } from '../../Theme';

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
    position: absolute;
    bottom: 150px;
    left: 1200px;
    max-width: 215px;
    text-align: left;
    color: ${Theme.primaryAccent};
    font-family: 'Phosphate';
    font-size: 140px;
    font-weight: normal;
    font-style: normal;
`
const Titel = styled.h2`
    position: absolute;
    top: 450px;
    left: 200px;
    max-width: 800px;
    text-align: left;
    font-size: 65px;
    color: ${Theme.primary};
    text-transform: uppercase;
    font-family: 'Avenir LT Std';
    font-weight: normal;
    font-style: normal;
`

const StartTimeWrapper = styled.h2`
    position: absolute;
    max-width: 800px;
    text-align: left;
    top: 450px;
    left: 1200px;
    color: ${Theme.primary};
    font-size: 65px;
    text-transform: uppercase;
    font-family: 'Avenir LT Std';
    font-weight: normal;
    font-style: normal;
    text-align: right;
`
const Text = styled.h2`
    position: absolute;
    bottom: 250px;
    left: 200px;
    max-width: 800px;
    text-align: left;
    font-size: 65px;
    color: ${Theme.primary};
    text-transform: uppercase;
    font-family: 'Avenir LT Std';
    font-weight: normal;
    font-style: normal;
    `
function prefix(input: number) {
    return input < 10 ? "0" + input.toString() : input.toString();
}


export default class WelcomeRound extends React.Component<WelcomeRoundProps, WelcomeRoundInternalState> {

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
                <Titel>Zet u nu ne keer klaar voor diene quiz</Titel>
                <StartTimeWrapper>Startuur {printTime}</StartTimeWrapper>
                <Text>We beginnen over ...</Text>
                <Clock>
                    {clock}
                </Clock>

            </Root>
        );
    }
}
