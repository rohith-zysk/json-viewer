import React from "react";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import { JSON_VIEWER_CONSTANTS } from "@/utils/constants";
import { cn } from "@/lib/utils";

interface JsonDisplayProps {
  data: unknown | null;
  className?: string;
}

export const JsonDisplay: React.FC<JsonDisplayProps> = ({
  data,
  className,
}) => {
  if (data === null || !(typeof data === "object" || Array.isArray(data))) {
    return null;
  }

  // Keep original darkStyles but override only the background to match our theme
  const customStyles = {
    ...darkStyles,
    container: "bg-card", // Only override the background color
  };

  return (
    <div
      className={cn(
        JSON_VIEWER_CONSTANTS.STYLES.MAX_HEIGHT,
        "overflow-auto rounded-xl",
        "bg-card",
        "border border-border",
        "shadow-lg",
        className
      )}
    >
      <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-3">
            <div className="w-2 h-2 bg-muted-foreground rounded-full" />
            JSON Preview
          </h3>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground rounded-full border border-border">
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
              {Array.isArray(data) ? "Array" : "Object"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground rounded-full border border-border">
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
              {Array.isArray(data)
                ? `${data.length} items`
                : `${Object.keys(data as object).length} keys`}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-card rounded-lg p-4 border border-border">
          <JsonView
            data={data as object | Array<unknown>}
            shouldExpandNode={allExpanded}
            style={customStyles}
          />
        </div>
      </div>
    </div>
  );
};
