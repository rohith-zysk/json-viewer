import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { JsonViewerHook, TabType } from "@/utils/types";
import { JSON_VIEWER_CONSTANTS, DEFAULT_TAB } from "@/utils/constants";
import {
  parseJsonInput,
  formatJsonToString,
  copyToClipboard,
  isEmptyInput,
  formatJsonString,
  minifyJsonString,
  validateJsonString,
  getJsonStatistics,
  fixJsonData,
  checkDataQuality,
  autoFixJson,
  quickFixJson,
} from "@/utils/helpers";

export const useJsonViewer = (): JsonViewerHook => {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedJson, setParsedJson] = useState<unknown | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>(DEFAULT_TAB);
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");
  const [leftParsed, setLeftParsed] = useState<unknown | null>(null);
  const [rightParsed, setRightParsed] = useState<unknown | null>(null);

  const formattedJson = useMemo(() => {
    return formatJsonToString(parsedJson);
  }, [parsedJson]);

  // Auto-parse main JSON input
  useEffect(() => {
    if (isEmptyInput(jsonInput)) {
      setParsedJson(null);
      return;
    }

    const parsed = parseJsonInput(jsonInput);
    setParsedJson(parsed);
  }, [jsonInput]);

  // Auto-parse left input for compare
  useEffect(() => {
    if (isEmptyInput(leftInput)) {
      setLeftParsed(null);
      return;
    }

    const parsed = parseJsonInput(leftInput);
    setLeftParsed(parsed);
  }, [leftInput]);

  // Auto-parse right input for compare
  useEffect(() => {
    if (isEmptyInput(rightInput)) {
      setRightParsed(null);
      return;
    }

    const parsed = parseJsonInput(rightInput);
    setRightParsed(parsed);
  }, [rightInput]);

  // Clear JSON input and preview when switching tabs
  useEffect(() => {
    // Clear the main JSON input and parsed data when switching tabs
    setJsonInput("");
    setParsedJson(null);
  }, [activeTab]);

  const handleCopy = async (): Promise<void> => {
    if (!formattedJson) return;

    const success = await copyToClipboard(formattedJson);
    if (success) {
      toast.success(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.COPY_SUCCESS);
    } else {
      toast.error(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.COPY_ERROR);
    }
  };

  const handleCopyLeft = async (): Promise<void> => {
    if (!leftParsed) return;

    const formatted = formatJsonToString(leftParsed);
    const success = await copyToClipboard(formatted);
    if (success) {
      toast.success(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.COPY_LEFT_SUCCESS);
    } else {
      toast.error(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.COPY_ERROR);
    }
  };

  const handleCopyRight = async (): Promise<void> => {
    if (!rightParsed) return;

    const formatted = formatJsonToString(rightParsed);
    const success = await copyToClipboard(formatted);
    if (success) {
      toast.success(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.COPY_RIGHT_SUCCESS);
    } else {
      toast.error(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.COPY_ERROR);
    }
  };

  const handleFormat = (): void => {
    if (!jsonInput.trim()) return;

    const formatted = formatJsonString(jsonInput);
    setJsonInput(formatted);
    toast.success(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.FORMAT_SUCCESS);
  };

  const handleMinify = (): void => {
    if (!jsonInput.trim()) return;

    const minified = minifyJsonString(jsonInput);
    setJsonInput(minified);
    toast.success(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.MINIFY_SUCCESS);
  };

  const handleValidate = (): void => {
    if (!jsonInput.trim()) return;

    const validation = validateJsonString(jsonInput);
    if (validation.isValid) {
      toast.success(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.VALIDATION_SUCCESS);
    } else {
      toast.error(
        `${JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.VALIDATION_ERROR}: ${validation.error}`
      );
    }
  };

  const handleExport = (): void => {
    if (!parsedJson) return;

    const dataStr = JSON.stringify(parsedJson, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "json-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.EXPORT_SUCCESS);
  };

  const handleClear = (): void => {
    setJsonInput("");
    toast.success(JSON_VIEWER_CONSTANTS.TOAST_MESSAGES.CLEAR_SUCCESS);
  };

  const handleFixData = (): void => {
    if (!jsonInput.trim()) return;

    const fixed = fixJsonData(jsonInput);
    setJsonInput(fixed);
    toast.success(
      "Data transformed! [object Object] strings are now more readable."
    );
  };

  const handleAutoFix = (): void => {
    if (!jsonInput.trim()) return;

    const fixed = autoFixJson(jsonInput);
    if (fixed !== jsonInput) {
      setJsonInput(fixed);
      toast.success("JSON auto-fixed! Common formatting issues resolved.");
    } else {
      toast.info("No common issues found to fix.");
    }
  };

  const handleQuickFix = (): void => {
    if (!jsonInput.trim()) return;

    const fixed = quickFixJson(jsonInput);
    if (fixed !== jsonInput) {
      setJsonInput(fixed);
      toast.success("JSON quick-fixed! Basic syntax issues resolved.");
    } else {
      toast.info("No basic issues found to fix.");
    }
  };

  const statistics = useMemo(() => {
    if (!parsedJson) return null;
    return getJsonStatistics(parsedJson);
  }, [parsedJson]);

  const dataQuality = useMemo(() => {
    if (!parsedJson) return null;
    return checkDataQuality(parsedJson);
  }, [parsedJson]);

  return {
    // State
    jsonInput,
    parsedJson,
    activeTab,
    leftInput,
    rightInput,
    leftParsed,
    rightParsed,
    formattedJson,
    statistics,
    dataQuality,

    // Actions
    setJsonInput,
    setActiveTab,
    setLeftInput,
    setRightInput,
    handleCopy,
    handleCopyLeft,
    handleCopyRight,
    handleFormat,
    handleMinify,
    handleValidate,
    handleExport,
    handleClear,
    handleFixData,
    handleAutoFix,
    handleQuickFix,
  };
};
