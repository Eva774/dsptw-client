import * as React from 'react';
import { DrieZesNegenState } from '../../models/Rounds/DrieZesNegenState';
import { correctAnswer } from '../../api/localServer';

type DrieZesNegenProps = {
    roundState: DrieZesNegenState
}

export default class DrieZesNegen extends React.Component<DrieZesNegenProps, {}> {

    render() {
        return (
            <div>
                <button onClick={() => correctAnswer()}>Correct Answer</button>
            </div>
        );
    }
}
