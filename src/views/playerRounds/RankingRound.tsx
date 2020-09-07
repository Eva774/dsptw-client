import * as React from 'react';
import { GameState } from '../../models/GameState';
import Camera from '../../components/Camera';
import styled from 'styled-components';

type RankingRoundProps = {
    gameState: GameState,
}

const Root = styled.div`
text-align: center;
`

const Presenter1 = styled.div`
    position: absolute;
    margin-top: 20px;
    right: 20px;

`

const Presenter2 = styled.div`
    position: absolute;
    left: 20px;
    bottom: 20px
`

const Media = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 10px 50px 10px rgba(0,0,0,.5), 0px 20px 50px 10px rgba(0,0,0,.5);
`

const RoundName = styled.h1`
    text-align: center
`
export default class RankingRound extends React.Component<RankingRoundProps, {}> {

    render() {
        return <div>PauseRound</div>
        // const { presenters } = this.props.gameState;
        // const { roundName, questions, currentQuestionIndex } = this.props.gameState.roundState;

        // let tussenStand = "Tabel met tussenstand"
        // //Hoe kan de tabel met de tussenstand worden ingeladen terwijl het programma al opstaat?

        // return (
        //     <Root>
        //         <RoundName>{roundName}</RoundName>

        //         <Presenter1>
        //             <Camera name={presenters[0].name} cameraLink={presenters[0].cameraLink} />
        //         </Presenter1>
        //         <Presenter2>
        //             <Camera name={presenters[1].name} cameraLink={presenters[1].cameraLink} />
        //         </Presenter2>
        //         {/* <Media>
        //             {tussenStand}
        //         </Media> */}
        //     </Root>
        // );
    }
}
