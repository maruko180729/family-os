# CHANGELOG

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)

---

## [Unreleased]

### 计划中
- 目标数据可编辑
- `/family` 各卡片编辑功能
- 资产快照单分类修改
- 节税中心详情页

---

## [0.6.0] — 2026-07-16

### Added
- `docs/` 命名规范统一为 PascalCase
- Stabilization Sprint：技术债清理、文档全面同步
- `MonthSelector` 统一月份切换组件（`/management` / `/assets` / `/review` 共用）
- 首页 AI 顾问改为规则动态生成（读取真实收支 + 资产快照数据）
- 首页提醒改用 `getReminders()` 读取真实 LocalStorage 数据

### Changed
- 废弃并删除：`Asset` / `AssetCategory` / `AssetTrendPoint` 类型
- 废弃并删除：`mockAssetTrend` / `getTotalAssets` / `getTotalLiabilities` / `getAssets` / `saveAssets`
- 废弃并删除：未使用的 UI 组件（`EmptyState` / `FamilyCard` / `MetricCard` / `StatRow` / `TimelineCard`）

---

## [0.5.1] — 2026-07-04 (Sprint 3+4 补录)

### Added — Sprint 4 月度回顾
- `/review` 月度回顾页面（月份切换、净资产变化 Hero、InputCard 表单）
- `useReview` hook（LocalStorage 持久化）
- `lastReviewableMonth()` 工具函数（限制回顾已结束月份）
- `/more` 页面：月度回顾入口，显示上月回顾状态
- AI 月报规则生成（净资产变化 + 大事件 + 最开心的事）

### Added — Sprint 3 家 Home Module
- `/family` 全新设计：Hero / 家庭成员 / Maruko / 公司 / 车辆 / 证件 / 家庭时间线
- `Company` / `Vehicle` / `FamilyDocument` / `Milestone` 类型 + storage + mock
- `MarukoCard`：年龄自动计算，展示关联 `Reminder`
- `VehicleCard`：车检/保险到期色阶（30天黄 / 7天红）
- `FamilyTimeline`：支持手动添加里程碑（`useMilestones` + `AddMilestoneSheet`）
- `Reminder.relatedMemberId` 字段

### Fixed — Sprint 3
- 首页 / 未来 净资产改读 `AssetSnapshot` 真实数据（`getLatestNetAsset()`）
- `/assets` 当月无快照时不显示历史趋势图

---

## [0.5.0] — 2026-07-04

### Added — Sprint 2 家庭资产
- `AssetSnapshot` 类型（月度快照，非流水；4 组：日本/中国/投资/其它）
- `useAssets` hook（LocalStorage、delta、12 月趋势计算）
- `UpdateAssetsSheet` 底部 Sheet（pre-fill 当前值，保存即刻更新）
- `/assets` 完整页面（Hero + 趋势图 + 分类卡 + AI 顾问 + 更新按钮）
- 12 个月 × 4 组 mock 快照数据

### Changed — Sprint 2
- 导航：成长 → 未来（Sparkles），更多 → 家（Users）
- `/assets` Hero 新增「最后更新时间」
- 未录入分类显示「—」而非 ¥0

### Added — Sprint 1 家庭経営
- `/management` 页面（月份切换、Hero 结余 / 收入 / 支出、AI 顾问）
- `AddIncomeSheet` / `AddExpenseSheet` 底部 Sheet
- `useManagement` hook（月度数据聚合、LocalStorage 持久化）
- `useMonth` hook（月份状态管理、prev/next）
- `Income` / `Expense` 类型（`IncomeSource` / `ExpenseCategory`）

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
