import OBSWebSocket from 'obs-websocket-js';
import { ObsScene } from '../models/ObsScene';
import { RoundName } from '../models/RoundName';

const obs = new OBSWebSocket();

export function openConnection() {
    obs.connect({ address: 'localhost:4444' });
}

export function setScene(scene: RoundName | ObsScene) {
    obs.send('SetCurrentScene', {
        'scene-name': scene
    })
}
