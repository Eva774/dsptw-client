
import { TextRoundState } from './TextRoundState';
import { MediaRoundState } from './MediaRoundState';
import { WelcomeRoundState } from './WelcomeRoundState';
import { TalkingRoundState } from './TalkingRoundState'
import { MixRoundState } from './MixRoundState';
import { RankingRoundState } from './RankingRoundState';

export type RoundState = TextRoundState
    | MediaRoundState
    | WelcomeRoundState
    | TalkingRoundState
    | MixRoundState
    | RankingRoundState;

