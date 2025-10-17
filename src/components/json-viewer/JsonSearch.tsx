import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JsonSearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  className?: string;
}

export const JsonSearch: React.FC<JsonSearchProps> = ({
  onSearch,
  onClear,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onClear();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search in JSON..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className={cn(
            "w-full px-3 py-2 pr-10 text-sm",
            "border border-border/50 rounded-md",
            "bg-background/50 backdrop-blur-sm",
            "focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50",
            "transition-all duration-200"
          )}
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleSearch}
        disabled={!searchQuery.trim()}
        className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 dark:from-gray-900 dark:to-gray-800 dark:hover:from-gray-800 dark:hover:to-gray-700 border-gray-200 dark:border-gray-700"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search
      </Button>

      {searchQuery && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 dark:from-red-950 dark:to-rose-950 dark:hover:from-red-900 dark:hover:to-rose-900 border-red-200 dark:border-red-800"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      )}
    </div>
  );
};
