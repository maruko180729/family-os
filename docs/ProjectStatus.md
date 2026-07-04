# ProjectStatus.md

> 当前项目状态快照。每个 Sprint Review 后更新。

---

## 当前版本

**Alpha 0.5** — Sprint 2 已交付，等待 Review

---

## Sprint 进度

| Sprint | 内容 | 状态 |
|--------|------|------|
| Sprint 0 | 基础设施（类型、存储、10个组件、文档） | ✅ 已通过 |
| Sprint 1 | 家庭経営页面（收支录入、LocalStorage） | ✅ 已通过 |
| Sprint 2 | 家庭资产页面（月度快照、SVG趋势） | 🔍 等待 Review |
| Sprint 3 | 月度回顾 | 🔜 计划中 |

---

## 已上线功能

- `/` 今天：家庭概览、净资产、待办提醒
- `/management` 経営：月度收支录入、AI 顾问
- `/assets` 资产：月度快照、趋势折线图、分类展示
- `/growth` 未来：目标管理
- `/family` 家：家庭档案

---

## 已知问题

- `/family` 页面内容待 Sprint 后续重设计
- 月份快照录入目前只支持整组覆盖，不支持单项修改

---

## 技术栈

| 层 | 技术 |
|----|------|
| 框架 | Next.js 16 App Router |
| UI | shadcn/ui + Tailwind CSS v4 |
| 语言 | TypeScript strict |
| 存储 | LocalStorage（→ Supabase in Alpha 0.7） |
| 部署 | Vercel |
