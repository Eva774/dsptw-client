import * as React from 'react';
import styled from 'styled-components';
import { previousRound, nextRound, setWelcomeTargetTime, setPauseTargetTime, setInputRanking } from '../api/localServer';
import { GameState } from '../models/GameState';
import { RoundType } from '../models/RoundType';

import SocketStatus from '../components/SocketStatus';
import TextRound from './presenterRounds/TextRound';
import { TextRoundState } from '../models/Rounds/TextRoundState';
import MediaRound from './presenterRounds/MediaRound';
import { MediaRoundState } from '../models/Rounds/MediaRoundState';
import { MixRoundState } from '../models/Rounds/MixRoundState';
import MixRound from './presenterRounds/MixRound';
import RankingRound from './presenterRounds/RankingRound';
import { RankingRoundState } from '../models/Rounds/RankingRoundState';


const Wrapper = styled.div`
    font-size: 2em;
`
const RankingWrapper = styled.div`
    display: flex;
    font-size:25px;
`
const RankingDiv = styled.div`
    width:200px;

`

type PresenterProps = {
    gameState?: GameState
}

type PresenterState = {
    pauseTargetTime: string,
    welcomeTargetTime: string,
    inputRanking: string,
}

export default class Presenter extends React.Component<PresenterProps, PresenterState> {

    state = {
        welcomeTargetTime: "",
        pauseTargetTime: "",
        inputRanking: "",
    }

    setWelcomeTargetTimeState = (e: any) => {
        this.setState({
            welcomeTargetTime: e.target.value
        });
    }

    setPauseTargetTimeState = (e: any) => {
        this.setState({
            pauseTargetTime: e.target.value
        });
    }

    setInputRankingState = (e: any) => {
        this.setState({
            inputRanking: e.target.value
        });
    }
    
    setWelcomeTargetTime = () => {
        setWelcomeTargetTime(this.state.welcomeTargetTime);
    }

    setPauseTargetTime = () => {
        setPauseTargetTime(this.state.pauseTargetTime);
    }

    setInputRanking = () => {
        setInputRanking(this.state.inputRanking);
    }

    splitRanking(inputRanking: string){
        const splitRanking = inputRanking.split(";");
    
        let Ranking = new Array(splitRanking.length-1);
        for (let i = 0;i<splitRanking.length-1;i++) {
            var teamName =  splitRanking[i].split("\t")[0];
            if (teamName.length >=15) {
                teamName = teamName.slice(0,12) + "..."
            } 
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
        
        return Ranking
    }
    render() {
        if (!this.props.gameState) {
            return <div>Not connected to server, is the server online?</div>;
        }
        const { roundState } = this.props.gameState;
        const { roundName, roundType } = roundState;

        const { welcomeTargetTime, pauseTargetTime, inputRanking } = this.state;

        const Ranking = this.splitRanking(inputRanking)
        let round = null;

        switch (roundType) {
            case RoundType.TextRound:
                round = <TextRound gameState={this.props.gameState} roundState={roundState as TextRoundState} />
                break;
            case RoundType.MediaRound:
                round = <MediaRound gameState={this.props.gameState} roundState={roundState as MediaRoundState} />
                break;
            case RoundType.MixRound:
                round = <MixRound gameState={this.props.gameState} roundState={roundState as MixRoundState} />
                break;
            case RoundType.AnswerRound:
                round = <TextRound gameState={this.props.gameState} roundState={roundState as TextRoundState} />
                break;
            case RoundType.RankingRound:
                round = <RankingRound gameState={this.props.gameState} roundState = {roundState as RankingRoundState} />
                break;

        }

        return (
            <Wrapper>
                <SocketStatus />
                <h1>{roundType} - {roundName}</h1>
                <div>
                    Welcome round Target Time: <input type="time" onChange={this.setWelcomeTargetTimeState} value={welcomeTargetTime}></input>
                    <button onClick={this.setWelcomeTargetTime}>Submit</button>
                </div>
                <div>
                    Pause round Target Time: <input type="time" onChange={this.setPauseTargetTimeState} value={pauseTargetTime}></input>
                    <button onClick={this.setPauseTargetTime}>Submit</button>
                </div>
                <div>
                    <button onClick={previousRound}>Previous round</button>
                    <button onClick={nextRound}>Next round</button>
                </div>
                {round}
                <div>
                    Current ranking: <input type="textarea" onChange={this.setInputRankingState} />
                    <button onClick={this.setInputRanking}>Submit ranking</button>
                </div>
                <div>
                    Ingevoerde ranking:
                </div>
                <RankingWrapper>
                    <RankingDiv>
                        Plaats {Ranking.map((item => 
                            <tr key={item.teamName}>{item.place}</tr>
                            ))}
                    </RankingDiv>
                    <RankingDiv>                        
                        Teamnaam {Ranking.map((item => 
                            <tr key={item.teamName}>{item.teamName}</tr>
                            ))}
                    </RankingDiv>
                    <RankingDiv> 
                        Punten {Ranking.map((item => 
                            <tr key={item.teamName}>    {item.points}</tr>
                            ))}
                    </RankingDiv>
                </RankingWrapper>

            </Wrapper>
        )
    }
}
