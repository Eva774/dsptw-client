import * as React from "react";
import { GameState } from "../../dsptw-common/models/GameState";
import Presenter from './views/Presenter';
import { openConnection } from './api/localServer';
import Player from './views/Player';

type AppState = {
  isPresenter: boolean
}

export default class Hello extends React.Component<{}, AppState> {


  constructor(props: {}) {
    super(props);
    const presenter = new URL(window.location.toString()).searchParams.get('presenter');
    this.state = { isPresenter: presenter !== null };
  }

  componentDidMount() {
    // TODO config for connection
    openConnection();
  }

  render() {
    const { isPresenter } = this.state;
    return (
      <>
        <div>isPresenter: {this.state.isPresenter.toString()}</div>
        {isPresenter ? <Presenter /> : <Player />}
      </>
    );
  }
}
