import * as React from 'react';
import { CollectiefGeheugenState } from '../../models/Rounds/CollectiefGeheugenState';

type CollectiefGeheugenProps = {
    roundState: CollectiefGeheugenState
}

export default class CollectiefGeheugen extends React.Component<CollectiefGeheugenProps, {}> {

    render() {
        return (
            <div>
                CollectiefGeheugen
            </div>
        );
    }
}
