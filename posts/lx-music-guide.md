---
title: "LX Music（洛雪音乐）：免费开源的全能音乐查找工具，小白也能轻松上手"
published: 2026-07-31
description: "零基础学会下载安装 LX Music，配置自定义音源，免费畅听全网音乐。支持 Windows / macOS / Linux / Android 全平台，开源无广告。"
tags: [LX Music, 开源, 免费, 教程]
category: "软件推荐"
draft: false
pinned: false
image: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.pxhC07XCuH4CfENun93MqwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
---

# LX Music（洛雪音乐）：免费开源的全能音乐查找工具

## 先说清楚它是什么

简单点说，LX Music（也叫洛雪音乐助手）就是一个帮你搜歌的聚合工具。你装一个它，就能搜到各个平台的歌，不用在酷狗、网易云、QQ 音乐之间来回切，也不用开好几个会员。

而且它**完全免费、没广告、代码开源**，这点在现在的音乐软件里确实挺难得的。

> 说透一点：它本身不存任何音乐文件，是通过「自定义音源」从各平台拉数据。相当于给你一个统一的搜索入口，省得你一个一个 app 去翻。

**支持平台**：Windows、macOS、Linux、Android

---

## 桌面版怎么装怎么用

桌面版是用 Electron + Vue 3 做的，Windows 7 及以上、macOS、Linux 都能跑。

::github{repo="lyswhut/lx-music-desktop"}

### 下载

最新版是 **v2.12.2**，去 [GitHub Releases](https://github.com/lyswhut/lx-music-desktop/releases) 下就行，找到符合你系统的文件：

| 系统 | 文件名 |
| --- | --- |
| Windows 64位 | `lx-music-desktop-v2.12.2-x64-Setup.exe` |
| Windows 32位 | `lx-music-desktop-v2.12.2-ia32-Setup.exe` |
| macOS（Apple Silicon） | `lx-music-desktop-v2.12.2-arm64.dmg` |
| macOS（Intel） | `lx-music-desktop-v2.12.2-x64.dmg` |
| Linux | `lx-music-desktop-v2.12.2-x86_64.AppImage` |

> 如果 GitHub 下不动，可以用镜像加速。但注意**官方只发 GitHub**，别的地方下的不敢保证安全。

### 安装

以 Windows 为例，没什么特别的：

```
双击安装包 → 我同意 → 选安装目录（建议别放 C 盘）→ 等进度条走完 → 完成
```

装完打开，界面挺清爽的。

### 基本操作

- **搜歌**：顶部搜索框，输歌名或歌手就行
- **播放**：搜索结果里点一下就开始播
- **歌单**：切到「歌单」标签，能看各平台的推荐歌单
- **排行榜**：各平台热门榜单
- **本地音乐**：点「我的列表」管理收藏和本地文件
- **设置**：左上角菜单 → 设置，调音质、主题什么的

---

## 移动版（Android）

移动版是 React Native 做的，支持 Android 5.0 以上。

> iOS 和鸿蒙目前**没计划支持**，用 iPhone 的暂时没办法。

::github{repo="lyswhut/lx-music-mobile"}

### 下载安装

去 [Releases 页面](https://github.com/lyswhut/lx-music-mobile/releases) 下 APK 文件：
```
lx-music-mobile-v1.8.4.apk
```
传到手机直接装就行。

### 基本操作

- **侧边栏**：左上角三条杠，切换搜索、歌单、排行榜、设置
- **搜索**：顶部搜歌
- **播放**：点了就播
- **设置**：侧边栏 → 设置

---

## 最关键的一步：配置音源

> 这个必须说清楚。刚装好的 LX Music **里面是空的**，不配音源什么都搜不到。

### 音源是什么？

可以理解成「插件」——它告诉 LX Music 去哪拉歌。LX Music 自己没有内置任何音乐源，全靠这些外部音源文件。

### 怎么导入

**电脑端**：

```
① 点左侧⚙️设置
② 找到「自定义源管理」
③ 点「在线导入」
④ 复制下面的链接贴进去
⑤ 点导入
⑥ 关掉弹窗，在「音乐来源」下拉选你刚导入的音源
⑦ 等它初始化完
```

**手机端**：

```
① 左上角☰菜单 → 设置
② 往下滑 → 「自定义源管理」
③ 导入 → 在线导入
④ 粘贴链接 → 确认
⑤ 返回勾选该音源
```

### 推荐音源（亲测可用）

下面这几个是目前比较稳定的，建议一次加 3-4 个，哪个崩了换哪个：

| 音源名字 | 链接 | 特点 |
| --- | --- | --- |
| **SixYin（六音）** | `https://ghproxy.net/raw.githubusercontent.com/pdone/lx-music-source/main/sixyin/latest.js` | 适配广，资源全 |
| **Huibq** | `https://ghproxy.net/raw.githubusercontent.com/pdone/lx-music-source/main/huibq/latest.js` | 稳定，主流平台热歌覆盖好 |
| **Flower（野花）** | `https://ghproxy.net/raw.githubusercontent.com/pdone/lx-music-source/main/flower/latest.js` | 小众歌曲表现不错 |
| **Juhe（聚合 API）** | `https://ghproxy.net/raw.githubusercontent.com/pdone/lx-music-source/main/juhe/latest.js` | 多源聚合 |
| **Grass（野草）** | `https://tt.tenmeng.com/moonue/js/yecao202412.js` | 轻量 |
| **SixYin（直链）** | `https://raw.githubusercontent.com/pdone/lx-music-source/main/sixyin/latest.js` | 需要科学上网 |

> 这些音源都是第三方维护的，随时可能挂，挂了换个就行，不是软件的问题。

---

## 开源和版权的事

LX Music 是 **Apache-2.0** 开源协议，代码全公开。不接受商业合作和捐赠，纯粹是作者的兴趣项目。

不过有几点得注意：
- 别拿它做违法的事
- **尊重版权，支持正版**，该买的专辑还是买
- 产生的版权数据建议 24 小时内清掉

---

## 常见小问题

**歌播不了、「换源失败」？**
换个音源试试，或者检查下网络。

**搜不到想听的歌？**
不同音源覆盖的平台不一样，换个源再搜。

**下载的跑哪去了？**
设置 → 下载设置 里能看路径。

**杀毒软件报警？**
代码都开源的，不放心的可以去 GitHub 自己编译。

**手机版怎么弄？**
和电脑版一样，设置 → 自定义源管理 → 在线导入。

---

## 遇到问题找谁

- **官方文档**：[桌面版 FAQ](https://lyswhut.github.io/lx-music-doc/desktop/faq) | [移动版 FAQ](https://lyswhut.github.io/lx-music-doc/mobile/faq)
- **提 Issue**：去 GitHub 对应仓库提
- **作者邮箱**：`lyswhut+qq.com`（把 `+` 换成 `@`）

---

## 总结

LX Music 最实在的地方就是**一个顶好几个音乐 App**，还不要钱没广告。花几分钟装好配好音源，日常听歌基本够用。学生党、老歌爱好者、嫌会员贵的，都值得试试。
