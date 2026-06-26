"use client";

interface LineChartProps {
  data: number[];
  labels?: string[];
  color?: string;
  height?: number;
}

export default function LineChart({
  data,
  labels,
  color = "white",
  height = 72,
}: LineChartProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 300;
  const padX = 0;
  const padY = 8;
  const chartH = height - padY * 2;
  const chartW = width - padX * 2;
  const step = chartW / (data.length - 1);

  const points = data.map((v, i) => ({
    x: padX + i * step,
    y: padY + chartH - ((v - min) / range) * chartH,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  // Area fill path
  const areaD =
    pathD +
    ` L ${points[points.length - 1].x.toFixed(1)} ${(padY + chartH).toFixed(1)}` +
    ` L ${points[0].x.toFixed(1)} ${(padY + chartH).toFixed(1)} Z`;

  const lastPoint = points[points.length - 1];

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <path d={areaD} fill="url(#areaGrad)" />
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Last point dot */}
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r="3"
          fill={color}
          opacity="0.9"
        />
      </svg>
      {/* X-axis labels */}
      {labels && (
        <div className="flex justify-between mt-1">
          {[labels[0], labels[Math.floor(labels.length / 2)], labels[labels.length - 1]].map(
            (l, i) => (
              <span key={i} className="text-[10px] text-white/50">
                {l}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}
