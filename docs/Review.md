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
