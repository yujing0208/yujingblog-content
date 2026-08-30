---
title: "给博客侧边栏加了个 Umami 访问统计卡片"
published: 2026-08-08
description: "给 Mizuki 博客侧边栏加了一张 Umami 访问统计卡片：纯前端调 Umami 的 Share API 拉数据，零后端、不暴露密钥，支持 CORS。两个踩坑：漏改渲染映射表导致静默不渲染、组件类名撞了资料卡的统计容器被 hidden 藏掉。"
tags: [Umami, 访问统计, 侧边栏, 博客折腾]
category: 博客折腾
draft: false
pinned: false
# image: 封面留空，上线前自己上图床补
aiSummary: "侧边栏加了张Umami访问统计卡片，纯前端拉Share API数据，不暴露密钥。踩两个坑：漏改渲染映射表不显示，类名撞了资料卡被隐藏。"
---

# 给博客侧边栏加了个 Umami 访问统计卡片

之前全站就接好了 Umami 做访问追踪（藏在 `Layout.astro` 的那段脚本里），但那只是后台数据，我自己能看，访客看不到。于是想把"大致热度"也搬到前台——侧边栏放一张小卡片，访客一眼就能看到「这破站最近还有人看」，我自己瞄一眼也乐呵。

:::grid{columns=2 aspect="273 / 195" fit="contain"}
![侧边栏 Umami 访问统计卡片（浅色主题）](/images/posts/umami-stats-light.png)
![侧边栏 Umami 访问统计卡片（深色主题）](/images/posts/umami-stats-dark.png)
:::

做完了，跑在 Umami 的公开 Share API 上，纯前端直连，不用后端、不用暴露密钥。这篇记一下思路，以及比每日一言多踩的两个坑。

## 为什么不用 Umami 自带的分享页

Umami 后台每个站点都能开「Share」，生成一个公开的外链页面，官方分享组件也是往那个页面嵌 iframe。但 iframe 太重、样式也难调，跟博客主题还打架。

我更想要的是**把它融进侧边栏卡片里**，数字跟主题走、还能加滚动动画。Umami 其实留了更轻的口子：Share 背后是一套公开 API，前端直接 `fetch` 就能拿数据，而且原生支持 CORS——前提是你的站点开了 Share。

> 关键点：走 Share API 拉数据，用的是「分享令牌」而不是你的 Umami 后台账号密钥，所以前端代码里不会出现任何敏感信息。自托管和 Cloud 版都适用。

## 数据怎么来的

整条链路就三步：

1. Umami 后台对应站点 → Settings → Share → 开启，拿到一个形如 `https://你的umami/share/xxxxx` 的公开链接。
2. 前端先 `GET /api/share/xxxxx` 解析出 `websiteId` 和 `shareToken`。
3. 再 `GET /api/websites/:id/stats`，请求头带上 `x-umami-share-token`，就能拿到总浏览量 / 访问数 / 游客数。

这里有个小坑：**Umami Cloud 的 API 路径不是根 `/api`**。实测 Cloud 版的 share 接口在 `https://cloud.umami.is/analytics/us/api/share/...`（自托管一般是 `https://你的域名/api/share/...`）。我的组件会自动用分享链接的 origin 去拼 `/api`，自托管不用改，Cloud 也跑得通。

```js
// 解析 share 链接 → 拿 websiteId + token
const shareRes = await fetch(`${origin}/api/share/${id}`);
const { websiteId, token } = await shareRes.json();

// 拉近 30 天统计
const statsRes = await fetch(
  `${origin}/api/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`,
  { headers: { "x-umami-share-token": token } }
);
const stats = await statsRes.json();
// pageviews / visits / visitors 就是三个数
```

统计周期在组件里写死了一个变量，想看全部时间就把 `startAt` 设成 `0`，想看最近 7 天 / 90 天改一下就行。

## Mizuki 侧边栏的 widget 机制

这套跟之前加每日一言是同一套：每个组件有个 `type` 字符串，配置里声明要哪些、排什么顺序，框架查表渲染。加新组件是增量扩展，不动任何现有组件。

真正要碰的：类型声明、路径映射、配置注册、渲染映射（`SidebarColumn.astro` 那份静态 componentMap）、组件本体——还是那五处。我这次放在「每日一言」下面，`components.left` 数组里 `hitokoto` 后面跟一个 `umami-stats` 即可。

## 踩坑一：组件上线了却不显示

老剧情了。四个接入点改完，本地 dev server 首页 HTML 里能 grep 到我的字符串，我美滋滋推上线——结果线上没东西。

排查方式跟上次一模一样：Mizuki 真正认的渲染表是 `SidebarColumn.astro` 里的 `componentMap`，我前面改的四处（类型、路径、配置）只管"认不认得这个 type"，唯独漏了这张真正干活的渲染表，组件被编译进去了但渲染时查不到映射，直接返回 `null` 跳过。补上 `import UmamiStats` 和 `componentMap` 里的 `umami-stats: UmamiStats` 两行就出来了。

:::warning
给 Mizuki 加侧边栏组件，**至少动五处**：类型、路径映射、配置注册、渲染映射（`SidebarColumn.astro`）、组件本体。前几处只管"认不认得"，最后那处才管"画不画得出来"。别像我一样只改了配置就以为万事大吉。
:::

## 踩坑二：类名撞车，被资料卡藏掉了

这个坑每日一言那篇没有，是这次独有的。

我一开始沿用了参考文章里的容器类名 `umami-stats-container`。结果怎么调都不显示，查源码才发现：资料卡 `Profile.astro` 的脚本里有一句 `document.querySelectorAll(".umami-stats-container")`，它会根据一个叫 oddmisc 的运行时是否加载，给**所有**带这个类的元素加 `hidden`。

而我本地 dev 日志明说 oddmisc 加载失败（无法读取运行时文件），于是这条脚本一跑，就把我的卡片也当成"没数据"给 `hidden` 了——典型的被隔壁组件误伤。

解决办法很朴素：把容器类名改成**独有**的 `umami-visit-stats`，避开资料卡的查询范围，从此两清。

:::tip
给组件起类名时，先全局搜一下 `src` 里有没有别的脚本在 `querySelector` 同一串字符串。Mizuki 几个 widget 共享一些命名习惯，撞车了就会互相隐藏，而且不报错，极难肉眼发现。
:::

## 卡片长啥样

套一层主题自带的 `WidgetLayout`（标题栏、入场动画全免费送），里面三块：总浏览量、访问数、游客数。数字带滚动动画一个个数上去，Umami 挂了就显示一组兜底占位值，不会白屏。点卡片会跳到 Umami 的分享页看更细的数据。

我这次选了**最近 30 天**的统计：实测下来是浏览量 **3603**、访问数 **462**、游客数 **252**。说真的，比我想象中有人看一点。

## 验证

- **数据**：先用脚本端到端跑通了 Share API，确认 200 且能解析出 `websiteId` 和 `token`，30 天数据正常返回（不是兜底值）。
- **类型**：`astro check` 全量扫过，`UmamiStats.astro` 和 `SidebarColumn.astro` 零错误零警告。
- **上线**：推完等 Vercel 构建完，强刷（Ctrl+F5）一下，左侧栏「每日一言」下面那张统计卡就出来了，数字会滚动一下。

现在每次打开博客，左下角都能看到最近的热度。哪天想换成「全部时间」总量，或者挪到右侧栏跟其他统计做邻居，都是改一个变量的事。

> 统计服务感谢 [Umami](https://umami.is/)，轻量、开源、隐私友好，Cloud 版免费额度对个人博客够用，民间良心项目。
