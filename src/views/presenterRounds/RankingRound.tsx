import * as React from 'react';
import { GameState } from '../../models/GameState';
import { RankingRoundState } from '../../models/Rounds/RankingRoundState';
import { nextQuestion, previousQuestion } from '../../api/localServer';

type TextRoundProps = {
    gameState: GameState,
    roundState: RankingRoundState,
}

export default class TextRound extends React.Component<TextRoundProps, {}> {

    render() {
        const { roundState } = this.props;
        const { currentQuestionIndex } = roundState;

        return (
            <div>
                <div>Ranking deel {currentQuestionIndex + 1}</div>
                <button onClick={previousQuestion}>Previous question</button>
                <button onClick={nextQuestion}>Next question</button>
            </div>
        );
    }
}