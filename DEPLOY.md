# 部署配置说明（内容仓库 yujingblog-content）

本仓库只存放内容（文章、data/*.ts、图片）。代码与构建在 `yujingblog-site` 仓库。
内容推送后，由本仓库的 `trigger-vercel.yml` 通知站点仓库重新部署。

**不再使用明文 Vercel Deploy Hook**，改为向站点仓库发送 `repository_dispatch`。

---

## 一、GitHub Secrets（本仓库 yujingblog-content）

路径：仓库 → Settings → Secrets and variables → Actions → New repository secret

| Secret 名        | 用途                                                       | 获取方式                                                                 |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| `DISPATCH_TOKEN` | 向站点仓库（yujingblog-site）触发 `deploy-site` 的 GitHub PAT | GitHub → Settings → Developer settings → Personal access tokens → 新建，需对 **yujingblog-site** 有 `repo` + `workflow` 权限 |

> 该 PAT 只需能调用 `POST /repos/yujing0208/yujingblog-site/dispatches`，无需本仓库范围之外的其他权限。

---

## 二、触发链路

```
push master  (或 workflow_dispatch 手动触发)
   └─> trigger-vercel.yml
          └─> repository_dispatch(event_type: deploy-site)
                 └─> yujingblog-site 的 Deploy Site workflow 完成构建与部署
```

---

## 三、已被移除的内容

- 删除了 Pages CMS 配置文件：`.pages.yml`、`content-repo.pages.yml`。
- 站点仓库侧的在线编辑仍可用（自研 `/admin` 可视化编辑器，与本文件无关）。

如需改站点外观类配置（主题色、导航栏、看板娘等），请在 `yujingblog-site` 仓库操作。
