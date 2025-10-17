import React from "react";
import { Button } from "@/components/ui/button";
import { JSON_VIEWER_CONSTANTS } from "@/utils/constants";
import { cn } from "@/lib/utils";

interface JsonToolbarProps {
  onFormat: () => void;
  onMinify: () => void;
  onValidate: () => void;
  onExport: () => void;
  onClear: () => void;
  onAutoFix: () => void;
  onQuickFix: () => void;
  hasData: boolean;
  isValid: boolean;
  className?: string;
}

export const JsonToolbar: React.FC<JsonToolbarProps> = ({
  onFormat,
  onMinify,
  onValidate,
  onExport,
  onClear,
  onAutoFix,
  onQuickFix,
  hasData,
  isValid,
  className,
}) => {
  const buttonClass =
    "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className={cn("flex items-center gap-3 flex-wrap", className)}>
      <button
        onClick={onFormat}
        disabled={!hasData}
        className={cn(
          buttonClass,
          "bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
          "hover:bg-emerald-100 dark:hover:bg-emerald-800",
          "border border-emerald-200 dark:border-emerald-800"
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
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        {JSON_VIEWER_CONSTANTS.BUTTONS.FORMAT}
      </button>

      <button
        onClick={onMinify}
        disabled={!hasData}
        className={cn(
          buttonClass,
          "bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
          "hover:bg-orange-100 dark:hover:bg-orange-800",
          "border border-orange-200 dark:border-orange-800"
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
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        {JSON_VIEWER_CONSTANTS.BUTTONS.MINIFY}
      </button>

      <button
        onClick={onValidate}
        disabled={!hasData}
        className={cn(
          buttonClass,
          isValid
            ? "bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-800 border-emerald-200 dark:border-emerald-800"
            : "bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800 border-red-200 dark:border-red-800"
        )}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isValid ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          )}
        </svg>
        {JSON_VIEWER_CONSTANTS.BUTTONS.VALIDATE}
      </button>

      <button
        onClick={onExport}
        disabled={!hasData}
        className={cn(
          buttonClass,
          "bg-muted text-muted-foreground",
          "hover:bg-muted/80",
          "border border-border"
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
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        {JSON_VIEWER_CONSTANTS.BUTTONS.EXPORT}
      </button>

      {!isValid && hasData && (
        <>
          <button
            onClick={onQuickFix}
            className={cn(
              buttonClass,
              "bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
              "hover:bg-purple-100 dark:hover:bg-purple-800",
              "border border-purple-200 dark:border-purple-800"
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Quick Fix
          </button>
          <button
            onClick={onAutoFix}
            className={cn(
              buttonClass,
              "bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
              "hover:bg-yellow-100 dark:hover:bg-yellow-800",
              "border border-yellow-200 dark:border-yellow-800"
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Auto-fix
          </button>
        </>
      )}

      <button
        onClick={onClear}
        disabled={!hasData}
        className={cn(
          buttonClass,
          "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
          "hover:bg-slate-100 dark:hover:bg-slate-700",
          "border border-slate-200 dark:border-slate-700"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        {JSON_VIEWER_CONSTANTS.BUTTONS.CLEAR}
      </button>
    </div>
  );
};
