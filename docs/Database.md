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

### `asset` — 资产条目

```sql
id          uuid primary key default gen_random_uuid()
name        text not null     -- "应急资金" | "NISA" | "国内银行" 等
category    text not null     -- "emergency" | "investment" | "domestic" | "startup" | "company" | "liability"
amount      bigint not null   -- 日元（整数）
currency    text default 'JPY'
note        text
month       text not null     -- "2025-06" 格式，每月快照
created_at  timestamptz default now()
```

### `income` — 收入记录（月度）

```sql
id          uuid primary key default gen_random_uuid()
month       text not null     -- "2025-06"
source      text not null     -- "salary" | "business" | "investment" | "other"
label       text              -- 显示名称
amount      bigint not null
member_id   uuid references member(id)
note        text
created_at  timestamptz default now()
```

### `expense` — 支出记录（月度，仅一次性大额）

```sql
id          uuid primary key default gen_random_uuid()
month       text not null
label       text not null
amount      bigint not null
category    text              -- "medical" | "travel" | "home" | "education" | "other"
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

### `company` — 公司/事业体信息

```sql
id          uuid primary key default gen_random_uuid()
name        text not null
type        text              -- "法人" | "個人事業主"
owner_id    uuid references member(id)
monthly_revenue bigint
note        text
created_at  timestamptz default now()
```

### `vehicle` — 车辆资产（预留）

```sql
id          uuid primary key default gen_random_uuid()
name        text not null
maker       text
model       text
year        int
purchase_price bigint
current_value  bigint
note        text
created_at  timestamptz default now()
```

### `reminder` — 提醒事项

```sql
id          uuid primary key default gen_random_uuid()
title       text not null
due_date    date
category    text              -- "tax" | "insurance" | "medical" | "visa" | "other"
status      text default 'pending' -- "pending" | "done" | "snoozed"
related_goal_id uuid references goal(id)
note        text
created_at  timestamptz default now()
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
family-os:members        → Member[]
family-os:assets         → Asset[]           (当月快照)
family-os:goals          → Goal[]
family-os:reminders      → Reminder[]
family-os:timeline       → Timeline[]        (所有月度回顾)
family-os:income         → Income[]
family-os:expense        → Expense[]
family-os:settings       → Settings
```

---

## 类型定义位置

`/lib/types.ts` — 所有 TypeScript 接口定义
`/lib/mock.ts`  — Mock 数据（Alpha 阶段）
`/lib/storage.ts` — LocalStorage 读写封装
