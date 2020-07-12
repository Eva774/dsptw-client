import * as React from 'react';
import { DrieZesNegenState } from '../../models/Rounds/DrieZesNegenState';
import { correctAnswer, nextQuestion } from '../../api/localServer';

type DrieZesNegenProps = {
    roundState: DrieZesNegenState
}

export default class DrieZesNegen extends React.Component<DrieZesNegenProps, {}> {

    render() {
        const { currentQuestionIndex, questions } = this.props.roundState
        return (
            <div>
                <button onClick={() => nextQuestion()}>Next Question</button>
                <button onClick={() => correctAnswer()}>Correct Answer</button>
                <div>{questions[currentQuestionIndex].question}</div>
                <div>{questions[currentQuestionIndex].answer}</div>
            </div>
        );
    }
}
