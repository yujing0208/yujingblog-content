---
title: YuJing 博客部署报告
published: 2026-07-24
tags: []
description: 从本地到线上全记录
image: https://bee-reg-ab.imagency.cn/p/06b6388ada543c5ac377ec900aeed5f8.png
---

## 一、我们做了什么

简单说：我们要把一个博客网站放到网上让大家能访问。这个博客用了 Next.js 框架，有文章、照片墙、评论区、还有几个后台接口。

### 1.1 项目里都有啥

**项目结构大致是：**

- 5 个 API 接口 —— 聊天、GitHub 信息、音乐、测试、天气
- 博客文章页面 —— 支持 Markdown 格式
- 照片墙 —— 35 张照片，分了几个相册
- 评论系统 —— 用的 Gitalk（基于 GitHub Issues）
- 控制台程序 —— 一个管理后台用来发文章、传照片

### 1.2 部署的要求

- 要免费，不花钱
- 要能在国内正常打开（很多国外平台被墙）
- 照片墙、评论、API 接口都要能用

## 二、遇到什么问题

### 2.1 问题 1：GitHub Pages 不能用

一开始想用 GitHub Pages（免费，国内能访问），但 GitHub Pages 只能放静态网页，而这个博客有 API 接口（需要服务端运行），所以一构建就报错：

*"/api/test 这个路由设置了静态导出，但 API 路由不能静态导出"*

除非把所有 API 接口删掉，但那样博客功能就不完整了。这条路走不通。

### 2.2 问题 2：Vercel 在国内被墙

Vercel 是 Next.js 的亲爹，天然支持 API 接口。但 Vercel 自带的域名（*.vercel.app）在中国大陆经常打不开。用户试了，确实打不开。

### 2.3 问题 3：照片太大，不适合放 Git 仓库

35 张照片加起来 112MB，塞进 Git 仓库会导致每次下载/推送都很慢，而且照片又不经常改，没必要占仓库空间。

### 2.4 问题 4：网络和权限问题

- GitHub token 权限不够，代码推不上去
- 电脑有代理问题，发 HTTPS 请求经常报 SSL 错误
- 很多操作没法自动完成，需要手动点击网页操作

## 三、解决方案

### 3.1 部署平台：Vercel + 自定义域名

用 Vercel 部署（解决 API 接口问题），再绑一个国内买的域名（解决访问问题）。

**具体配置：**

- 部署平台：Vercel（免费版）
- 域名：yujingblog.top（阿里云买的）
- DNS 解析：CNAME 记录指向 cname.vercel-dns.com（已生效）

### 3.2 照片：迁移到免费图床 ImgBB

**操作步骤：**

① 用户注册 ImgBB，给了 API Key
② 批量上传 34 张照片到 ImgBB
③ ImgBB 返回 34 个外链地址（i.ibb.co/xxx）
④ 把相册数据里的本地路径全部替换成外链
⑤ 从 Git 里删掉照片，加到 .gitignore 里，以后不会再上传

### 3.3 评论系统：Gitalk 配置

Gitalk 的 OAuth 凭证已经配好了（ClientID 和 Secret），但回调地址还要改成 yujingblog.top。这是上线前最后一步。

## 四、后续要做的

### 现在还差最后一步——部署代码

代码已经在本地改好了，但还没传到 Vercel 上运行。你只需要做一件事：

**打开** [https://vercel.com/dashboard](https://vercel.com/dashboard)

→ 点进 yujing100208-blog 项目
→ 点 Deploy 按钮
→ 选 master 分支，点 Deploy

等几分钟部署完，打开 https://yujingblog.top 就能看到博客了。

### 部署完成后的步骤

1. 检查博客能不能正常打开
2. 更新 Gitalk 回调地址为 yujingblog.top
3. 开始写文章、传照片
4. 以后每次改代码推送到 GitHub，Vercel 会自动重新部署

### 完成度一览

| 模块 | 进度 | 说明 |
|------|------|------|
| 照片迁移到图床 | 100% | 34 张已上传到 ImgBB |
| 相册数据更新 | 100% | 路径已全部替换为图床链接 |
| Git 清理 | 100% | 照片已删除，.gitignore 已配置 |
| 域名注册 | 100% | yujingblog.top 已注册 |
| DNS 解析 | 100% | CNAME 已生效 |
| Vercel 项目 | 100% | 项目已创建，域名已绑定 |
| 代码部署到线上 | 0% | 就差点一下 Deploy |
| Gitalk 回调配置 | 0% | 部署完成后改一下 URL |

—— 报告完 ——
