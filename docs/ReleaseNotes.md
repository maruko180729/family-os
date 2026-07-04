# Family OS — Release Notes

---

## Sprint 0 — Foundation
*2026-07-04*

### 新增
- `lib/types.ts` — 完整 TypeScript 类型系统（9种数据结构）
- `lib/mock.ts` — 真实家庭 Mock Data（徐瑞家庭数据）
- `lib/storage.ts` — LocalStorage 读写封装（面向 Supabase 迁移设计）
- 组件库：`HeroCard` / `SectionCard` / `MetricCard` / `GoalCard` / `ReminderCard` / `MemberCard` / `StatRow` / `InputCard` / `TimelineCard` / `EmptyState`
- `components/ui/index.ts` — 统一组件导出入口
- `docs/Database.md` — 完整数据库 Schema（9张表）
- `docs/LifeCycle.md` — 开发生命周期规范
- `docs/CHANGELOG.md` — 版本变更记录

### 修改
- 所有页面改用 Mock Data 驱动，无硬编码字符串
- 所有页面统一使用组件库，消除重复布局代码
- 成长页 GoalCard 进度由数据计算，不再写死

### 待确认
- 数据库 Schema 是否满足需求
- 组件 API 设计是否合理

---

## Alpha 0.4 — Polish Sprint
*2026-06-27*

### 新增
- Design Token 系统（`lib/tokens.ts`）
- 统一组件库：`Card` / `HeroCard` / `SectionLabel` / `Metric` / `AdvisorCard`
- 资产页真实 SVG 折线图（含渐变面积填充）
- 数字滚动动画（easeOutExpo，`useCountUp` hook）
- 页面切换动画（淡入 + 上移 8px，`PageTransition`）
- 底部导航点击反馈（`active:scale-90` + 激活态绿色圆点背景）
- `LineChart` 通用图表组件

### 修改
- 首页 Hero Card 高度降低约 20%（`p-6 → p-5`）
- 家庭顾问从 Bullet List 改为自然语言段落
- 首页提醒只显示未完成事项（已完成 NISA 移出，进入月度回顾）
- 成长页去掉顶部统计数字卡，直接展示目标列表
- 所有页面统一使用组件，清除内联样式重复代码

### 待确认
- Hero Card 高度是否合适
- 家庭顾问文案风格
- 首页信息密度
- 折线图比例

---

## Alpha 0.3 — 基础骨架
*2026-06-27*

### 新增
- 项目初始化（Next.js 16 + TypeScript + Tailwind + shadcn/ui）
- 五页结构：今天 / 资产 / 成长 / 家 / 更多
- 底部导航（5个标签）
- 温暖极简设计系统（米白背景 + 深绿主色）
- 静态数据展示（徐瑞家庭数据）
