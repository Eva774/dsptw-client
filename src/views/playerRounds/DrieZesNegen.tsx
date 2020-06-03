import * as React from 'react';
import styled from 'styled-components';
import { DrieZesNegenState } from '../../models/Rounds/DrieZesNegenState';
import { Theme } from '../../Theme';

const Root = styled.div`
text-align: center;
`;

const Question = styled.div`
    margin-top: 40px;
    padding: 0 30px;
    font-size: 70px;
    text-shadow: 0px 2px 1px rgba(0,0,0,0.5);
`;

const NumberWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    line-height: 80px;
    margin-top: 140px;
`;

const BaseNumber = styled.div`
    color: ${Theme.primary};
    font-size: 70px;
    width: 90px;
    height: 90px;
    text-shadow: 0px 2px 1px rgba(0,0,0,0.5);
`

const AskedNumber = styled(BaseNumber)`
    color: rgba(255,255,250,.1);
    text-shadow: 0px 2px 1px rgba(0,0,0,0.1);
`

const CurrentNumber = styled(BaseNumber)`
    background: ${Theme.primaryAccent};
    border-radius: 50%;
`

type DrieZesNegenProps = {
    roundState: DrieZesNegenState
}

export default class DrieZesNegen extends React.Component<DrieZesNegenProps, {}> {

    render() {
        const { roundState } = this.props;
        const { currentQuestionIndex } = roundState;

        const numbers = roundState.questions.map((_, i) => {
            if (currentQuestionIndex > i) {
                return <AskedNumber key={'askedNumber' + i}>{i + 1}</AskedNumber>
            } else if (currentQuestionIndex === i) {
                return <CurrentNumber key={'currentNumber' + i}>{i + 1}</CurrentNumber>
            }
            return <BaseNumber key={'baseNumber' + i}>{i + 1}</BaseNumber>
        })

        return (
            <Root>
                <NumberWrapper>
                    {numbers}
                </NumberWrapper>
                <Question>{roundState.questions[currentQuestionIndex].question}</Question>
            </Root>
        );
    }
}
