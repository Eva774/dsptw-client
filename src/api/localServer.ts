import { ReplaySubject } from 'rxjs';
import { ConnectionState } from '../models/ConnectionState';
import { SocketEvent } from '../models/SocketEvent';
import { ViewType } from '../models/ViewType';
import { SocketCommand } from '../models/SocketCommand';

const gameStateUpdate = new ReplaySubject();
const connection = new ReplaySubject();
let socket: WebSocket;

export function openConnection() {
    socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener('open', (e) => {
        console.log('opened connection')
        connection.next(ConnectionState.Open);
    });
    socket.addEventListener('close', (event) => {
        console.log('The connection was lost. Retrying in 1 second.');
        connection.next(ConnectionState.Closed);
        setTimeout(openConnection(), 1000)
    });
    socket.addEventListener('message', (e) => {
        try {
            const data = JSON.parse(e.data)
            console.debug('received socket data', data);
            if (data.event === SocketEvent.GameStateUpdate) {
                gameStateUpdate.next(data.data);
            }
        } catch (e) {
            console.error('couldn\'t parse JSON')
        }
    });
}

export function getGameStateUpdateStream() {
    return gameStateUpdate;
}

export function getConnectionStream() {
    return connection;
}

export function startTime() { sendCommand(SocketCommand.StartTime) };
export function stopTime() { sendCommand(SocketCommand.StopTime) };
export function correctAnswer(foundIndex?: number, playerIndex?: number) {
    sendCommand(SocketCommand.CorrectAnswer, { foundIndex, playerIndex })
};
export function nextQuestion() { sendCommand(SocketCommand.NextQuestion) };
export function setCurrentQuestion(currentQuestion: number) { sendCommand(SocketCommand.SetCurrentQuestion, { currentQuestion }) };
export function showAllAnsers() { sendCommand(SocketCommand.ShowAllAnswers) };
export function nextImage() { sendCommand(SocketCommand.NextImage) };
export function setView(view: ViewType) { sendCommand(SocketCommand.SetView, { view }) };
export function nextRound() { sendCommand(SocketCommand.NextRound) };
export function nextStartingPlayer() { sendCommand(SocketCommand.NextStartingPlayer) };
export function nextPlayerToComplete() { sendCommand(SocketCommand.NextPlayerToComplete) };
export function setPlayerName(playerIndex: number, name: string) { sendCommand(SocketCommand.SetPlayerName, { playerIndex, name }) };
export function setPlayerTime(playerIndex: number, time: number) { sendCommand(SocketCommand.SetPlayerTime, { playerIndex, time }) };

function sendCommand(command: string, extraData = {}) {
    socket.send(JSON.stringify({ command, ...extraData }));
}