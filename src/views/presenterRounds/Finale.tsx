import * as React from 'react';
import { FinaleState } from '../../models/Rounds/FinaleState';

type FinaleProps = {
    roundState: FinaleState
}

export default class Finale extends React.Component<FinaleProps, {}> {

    render() {
        return (
            <div>
                Finale
            </div>
        );
    }
}
