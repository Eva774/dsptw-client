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
    font-size: 85px;
    color: ${Theme.primary};
    text-transform: uppercase;
    font-family: 'Scary Halloween';
    font-weight: normal;
    font-style: normal;
`

const StartTimeWrapper = styled.h2`
    margin: auto;
    margin-top: 0px;
    margin-bottom: 25px;
    max-width: 1820px;
    color: ${Theme.primaryAccent};
    font-size: 55px;
    text-transform: uppercase;
    font-family: 'Spooky Skeleton';
    font-weight: normal;
    font-style: normal;
` 
const Title1 = styled.div`
    width: 400px;
    font-family: 'Avenir LT Std';
    font-size: 45px;
    position: absolute;
    top: 390px;
    left: 180px;
    text-align: left;
    color: ${Theme.primary}
`
const Title2 = styled.div`
    width: 400px;
    font-family: 'Avenir LT Std';
    font-size: 45px;
    position: absolute;
    top: 390px;
    left: 1100px;
    text-align: left;
    color: ${Theme.primary}
    `


const Kolom1 = styled.span`
    display: table;
    width: 400px;
    font-family: 'Avenir LT Std';
    font-size: 40px;
    position: absolute;
    top: 450px;
    left: 180px;
    text-align: left;
    color: ${Theme.primaryAccent}
`
const Kolom2 = styled.span`
    display: table;
    width: 600px;
    font-family: 'Avenir LT Std';
    font-size: 40px;
    position: absolute;
    top: 450px;
    left: 410px;
    text-align: left;
    color: ${Theme.primaryAccent}
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
    color: ${Theme.primaryAccent}
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
    color: ${Theme.primaryAccent}
`

const Laatste = styled.div`
    width: 1700px;
    position: absolute;
    left: 180px;
    top: 960px;
    text-align: left;
    font-family: 'Avenir LT Std';
    font-size: 40px;
    color:  ${Theme.secondary}

`


export default class EndRound extends React.Component<{}, {}> {


    render() {


        return (
            <Root>
                <Titel>Dit was Trivial Time</Titel>
                <StartTimeWrapper>We zien/horen jullie in #babbelen met z'n allen</StartTimeWrapper>
                <StartTimeWrapper>Met dank aan:</StartTimeWrapper>
                <Title1><b>Voor de filmpjes:</b></Title1>
                <Kolom1>
                DVC <br />
                Stephanie <br />
                    Jezus<br/>
                    Thiadrik<br />
                    Omar<br />
                    Diede<br />
                    
                    Xavier <br />
                    Hanaï <br />
                    Robert Jan <br />
                    Annelies <br />
                    
                </Kolom1>
                <Kolom2>
                    Je kent ze wel<br />
                    Van die ene podcast<br />
                    Of John Lennon<br/>
                    @Toldersma - CS:GO caster<br />
                    @WoongLoL - LoL analyst <br />
                    @CastingDino - LoL caster<br />
                    
                    @CasterXsodus - LoL caster<br />
                    @mowglitch - deskhost<br />
                    @RJcasts - CS:GO caster<br />
                    @BubbleLizzy - showhost <br />
                    

                </Kolom2>
                <Title2><b>Voor al de rest: </b></Title2>
                <Kolom3>
                    SchermJos 12 <br/>
                    SchermJos Oost <br/>

                    RedactieJos 1 <br />
                    RedactieJos 2 <br />
                    RedactieJos 3 <br />
                    RedactieJos 42 <br />
                    RedactieJos 42bis <br />

                    DesignJos<br />

                    TechniekJos 1 <br/>
                    TechniekJos 2 <br />

                </Kolom3>
                <Kolom4>  
                    DVC <br/>
                    Maart3n <br/>
                    
                    Fibo <br/>
                    Kwimmel<br/>
                    Slider<br/>
                    Vobtex <br/>
                    Vobtey <br />
                    
                    Flammable <br/>

                    IrEva <br/>
                    Dr Skunk <br/>
                    


                </Kolom4>
                <Laatste>En uiteraard ook de Nerdland crew en alle Nerdland inwoners om dit mogelijk te maken! </Laatste>
            </Root>
        );
    }
}
