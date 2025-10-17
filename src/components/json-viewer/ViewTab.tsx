import React from "react";
import { JsonInput } from "./JsonInput";
import { JsonToolbar } from "./JsonToolbar";
import { JSON_VIEWER_CONSTANTS } from "@/utils/constants";

interface ViewTabProps {
  jsonInput: string;
  parsedJson: unknown | null;
  onInputChange: (value: string) => void;
  onCopy: () => void;
  onFormat: () => void;
  onMinify: () => void;
  onValidate: () => void;
  onExport: () => void;
  onClear: () => void;
  onAutoFix: () => void;
  onQuickFix: () => void;
}

export const ViewTab: React.FC<ViewTabProps> = ({
  jsonInput,
  parsedJson,
  onInputChange,
  onCopy,
  onFormat,
  onMinify,
  onValidate,
  onExport,
  onClear,
  onAutoFix,
  onQuickFix,
}) => {
  const isValid = parsedJson !== null;

  return (
    <div className="space-y-6">
      <JsonInput
        value={jsonInput}
        onChange={onInputChange}
        placeholder={JSON_VIEWER_CONSTANTS.PLACEHOLDERS.VIEW}
        onCopy={onCopy}
        copyButtonText={JSON_VIEWER_CONSTANTS.BUTTONS.COPY_DISPLAYED}
        hasData={parsedJson !== null}
      />

      <JsonToolbar
        onFormat={onFormat}
        onMinify={onMinify}
        onValidate={onValidate}
        onExport={onExport}
        onClear={onClear}
        onAutoFix={onAutoFix}
        onQuickFix={onQuickFix}
        hasData={jsonInput.length > 0}
        isValid={isValid}
      />

      {/* Debug info */}
      {jsonInput && (
        <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
          <div className="font-medium text-foreground mb-2">Debug Info:</div>
          <div>Input length: {jsonInput.length} characters</div>
          <div>
            Parsed JSON: {parsedJson !== null ? "✅ Valid" : "❌ Invalid"}
          </div>
          {parsedJson !== null && (
            <div>
              Data type:{" "}
              {Array.isArray(parsedJson) ? "Array" : typeof parsedJson}
            </div>
          )}
          {parsedJson === null && jsonInput.trim() && (
            <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300">
              <div className="font-medium mb-1">Common JSON Issues:</div>
              <ul className="text-xs space-y-1">
                <li>
                  • Check for trailing commas (e.g., <code>{"},"}</code> should
                  be <code>{"}"}</code>)
                </li>
                <li>• Ensure all strings are properly quoted</li>
                <li>• Check for missing brackets or braces</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* JSON Display will be shown in the main component for proper layout */}
    </div>
  );
};
