import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';
import moment from 'moment'

type WelcomeRoundProps = {
    gameState: GameState,
}

type WelcomeRoundState = {
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


export default class WelcomeRound extends React.Component<WelcomeRoundProps, WelcomeRoundState> {

    componentDidMount() {

        setInterval(() => {
            const targetTime = new moment(this.props.gameState.roundState.targetTime);
            const currentTime = new moment()
            const timeLeft = targetTime - currentTime;

            
            console.log(timeLeft)
            this.setState({
                timeLeft
            });

        }, 1000)
    }

    render() {
        const { timeLeft} = this.state;
        
        const minutesLeft = Math.floor((timeLeft/60)).toString()
        const secondsLeft = timeLeft % 60 < 10 ? "0" + (timeLeft % 60).toString() : (timeLeft % 60).toString()

        let clock = minutesLeft + ":" + secondsLeft

        if (timeLeft === 0) {
            clock = 'We beginnen zo meteen'
        }

        return (
            <Root>
                <Titel>
                    <h1> Trivial time!!</h1>
                    <h1> We beginnen om 19u</h1>
                </Titel>
                <Clock>
                    {clock}
                </Clock>

                <h1> [Hier een tabel met de verdeling van de teams over de babelkanalen?]</h1>
                <moment fromNow> 2020-06-09T21:00-0000</moment>

            </Root>
        );
    }
}
