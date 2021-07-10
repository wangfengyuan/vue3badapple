
import { Application } from 'pixi.js'

const canvasApp = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0xffffff
});
document.getElementById('app').appendChild(canvasApp.view);

export function getRootComponent() {
    return canvasApp.stage;
}

export function getApp() {
    return canvasApp
}