# CHANGELOG

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)

---

## [Unreleased]

### 计划中
- 月度回顾填写页
- LocalStorage 数据持久化
- 节税中心详情页

---

## [0.4.0] — 2026-06-27

### Added
- Design Token 系统（`lib/tokens.ts`）
- 统一组件库：`Card` / `HeroCard` / `SectionLabel` / `AdvisorCard`
- `LineChart` SVG 折线图组件（含渐变面积）
- `useCountUp` 数字滚动动画 hook
- `PageTransition` 页面切换动画组件
- 产品文档体系（`docs/` 目录）

### Changed
- 首页 Hero Card padding `p-6 → p-5`（高度降低约 20%）
- 首页 AI 顾问从 Bullet List 改为自然语言段落
- 首页提醒只展示未完成事项
- 成长页移除顶部统计数字卡
- 资产页趋势图从占位 bar 改为真实 SVG 折线图
- 底部导航激活态改为圆角背景 + `active:scale-90` 点击反馈
- 所有页面统一使用组件，清除重复内联样式

---

## [0.3.0] — 2026-06-27

### Added
- 项目初始化（Next.js 16 + TypeScript + Tailwind CSS + shadcn/ui）
- 五页结构：今天 / 资产 / 成长 / 家 / 更多
- 底部导航（5 标签）
- 温暖极简主题（米白背景 + 深绿主色）
- 静态数据展示
- Vercel 部署接入
