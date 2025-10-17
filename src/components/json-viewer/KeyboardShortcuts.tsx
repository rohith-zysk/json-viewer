import React, { useEffect } from "react";
import { toast } from "sonner";

interface KeyboardShortcutsProps {
  onFormat: () => void;
  onMinify: () => void;
  onValidate: () => void;
  onExport: () => void;
  onClear: () => void;
  onCopy: () => void;
  hasData: boolean;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onFormat,
  onMinify,
  onValidate,
  onExport,
  onClear,
  onCopy,
  hasData,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      // Ctrl/Cmd + Shift + F = Format
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "F") {
        e.preventDefault();
        if (hasData) {
          onFormat();
          toast.success("Formatted JSON (Ctrl+Shift+F)");
        }
      }

      // Ctrl/Cmd + Shift + M = Minify
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "M") {
        e.preventDefault();
        if (hasData) {
          onMinify();
          toast.success("Minified JSON (Ctrl+Shift+M)");
        }
      }

      // Ctrl/Cmd + Shift + V = Validate
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "V") {
        e.preventDefault();
        if (hasData) {
          onValidate();
        }
      }

      // Ctrl/Cmd + Shift + E = Export
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "E") {
        e.preventDefault();
        if (hasData) {
          onExport();
          toast.success("Exported JSON (Ctrl+Shift+E)");
        }
      }

      // Ctrl/Cmd + Shift + C = Copy
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        if (hasData) {
          onCopy();
          toast.success("Copied JSON (Ctrl+Shift+C)");
        }
      }

      // Ctrl/Cmd + Shift + Delete = Clear
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "Delete") {
        e.preventDefault();
        if (hasData) {
          onClear();
          toast.success("Cleared content (Ctrl+Shift+Delete)");
        }
      }

      // ? = Show help
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        toast.info("Keyboard shortcuts: Ctrl+Shift+F (Format), Ctrl+Shift+M (Minify), Ctrl+Shift+V (Validate), Ctrl+Shift+E (Export), Ctrl+Shift+C (Copy), Ctrl+Shift+Delete (Clear)");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onFormat, onMinify, onValidate, onExport, onClear, onCopy, hasData]);

  return null; // This component doesn't render anything
};
