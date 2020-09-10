import * as React from 'react';
import { GameState } from '../../models/GameState';
import { nextQuestion, previousQuestion, playVideo } from '../../api/localServer';
import { MediaRoundState } from '../../models/Rounds/MediaRoundState';

type MediaRoundProps = {
    gameState: GameState,
    roundState: MediaRoundState,
}

export default class MediaRound extends React.Component<MediaRoundProps, {}> {

    render() {
        const { gameState, roundState } = this.props;
        const { questions, currentQuestionIndex } = roundState;

        let question = ""
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            question = questions[currentQuestionIndex];
        }

        return (
            <div>
                <div>Vraag {currentQuestionIndex + 1}: {question}</div>
                <button onClick={previousQuestion}>Previous question</button>
                <button onClick={nextQuestion}>Next question</button>
                <button onClick={playVideo}>Play Video</button>
            </div>
        );
    }
}
