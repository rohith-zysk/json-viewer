import { JSON_VIEWER_CONSTANTS } from "./constants";

/**
 * Preprocesses JSON input by replacing common placeholder tokens and fixing common issues
 */
export const preprocessJsonInput = (input: string): string => {
  let processed = input
    .replace(
      JSON_VIEWER_CONSTANTS.REGEX_PATTERNS.OBJECT_OBJECT,
      JSON_VIEWER_CONSTANTS.REPLACEMENTS.OBJECT_MARKER
    )
    .replace(
      JSON_VIEWER_CONSTANTS.REGEX_PATTERNS.OBJECT,
      JSON_VIEWER_CONSTANTS.REPLACEMENTS.OBJECT_MARKER
    );

  // Fix trailing commas in objects and arrays
  processed = processed
    // Remove trailing commas in objects: }, -> }
    .replace(/,(\s*})/g, "$1")
    // Remove trailing commas in arrays: ], -> ]
    .replace(/,(\s*])/g, "$1")
    // Remove trailing commas with newlines
    .replace(/,(\s*\n\s*})/g, "$1")
    .replace(/,(\s*\n\s*])/g, "$1");

  return processed;
};

/**
 * Attempts to parse JSON input with fallback to JavaScript evaluation
 */
export const parseJsonInput = (input: string): unknown => {
  const preprocessed = preprocessJsonInput(input);
  let value: unknown = null;

  // 1) Try strict JSON first
  try {
    value = JSON.parse(preprocessed);
    if (typeof value === "string") {
      // Handle double-encoded JSON strings
      value = JSON.parse(value);
    }
  } catch {
    // 2) Fallbacks for cases like [object Object] or JS object literals
    // Attempt to evaluate as a JS expression safely within a Function scope
    // This allows inputs like {a:1} or [1,2,3] to be parsed.
    try {
      // Wrap in parentheses to correctly evaluate object literals
      // Note: This evaluates user-provided input in the browser context.
      // In this app it is user-initiated and client-side only.
      const evaluate = new Function(`return (${preprocessed})`);
      value = evaluate();
    } catch {
      return null;
    }
  }

  try {
    // Normalize by JSON stringify then parse (removes functions, symbols, etc.)
    return JSON.parse(JSON.stringify(value));
  } catch {
    return null;
  }
};

/**
 * Formats JSON object to string with proper indentation
 */
export const formatJsonToString = (json: unknown): string => {
  if (json == null) return "";
  try {
    return JSON.stringify(json, null, 2);
  } catch {
    return "";
  }
};

/**
 * Copies text to clipboard with error handling
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Checks if input is empty or whitespace only
 */
export const isEmptyInput = (input: string): boolean => {
  return !input.trim();
};

/**
 * Formats JSON string with proper indentation
 */
export const formatJsonString = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return jsonString;
  }
};

/**
 * Attempts to auto-fix common JSON formatting issues
 */
export const autoFixJson = (jsonString: string): string => {
  try {
    // First try to parse as-is
    JSON.parse(jsonString);
    return jsonString; // Already valid
  } catch {
    // Try to fix common issues
    let fixed = jsonString
      // Remove comments first (they can interfere with comma detection)
      .replace(/\/\/.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove trailing commas in objects (more comprehensive)
      .replace(/,(\s*})/g, "$1")
      // Remove trailing commas in arrays
      .replace(/,(\s*])/g, "$1")
      // Remove trailing commas before closing braces (handles nested cases)
      .replace(/,(\s*\n\s*})/g, "$1")
      // Remove trailing commas before closing brackets
      .replace(/,(\s*\n\s*])/g, "$1")
      // Fix single quotes to double quotes (basic cases)
      .replace(/'/g, '"');

    // Try multiple passes to handle nested trailing commas and missing commas
    let previousFixed = "";
    let attempts = 0;
    const maxAttempts = 5;

    while (fixed !== previousFixed && attempts < maxAttempts) {
      previousFixed = fixed;
      attempts++;

      // Remove trailing commas
      fixed = fixed.replace(/,(\s*})/g, "$1").replace(/,(\s*])/g, "$1");

      // Fix missing commas between array elements (quoted strings)
      fixed = fixed
        .replace(/("[\w\s\[\]()]+")\s*\n\s*("[\w\s\[\]()]+")/g, "$1,\n    $2")
        .replace(/("[\w\s\[\]()]+")\s*("[\w\s\[\]()]+")/g, "$1, $2");

      // Try to parse after each fix attempt
      try {
        JSON.parse(fixed);
        return fixed; // Successfully fixed
      } catch {
        // Continue trying to fix
        continue;
      }
    }

    try {
      // Try to parse the fixed version
      JSON.parse(fixed);
      return fixed;
    } catch {
      // If still invalid, return original
      return jsonString;
    }
  }
};

/**
 * Minifies JSON string by removing whitespace
 */
export const minifyJsonString = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed);
  } catch {
    return jsonString;
  }
};

/**
 * Validates JSON string and returns validation result
 */
export const validateJsonString = (
  jsonString: string
): { isValid: boolean; error?: string } => {
  try {
    JSON.parse(jsonString);
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid JSON format",
    };
  }
};

/**
 * Gets JSON statistics
 */
export const getJsonStatistics = (
  data: unknown
): {
  type: string;
  size: number;
  keys?: number;
  items?: number;
  depth: number;
} => {
  const jsonString = JSON.stringify(data);
  const size = jsonString.length;

  if (data === null) {
    return { type: "null", size, depth: 0 };
  }

  if (Array.isArray(data)) {
    return {
      type: "array",
      size,
      items: data.length,
      depth: getDepth(data),
    };
  }

  if (typeof data === "object") {
    return {
      type: "object",
      size,
      keys: Object.keys(data as object).length,
      depth: getDepth(data),
    };
  }

  return {
    type: typeof data,
    size,
    depth: 0,
  };
};

/**
 * Calculates the depth of a JSON object/array
 */
const getDepth = (obj: unknown, currentDepth = 0): number => {
  if (obj === null || typeof obj !== "object") {
    return currentDepth;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return currentDepth;
    return Math.max(...obj.map((item) => getDepth(item, currentDepth + 1)));
  }

  const keys = Object.keys(obj as object);
  if (keys.length === 0) return currentDepth;

  return Math.max(
    ...keys.map((key) =>
      getDepth((obj as Record<string, unknown>)[key], currentDepth + 1)
    )
  );
};

/**
 * Transforms JSON data to make [object Object] strings more readable
 */
export const fixJsonData = (jsonString: string): string => {
  try {
    // First, try to parse the JSON
    const parsed = JSON.parse(jsonString);

    // Function to recursively transform [object Object] strings
    const transformObjectStrings = (obj: unknown): unknown => {
      if (typeof obj === "string") {
        // Check if it's a [object Object] string
        if (obj === "[object Object]") {
          return {
            _note:
              "This was '[object Object]' - original object data was converted to string",
            _type: "converted_object",
            _value: "[object Object]",
          };
        }
        // Check if it looks like it might be a JSON string
        if (obj.startsWith("{") && obj.endsWith("}")) {
          try {
            return JSON.parse(obj);
          } catch {
            return obj;
          }
        }
        if (obj.startsWith("[") && obj.endsWith("]")) {
          try {
            return JSON.parse(obj);
          } catch {
            return obj;
          }
        }
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj.map(transformObjectStrings);
      }

      if (obj && typeof obj === "object") {
        const transformed: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
          transformed[key] = transformObjectStrings(value);
        }
        return transformed;
      }

      return obj;
    };

    const transformed = transformObjectStrings(parsed);
    return JSON.stringify(transformed, null, 2);
  } catch {
    return jsonString;
  }
};

/**
 * Quick fix for the most common JSON issues
 */
export const quickFixJson = (jsonString: string): string => {
  return (
    jsonString
      // Remove comments first (they can interfere with comma detection)
      .replace(/\/\/.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove trailing commas (more comprehensive patterns)
      .replace(/,(\s*})/g, "$1")
      .replace(/,(\s*])/g, "$1")
      .replace(/,(\s*\n\s*})/g, "$1")
      .replace(/,(\s*\n\s*])/g, "$1")
      // Add missing commas between array elements
      .replace(/("[\w\s\[\]()]+")\s*\n\s*("[\w\s\[\]()]+")/g, "$1,\n    $2")
      .replace(/("[\w\s\[\]()]+")\s*("[\w\s\[\]()]+")/g, "$1, $2")
      // Fix single quotes
      .replace(/'/g, '"')
  );
};

/**
 * Compare two JSON objects and return differences
 */
export const compareJsonObjects = (
  left: unknown,
  right: unknown
): {
  hasDifferences: boolean;
  differences: Array<{
    path: string;
    type: "added" | "removed" | "modified";
    leftValue?: unknown;
    rightValue?: unknown;
  }>;
} => {
  const differences: Array<{
    path: string;
    type: "added" | "removed" | "modified";
    leftValue?: unknown;
    rightValue?: unknown;
  }> = [];

  const compare = (leftObj: unknown, rightObj: unknown, path = "") => {
    // Both are null/undefined
    if (leftObj === null && rightObj === null) return;
    if (leftObj === undefined && rightObj === undefined) return;

    // One is null/undefined, other is not
    if (leftObj === null || leftObj === undefined) {
      differences.push({
        path,
        type: "added",
        rightValue: rightObj,
      });
      return;
    }
    if (rightObj === null || rightObj === undefined) {
      differences.push({
        path,
        type: "removed",
        leftValue: leftObj,
      });
      return;
    }

    // Different types
    if (typeof leftObj !== typeof rightObj) {
      differences.push({
        path,
        type: "modified",
        leftValue: leftObj,
        rightValue: rightObj,
      });
      return;
    }

    // Both are objects
    if (
      typeof leftObj === "object" &&
      typeof rightObj === "object" &&
      !Array.isArray(leftObj) &&
      !Array.isArray(rightObj)
    ) {
      const leftKeys = Object.keys(leftObj as Record<string, unknown>);
      const rightKeys = Object.keys(rightObj as Record<string, unknown>);
      const allKeys = new Set([...leftKeys, ...rightKeys]);

      for (const key of allKeys) {
        const newPath = path ? `${path}.${key}` : key;
        const leftValue = (leftObj as Record<string, unknown>)[key];
        const rightValue = (rightObj as Record<string, unknown>)[key];

        if (!(key in (leftObj as Record<string, unknown>))) {
          differences.push({
            path: newPath,
            type: "added",
            rightValue,
          });
        } else if (!(key in (rightObj as Record<string, unknown>))) {
          differences.push({
            path: newPath,
            type: "removed",
            leftValue,
          });
        } else {
          compare(leftValue, rightValue, newPath);
        }
      }
      return;
    }

    // Both are arrays
    if (Array.isArray(leftObj) && Array.isArray(rightObj)) {
      const maxLength = Math.max(leftObj.length, rightObj.length);
      for (let i = 0; i < maxLength; i++) {
        const newPath = `${path}[${i}]`;
        const leftValue = leftObj[i];
        const rightValue = rightObj[i];

        if (i >= leftObj.length) {
          differences.push({
            path: newPath,
            type: "added",
            rightValue,
          });
        } else if (i >= rightObj.length) {
          differences.push({
            path: newPath,
            type: "removed",
            leftValue,
          });
        } else {
          compare(leftValue, rightValue, newPath);
        }
      }
      return;
    }

    // Primitive values
    if (leftObj !== rightObj) {
      differences.push({
        path,
        type: "modified",
        leftValue: leftObj,
        rightValue: rightObj,
      });
    }
  };

  compare(left, right);

  return {
    hasDifferences: differences.length > 0,
    differences,
  };
};

/**
 * Checks if JSON contains common data quality issues
 */
export const checkDataQuality = (
  data: unknown
): {
  hasObjectObjectStrings: boolean;
  hasEmptyStrings: boolean;
  hasNullValues: boolean;
  issues: string[];
} => {
  const jsonString = JSON.stringify(data);
  const issues: string[] = [];

  const hasObjectObjectStrings = jsonString.includes("[object Object]");
  const hasEmptyStrings = jsonString.includes('""');
  const hasNullValues = jsonString.includes("null");

  if (hasObjectObjectStrings) {
    issues.push(
      'Contains "[object Object]" strings - likely serialization issues'
    );
  }
  if (hasEmptyStrings) {
    issues.push("Contains empty string values");
  }
  if (hasNullValues) {
    issues.push("Contains null values");
  }

  return {
    hasObjectObjectStrings,
    hasEmptyStrings,
    hasNullValues,
    issues,
  };
};
