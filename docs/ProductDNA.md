# Family OS — Product DNA

> 开发任何功能之前，必须先读这份文档。

---

## 产品定位

**Family OS 不是记账软件。**
**Family OS 是家庭经营系统。**

帮助家庭判断：现在过得怎么样、资产有没有增长、未来目标有没有推进。

---

## 核心原则（不可违背）

1. **Family OS 不是记账软件。** 不做每日流水，不做消费明细管理。
2. **Family OS 是家庭经营系统。** 以月度视角经营家庭，而非追踪每一笔开支。
3. **首页只能有一个核心数字** — 家庭净资产。
4. **首页只负责"查看状态"**，不负责管理和操作。
5. **不增加没有决策价值的功能。** 每个功能必须回答：这帮家庭做了什么决策？
6. **月度回顾优先于每日流水。** 每月一次比每日记录更有持续性。
7. **优先帮助家庭做决策，而不是记录更多数据。**
8. **UI 保持 Apple / Linear 风格。** 温暖、留白多、大圆角、不像后台。
9. **Mobile First。** 以 390px 宽度作为设计基准。
10. **所有设计优先考虑长期使用。** 避免信息过载，避免焦虑感。

---

## 导航结构

```
今天 / 经营 / 资产 / 未来 / 家
```

- **今天** (`/`) — 30秒内了解家庭状态，家庭净资产一键查看
- **经营** (`/management`) — 月度收支录入，不做每日流水
- **资产** (`/assets`) — 家庭净资产月度快照，趋势折线
- **未来** (`/growth`) — 家庭目标进度
- **家** (`/family`) — 家庭档案：成员 / Maruko / 公司 / 车辆 / 证件 / 时间线

月度回顾 (`/review`) 通过「更多」页面入口访问，不占底部导航。

---

## 设计语言

| Token | 值 |
|---|---|
| 主色 | 深绿 `oklch(0.48 0.09 155)` |
| 背景 | 米白 `oklch(0.98 0.005 80)` |
| 卡片圆角 | `rounded-3xl`（24px） |
| 内部圆角 | `rounded-2xl`（16px） |
| 卡片间距 | `space-y-4` |
| 页面上边距 | `pt-12` |

---

## 组件规范

所有页面必须使用统一组件，禁止在页面内写内联样式卡片。

| 组件 | 路径 | 用途 |
|---|---|---|
| `HeroCard` | `components/ui/HeroCard` | 主指标卡（深绿背景） |
| `SectionCard` | `components/ui/SectionCard` | 通用白色区块卡片，支持可选 label |
| `GoalCard` | `components/ui/GoalCard` | 成长目标进度卡 |
| `ReminderCard` | `components/ui/ReminderCard` | 待办提醒列表 |
| `InputCard` | `components/ui/InputCard` | 多字段表单卡片（月度回顾） |
| `MemberCard` | `components/ui/MemberCard` | 家庭成员展示 |
| `MarukoCard` | `components/ui/MarukoCard` | Maruko 专属卡片（年龄+关联提醒） |
| `CompanyCard` | `components/ui/CompanyCard` | 公司信息卡 |
| `VehicleCard` | `components/ui/VehicleCard` | 车辆+到期提醒色阶卡 |
| `DocumentCard` | `components/ui/DocumentCard` | 家庭重要证件卡 |
| `FamilyTimeline` | `components/ui/FamilyTimeline` | 家庭时间线（支持手动录入） |
| `LineChart` | `components/LineChart` | 纯 SVG 折线图（无第三方库） |
| `MonthSelector` | `components/MonthSelector` | 统一月份切换组件 |

---

## 禁止事项

- ❌ 不做每日记账入口
- ❌ 不做消费分类饼图
- ❌ 不在首页放操作按钮
- ❌ 不使用 Admin Dashboard 模板风格
- ❌ 不在一个屏幕内放超过 4 个信息模块
- ❌ 不为「也许有人需要」的功能开发
