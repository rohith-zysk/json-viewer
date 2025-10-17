import React, { useMemo } from "react";
import { JsonInput } from "./JsonInput";
import { JsonDisplay } from "./JsonDisplay";
import { JSON_VIEWER_CONSTANTS } from "@/utils/constants";
import { compareJsonObjects } from "@/utils/helpers";
import { cn } from "@/lib/utils";

interface CompareViewProps {
  leftInput: string;
  rightInput: string;
  leftParsed: unknown | null;
  rightParsed: unknown | null;
  onLeftInputChange: (value: string) => void;
  onRightInputChange: (value: string) => void;
  onCopyLeft: () => void;
  onCopyRight: () => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  leftInput,
  rightInput,
  leftParsed,
  rightParsed,
  onLeftInputChange,
  onRightInputChange,
  onCopyLeft,
  onCopyRight,
}) => {
  const comparison = useMemo(() => {
    if (leftParsed === null || rightParsed === null) {
      return { hasDifferences: false, differences: [] };
    }
    return compareJsonObjects(leftParsed, rightParsed);
  }, [leftParsed, rightParsed]);

  return (
    <div className="space-y-6">
      {/* Comparison Summary */}
      {leftParsed !== null && rightParsed !== null && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-3">
              <div className="w-2 h-2 bg-muted-foreground rounded-full" />
              Comparison Results
            </h3>
            <div
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                comparison.hasDifferences
                  ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                  : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
              )}
            >
              {comparison.hasDifferences
                ? `${comparison.differences.length} differences`
                : "No differences"}
            </div>
          </div>

          {comparison.hasDifferences && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {comparison.differences.slice(0, 10).map((diff, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      diff.type === "added" && "bg-green-500",
                      diff.type === "removed" && "bg-red-500",
                      diff.type === "modified" && "bg-yellow-500"
                    )}
                  />
                  <span className="font-mono text-muted-foreground">
                    {diff.path}
                  </span>
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      diff.type === "added" &&
                        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
                      diff.type === "removed" &&
                        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
                      diff.type === "modified" &&
                        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                    )}
                  >
                    {diff.type}
                  </span>
                </div>
              ))}
              {comparison.differences.length > 10 && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  ... and {comparison.differences.length - 10} more differences
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Side by side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <h4 className="font-medium text-foreground">Left JSON</h4>
          </div>
          <JsonInput
            value={leftInput}
            onChange={onLeftInputChange}
            placeholder={JSON_VIEWER_CONSTANTS.PLACEHOLDERS.COMPARE_LEFT}
            onCopy={onCopyLeft}
            copyButtonText={JSON_VIEWER_CONSTANTS.BUTTONS.COPY_LEFT}
            hasData={leftParsed !== null}
          />
          <JsonDisplay data={leftParsed} />
        </div>
        <div className="space-y-4 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <h4 className="font-medium text-foreground">Right JSON</h4>
          </div>
          <JsonInput
            value={rightInput}
            onChange={onRightInputChange}
            placeholder={JSON_VIEWER_CONSTANTS.PLACEHOLDERS.COMPARE_RIGHT}
            onCopy={onCopyRight}
            copyButtonText={JSON_VIEWER_CONSTANTS.BUTTONS.COPY_RIGHT}
            hasData={rightParsed !== null}
          />
          <JsonDisplay data={rightParsed} />
        </div>
      </div>
    </div>
  );
};
