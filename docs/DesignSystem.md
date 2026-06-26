# Family OS — Design System

---

## 颜色

| 名称 | Token | 值 | 用途 |
|---|---|---|---|
| 主色 | `--primary` | `oklch(0.48 0.09 155)` 深绿 | Hero Card、强调文字、进度条 |
| 背景 | `--background` | `oklch(0.98 0.005 80)` 米白 | 页面背景 |
| 卡片 | `--card` | `oklch(1 0 0)` 白色 | 所有卡片背景 |
| 边框 | `--border` | `oklch(0.91 0.01 80)` 暖灰 | 卡片边框 |
| 静默文字 | `--muted-foreground` | `oklch(0.55 0 0)` | 副标题、标签 |
| 强调背景 | `--accent` | `oklch(0.93 0.03 155)` 浅绿 | 状态徽章、图标底色 |

---

## 圆角

| 名称 | Tailwind | 像素 | 用途 |
|---|---|---|---|
| 主卡片 | `rounded-3xl` | 24px | Card、HeroCard |
| 内部元素 | `rounded-2xl` | 16px | 头像、标签框 |
| 小元素 | `rounded-xl` | 12px | 导航图标背景 |
| 胶囊 | `rounded-full` | — | 状态徽章、按钮 |

---

## 间距

| 名称 | Tailwind | 用途 |
|---|---|---|
| 页面顶部 | `pt-12` | 所有页面统一顶部留白 |
| 页面卡片间距 | `space-y-4` | 页面内卡片之间 |
| 卡片内边距 | `p-5` | 标准卡片 |
| Hero 卡片内边距 | `p-5` | HeroCard |

---

## 字体层级

| 名称 | 类 | 用途 |
|---|---|---|
| 眉题 | `text-xs font-medium text-muted-foreground uppercase tracking-wider` | 卡片区块标题 |
| 页面标题 | `text-2xl font-semibold` | 每页 H1 |
| 正文 | `text-sm leading-relaxed` | 卡片内容 |
| 数字大 | `text-3xl font-bold tracking-tight` | Hero 数字 |
| 数字小 | `text-xl font-bold` | 次要数字 |
| 副标注 | `text-xs text-muted-foreground` | 辅助说明 |

---

## 组件清单

### `HeroCard`
深绿背景，白色文字。用于每页最重要的单一指标。
```tsx
<HeroCard>
  <p className="text-sm text-white/70">家庭净资产</p>
  <p className="text-3xl font-bold tracking-tight">¥13,580,000</p>
</HeroCard>
```

### `Card`
白色背景，细边框，大圆角。通用内容卡片。
```tsx
<Card>
  <SectionLabel>资产分类</SectionLabel>
  {/* 内容 */}
</Card>
```

### `SectionLabel`
卡片内的区块小标题，统一样式。
```tsx
<SectionLabel>家庭顾问</SectionLabel>
```

### `AdvisorCard`
内置 SectionLabel + 正文段落，专用于 AI 顾问。
```tsx
<AdvisorCard>
  本月最大的进步是开始了 NISA 定投…
</AdvisorCard>
```

### `LineChart`
SVG 折线图，含渐变面积。用于资产趋势。
```tsx
<LineChart data={[1180, 1200, ...]} labels={["7月", ...]} color="white" height={72} />
```

---

## 动画规范

| 动画 | 实现 | 触发 |
|---|---|---|
| 页面切换 | `PageTransition`：opacity + translateY 0.25s ease | 路由变化 |
| 数字滚动 | `useCountUp(target, duration, delay)` | 页面挂载 |
| 点击反馈 | `active:scale-90 transition-transform duration-100` | 按钮/链接点击 |
| 进度条 | `transition: width 0.8s ease` | 页面渲染 |

---

## 禁止行为

- ❌ 在页面内写内联 `bg-card rounded-3xl p-5 border border-border`（使用 `<Card>`）
- ❌ 使用 `bg-primary rounded-3xl p-5`（使用 `<HeroCard>`）
- ❌ 自定义眉题样式（使用 `<SectionLabel>`）
- ❌ 使用深色模式相关 class（暂不支持 dark mode）
