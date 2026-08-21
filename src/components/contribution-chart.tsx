import { useMemo } from "react";
import type { ProgressState } from "@/lib/progress";

interface ContributionChartProps {
  state: ProgressState;
}

export function ContributionChart({ state }: ContributionChartProps) {
  const weeks = useMemo(() => {
    const today = new Date();
    const weeks: { date: Date; xp: number }[][] = [];

    for (let i = 51; i >= 0; i--) {
      const week: { date: Date; xp: number }[] = [];
      for (let j = 0; j < 7; j++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * 7 + j));

        const key = date.toISOString().split("T")[0];
        const dayXp = state.daily[key]?.xp ?? 0;
        week.push({ date, xp: dayXp });
      }
      weeks.push(week);
    }

    return weeks;
  }, [state.daily]);

  const getColor = (xp: number) => {
    if (xp === 0) return "bg-ink/5";
    if (xp < 30) return "bg-yellow-200";
    if (xp < 60) return "bg-yellow-400";
    if (xp < 100) return "bg-orange-400";
    return "bg-primary";
  };

  const totalXp = Object.values(state.daily).reduce((sum, day) => sum + day.xp, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-black">Practice Heatmap</h3>
        <p className="text-xs font-bold text-ink/60">{totalXp.toLocaleString()} XP</p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`h-3 w-3 rounded transition-all hover:scale-125 ${getColor(day.xp)}`}
                  title={`${day.date.toDateString()}: ${day.xp} XP`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold text-ink/60">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 rounded bg-ink/5" />
          <div className="h-2.5 w-2.5 rounded bg-yellow-200" />
          <div className="h-2.5 w-2.5 rounded bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded bg-orange-400" />
          <div className="h-2.5 w-2.5 rounded bg-primary" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
