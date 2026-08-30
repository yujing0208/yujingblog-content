---
title: 上线了：一个用 Web Audio + Three.js 做的 3D 音乐可视化页面
published: 2026-08-07
pinned: false
description: 从零到上线，记录一个 3D 音乐可视化页面的技术选型、音频频谱分析、Three.js 渲染与性能优化的完整过程。
tags: ["Three.js", "Web Audio API", "可视化", "WebGL"]
category: 博客折腾
licenseName: CC BY 4.0
author: 余京
sourceLink: "https://github.com/Seasir-Hyde/Firefly-hyde"
draft: false
date: 2026-08-07
updated: 2026-08-07
pubDate: 2026-08-07
lang: zh-CN
aiSummary: 折腾了挺久的浏览器3D音乐可视化终于跑通了，用频谱驱动柱子跳动，还踩了不少性能坑，这篇聊聊实现和爬坑记录。
comment: true
---
做了挺久的一个小项目终于跑起来了：一个直接在浏览器里跑的 3D 音乐可视化页面。丢一段音频进去，或者开麦克风，画面就会跟着频谱实时跳动。这篇先讲讲它怎么实现的，以及上线踩到的几个坑。

:::tip
如果你只想要一个能打开就用的链接，直接跳到文章末尾的「怎么玩」一节。
:::

:::note
这个博客本身基于 [Firefly-hyde](https://github.com/Seasir-Hyde/Firefly-hyde) 这个 Astro 博客主题（我本地仓库叫 `Firefly-hyde-main`），下面这个 3D 音乐可视化页面也是在它的代码基础上改出来的，特此注明灵感来源。
:::

## 整体思路

音乐可视化说白了就是一条流水线：拿到音频 → 拆成频域数据 → 把数据映射到几何体的形态和颜色 → 每一帧重画。难点不在哪一步，而在于三步要在 60fps 下稳稳串起来。

```mermaid
graph LR
    A[音频源<br>文件 / 麦克风] --> B[AnalyserNode<br>FFT 频谱]
    B --> C[渲染循环<br>requestAnimationFrame]
    C --> D[Three.js 场景<br>几何体 + 材质]
    D --> E[Canvas / WebGL]
    E --> C
```

浏览器原生就给了最关键的两块能力：Web Audio API 负责把声音变成数字，WebGL（这里用 Three.js 封装）负责把它画出来。不需要任何后端，全部在客户端算。

## 音频怎么变成「能画的数」

核心是一个 `AnalyserNode`。它接在音频图里，能实时给出时域或频域数据。可视化一般用频域——也就是「每个频率段现在有多响」。

```js
const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();

// FFT 大小决定频谱分辨率，2048 给到 1024 个频段
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount; // 1024
const dataArray = new Uint8Array(bufferLength);

// 把 <audio> 或麦克风流接进来
const source = audioCtx.createMediaElementSource(audioEl);
source.connect(analyser);
analyser.connect(audioCtx.destination);

function tick() {
  // 把当前频谱写进数组，0-255
  analyser.getByteFrequencyData(dataArray);
  // dataArray 现在就是「能画的数」
  requestAnimationFrame(tick);
}
```

`dataArray[i]` 越大，说明第 i 个频段此刻能量越强。低频集中在数组前面，高频在后面——所以通常把数组前半段映射到画面中心，视觉上更像「鼓点在心脏、镲片在边缘」。

:::note
`AudioContext` 在很多浏览器里必须等用户手势（点一下）后才能 `resume()`，否则是 `suspended` 状态、没有声音也没有数据。上线后第一个 bug 就是这个。
:::

## 画面怎么跟着动

最直观的做法是一圈柱子（像酒吧的频谱灯），高度跟着频段能量走。几百根柱子每帧都改 geometry 会很卡，所以用 `InstancedMesh`：一个 draw call 画完所有实例，只更新每根的缩放和颜色。

```js
const COUNT = 128;
const geo = new THREE.BoxGeometry(0.4, 1, 0.4);
const mat = new THREE.MeshStandardMaterial();
const bars = new THREE.InstancedMesh(geo, mat, COUNT);

const dummy = new THREE.Object3D();
const color = new THREE.Color();

function updateBars(dataArray) {
  for (let i = 0; i < COUNT; i++) {
    const v = dataArray[i] / 255;          // 归一化到 0-1
    const h = 0.2 + v * 6;                 // 高度随能量变化

    dummy.position.set(
      Math.cos(i / COUNT * Math.PI * 2) * 8,
      h / 2,
      Math.sin(i / COUNT * Math.PI * 2) * 8
    );
    dummy.scale.set(1, h, 1);
    dummy.updateMatrix();
    bars.setMatrixAt(i, dummy.matrix);

    // 低能量偏蓝、高能量偏红
    color.setHSL(0.6 - v * 0.6, 0.8, 0.5);
    bars.setColorAt(i, color);
  }
  bars.instanceMatrix.needsUpdate = true;
  bars.instanceColor.needsUpdate = true;
}
```

再丢一个 `UnrealBloomPass` 做辉光，能量越强的地方越「发光」，整个画面一下就有了那种夜店氛围。

## 性能上的几个坑

浏览器里跑 3D，性能永远是第一约束。这几个是实打实踩过的：

- **别每帧 new 对象。** 上面那个 `dummy` 和 `color` 在循环外只建一次，循环里复用。每帧 new 几百个 `Object3D` 会让 GC 抖到你怀疑人生。
- **bloom 很贵。** 移动端直接降采样或关掉，PC 端分辨率也别拉满。
- **devicePixelRatio 要封顶。** 4K 屏上 `dpr` 可能是 3，乘起来像素量爆炸。一般 `Math.min(window.devicePixelRatio, 2)` 就够清晰了。
- **暂停即停渲染。** 标签页切到后台 `requestAnimationFrame` 会暂停，但音频还在跑；切回来时要注意时钟对齐，别让柱子「瞬移」。

:::warning
如果页面要上线到公网，记得给音频文件走 CDN 并开 CORS。跨域的音频源拿来做分析会直接抛 `SecurityError`，本地测得好好的、一上线就黑屏，基本都是这个问题。
:::

## 怎么部署

整站是纯静态的，没有服务端逻辑，所以任意静态托管都能跑：GitHub Pages、Vercel、Netlify，或者国内的腾讯云 EdgeOne Pages 都行。构建出来就是 `index.html` + 几个 JS/CSS，丢上去绑定域名即可。

本地跑起来也很简单：

```bash
# 任意静态服务器都行，下面用 npx 起一个
npx serve .
# 或
python -m http.server 8080
```

:::important
一定要用 `http(s)://` 访问，别用 `file://` 直接打开。Web Audio 和 ES Module 在 `file://` 协议下基本都会被浏览器拦掉。
:::

## 怎么玩

打开页面后会看到一圈发光的柱子。三种喂音频的方式：

1. **点页面上的「选择文件」**，传你本地的 mp3 / wav；
2. **点「用麦克风」**，对着说话或外放音乐，实时可视化；
3. 页面默认带一首示例曲，进来就能看到效果。

鼠标拖动转视角，滚轮缩放，空格暂停。手机上双指缩放、单指拖动。

## 小结

- 音频进 `AnalyserNode`，`getByteFrequencyData` 拿到频谱数组；
- 用 `InstancedMesh` 一次性画几百根柱子，性能稳；
- 颜色用 HSL 跟着能量渐变，bloom 出辉光；
- 纯静态部署，注意 CORS 和「必须用户手势才能播」这两点。

代码后续我会整理一下开源出来。如果你也想做一个，上面的频谱分析 + InstancedMesh 两段基本就是骨架，套上去就能跑。

## 参考

- [Firefly-hyde Astro 博客主题](https://github.com/Seasir-Hyde/Firefly-hyde) —— 本博客与可视化页面的基础
- [MDN: Web Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API)
- [Three.js 官方文档](https://threejs.org/docs/)
- [AnalyserNode - Web Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode)

