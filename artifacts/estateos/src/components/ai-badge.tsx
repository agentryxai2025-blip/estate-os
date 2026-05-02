import React from "react";
import { Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AIBadgeProps {
  tip: string;
  size?: "sm" | "md";
  className?: string;
}

export function AIBadge({ tip, size = "sm", className = "" }: AIBadgeProps) {
  const isMd = size === "md";
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 cursor-help select-none shrink-0 ${isMd ? "px-2 py-0.5 text-[11px] font-medium" : "px-1.5 py-0.5"} ${className}`}
          >
            <Sparkles className={isMd ? "h-3 w-3" : "h-2.5 w-2.5"} />
            {isMd && <span>AI</span>}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-[260px] bg-[#1e1230] border border-purple-500/30 text-purple-100 text-xs leading-relaxed px-3 py-2"
        >
          <div className="flex gap-1.5 items-start">
            <Sparkles className="h-3 w-3 text-purple-400 mt-0.5 shrink-0" />
            <span>{tip}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
