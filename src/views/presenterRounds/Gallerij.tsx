import * as React from 'react';
import { GallerijState } from '../../models/Rounds/GallerijState';
import { nextImage, correctAnswer, nextQuestion } from '../../api/localServer';
import styled from 'styled-components';

type GallerijProps = {
    roundState: GallerijState
}

const Answer = styled.li`
    ${(props: { current: boolean }) => props.current ? `text-decoration: underline;` : ''};
`

const FoundAnswer = styled.li`
    text-decoration: line-through;
`

export default class Gallerij extends React.Component<GallerijProps, {}> {

    render() {
        const { currentImageIndex, questions } = this.props.roundState;
        let currentQuestionSeriesIndex = this.props.roundState.currentQuestionSeriesIndex;

        if (currentQuestionSeriesIndex < 0) {
            currentQuestionSeriesIndex = 0;
        }
        const answers =
            questions[currentQuestionSeriesIndex].map((question, i) => {
                if (question.found) {
                    return <FoundAnswer>{question.answer}</FoundAnswer>;
                }
                return <Answer current={currentImageIndex === i} onClick={() => correctAnswer(i)}>{question.answer}</Answer>
            })
        return (
            <div>
                Gallerij
                <button onClick={() => nextImage()}> Next image</button >
                <button onClick={() => nextQuestion()}> Next series</button >
                <ul>
                    {answers}
                </ul>
            </div >
        );
    }
}
