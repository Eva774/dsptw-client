import * as React from 'react';
import styled from 'styled-components';
import { GameState } from '../models/GameState';
import { Theme } from '../Theme';
import Camera from './Camera';
import SmallCamera from './SmallCamera';


const Root = styled.div` 
`
const SmallPresenter1 = styled.div`
    position: absolute;
    left: 35px;
    bottom: 170px
`

const SmallPresenter2 = styled.div`
    position: absolute;
    top: 60px;
    right: 35px;
`

const TimerWrapper = styled.div`
    position: relative;
    width: 120px;
    height: 400px;
    border: 5px solid ${Theme.primary};
    margin: 0 50px;
`
type PresenterProps = {
    smallCamera: boolean, 
    gameState: GameState,
    show:boolean,
}

export default class Presenters extends React.Component<PresenterProps,{}>{


    render () {
        const { presenters, questionDuration } = this.props.gameState
        const smallCamera = this.props.smallCamera
        const show = this.props.show 
        console.log(show)

    return(
        <Root>
            <Camera smallCamera={smallCamera} presenter={presenters[0]} namePlace={'left'} show = {show}/>
            <Camera smallCamera={smallCamera} presenter={presenters[1]} namePlace={'right'} show = {show}/>
        </Root>
    )
    }



}