import React from "react";
import { JsonStatistics as JsonStats } from "@/utils/types";
import { cn } from "@/lib/utils";

interface JsonStatisticsProps {
  statistics: JsonStats | null;
  className?: string;
}

export const JsonStatistics: React.FC<JsonStatisticsProps> = ({
  statistics,
  className,
}) => {
  if (!statistics) return null;

  const formatSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const stats = [
    {
      label: "Type",
      value: statistics.type,
      color: "gray",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
          />
        </svg>
      ),
    },
    {
      label: "Size",
      value: formatSize(statistics.size),
      color: "emerald",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    ...(statistics.keys !== undefined
      ? [
          {
            label: "Keys",
            value: statistics.keys.toString(),
            color: "purple",
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v2m6 0v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2"
                />
              </svg>
            ),
          },
        ]
      : []),
    ...(statistics.items !== undefined
      ? [
          {
            label: "Items",
            value: statistics.items.toString(),
            color: "orange",
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            ),
          },
        ]
      : []),
    {
      label: "Depth",
      value: statistics.depth.toString(),
      color: "gray",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={cn(
        "bg-card",
        "rounded-xl border border-border",
        "shadow-lg",
        "p-6",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 bg-muted-foreground rounded-full" />
        <h4 className="text-lg font-medium text-foreground">Statistics</h4>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg",
              "bg-muted",
              "border border-border"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  stat.color === "gray" &&
                    "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
                  stat.color === "emerald" &&
                    "bg-emerald-50 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400",
                  stat.color === "purple" &&
                    "bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
                  stat.color === "orange" &&
                    "bg-orange-50 dark:bg-orange-900 text-orange-600 dark:text-orange-400"
                )}
              >
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <span
              className={cn(
                "text-lg font-semibold",
                stat.color === "gray" && "text-gray-700 dark:text-gray-300",
                stat.color === "emerald" &&
                  "text-emerald-700 dark:text-emerald-300",
                stat.color === "purple" &&
                  "text-purple-700 dark:text-purple-300",
                stat.color === "orange" &&
                  "text-orange-700 dark:text-orange-300"
              )}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
