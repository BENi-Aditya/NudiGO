import { MapPin } from "lucide-react";

type MetroBadgeProps = {
  station: string;
  line: "purple" | "green" | "blue";
  distanceKm: number;
  walkMinutes: number;
  className?: string;
};

const lineColors = {
  purple: "bg-[oklch(0.55_0.25_280)]",
  green: "bg-[oklch(0.65_0.25_145)]",
  blue: "bg-[oklch(0.55_0.25_240)]",
};

const lineTextColors = {
  purple: "text-white",
  green: "text-white",
  blue: "text-white",
};

export function MetroBadge({
  station,
  line,
  distanceKm,
  walkMinutes,
  className = "",
}: MetroBadgeProps) {
  const bgColor = lineColors[line];
  const textColor = lineTextColors[line];

  return (
    <div className={`nb-card nb-border space-y-2 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`nb-border nb-shadow-sm rounded-lg p-2 ${bgColor}`}>
          <MapPin className={`h-5 w-5 ${textColor}`} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-extrabold uppercase tracking-wide text-ink/50">
            Nearest Metro
          </p>
          <p className="mt-1 text-lg font-black">{station}</p>
          <p className="text-sm font-bold text-ink/70 capitalize">{line} Line</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div>
          <p className="font-black">{distanceKm} km</p>
          <p className="text-xs font-semibold text-ink/60">Distance</p>
        </div>
        <div className="h-8 w-px bg-ink/20" />
        <div>
          <p className="font-black">{walkMinutes} min</p>
          <p className="text-xs font-semibold text-ink/60">Walk time</p>
        </div>
      </div>
    </div>
  );
}
