import * as React from 'react';
import { OpenDeurState } from '../../models/Rounds/OpenDeurState';

type OpenDeurProps = {
    roundState: OpenDeurState
}

export default class OpenDeur extends React.Component<OpenDeurProps, {}> {

    render() {
        return (
            <div>
                OpenDeur
            </div>
        );
    }
}
