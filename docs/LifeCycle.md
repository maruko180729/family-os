# Family OS — Development Life Cycle

---

## 开发流程（每个 Sprint）

```
1. 阅读 ProductDNA.md
2. 确认 Roadmap 当前版本目标
3. 开发
4. git commit
5. git push → Vercel 自动 Preview
6. 更新 ReleaseNotes.md
7. 更新 Review.md
8. 返回 Preview URL，等待 Product Review
9. 收到确认后进入下一 Sprint
```

**禁止在未收到 Review 确认前开始下一 Sprint。**

---

## Commit 规范

```
feat:     新功能
fix:      Bug 修复
refactor: 重构（不改变功能）
style:    样式调整
docs:     文档更新
chore:    工程配置（依赖、构建等）
```

示例：
```
feat: Alpha 0.5 月度回顾页面
fix: Hero Card 高度在小屏溢出
docs: 更新 Roadmap Alpha 0.6 计划
```

---

## 分支策略（当前 Alpha 阶段）

- `main` — 唯一分支，每次 push 触发 Vercel Preview
- Beta 阶段后引入 `main` / `dev` / `feature/*` 三分支结构

---

## Sprint 分类

| 类型 | 说明 |
|---|---|
| Foundation Sprint | 基础建设，不开发业务功能（如 Sprint 0） |
| Feature Sprint | 开发单一功能模块 |
| Polish Sprint | 视觉、动画、体验优化 |
| Fix Sprint | 专项 Bug 修复 |
| Data Sprint | 数据接入、Schema 变更 |

---

## 数据层升级路径

```
LocalStorage (Alpha)
    ↓
Supabase + 匿名 UUID (Alpha 0.7)
    ↓
Supabase + 邮箱认证 (Beta)
    ↓
Supabase + 多成员协作 (Beta 2.0)
```

---

## Review 标准

每个 Sprint 完成后，Product Review 需确认：

- [ ] Preview URL 可正常访问
- [ ] 新功能符合 ProductDNA 原则
- [ ] 没有多余功能被引入
- [ ] 设计风格一致
- [ ] 移动端显示正常
