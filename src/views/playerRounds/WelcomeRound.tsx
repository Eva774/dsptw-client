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
`

const ClockWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 700px;
    margin: 400px auto 0 auto;
`

const Minutes = styled.p`
    color: ${Theme.primary};
    font-family: 'Phosphate';
    font-size: 180px;
    width:300px;
    text-align: left;
`
const Dubbelpunt = styled.p`
    color: ${Theme.primary};
    font-family: 'Phosphate';
    font-size: 180px;
    width:100px;
    text-align: center;
`

const Hours = styled.p`
    color: ${Theme.primary};
    font-family: 'Phosphate';
    font-size: 180px;
    width:300px;
    text-align:right;
`
const Clock = styled.p`
    margin-top:550px;
    color: ${Theme.primary};
    font-family: 'Phosphate';
    font-size: 180px;
`
const Titel = styled.h2`
    position: absolute;
    top: 120px;
    left: 200px;
    max-width: 900px;
    text-align: left;
    font-size: 65px;
    color: ${Theme.primaryAccent};
    text-transform: uppercase;
    font-family: 'Avenir Book';
    font-weight: normal;
`

const StartTimeWrapper = styled.h2`
    position: absolute;
    max-width: 800px;
    text-align: left;
    top: 120px;
    left: 1200px;
    color: ${Theme.primaryAccent};
    font-size: 65px;
    text-transform: uppercase;
    font-family: 'Avenir Book';
    text-align: right;
    font-weight: normal;
`
const Text = styled.h2`
    position: absolute;
    top: 350px;
    left: 200px;
    max-width: 800px;
    text-align: left;
    font-size: 65px;
    color: ${Theme.primaryAccent};
    text-transform: uppercase;
    font-family: 'Avenir Book';
    font-weight: normal;
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
        }, 1000);
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
        let minutes = `${prefix(minutesLeft)}`;
        let seconds = `${prefix(secondsLeft)}`;
        let dubbelpunt = `:`;
        if (timeLeft <= 0) {
            clock = 'NU'
            minutes = ``;
            seconds = `NU`;
            dubbelpunt = ``;
        }

        return (
            <Root>
                <Titel>Zet u nu ne keer klaar voor diene quiz</Titel>
                <StartTimeWrapper>Startuur {printTime}</StartTimeWrapper>
                <Text>Het begint over ...</Text>
                <ClockWrapper>
                    <Hours>{minutes}</Hours>
                    <Dubbelpunt> {dubbelpunt} </Dubbelpunt>
                    <Minutes>{seconds}</Minutes>
                </ClockWrapper>

            </Root>
        );
    }
}
