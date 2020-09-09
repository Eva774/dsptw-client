
import { TextRoundState } from './TextRoundState';
import { MediaRoundState } from './MediaRoundState';
import { WelcomeRoundState } from './WelcomeRoundState';
import { TalkingRoundState } from './TalkingRoundState'

export type RoundState = TextRoundState
    | MediaRoundState
    | WelcomeRoundState
    | TalkingRoundState;

