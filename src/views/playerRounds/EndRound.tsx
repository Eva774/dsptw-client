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
    margin-top: 75px;
    margin-bottom: 25px;

    max-width: 1820px;
    font-size: 95px;
    color: ${Theme.primaryAccent};
    text-transform: uppercase;
    font-family: 'Phosphate';
    font-weight: normal;
    font-style: normal;
`

const StartTimeWrapper = styled.h2`
    margin: auto;
    margin-top: 0px;
    margin-bottom: 25px;
    max-width: 1820px;
    color: ${Theme.primary};
    font-size: 55px;
    text-transform: uppercase;
    font-family: 'Futura';
    font-weight: normal;
    font-style: normal;
` 
const Title1 = styled.div`
    width: 400px;
    font-family: 'Futura';
    font-size: 45px;
    position: absolute;
    top: 300px;
    left: 580px;
    text-align: left;
    color: ${Theme.primaryAccent}
`
const Title2 = styled.div`
    width: 400px;
    font-family: 'Futura';
    font-size: 45px;
    position: absolute;
    top: 390px;
    left: 1100px;
    text-align: left;
    color: ${Theme.primaryAccent}
    `


const Kolom1 = styled.span`
    display: table;
    width: 500px;
    font-family: 'Avenir LT Std';
    font-size: 40px;
    position: absolute;
    top: 380px;
    left: 580px;
    text-align: left;
    color: ${Theme.primary}
`
const Kolom2 = styled.span`
    display: table;
    width: 600px;
    font-family: 'Avenir LT Std';
    font-size: 40px;
    position: absolute;
    top: 380px;
    left: 1010px;
    text-align: left;
    color: ${Theme.primary}
`

const Kolom3 = styled.span`
    display: table;
    width: 800px;
    font-family: 'Avenir LT Std';
    font-size: 40px;
    position: absolute;
    top: 450px;
    left: 1100px;
    text-align: left;
    color: ${Theme.primary}
`
const Kolom4 = styled.span`
    display: table;
    width: 300px;
    font-family: 'Avenir LT Std';
    font-size: 40px;
    position: absolute;
    top: 450px;
    left: 1500px;
    text-align: left;
    color: ${Theme.primary}
`

const Laatste = styled.div`
    width: 1700px;
    position: absolute;
    left: 180px;
    top: 960px;
    text-align: left;
    font-family: 'Futura';
    font-size: 40px;
    color:  ${Theme.primaryAccent}

`


export default class EndRound extends React.Component<{}, {}> {


    render() {


        return (
            <Root>
                <Titel>Dit was Trivial Time</Titel>
                <StartTimeWrapper>We zien/horen jullie in #babbelen met z'n allen</StartTimeWrapper>
                <Title1>Met dank aan: </Title1>
                <Kolom1>
                Schermkerstbal links <br />
                Schermkerstbal West <br />
                    Redactielampie<br/>
                    Redactiecadeautje<br />
                    Redactiester<br />
                    Redactieslinger<br />
                    Redactiesneeuw<br />
                    Redactiespar<br />
                    Redactiepiek<br />
                    TechniekklaAaAs <br />
                    
                </Kolom1>
                <Kolom2>
                    Kwimmel<br />
                    Vobtex<br />
                    Bobvdv<br />
                    Fibo<br/>
                    Flammable<br/>
                    Jelmen<br/>
                    Lizalzia <br/>
                    Maart3n<br/>
                    Slider <br/>
                    Eva <br/>


                </Kolom2>
                <Laatste>En uiteraard ook de Nerdland crew en alle Nerdland inwoners om dit mogelijk te maken! </Laatste>
            </Root>
        );
    }
}
