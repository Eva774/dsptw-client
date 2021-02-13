import * as React from 'react';
import styled from 'styled-components';
import { GameState } from '../models/GameState';
import Camera from './Camera';


const Root = styled.div` 
`
type PresenterProps = {
    smallCamera: boolean, 
    gameState: GameState,
    show:boolean,
}

export default class Presenters extends React.Component<PresenterProps,{}>{


    render () {
        const { presenters } = this.props.gameState
        const smallCamera = this.props.smallCamera
        const show = this.props.show 

    return(
        <Root>
            <Camera smallCamera={smallCamera} presenter={presenters[0]} namePlace={'left'} show = {show}/>
            <Camera smallCamera={smallCamera} presenter={presenters[1]} namePlace={'right'} show = {show}/>
        </Root>
    )
    }



}