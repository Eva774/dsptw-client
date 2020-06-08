import * as React from 'react';
import { GallerijState } from '../../models/Rounds/GallerijState';
import { nextImage } from '../../api/localServer';

type GallerijProps = {
    roundState: GallerijState
}

export default class Gallerij extends React.Component<GallerijProps, {}> {

    render() {
        const { currentImageIndex, currentQuestionSeriesIndex, questions } = this.props.roundState;
        return (
            <div>
                Gallerij
                <button onClick={() => nextImage()}>Next image</button>
                {questions[currentQuestionSeriesIndex][currentImageIndex].answer}
            </div>
        );
    }
}
