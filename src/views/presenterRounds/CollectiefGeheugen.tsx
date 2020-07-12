import * as React from 'react';
import { CollectiefGeheugenState } from '../../models/Rounds/CollectiefGeheugenState';
import { PresenterAnswer } from '../../components/PresenterAnswer';
import { setView, correctAnswer, showAllAnsers } from '../../api/localServer';
import { ViewType } from '../../models/ViewType';

type CollectiefGeheugenProps = {
    roundState: CollectiefGeheugenState
}

export default class CollectiefGeheugen extends React.Component<CollectiefGeheugenProps, {}> {
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
                Collectief Geheugen
                <button onClick={() => setView(ViewType.Videos)}>Show videos</button>
                <button onClick={() => showAllAnsers()}>Show All Answers</button>
                <ul>
                    {presenterAnswers}
                </ul>
            </div>
        );
    }
}
