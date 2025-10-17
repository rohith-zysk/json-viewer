import React from "react";
import { Button } from "@/components/ui/button";
import { JSON_VIEWER_CONSTANTS } from "@/utils/constants";
import { TabType } from "@/utils/types";
import { cn } from "@/lib/utils";

interface TabButtonsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabButtons: React.FC<TabButtonsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex p-1 bg-muted rounded-xl border border-border">
        <button
          onClick={() => onTabChange("view")}
          className={cn(
            "px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200",
            "flex items-center gap-2 min-w-[120px] justify-center",
            activeTab === "view"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          {JSON_VIEWER_CONSTANTS.BUTTONS.VIEW}
        </button>

        <button
          onClick={() => onTabChange("compare")}
          className={cn(
            "px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200",
            "flex items-center gap-2 min-w-[120px] justify-center",
            activeTab === "compare"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          {JSON_VIEWER_CONSTANTS.BUTTONS.COMPARE}
        </button>
      </div>
    </div>
  );
};
