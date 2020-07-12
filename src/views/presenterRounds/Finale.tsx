import * as React from 'react';
import { FinaleState } from '../../models/Rounds/FinaleState';
import { correctAnswer, setView, showAllAnsers, nextQuestion } from '../../api/localServer';
import { PresenterAnswer } from '../../components/PresenterAnswer';
import { ViewType } from '../../models/ViewType';

type FinaleProps = {
    roundState: FinaleState
}

export default class Finale extends React.Component<FinaleProps, {}> {

    onAnswerClick = (i: number) => {
        console.log('onAnswerClick', i);
        const { currentQuestionIndex, questions } = this.props.roundState;
        if (!questions[currentQuestionIndex].answers[i].found) {
            correctAnswer(i);
        }
    }
    render() {
        // TODO button to show answers that weren't found
        const { currentQuestionIndex, questions } = this.props.roundState;
        const presenterAnswers = questions[currentQuestionIndex].answers.map((answer, i) =>
            <PresenterAnswer key={answer.text + i} found={answer.found} onAnswerClick={() => this.onAnswerClick(i)}>{answer.text}</PresenterAnswer>)
        return (
            <div>
                Finale
                <div>{questions[currentQuestionIndex].question}</div>
                <button onClick={showAllAnsers}>show answers</button>
                <button onClick={nextQuestion}>next question</button>
                <ul>
                    {presenterAnswers}
                </ul>
            </div>
        );
    }
}
