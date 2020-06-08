import * as React from 'react';
import { GallerijState } from '../../models/Rounds/GallerijState';

type GallerijProps = {
    roundState: GallerijState
}

export default class Gallerij extends React.Component<GallerijProps, {}> {

    render() {
        const { currentImageIndex, currentQuestionSeriesIndex, questions } = this.props.roundState;
        return (
            <div>
                Gallerij {questions[currentQuestionSeriesIndex][currentImageIndex].imageUrl}
                <img src={questions[currentQuestionSeriesIndex][currentImageIndex].imageUrl} />
            </div>
        );
    }
}
