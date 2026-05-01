import React from "react";
import { useTheme, type Theme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

const themes: { id: Theme; label: string; description: string; swatch: string; dot: string }[] = [
  {
    id: "night",
    label: "Night",
    description: "Deep navy, high contrast",
    swatch: "linear-gradient(135deg, #0d1117 50%, #1e3a5f 100%)",
    dot: "#3b82f6",
  },
  {
    id: "daylight",
    label: "Daylight",
    description: "Clean light, dark sidebar",
    swatch: "linear-gradient(135deg, #f5f8fa 50%, #1e293b 100%)",
    dot: "#2563eb",
  },
  {
    id: "terra",
    label: "Terra",
    description: "Warm sandstone, forest green",
    swatch: "linear-gradient(135deg, #f5f0e8 50%, #1a3d2e 100%)",
    dot: "#e8a020",
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="px-3 py-3 border-t" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: "hsl(var(--sidebar-foreground) / 0.45)" }}>
        Theme
      </p>
      <div className="flex gap-2">
        {themes.map((t) => {
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              title={`${t.label} — ${t.description}`}
              className={cn(
                "relative flex-1 rounded-md overflow-hidden transition-all duration-200 group",
                "border-2",
                isActive ? "scale-100 shadow-md" : "opacity-60 hover:opacity-90 hover:scale-[1.03]"
              )}
              style={{
                borderColor: isActive ? t.dot : "transparent",
                height: 36,
                background: t.swatch,
              }}
            >
              {isActive && (
                <span
                  className="absolute bottom-1 right-1 w-2 h-2 rounded-full ring-1 ring-white/50"
                  style={{ background: t.dot }}
                />
              )}
              <span className="sr-only">{t.label}</span>
            </button>
          );
        })}
      </div>
      <p className="text-xs mt-1.5 px-1 transition-all" style={{ color: "hsl(var(--sidebar-foreground) / 0.5)" }}>
        {themes.find((t) => t.id === theme)?.label} — {themes.find((t) => t.id === theme)?.description}
      </p>
    </div>
  );
}
