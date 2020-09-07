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
        roundNumber: 1,
        roundState: {
          targetTime: new Date(new Date().getTime() + 100000),
          roundName: "Filmpjes",
          roundType: RoundType.WelcomeRound,
          questions: [
            "Hoe heet is flammable",
            "Hoe Lang is een chinees met een baard?",
            "Hoe lelijk is Sebastiaan zijn snor?",
            "Hoe kwets je iemand zijn gevoelens?",
            "Hoe grappig zijn inside jokes?",
            "Wanneer zeg je `Thats what's she said?`",
          ],
          currentQuestionIndex: 1,
        },
        presenters: [{
          name: "Eva",
          cameraLink: "https://obs.ninja/?view=CJZ2H2X",
        },
        {
          name: "Sebastiaan",
          cameraLink: "https://obs.ninja/?view=CJZ2H2X",
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
