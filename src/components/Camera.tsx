import * as React from 'react';
import styled from 'styled-components';
import { Name } from './Name';
import { CameraLink } from './CameraLink';


const Root = styled.div`
    width: 480px;
    text-align: center;
`

type CameraProps = {
    name: string,
    cameraLink: string,
}

export default class Camera extends React.Component<CameraProps, {}> {

    render() {
        const { name, cameraLink } = this.props;
        return (
            <Root>
                <CameraLink src={cameraLink} />
                <Name>{name}</Name>
            </Root>
        );
    }
}
