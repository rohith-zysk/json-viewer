import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { JSON_VIEWER_CONSTANTS } from "@/utils/constants";
import { cn } from "@/lib/utils";

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onCopy: () => void;
  disabled?: boolean;
  copyButtonText: string;
  hasData: boolean;
}

export const JsonInput: React.FC<JsonInputProps> = ({
  value,
  onChange,
  placeholder,
  onCopy,
  disabled = false,
  copyButtonText,
  hasData,
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder={placeholder}
          rows={JSON_VIEWER_CONSTANTS.STYLES.TEXTAREA_ROWS}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            JSON_VIEWER_CONSTANTS.STYLES.MAX_HEIGHT,
            "overflow-auto resize-none",
            "bg-background",
            "border border-border",
            "focus:border-ring focus:ring-2 focus:ring-ring/20",
            "rounded-xl transition-colors duration-200",
            "font-mono text-sm",
            "placeholder:text-muted-foreground"
          )}
        />
        {value && (
          <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-muted-foreground bg-background px-2 py-1 rounded border border-border">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {value.length.toLocaleString()} chars
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onCopy}
          disabled={disabled || !hasData}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg",
            "transition-colors duration-200",
            "bg-slate-900 dark:bg-white text-white dark:text-slate-900",
            "hover:bg-slate-800 dark:hover:bg-slate-100",
            "disabled:opacity-50 disabled:cursor-not-allowed"
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
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          {copyButtonText}
        </button>

        {hasData && (
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Valid JSON
          </div>
        )}
      </div>
    </div>
  );
};
