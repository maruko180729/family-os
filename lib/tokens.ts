// Design Tokens — single source of truth for Family OS
// All Tailwind classes should reference these semantic names

export const tokens = {
  // Colors (map to CSS vars in globals.css)
  color: {
    brand: "text-primary",
    brandBg: "bg-primary",
    surface: "bg-card",
    base: "bg-background",
    muted: "text-muted-foreground",
    border: "border-border",
    accent: "bg-accent",
    accentText: "text-accent-foreground",
    danger: "text-destructive",
    warning: "text-amber-500",
    success: "text-primary",
  },

  // Radius
  radius: {
    card: "rounded-3xl",       // 24px — main cards
    inner: "rounded-2xl",      // 16px — inner elements, tags
    pill: "rounded-full",      // pill buttons, badges
    sm: "rounded-xl",          // 12px — small chips
  },

  // Spacing (vertical rhythm)
  space: {
    pageTop: "pt-12",
    pageGap: "space-y-4",
    cardPad: "p-5",
    heroPad: "p-5",
    sectionGap: "mb-3",
  },

  // Typography
  text: {
    eyebrow: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
    heading: "text-2xl font-semibold text-foreground",
    subheading: "text-base font-semibold text-foreground",
    body: "text-sm text-foreground leading-relaxed",
    caption: "text-xs text-muted-foreground",
    metric: "text-3xl font-bold tracking-tight",
    metricSm: "text-xl font-bold tracking-tight",
    heroEyebrow: "text-sm text-white/70",
    heroMetric: "text-3xl font-bold tracking-tight text-white",
    heroCaption: "text-sm text-white/75",
  },

  // Shadow
  shadow: {
    card: "shadow-sm",
    hero: "",
    none: "",
  },
} as const;
