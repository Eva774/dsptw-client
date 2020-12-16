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
    height: 720px;
    background-color: black;
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
    width: 150px;
    font-family: 'Avenir LT Std';
    font-size: 24px;
    position: absolute;
    top: 100px;
    left: 250px;
    text-align: left;
    color: ${Theme.primary}
`
const Header1 = styled.div`
    width: 150px;
    font-family: 'Futura';
    font-size: 45px;
    position: absolute;
    top: 20px;
    left: 250px;
    text-align: left;
    color: ${Theme.primaryAccent}
`

const Kolom2 = styled.span`
    display: table;
    width: 300px;
    font-family: 'Avenir LT Std';
    font-size: 24px;
    position: absolute;
    top: 100px;
    left: 500px;
    text-align: left;
    color: ${Theme.primary}
`
const Header2 = styled.div`
    width: 150px;
    font-family: 'Futura';
    font-size: 45px;
    position: absolute;
    top: 20px;
    left: 500px;
    text-align: left;
    color: ${Theme.primaryAccent}
`
const Kolom3 = styled.span`
    display: table;
    width: 400px;
    font-family: 'Avenir LT Std';
    font-size: 24px;
    position: absolute;
    top: 100px;
    left: 800px;
    text-align: left;
    color: ${Theme.primary}
`

const Header3 = styled.div`
    width: 150px;
    font-family: 'Futura';
    font-size: 45px;
    position: absolute;
    top: 20px;
    left: 800px;
    text-align: left;
    color: ${Theme.primaryAccent}
`
const RoundName = styled.h1`
    text-align: center
`
export default class RankingRound extends React.Component<RankingRoundProps, {}> {

    render() {
        const { inputRanking, currentQuestionIndex } = this.props.roundState;
        const splitRanking = inputRanking.split(" ");

        let Ranking = new Array(splitRanking.length);
        for (let i = 0;i<splitRanking.length;i++) {
            Ranking[i] = {
                teamName: splitRanking[i].split("\t")[0],
                teamNumber: splitRanking[i].split("\t")[1],
                points: Number(splitRanking[i].split("\t")[2])
        };
        }

        Ranking = Ranking.sort((a,b) => a.points < b.points ? -1 : a.points > b.points ? 1 : 0)
        for (let i = 0; i<Ranking.length;i++) {
            Ranking[i].place = Ranking.length - i
        }

        const RankingParts = [
            Ranking.slice(0,(splitRanking.length-3)/2),
            Ranking.slice((splitRanking.length-3)/2, splitRanking.length - 3),
            Ranking.slice(splitRanking.length - 3, splitRanking.length - 2),
            Ranking.slice(splitRanking.length - 2, splitRanking.length)
        ];

        var RankingShow = new Array();
        const showQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < RankingParts.length;
        if (showQuestion) {
        for (let i = 0; i <= currentQuestionIndex;i++) {
            RankingShow = RankingShow.concat(RankingParts[i]);
            }
        }
        console.log(currentQuestionIndex)
        console.log(RankingShow)

        return (
            <Root>
                <Title>TRIVIAL TIME</Title>
                <MediaWrapper>
                    <Media>
                    <Header1>
                        Plaats
                    </Header1>
                    <Kolom1>
                        {RankingShow.map((item => 
                        <tr key={item.teamName}>{item.place}</tr>
                        ))}
                    </Kolom1>
                    <Header2>
                        Teamnaam
                    </Header2>
                    <Kolom2>
                        {RankingShow.map((item => 
                        <tr key={item.teamName}>{item.teamName}</tr>
                        ))}
                    </Kolom2>
                    <Header3>
                        Punten
                    </Header3>
                    <Kolom3>
                        {RankingShow.map((item => 
                        <tr key={item.teamName}>{item.points}</tr>
                        ))}
                    </Kolom3>
                    </Media>
                </MediaWrapper>
            </Root> 
        )

    }
}
