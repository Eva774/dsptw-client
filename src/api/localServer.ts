import { Subject } from 'rxjs';
import { ConnectionState } from '../models/ConnectionState';
import { SocketEvent } from '../../../dsptw-common/models/SocketEvent';

const gameStateUpdate = new Subject();
const connection = new Subject();
let socket: WebSocket;

export function openConnection() {
    socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener('open', (e) => {
        console.log('opened connection')
        connection.next(ConnectionState.Open);
    });
    socket.addEventListener('close', (event) => {
        console.log('The connection has been closed successfully.');
        connection.next(ConnectionState.Closed);
    });
    socket.addEventListener('message', (e) => {
        const data = JSON.parse(e.data)
        console.debug('received socket data', data);
        if (data.event === SocketEvent.GameStateUpdate) {
            gameStateUpdate.next(data.data);
        }
    });
}

export function getGameStateUpdateStream() {
    return gameStateUpdate;
}

export function getConnectionStream() {

}

export function startTime() { sendCommand('startTime') };
export function stopTime() { sendCommand('stopTime') };
export function correctAnswer(foundIndex?: number, playerIndex?: number) {
    sendCommand('correctAnswer', { foundIndex, playerIndex })
};
export function nextQuestion() { sendCommand('nextQuestion') };
export function nextRound() { sendCommand('nextRound') };
export function nextPlayer() { sendCommand('nextPlayer') };
export function setPlayerName(playerIndex: number, name: string) { sendCommand('setPlayerName', { playerIndex, name }) };
export function setPlayerTime(playerIndex: number, time: number) { sendCommand('setPlayerTime', { playerIndex, time }) };

function sendCommand(command: string, extraData = {}) {
    socket.send(JSON.stringify({ command, ...extraData }));
}