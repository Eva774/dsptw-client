import * as React from 'react';
import Presenter from './views/Presenter';
import { openConnection, getGameStateUpdateStream } from './api/localServer';
import PlayerView from './views/PlayerView';
import { GameState } from './models/GameState';
import { RoundName } from './models/RoundName';
import { RoundType } from './models/RoundType';

type AppState = {
  isPresenter: boolean,
  gameState?: GameState,
}

export default class Hello extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);
    const presenter = new URL(window.location.toString()).searchParams.get('presenter');
    this.state = {
      isPresenter: presenter !== null,
      gameState: {
        roundNumber: 0,
        roundState: {
          roundName: RoundName.CollectiefGeheugen,
          roundType: RoundType.MediaRound,
          questions: [
            "Hoe heet is flammable",
            "Hoe grappig is de woordgrap?",
            "Hoe lelijk is Sebastiaan zijn snor?",
            "Hoe kwets je iemand zijn gevoelens?",
            "Hoe grappig zijn inside jokes?",
            "Wanneer zeg je `Thats what's she said?`",
          ],
          currentQuestionIndex: 1,
        },
        presenters: [{
          name: "Eva",
          cameraLink: "https://obs.ninja/",
        },
        {
          name: "Sebastiaan",
          cameraLink: "https://obs.ninja/",
        }
        ]
      }
    }
  }

  componentDidMount() {
    openConnection();
    getGameStateUpdateStream().subscribe((gameState: any) => {
      console.log('gameStateUpdate', gameState)
      this.setState({
        gameState
      })
    })
  }

  render() {
    const { isPresenter } = this.state;
    console.log('state', this.state)
    return <PlayerView gameState={this.state.gameState} />
    // return (
    //   <>
    //     {isPresenter ? <Presenter gameState={this.state.gameState} /> : <PlayerView gameState={this.state.gameState} />}
    //   </>
    // );
  }
}
