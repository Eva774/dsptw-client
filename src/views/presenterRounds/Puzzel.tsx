import * as React from 'react';
import { PuzzelState } from '../../models/Rounds/PuzzelState';

type PuzzelProps = {
    roundState: PuzzelState
}

export default class Puzzel extends React.Component<PuzzelProps, {}> {

    render() {
        return (
            <div>
                Puzzel
            </div>
        );
    }
}
