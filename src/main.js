import { createApp } from './runtime-canvas'
import App from  './App'
import './index.css'

import { getRootComponent } from './canvasApp'
// canvas 使用 pixi.js
window.onload = () => {
    createApp(App).mount(getRootComponent())
}

