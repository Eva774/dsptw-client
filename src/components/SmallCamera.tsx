import * as React from 'react';
import styled from 'styled-components';
import { PresenterState } from '../models/PresenterState';
import { Theme } from '../Theme'


const CameraLinkWrapper = styled.div`
    max-width: 240px;
    max-height: 275px;
    padding: 1rem;
    position: relative;
    background: linear-gradient(80deg, #F52F95, ${Theme.secondary});
    padding: 5px;
`

const CameraLink = styled.iframe`
    width: 240px;
    height: 275px;
    box-sizing: border-box;
    background-color:black;
`

type CameraProps = {
    presenter: PresenterState,
}

export default class SmallCamera extends React.Component<CameraProps, {}> {

    render() {
        const { name, cameraLink } = this.props.presenter;
        return (
            <CameraLinkWrapper>
                <CameraLink src={cameraLink} frameBorder="0" />
            </CameraLinkWrapper>
        );
    }
}
