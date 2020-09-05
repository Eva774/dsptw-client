import * as React from 'react';
import { PuzzelState } from '../../models/Rounds/PuzzelState';
import { PresenterAnswer } from '../../components/PresenterAnswer';
import { nextQuestion } from '../../api/localServer';

type PuzzelProps = {
    roundState: PuzzelState
}

export default class Puzzel extends React.Component<PuzzelProps, {}> {


    render() {

        const { puzzles, currentPuzzleIndex } = this.props.roundState;


        return (
            <div>
                Puzzel
                <ul>
                    {}
                </ul>
            </div>
        );
    }
}
