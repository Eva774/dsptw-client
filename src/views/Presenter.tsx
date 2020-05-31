import * as React from "react";
import { getGameStateUpdateStream, nextRound } from '../api/localServer';

export default class Presenter extends React.Component<{}, {}> {

    componentDidMount() {
        getGameStateUpdateStream().subscribe(data => {
            console.log(data)
        })
    }

    render() {
        return (
            <div>
                Presenter
                <button onClick={nextRound}>VOlgEnDE RonDE</button>
            </div>
        );
    }
}
