# Task.md

> 当前 Sprint 任务与历史记录。每个 Sprint 开始时更新「当前 Sprint」，完成时移入「已完成」。

---

## 当前 Sprint

**Sprint 4 — 月度回顾**（计划中）

- [ ] 月度回顾填写页 `/review`
- [ ] 字段：净资产变化 / 大事件 / 收入概况 / 支出备注 / 下月重点 / 最开心的事
- [ ] AI 月报总结（规则版）
- [ ] LocalStorage 持久化
- [ ] 更多页面入口

---

## 下一批（Backlog）

- [ ] 资产快照：支持单分类修改
- [ ] NISA / iDeCo 进度展示
- [ ] 节税中心详情页
- [ ] 家庭成员 / Maruko / 公司 / 车辆 / 证件 / Timeline 的编辑功能（Sprint 3 仅做展示）
- [ ] LocalStorage → Supabase 迁移（Alpha 0.7）

---

## 已完成

### Sprint 3 — 家 Home Module（2026-07-04）
- [x] 信息架构重排：Hero → 家庭成员 → Maruko → 公司 → 车辆 → 证件 → Timeline（锁定顺序）
- [x] `Company` / `Vehicle` / `FamilyDocument` / `Milestone` 类型 + storage 读写
- [x] Maruko 独立卡片（Decision 01），脱离家庭成员列表，含年龄自动计算
- [x] 公司卡片（晟森株式会社）
- [x] 车辆卡片，车检/保险到期状态（30天黄色提醒 / 7天红色提醒）
- [x] 重要证件卡片
- [x] 家庭时间线组件（人生节点，Decision 02：置于页面最后）
- [x] Bug fix：首页/未来页净资产改为读取真实资产快照，不再使用静态 mock 数字
- [x] Bug fix：`/assets` 当月无快照时不再显示矛盾的历史趋势图

### Sprint 2 — 家庭资产（2026-07-04）
- [x] `AssetSnapshot` 类型（月度快照，非流水）
- [x] 四大分类：日本 / 中国 / 投资 / 其它
- [x] `useAssets` hook（LocalStorage、delta、趋势）
- [x] `UpdateAssetsSheet` 底部 Sheet
- [x] `/assets` 完整页面
- [x] 导航更新：成长→未来、更多→家

### Sprint 1 — 家庭経営（2026-07-04）
- [x] `/management` 页面（月份切换、Hero、收支明细）
- [x] `AddIncomeSheet` / `AddExpenseSheet`
- [x] `useManagement` + `useMonth` hooks
- [x] LocalStorage 持久化，刷新保留

### Sprint 0 — 基础设施（2026-06-27）
- [x] `lib/types.ts` 核心类型
- [x] `lib/storage.ts` LocalStorage 抽象
- [x] `lib/mock.ts` 真实家庭 mock 数据
- [x] 10 个 UI 组件
- [x] `docs/` 文档体系
