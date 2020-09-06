import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';

type PauseRoundProps = {
    gameState: GameState,

}

const Root = styled.div`
text-align: center;
`
const Klok = styled.p`
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


export default class PauseRound extends React.Component<PauseRoundProps, {}> {
    
    render() {      
        const{ timeLeft } = this.props

        var minutesLeft = Math.floor(timeLeft/60).toString()
        var secondsLeft = timeLeft%60<10 ? "0"+(timeLeft%60).toString() : (timeLeft%60).toString()
        
        let klok = minutesLeft+":"+secondsLeft

        if (timeLeft == 0) { 
            klok = 'We beginnen zometeen'
        }

        return (
            <Root>
                <Titel>
                    <h1> Trivial time!!</h1>
                    <h1> We herbeginnen om 20u</h1>
                </Titel>
                <Klok>
                    {klok}
                </Klok>

                <h1> Neem gerust een drankje of een hapje in tussentijd</h1>
                
            </Root>
        );
    }
}
