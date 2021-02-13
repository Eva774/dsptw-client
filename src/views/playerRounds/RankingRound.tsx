import * as React from 'react';
import { GameState } from '../../models/GameState';
import { RankingRoundState } from '../../models/Rounds/RankingRoundState';
import styled from 'styled-components';
import { Theme } from '../../Theme';

type RankingRoundProps = {
    gameState: GameState,
    roundState: RankingRoundState,
}

const Root = styled.div`
text-align: center;
`
const MediaWrapper = styled.div`
    position: absolute;
    top: 110px;
    left: 320px;
    max-width: 1280px;
    max-height: 720px;
    padding: 1rem;
    position: relative;
    background: linear-gradient(80deg, ${Theme.primary}, ${Theme.primaryAccent});
    padding: 3px;
`
const Media = styled.div`
    width: 1280px;
    height: 600px;
    background-color: #201d2c;
    display: flex;
    justify-content: center;
    align-items: top;
`
const Headers = styled.div`
    width: 1280px;
    height: 120px;
    background-color: #201d2c;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`
    position: absolute;
    top: 50px;
    left: 62px;
    max-width: 215px;
    text-align: left;
    color: ${Theme.primaryAccent};
    font-family: 'Phosphate';
    font-size: 60px;
    font-weight: normal;
    font-style: normal;
    margin: 0;
`

const Kolom1 = styled.span`
    display: table;
    width: 190px;
    font-family: 'Avenir LT Std';
    font-size: 24px;
    text-align: center;
    color: ${Theme.primary}
`
const Header1 = styled.div`
    width: 190px;
    font-family: 'Futura';
    font-size: 45px;
    text-align: center;
    color: ${Theme.primaryAccent}
`

const Kolom2 = styled.span`
    display: table;
    width: 250px;
    font-family: 'Avenir LT Std';
    font-size: 24px;
    text-align: center;
    color: ${Theme.primary}
`
const Header2 = styled.div`
    width: 250px;
    font-family: 'Futura';
    font-size: 45px;
    text-align: center;
    color: ${Theme.primaryAccent}
`
const Kolom3 = styled.span`
    display: table;
    width: 600px;
    font-family: 'Avenir LT Std';
    font-size: 24px;
    text-align: left;
    color: ${Theme.primary}
`

const Header3 = styled.div`
    width: 600px;
    font-family: 'Futura';
    font-size: 45px;
    text-align: left;
    color: ${Theme.primaryAccent}
    
`
const Kolom4 = styled.span`
    display: table;
    width: 200px;
    font-family: 'Avenir LT Std';
    font-size: 24px;
    text-align: center;
    color: ${Theme.primary}
`

const Header4 = styled.div`
    width: 200px;
    font-family: 'Futura';
    font-size: 45px;
    text-align: center;
    color: ${Theme.primaryAccent}   
`

var pixelWidth = require('string-pixel-width')

function splitRanking(inputRanking: string, currentQuestionIndex: number){
    const splitRanking = inputRanking.split(";");

    let Ranking = new Array(splitRanking.length-1);
    for (let i = 0;i<splitRanking.length-1;i++) {
        var teamName = splitRanking[i].split("\t")[0];
        const width = pixelWidth(teamName, {font:'avenir',size:24});
        if (width >= 510){
            const lengthToKeep = Math.round(teamName.length * 510 / width );
            teamName = teamName.slice(0,lengthToKeep) + "...";
        };
        Ranking[i] = {
            teamName: teamName,
            teamNumber: splitRanking[i].split("\t")[1],
            points: Number(splitRanking[i].split("\t")[2])
    };
    }

    Ranking = Ranking.sort((a,b) => a.points < b.points ? -1 : a.points > b.points ? 1 : 0)
    for (let i = 0; i<Ranking.length;i++) {
        Ranking[i].place = Ranking.length - i
    }

    const RankingParts = [
        Ranking.slice(0,(splitRanking.length-4)/2),
        Ranking.slice((splitRanking.length-4)/2, splitRanking.length - 4),
        Ranking.slice(splitRanking.length - 4, splitRanking.length - 3),
        Ranking.slice(splitRanking.length - 3, splitRanking.length-1)
    ];

    var RankingShow = new Array();
    const showQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < RankingParts.length;
    if (showQuestion) {
    for (let i = 0; i <= currentQuestionIndex;i++) {
        RankingShow = RankingShow.concat(RankingParts[i]);
        }
    }
    return RankingShow
}
export default class RankingRound extends React.Component<RankingRoundProps, {}> {

    render() {

        const { inputRanking, currentQuestionIndex } = this.props.roundState;
        const RankingShow = splitRanking(inputRanking, currentQuestionIndex)
        return (
            <Root>
                <Title>TRIVIAL TIME</Title>
                <MediaWrapper>
                    <Headers>
                        <Header1>
                            Plaats
                        </Header1>
                        <Header2>
                            Nummer
                        </Header2>
                        <Header3>
                            Teamnaam
                        </Header3>
                        <Header4>
                            Punten
                        </Header4>
                    </Headers>
                    <Media>

                        <Kolom1>
                            {RankingShow.map((item => 
                            <div>{item.place}</div>
                            ))}
                        </Kolom1>

                        <Kolom2>
                            {RankingShow.map((item => 
                            <div>{item.teamNumber}</div>
                            ))}
                        </Kolom2>

                        <Kolom3>
                            {RankingShow.map((item => 
                            <div>{item.teamName}</div>
                            ))}
                        </Kolom3>

                        <Kolom4>
                            {RankingShow.map((item => 
                            <div>{item.points}</div>
                            ))}
                        </Kolom4>
                    </Media>

                </MediaWrapper>
            </Root> 
        )

    }
}
