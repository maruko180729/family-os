# Family OS — Review Log

每次完成开发后更新此文件。

---

## Alpha 0.4 — Polish Sprint
*2026-06-27*

**Preview:** https://family-os-woad-one.vercel.app

### 本次完成
- Hero Card 高度优化（~20%降低）
- 首页 AI 顾问改为自然语言段落
- 首页提醒只展示未完成事项
- 成长页移除顶部统计卡
- 资产页折线图（真实 SVG）
- 页面切换动画
- 数字滚动动画
- 导航点击反馈
- 统一组件库（Card / HeroCard / SectionLabel / AdvisorCard）
- Design Token 文档（lib/tokens.ts）
- 产品文档体系（docs/）

### 等待产品确认
- Hero Card 最终高度是否满意
- 家庭顾问段落文案是否自然
- 首页卡片顺序：状态 → 顾问 → 提醒，是否合理
- 资产折线图的比例与视觉效果
- 导航激活态圆点背景是否太强

### 下一步计划
**Alpha 0.5 — 月度回顾**
- 月度回顾填写页（`/more/review`）
- 字段：本月净资产变化 / 大事件 / 收入概况 / 一次性支出 / 下月重点 / 最开心的事
- AI 月报总结（静态文案版）
- LocalStorage 持久化（首页数字来自真实数据）

---

## Sprint 3 — 家 Home Module
*2026-07-04*

### 本次完成
- QA 走查 `/`、`/management`、`/assets`、`/growth`、`/family` 全部页面，确认收支录入 → LocalStorage → 家庭顾问文案的联动链路正常
- Bug fix：`/` 首页与 `/growth` 的"家庭净资产"此前读取的是 `lib/mock.ts` 里孤立的静态数字，和 `/assets` 真实录入的资产快照完全脱节；改为统一读取最新一次资产快照（`getLatestNetAsset()`），并删除了废弃的 `getNetAsset()`
- Bug fix：`/assets` 当月未录入快照时，卡片显示"¥0"但下方仍画出历史趋势上扬曲线，视觉矛盾；改为仅当月有数据时才显示趋势图
- `/family` 按 ChatGPT PRD 锁定的顺序重做：Hero（家庭理念）→ 家庭成员 → Maruko（独立卡片，Decision 01）→ 公司 → 车辆 → 证件 → 家庭时间线（Decision 02：置于最后）
- 新增类型与 mock 数据：`Company` / `Vehicle` / `FamilyDocument` / `Milestone`，均接入 LocalStorage（`lib/storage.ts`）
- 车辆卡片实现车检/保险到期提醒色阶（30天黄色、7天红色）
- Maruko 卡片按 `birthDate` 自动计算年龄

### 本次不做（按 PRD 范围）
- 各卡片的编辑功能（新增/修改成员、车辆、证件等）
- 家庭照片上传、留言、共享日历、家庭群
- 证件到期的推送提醒（数据已建模，推送逻辑留给后续 Sprint）

### 产品确认结果（2026-07-05）
1. ✅ Maruko 卡片需要带出与她相关的待办提醒 → 已实现：`Reminder` 新增 `relatedMemberId` 字段，`MarukoCard` 过滤展示
2. ✅ 家庭时间线目前只是参考内容，需要支持手动输入 → 已实现：`useMilestones` hook + `AddMilestoneSheet`，可在 `/family` 页面新增事件并持久化到 LocalStorage（新事件追加在列表末尾，不做自动排序）
3. ✅ 车辆到期提醒颜色阈值（30天黄/7天红）符合预期，不改

### 追加完成（2026-07-05）
- `Reminder.relatedMemberId` 字段，`mockReminders` 中 Maruko 疫苗提醒关联 `m3`
- `MarukoCard` 展示归属于她的待处理提醒
- `hooks/useMilestones.ts`：家庭时间线的读取 / 新增 / 删除
- `components/AddMilestoneSheet.tsx`：手动录入时间线事件（时间 / 事件 / 图标，均为自由文本，因为时间格式本身不统一如"2027"/"未来"）
- `FamilyTimeline` 增加"+ 添加"入口

### 等待产品确认
- 家庭时间线的里程碑内容（结婚/洗牙/NISA/永住/创业）是否需要调整或补充

### 下一步计划
**Stabilization Sprint**
- Git 收口、文档同步、技术债清理、首页真实数据联动

---

## Sprint 2 — 家庭资产
*2026-07-04*

**Preview:** https://family-1ew79ytki-maruko0729.vercel.app

### 本次完成
- `/assets` 月度资产快照模块（日本/中国/投资/其它 四分类）
- `AssetSnapshot` 类型 + `useAssets` hook + `UpdateAssetsSheet`
- SVG 趋势折线（12 个月，无第三方库）
- Hero：净资产 + 本月变化 + 最后更新时间
- 未录入分类显示「—」
- 导航：成长→未来，更多→家

### 产品确认
- ✅ 同月覆盖保存
- ✅ 未录入显示「—」
- ✅ 颜色固定（蓝/绿/橙/灰）
- ✅ Hero 增加最后更新时间

### 下一步计划
Sprint 3 家 Home Module（/family 全新设计）

---

## Stabilization Sprint
*2026-07-16*

### 本次完成
- Phase 1：Sprint 3+4 代码补提交（commit e6203ff）
- Phase 2：/review 功能确认（页面正常、/more 入口正常、无控制台错误）
- Phase 3：文档全面同步（ProductDNA / Roadmap / ChangeLog / Review / Database / ProjectStatus）
- Phase 4：废弃代码清理（5 个无引用组件、3 个废弃类型、旧资产函数）
- Phase 5：提取 `MonthSelector` 统一组件
- Phase 6：首页改用真实数据（提醒读 storage，AI 顾问规则动态生成）
- Phase 7：Lint + Build 通过

### 月度回顾需要 Product Review 的确认项
1. `/review` 页面：初始进入是否应默认上月（当前实现：是）
2. Hero 无资产数据时的提示文案是否合适
3. AI 月报总结自动生成逻辑是否足够
4. `/more` 入口显示方式（当前：列表按钮）是否满意
5. 是否需要支持修改已保存的回顾（当前：覆盖保存）
