# CHANGELOG

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)

---

## [Unreleased]

### 计划中
- 目标数据可编辑
- `/family` 各卡片编辑功能
- 资产快照单分类修改
- 节税中心详情页
- Beta 0.3：固定支出自动账单、Supabase 迁移

---

## [Beta 0.2.2] — 2026-07-26

### Added
- 中国资产 CNY 录入：`AssetSnapshot` 新增 `currency` / `rawAmount` 字段，中国资产存储人民币原始金额
- 汇率设置：`ExchangeRateSettings { cnyToJpy: 20 }`，LocalStorage key `family-os-exchange-rates`
- 资产页「汇率设置」入口：支持编辑 `1 CNY = X JPY`，修改后所有折算值立即重新计算
- 资产页中国资产双行显示：`¥500,000 CNY` / `≈ ¥10,000,000 JPY`
- `UpdateAssetsSheet` 和 `SingleAssetSheet` 中国资产输入标注 CNY，并实时显示折算预览
- 家庭头像上传：`FamilyProfile { avatarDataUrl? }`，LocalStorage key `family-os-family-profile`
- 头像自动居中裁切（512×512 canvas JPEG，quality 0.82），文件过大时弹出提示
- 「家」页头像编辑入口（相机图标 + 文字链接），支持「恢复默认头像」
- `RecurringExpense.amountType: "fixed" | "variable"` 替代旧 `amount` 字段
- `RecurringExpense.referenceAmount?: number` 替代旧 `amount` 作为参考金额
- 固定支出模板支持「每月变动」类型（电费、水费、煤气费等）
- 经営页「本月待输入」区块：列出所有 enabled variable 模板中本月尚无支出记录的项目
- 点击待输入项目直接打开新增支出 Sheet，预选模板、预填扣款日、金额为空并自动聚焦

### Changed
- `PaymentCenterSheet` RecurringForm：新增金额类型切换（固定金额 / 每月变动），字段名「参考金额」
- `AddExpenseSheet` FixedFlow：variable 模板 placeholder 改为「请输入本月金额」
- 模板列表展示：variable 显示「每月变动」，fixed 显示参考金额
- `useAssets(month, cnyToJpy)` 新增第二参数，所有调用方（AssetsPage、ReviewPage）传入当前汇率
- `getLatestNetAsset()` 读取 exchange rates 后进行 CNY→JPY 折算

### Migration
- `getRecurringExpenses()` 自动迁移旧 `amount` 字段：`amount > 0` → `fixed`，`amount = 0` → `variable`
- 旧 `AssetSnapshot.amount` 继续兼容（非中国资产视为 JPY）

---

## [Beta 0.2 Review Fix] — 2026-07-25

### Fixed
- 信用卡支付日默认：选卡后自动填入 `${currentMonth}-${card.paymentDay}`，跨月末截断（`monthDay()` helper）
- 固定支出支付日默认：选模板后同样使用 `monthDay(currentMonth, template.paymentDay)` 推算
- 2月31日等场景：`new Date(y, m, 0).getDate()` 正确截断至月末最后一天
- 经営页支出明细来源显示：
  - 信用卡 → `{card.name} •••• {card.last4}`
  - 固定支出 → 模板名称（via `recurringId`）
  - 其他 → `note ?? "其他支出"`
  - 旧数据兼容：`expenseType ?? category` 回落链，无错误
- 信用卡字段校验：`name` 必填，`last4` 恰好4位数字，`paymentDay` / `billingDay` 1–31
- 固定支出模板：`amount=0` 表示金额变动，录入时留空 + 自动聚焦；`amount>0` 预填但可编辑
- 固定支出模板列表：金额为0时显示"金额变动"而非¥0

---

## [Beta 0.2] — 2026-07-25

### Added
- `CreditCard` 类型：`id / name / last4 / billingDay? / paymentDay? / color? / isDefault`
- `RecurringExpense` 类型：`id / name / amount / paymentDay? / category / enabled / note?`
- `PaymentCenterSheet`：信用卡管理 + 固定支出模板管理（增删改）
- `AddExpenseSheet` 三模式：固定支出（选模板）/ 信用卡（选卡）/ 其他
- `Expense` 新增字段：`expenseType` / `paymentSourceId` / `recurringId`
- 经営页「支付管理」入口按钮
- LocalStorage 新键：`family-os:creditCards` / `family-os:recurringExpenses`

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
