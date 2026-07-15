# Family OS — Database Schema

Alpha 阶段使用 LocalStorage，Beta 阶段迁移至 Supabase。
Schema 设计已面向 Supabase / PostgreSQL 兼容。

---

## 表结构

### `member` — 家庭成员

```sql
id          uuid primary key default gen_random_uuid()
name        text not null
role        text              -- "会社员" | "経営者" | "学生" 等
avatar      text              -- emoji 或图片 URL
birth_date  date
note        text
created_at  timestamptz default now()
```

### ~~`asset`~~ — ⚠️ 已废弃

> Sprint 2 之后用 `asset_snapshot` 替代，此表不再使用。

### `asset_snapshot` — 家庭资产月度快照（核心）

```sql
id          uuid primary key default gen_random_uuid()
month       text not null     -- "YYYY-MM"
group       text not null     -- "japan" | "china" | "investment" | "other"
amount      bigint not null   -- 日元（整数），该月该分类的总资产额
updated_at  timestamptz       -- 用户更新时间（显示在 Hero）
note        text
unique (month, group)         -- 每月每分类只有一条记录（覆盖保存）
```

**四大分类：**
- `japan` — 日本资产（现金、存款、应急资金等）
- `china` — 中国资产（国内银行、理财等）
- `investment` — 投资资产（NISA、iDeCo、股票等）
- `other` — 其它资产

### `income` — 收入记录（月度）

```sql
id          uuid primary key default gen_random_uuid()
month       text not null     -- "YYYY-MM"
source      text not null     -- "salary" | "spouse" | "other"
amount      bigint not null   -- 日元
date        text not null     -- "YYYY-MM-DD"（录入日期）
note        text
created_at  timestamptz default now()
```

### `expense` — 支出记录（月度，非每日流水）

```sql
id          uuid primary key default gen_random_uuid()
month       text not null     -- "YYYY-MM"
category    text not null     -- "fixed" | "credit" | "other"
amount      bigint not null   -- 日元
date        text not null     -- "YYYY-MM-DD"
note        text
created_at  timestamptz default now()
```

### `goal` — 家庭目标

```sql
id          uuid primary key default gen_random_uuid()
name        text not null
emoji       text
category    text              -- "asset" | "visa" | "nisa" | "ideco" | "health" | "travel" | "custom"
current_value   bigint        -- 当前金额或进度值
target_value    bigint        -- 目标金额
unit        text default 'JPY'-- "JPY" | "%" | "count"
target_date date
status      text default 'active' -- "active" | "watching" | "completed" | "paused"
note        text
created_at  timestamptz default now()
updated_at  timestamptz default now()
```

### `company` — 公司/事业体信息（Sprint 3）

```sql
id                    uuid primary key default gen_random_uuid()
name                  text not null
legal_representative  text            -- 法定代表人姓名
founded_year          text            -- "YYYY"
status                text            -- "正常经营" 等
created_at            timestamptz default now()
```

### `vehicle` — 车辆信息（Sprint 3）

```sql
id                uuid primary key default gen_random_uuid()
name              text not null     -- 车辆名称/型号
next_inspection   text not null     -- "YYYY-MM-DD"，车检到期
insurance_expiry  text not null     -- "YYYY-MM-DD"，保险到期
created_at        timestamptz default now()
```

> 到期提醒色阶：≤7天红色，≤30天黄色，其余正常

### `family_document` — 重要证件（Sprint 3）

```sql
id          uuid primary key default gen_random_uuid()
owner_id    uuid references member(id)
label       text not null     -- 证件名称，例："永住申请计划"
date        text not null     -- "YYYY" 或 "YYYY-MM-DD"
created_at  timestamptz default now()
```

### `milestone` — 家庭时间线事件（Sprint 3）

```sql
id          uuid primary key default gen_random_uuid()
date        text not null     -- "YYYY" 或 "YYYY-MM"（格式不强制统一）
title       text not null     -- 事件描述
emoji       text              -- 可选图标
created_at  timestamptz default now()
```

### `reminder` — 提醒事项

```sql
id                uuid primary key default gen_random_uuid()
title             text not null
due_date          date
category          text          -- "tax" | "insurance" | "medical" | "visa" | "other"
status            text default 'pending' -- "pending" | "done" | "snoozed"
related_goal_id   uuid references goal(id)
related_member_id uuid references member(id)  -- 新增：关联家庭成员（如 Maruko）
note              text
created_at        timestamptz default now()
```

### `timeline` — 月度回顾（核心）

```sql
id              uuid primary key default gen_random_uuid()
month           text not null unique  -- "2025-06"
net_asset_start bigint                -- 月初净资产
net_asset_end   bigint                -- 月末净资产
net_change      bigint                -- 变化额（自动计算）
events          text                  -- 本月大事件（自由文本）
income_summary  text                  -- 收入概况
expense_summary text                  -- 一次性支出
next_focus      text                  -- 下月重点
happy_moment    text                  -- 最开心的事
ai_summary      text                  -- AI 月报总结
status          text default 'draft'  -- "draft" | "published"
created_at      timestamptz default now()
updated_at      timestamptz default now()
```

---

## LocalStorage 键名规范（Alpha）

```
family-os:members          → Member[]
family-os:goals            → Goal[]
family-os:reminders        → Reminder[]
family-os:income           → Income[]
family-os:expense          → Expense[]
family-os:assetSnapshots   → AssetSnapshot[]    (月度资产快照，Sprint 2+)
family-os:companies        → Company[]          (公司信息，Sprint 3+)
family-os:vehicles         → Vehicle[]          (车辆信息，Sprint 3+)
family-os:documents        → FamilyDocument[]   (重要证件，Sprint 3+)
family-os:milestones       → Milestone[]        (家庭时间线，Sprint 3+)
family-os:monthlyReviews   → Timeline[]         (月度回顾，Sprint 4+，即 timeline 键)
family-os:settings         → Settings
```

> ⚠️ `family-os:assets`（旧 `Asset[]`）已废弃，不再写入。读取方优先使用 `family-os:assetSnapshots`。

---

## 类型定义位置

`/lib/types.ts` — 所有 TypeScript 接口定义
`/lib/mock.ts`  — Mock 数据（Alpha 阶段）
`/lib/storage.ts` — LocalStorage 读写封装
