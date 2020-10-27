import * as React from 'react';
import styled from 'styled-components';
import { Theme } from '../../Theme';



const Root = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
`
const Titel = styled.h2`
    margin: auto;
    margin-top: 200px;
    margin-bottom: 75px;

    max-width: 800px;
    font-size: 65px;
    color: ${Theme.primaryAccent};
    text-transform: uppercase;
    font-family: 'Avenir LT Std';
    font-weight: normal;
    font-style: normal;
`

const StartTimeWrapper = styled.h2`
    margin: auto;
    margin-top: 100px;
    margin-bottom: 100px;
    max-width: 900px;
    color: ${Theme.primary};
    font-size: 65px;
    text-transform: uppercase;
    font-family: 'Avenir LT Std';
    font-weight: normal;
    font-style: normal;
`

export default class EndRound extends React.Component<{}, {}> {


    render() {


        return (
            <Root>
                <Titel>Dit was Trivial Time</Titel>
                <StartTimeWrapper>we zien/horen jullie in #babbelen met z'n allen</StartTimeWrapper>
            </Root>
        );
    }
}
