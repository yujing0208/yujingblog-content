---
published: 2026-08-28
title: 🧠 把 DeepSeek Harness 搬上 Android
pinned: false
description: dsh跑在旧手机上，并接入QQ机器人
tags:
  - agent
  - QQ机器人
category: 技术教程
licenseName: Unlicensed
author: 余京
sourceLink: dsh-android+QQbot
draft: false
date: 2026-08-28
image:
pubDate: 2026-08-28
permalink:
aiSummary: 把 DeepSeek Harness（dsh）QQ 机器人完整部署到 Android/Termux 的实战方案：danger-full-access 权限配置、Termux:Boot 开机自启、keepalive 自愈保活、关闭思考省 token 与零成本自动快照，附远程诊断指令表和放外地 Checklist，可放心无人值守。
------

# 🧠 把 DeepSeek Harness 搬上 Android

一台 QQ 机器人的「放之异地」完整优化与实施方案

记录了把运行在 Android/Termux 上的 DeepSeek Harness（dsh）QQ 机器人，调优到"可放心放外地、无人值守自愈"的完整过程 + 可直接照做的完整方案。

📱 Android · 🤖 QQ · 🔁 无人值守 | dsh 0.1.1-rc.2 · Node v26

## 📌 目录

① 背景与目标

② 环境清单

③ 一、权限配置（bash 工具可用）

④ 二、开机自启（Termux:Boot）

⑤ 三、自愈与保活（守护 crontab 完整配置）

⑥ 四、省 token（关思考 + 自动快照）

⑦ 五、远程诊断指令表

⑧ 放外地前 Checklist

⑨ 现状总览

⑩ 局限与未解问题

⑪ 给后来者的建议

### 1. 背景与目标

在 可长期放外地、无需亲手操作 的手机上运行一个可通过 QQ 远程对话的 AI 智能体，让它自己活着、自己救活、远程可诊断。

| 组件 | 作用 |一
| --- | --- |
| DeepSeek Harness (dsh) | 官方 agent harness，可执行 bash、读写文件、联网 |
| Android + Termux | 社区项目 deepseek-harness-android 原生部署 |
| QQ 接入 | @tencent-connect 官方开放平台机器人 |

### 2. 环境清单

| 项 | 值 |
| --- | --- |
| 🖥️ 设备 | Android（Termux） |
| ⚙️ dsh | 0.1.1-rc.2 |
| 📦 Node.js | v26.4.0 |
| 📁 工作区 | ~/deepseek-harness-android |
| 💬 QQ 插件 | @tencent-connect/dsh-qqbot |
| 🌐 Web 插件 | @deepseek-ai/dsh-web-app |

⚠️ web 与 qqbot 是两个独立 profile，会话互不可见（见⑩-5）。

### 3. 一、权限配置（bash 工具可用）

为什么需要：Android 无 bwrap/landlock 沙箱，workspace-write 无法落地，bash 工具全不可用。

做法：给每个 profile 增加 sandbox-policy: danger-full-access。

~/.dsh/profiles/qqbot/cordis.patch.yml（qqbot 修复后）：

```yaml
- id: im-qqbot
  config:
    appId: 'YOUR_APP_ID'
    appSecret: 'YOUR_APP_SECRET'
- id: sandbox-policy
  config:
    mode: danger-full-access
```

~/.dsh/profiles/web/cordis.patch.yml：

```yaml
- id: sandbox-policy
  config:
    mode: danger-full-access
```

✅ web 默认有；qqbot 常漏配，是 bash 不可用的主因。

### 4. 二、开机自启（Termux:Boot）

为什么需要：开机脚本存在但缺少触发插件，重启后不自启。

步骤：

5. 从 termux-boot 仓库 下载 v0.8.1 APK（校验 SHA256）。
6. 安装并打开一次激活（注册开机广播）。
7. 确认：pm list packages | grep boot → 出现 com.termux.boot。

开机脚本 ~/.termux/boot/start_dsh：

```bash
#!/data/data/com.termux/files/usr/bin/bash
export DSH_PERMISSION_MODE=danger-full-access
LOG="$HOME/dsh/storage/boot.log"
mkdir -p "$HOME/dsh/storage"
# 等网络就绪（最多90秒）
for i in $(seq 1 30); do
  ping -c 1 -W 2 223.5.5.5 >/dev/null 2>&1 && break
  sleep 3
done
sleep 5
bash "$HOME/dsh/start_dsh.sh" all >>"$LOG" 2>&1
sleep 2
nohup bash "$HOME/dsh/daemon.sh" start >/dev/null 2>&1 &
echo "[$(date '+%F %T')] 全部服务已拉起" >>"$LOG"
```

🕳️ 踩坑：第一次下载是 196KB 截断"假 APK"，SHA256 不匹配报损坏；重下到 726KB 并校验通过才成功。

📎 F-Droid Termux:Boot

### 5. 三、自愈与保活（守护 crontab 完整配置）

关键守护脚本（均位于 ~/dsh/）：

status.sh —— 每 5 分钟写健康状态

```bash
#!/data/data/com.termux/files/usr/bin/bash
ST="$HOME/dsh/storage/status.log"
echo "[$(date '+%F %T')] up $(uptime -p|sed 's/up //') | load $(uptime|awk -F'load average:' '{print $2}') | mem $(free -m|awk 'NR==2{print $3"M/"$2"M"}') | qqbot=$([ "$(pgrep -f 'lib/bin.js --profile qqbot'|wc -l)" -gt 0 ]&&echo ✓||echo ✗) | net=$([ ping -c1 -W2 223.5.5.5 >/dev/null 2>&1 ]&&echo ✓||echo ✗)" >>"$ST"
tail -1 "$ST"
```

keepalive.sh —— 每 30 秒自愈

```bash
#!/data/data/com.termux/files/usr/bin/bash
LOG="$HOME/dsh/storage/keepalive.log"
net_down(){
  local ok=0
  for i in 1 2 3; do
    ping -c1 -W2 223.5.5.5 >/dev/null 2>&1 && { ok=1; break; }
    sleep 1
  done
  [ "$ok" -eq 0 ]
}
ensure_running(){
  "$HOME/dsh/start_dsh.sh" web
  "$HOME/dsh/start_dsh.sh" qqbot
}
log(){ echo "[$(date '+%F %T')] $1" >>"$LOG"; }
log "keepalive 启动"
while true; do
  if net_down; then
    log "断网，等待恢复"
    for i in $(seq 1 600); do
      ping -c1 -W2 223.5.5.5 >/dev/null 2>&1 && break
      sleep 1
    done
    "$HOME/dsh/stop_dsh.sh"
    sleep 3
    ensure_running
    log "网络恢复，已重启"
  else
    if ! pgrep -f "lib/bin.js --profile qqbot" >/dev/null 2>&1; then
      log "qqbot 进程退出，重启"
      ensure_running
    fi
  fi
  sleep 30
done
```

完整 crontab（已生效）

```
0 3 * * * /data/data/com.termux/files/home/dsh/cleanup.sh
5 * * * * /data/data/com.termux/files/home/dsh/status.sh
0 4 * * * /data/data/com.termux/files/home/dsh/stop_dsh.sh all && sleep 8 && /data/data/com.termux/files/home/dsh/start_dsh.sh all
*/30 * * * * /data/data/com.termux/files/home/dsh/memory_snapshot.sh
```

🛡️ 实测：keepalive 日志反复出现"qqbot 进程退出，重启"，自愈真实生效。

### 6. 四、省 token（关思考 + 自动快照）

关闭思考 ~/.dsh/settings.yaml：

```yaml
reasoningEffort: off
```

当前模型 deepseek-v4-flash（非 reasoner 系）✅

会话瘦身 qqbot 内置指令 /bot-new 清空上下文（代价：丢 agent 记忆）。

零 token 自动快照 ~/dsh/memory_snapshot.sh（纯 bash，不调 LLM）：

```bash
#!/data/data/com.termux/files/usr/bin/bash
MEM=~/.dsh/storage/memory.md
ST=~/dsh/storage/status.log
mkdir -p "$(dirname "$MEM")"
{
  echo ""
  echo "--- [$(date '+%F %T')] 快照 ---"
  echo "qqbot=$([ $(pgrep -f 'profile qqbot'|wc -l) -gt 0 ]&&echo ON||echo OFF) web=$([ $(pgrep -f 'bin.js web'|wc -l) -gt 0 ]&&echo ON||echo OFF)"
  echo "net=$([ ping -c1 -W2 223.5.5.5 >/dev/null 2>&1 ]&&echo OK||echo FAIL)"
  [ -f "$ST" ] && tail -1 "$ST" | cut -c1-90
} >>"$MEM" 2>/dev/null
tail -n 200 "$MEM" >"$MEM.tmp" 2>/dev/null && mv "$MEM.tmp" "$MEM" 2>/dev/null
```

每 30 分钟由 cron 触发，零 token、只保留最近 200 行。

📎 官方 mcp-memory 示例 · dsh-memory-connect

### 7. 五、远程诊断指令表

指令 作用
/bot-status 查询机器人/服务运行状态
/bot-ping 连通性测试
/bot-model [provider/model] 查看/切换模型（当前仅 deepseek）
/bot-new 开始新会话（清空上下文，省 token）
/bot-help 帮助列表

手动查健康：tail -1 ~/dsh/storage/status.log（看 qqbot=✓ net=✓）。

### 8. 放外地前 Checklist

✅ qqbot / web 权限已配 danger-full-access

✅ Termux:Boot 已装并激活

✅ start_dsh.sh / keepalive / cron 全部就位

✅ 思考已关（off）

✅ 每 30 分钟快照已生效

☑️ 手动项：系统设置给 Termux、Termux:Boot 开「自启动 + 不限电池」

### 9. 现状总览

📋 项 ✅ 状态1 qqbot / web ON 网络 OK 权限 danger-full-access ✅ 开机自启 Termux:Boot + start_dsh ✅ keepalive 自愈 运行中，已实测触发 ✅ crond 3 任务 + 快照 ✅ 思考 off ✅ 快照 每 30 分钟，零 token ✅

🏁 结论：可以放心放外地。

### 10. 局限与未解问题
1. ⚠️ 跨会话"自动回忆"未真正实现：/bot-new 丢记忆，靠 memory.md 兜底。
2. ⚠️ 不能自动开新会话/自动压缩：只能手动 /bot-new。
3. ⚠️ 依赖第三方 + 无远程通道：无 SSH/穿透，只能被动应答。
4. ⚠️ 系统层受限：无 root，装 APK/改系统设置须人工。
5. ⚠️ 会话隔离：Web 与 QQ 互不可见。
6. ⚠️ 社区记忆插件不成熟：装坏有弄挂 qqbot 的风险。
7. 给后来者的建议
8. 🛠️ 权限每个 profile 单独配。
9. 🔄 开机自启 = 装 Termux:Boot + 打开激活。
10. 🔐 下载校验 SHA256。
11. 💸 分清 token 花在哪：cron bash 零消耗，大头是会话累积，及时 /bot-new。
12. 🛡️ 别为插件赌上核心服务。
13. 📄 兜底做成零风险（写文件、加 cron）。

<div align="center"> —— 完 —— </div>
> [!tip]
> 此文章由此项目的QQ机器人生成

