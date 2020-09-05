import * as React from 'react';
import { GalerijState } from '../../models/Rounds/GalerijState';
import { nextQuestion } from '../../api/localServer';
import styled from 'styled-components';

type GalerijProps = {
    roundState: GalerijState
}

const Answer = styled.li`
    ${(props: { current: boolean }) => props.current ? `text-decoration: underline;` : ''};
`

const FoundAnswer = styled.li`
    text-decoration: line-through;
`

export default class Galerij extends React.Component<GalerijProps, {}> {

    render() {
        const { currentImageIndex, questions } = this.props.roundState;
        let currentQuestionSeriesIndex = this.props.roundState.currentQuestionSeriesIndex;

        if (currentQuestionSeriesIndex < 0) {
            currentQuestionSeriesIndex = 0;
        }
        return (
            <div>
                Galerij
                <button onClick={() => nextQuestion()}> Next series</button >
                <ul>
                    {}
                </ul>
            </div >
        );
    }
}
