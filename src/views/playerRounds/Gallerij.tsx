import * as React from 'react';
import { GallerijState } from '../../models/Rounds/GallerijState';
import styled from 'styled-components';

type GallerijProps = {
    roundState: GallerijState
}

const Wrapper = styled.div`
    display: flex;
    justify-content:center;
    margin: 20px;
`

const Image = styled.img`
    box-shadow: 0px 10px 50px 10px rgba(0,0,0,.5), 0px 20px 50px 10px rgba(0,0,0,.5);
`

export default class Gallerij extends React.Component<GallerijProps, {}> {

    render() {
        const { currentImageIndex, questions } = this.props.roundState;

        let currentQuestionSeriesIndex = this.props.roundState.currentQuestionSeriesIndex;

        if (currentQuestionSeriesIndex < 0) {
            currentQuestionSeriesIndex = 0;
        }
        return (
            <Wrapper>
                {currentImageIndex !== -1 ? <Image height={550} src={`/static/aflevering2/gallerij/${currentQuestionSeriesIndex + 1}/${currentImageIndex + 1}.png`} /> : null}
            </Wrapper>
        );
    }
}
