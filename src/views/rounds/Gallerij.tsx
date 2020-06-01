import * as React from 'react';
import { GallerijState } from '../../models/Rounds/GallerijState';

type GallerijProps = {
    roundState: GallerijState
}

export default class Gallerij extends React.Component<GallerijProps, {}> {

    render() {
        return (
            <div>
                Gallerij
            </div>
        );
    }
}
