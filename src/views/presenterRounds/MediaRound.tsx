import * as React from 'react';
import { GameState } from '../../models/GameState';
import { nextQuestion, previousQuestion, playVideo, displayQuestion, hideQuestion } from '../../api/localServer';
import { MediaRoundState } from '../../models/Rounds/MediaRoundState';

type MediaRoundProps = {
    gameState: GameState,
    roundState: MediaRoundState,
}

export default class MediaRound extends React.Component<MediaRoundProps, {}> {

    render() {
        const { roundState } = this.props;
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
                <button onClick={displayQuestion}>Show question</button>
                <button onClick={hideQuestion}>Hide question</button>
            </div>
        );
    }
}
