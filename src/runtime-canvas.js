import { createRenderer } from '@vue/runtime-core';
import { Text, Container, Sprite, Texture } from 'pixi.js'

const renderer = createRenderer({
    createElement(type) {
        // 绘制文本
        let element;
        switch(type) {
            case 'Container': 
                element = new Container();
                break;
            case 'Sprite': 
                element = new Sprite();
                element.scale.set(0.4, 0.4);
                break;
            case 'Ptext': 
                element = new Text();
                element.scale.set(0.45, 0.45);
                break;
        }
        return element;
    },
    insert(el, parent) {
        parent.addChild(el);
    },
    setElementText(node, text) {
        node.text = text;
    },
    patchProp(el, key, preValue, curValue) {
        switch(key) {
            case 'texture':
                el.texture = Texture.from(curValue);
                break;
            case 'color':
                el.style.fill = curValue;
                break;
            default:
                el[key] = curValue;
        }
    },
    createText(text) {
       return new Text(text);
    },
    parentNode(node) {
    },
    nextSibling() {

    }
});
export function createApp(rootComponent, props) {
    return renderer.createApp(rootComponent, props);
}
