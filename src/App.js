import { defineComponent, h, reactive } from '@vue/runtime-core';

export default defineComponent({
    setup() {
        let timerId, fontColor;
        const asciiList = ['米', '师', '大', '　'];
        const gap = 10;
        const btn = document.getElementById('playBtn')   
        const videoEle = document.getElementById('videoEl');
        const videoSize = {
            width: videoEle.width,
            height: videoEle.height,
        };
        console.log('videoSize', videoSize);
        // 创建canvas，用于获取imgdata
        const canvas = document.createElement("canvas");
        canvas.width = videoSize.width;
        canvas.height = videoSize.height;
        btn.addEventListener("click",function(){
            videoEle.play();
            btn.innerText === "play" ? videoEle.play() : videoEle.pause();
        })
        videoEle.addEventListener('play',function() {
            btn.innerText = "";
            updateRender();
        });
        videoEle.addEventListener('pause',function(){
            btn.innerText = "play";
            cancelAnimationFrame(timerId);
        });
        function updateRender(){
            renderVideoFrame(videoEle);
            timerId = requestAnimationFrame(updateRender);
        }
        // 横向划分数量
        const widthNums = Math.ceil(videoSize.width / gap);
        // 竖向划分数量
        const heightNums = Math.ceil(videoSize.height / gap);
        // 平均每gap像素点作为一个要渲染的text组件，组件数量为
        const textCompNums = widthNums * heightNums;
        // 数组存放每个组件需要渲染的文字
        const textDatas = new Array(textCompNums).fill('');
        const state = reactive({
            image: null,
            fontColor,
            textDatas,
        })
        const widthEmptyArr = new Array(widthNums).fill('');
        const heightEmptyArr = new Array(heightNums).fill('');
        const getTextVnodes = () => {
            return heightEmptyArr.map((item2, index1) => {
                return widthEmptyArr.map((item1, index2) => {
                    // 获取当前组件对应第j个组件，获取字符并展示
                    const j = index2 + index1 * widthNums;
                    return h('Ptext', {x: index2 * gap , y: index1 * gap, color: fontColor}, state.textDatas[j])
                })
            })
        };

        function renderVideoFrame(videoEle) {
            fontColor = document.getElementById('color').value;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoEle, 0, 0, videoSize.width, videoSize.height);
            const imgData = ctx.getImageData(0, 0, videoSize.width, videoSize.height).data;
            let j = 0;
            for (let h = 0; h < videoSize.height; h += gap) {
                for(let w = 0; w < videoSize.width; w += gap){
                    const position = (videoSize.width * h + w) * 4;
                    const r = imgData[position], g = imgData[position + 1], b = imgData[position + 2];
                    const gray = (r * 30 + g * 59 + b * 11 + 50) / 100;
                    const i = Math.min(asciiList.length - 1, parseInt(gray / (255 / asciiList.length)));
                    j++;
                    // 获取的是第j个组件需要展示的字符并复制给响应式数组
                    state.textDatas[j] = asciiList[i];
                }
            }
            // state.image = videoEle;
        }
        return () => h('Container', null, getTextVnodes());
    }
})