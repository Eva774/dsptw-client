import * as React from 'react';
import styled from 'styled-components';
import { PresenterState } from '../models/PresenterState';
import { Theme } from '../Theme'

const Root = styled.div`
    display: flex;
    width: 960px;
    justify-content: ${(props: { namePlace: string }) => props.namePlace === 'left' ? 'flex-end' : 'flex-start'};
    margin: 0 10px;
`

const CameraLinkWrapper = styled.div`
    max-width: 350px;
    max-height: 400px;
    padding: 1rem;
    position: relative;
    background: linear-gradient(80deg, #F52F95, ${Theme.secondary});
    padding: 5px;
`
const CameraLinkDiv = styled.div`
    width: 350px;
    height: 400px;
    overflow: hidden;
    position: relative;
    left: 0px;
    top: 0px;
`

const CameraLink = styled.iframe`
    height: 420px;
    width: 720px;
    box-sizing: border-box;
    position: relative;
    left: -185px;
    top: -10px;
    
`
const Name = styled.span`
    font-size: 80px;
    font-family: 'Avenir LT Std';
    font-weight: normal;
    font-style: normal;
    margin: 40px 20px;
    color: ${Theme.primary};
    background-color: #f3ec78;
    background-image: linear-gradient(70deg, #F52F95, ${Theme.secondary});
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
`

type CameraProps = {
    presenter: PresenterState,
    namePlace?: string,
}

export default class Camera extends React.Component<CameraProps, {}> {

    render() {
        const { name,cameraLink } = this.props.presenter;
        const namePlace = this.props.namePlace ? this.props.namePlace : 'center';
        return (
            <Root namePlace={namePlace}>
                {namePlace === 'left' ? <Name>{name}</Name> : null}
                <CameraLinkWrapper>
                    <CameraLinkDiv>
                    <CameraLink src = {cameraLink}/>
                    </CameraLinkDiv>
                </CameraLinkWrapper>
                {namePlace === 'right' ? <Name>{name}</Name> : null}
            </Root>
        );
    }
}
