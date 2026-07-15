# ProjectStatus.md

> 当前项目状态快照。每个 Sprint Review 后更新。

---

## 当前版本

**Alpha 0.5** — Sprint 3 已交付，等待 Review

---

## Sprint 进度

| Sprint | 内容 | 状态 |
|--------|------|------|
| Sprint 0 | 基础设施（类型、存储、10个组件、文档） | ✅ 已通过 |
| Sprint 1 | 家庭経営页面（收支录入、LocalStorage） | ✅ 已通过 |
| Sprint 2 | 家庭资产页面（月度快照、SVG趋势） | ✅ 已通过 |
| Sprint 3 | 家 Home Module 重设计 | 🔍 等待 Review |
| Sprint 4 | 月度回顾 | 🔜 计划中 |

---

## 已上线功能

- `/` 今天：家庭概览、净资产（读取真实资产快照）、待办提醒
- `/management` 経営：月度收支录入、AI 顾问
- `/assets` 资产：月度快照、趋势折线图、分类展示
- `/growth` 未来：目标管理（家庭净资产目标读取真实数据）
- `/family` 家：家庭理念、家庭成员、Maruko、公司、车辆、证件、家庭时间线

---

## 已知问题

- `/family` 各卡片（成员、Maruko、公司、车辆、证件、Timeline）目前仅展示，无编辑功能（计划放入后续 Sprint）
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
