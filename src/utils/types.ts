export type TabType = "view" | "compare";

export interface JsonViewerState {
  jsonInput: string;
  parsedJson: unknown | null;
  activeTab: TabType;
  leftInput: string;
  rightInput: string;
  leftParsed: unknown | null;
  rightParsed: unknown | null;
}

export interface JsonViewerActions {
  setJsonInput: (value: string) => void;
  setActiveTab: (tab: TabType) => void;
  setLeftInput: (value: string) => void;
  setRightInput: (value: string) => void;
  handleCopy: () => Promise<void>;
  handleCopyLeft: () => Promise<void>;
  handleCopyRight: () => Promise<void>;
  handleFormat: () => void;
  handleMinify: () => void;
  handleValidate: () => void;
  handleExport: () => void;
  handleClear: () => void;
  handleFixData: () => void;
  handleAutoFix: () => void;
  handleQuickFix: () => void;
}

export interface JsonStatistics {
  type: string;
  size: number;
  keys?: number;
  items?: number;
  depth: number;
}

export interface DataQuality {
  hasObjectObjectStrings: boolean;
  hasEmptyStrings: boolean;
  hasNullValues: boolean;
  issues: string[];
}

export interface JsonViewerHook extends JsonViewerState, JsonViewerActions {
  formattedJson: string;
  statistics: JsonStatistics | null;
  dataQuality: DataQuality | null;
}
