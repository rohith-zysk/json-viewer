"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export default function JsonViewer() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedJson, setParsedJson] = useState(null);
  const [activeTab, setActiveTab] = useState<"view" | "compare">("view");

  // Compare tab state
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");
  const [leftParsed, setLeftParsed] = useState(null);
  const [rightParsed, setRightParsed] = useState(null);
  const formattedJson = useMemo(() => {
    if (parsedJson == null) return "";
    try {
      return JSON.stringify(parsedJson, null, 2);
    } catch {
      return "";
    }
  }, [parsedJson]);

  useEffect(() => {
    const input = jsonInput.trim();
    if (!input) {
      setParsedJson(null);
      return;
    }

    try {
      // Replace placeholder tokens like [Object] and [object Object] with a visible marker string
      // so they render as "[Object]" rather than empty objects
      const preprocessed = input
        .replace(/\[object Object\]/gi, '"[Object]"')
        .replace(/\[Object\]/g, '"[Object]"');

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
          setParsedJson(null);
          return;
        }
      }

      // Normalize by JSON stringify then parse (removes functions, symbols, etc.)
      const normalized = JSON.parse(JSON.stringify(value));
      setParsedJson(normalized);
    } catch {
      setParsedJson(null);
    }
  }, [jsonInput]);

  // Auto-parse for compare inputs
  useEffect(() => {
    const input = leftInput.trim();
    if (!input) {
      setLeftParsed(null);
      return;
    }
    try {
      const preprocessed = input
        .replace(/\[object Object\]/gi, '"[Object]"')
        .replace(/\[Object\]/g, '"[Object]"');
      let value: unknown = null;
      try {
        value = JSON.parse(preprocessed);
        if (typeof value === "string") value = JSON.parse(value);
      } catch {
        try {
          const evaluate = new Function(`return (${preprocessed})`);
          value = evaluate();
        } catch {
          setLeftParsed(null);
          return;
        }
      }
      const normalized = JSON.parse(JSON.stringify(value));
      setLeftParsed(normalized);
    } catch {
      setLeftParsed(null);
    }
  }, [leftInput]);

  useEffect(() => {
    const input = rightInput.trim();
    if (!input) {
      setRightParsed(null);
      return;
    }
    try {
      const preprocessed = input
        .replace(/\[object Object\]/gi, '"[Object]"')
        .replace(/\[Object\]/g, '"[Object]"');
      let value: unknown = null;
      try {
        value = JSON.parse(preprocessed);
        if (typeof value === "string") value = JSON.parse(value);
      } catch {
        try {
          const evaluate = new Function(`return (${preprocessed})`);
          value = evaluate();
        } catch {
          setRightParsed(null);
          return;
        }
      }
      const normalized = JSON.parse(JSON.stringify(value));
      setRightParsed(normalized);
    } catch {
      setRightParsed(null);
    }
  }, [rightInput]);

  const handleCopy = async () => {
    if (!formattedJson) return;
    try {
      await navigator.clipboard.writeText(formattedJson);
      toast.success("Formatted JSON copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleCopyLeft = async () => {
    if (!leftParsed) return;
    try {
      const formatted = JSON.stringify(leftParsed, null, 2);
      await navigator.clipboard.writeText(formatted);
      toast.success("Left JSON copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleCopyRight = async () => {
    if (!rightParsed) return;
    try {
      const formatted = JSON.stringify(rightParsed, null, 2);
      await navigator.clipboard.writeText(formatted);
      toast.success("Right JSON copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className={`${activeTab === "compare" ? "max-w-full" : "max-w-4xl"} mx-auto p-6 space-y-4`}>
      <Card>
        <CardHeader>
          <CardTitle>JSON Viewer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 border-b pb-2">
            <Button
              variant={activeTab === "view" ? "default" : "outline"}
              onClick={() => setActiveTab("view")}
            >
              View
            </Button>
            <Button
              variant={activeTab === "compare" ? "default" : "outline"}
              onClick={() => setActiveTab("compare")}
            >
              Compare
            </Button>
          </div>

          {activeTab === "view" && (
            <>
              <Textarea
                placeholder="Paste JSON here..."
                rows={8}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="max-h-[70vh] overflow-auto resize-none"
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleCopy} disabled={!parsedJson}>
                  Copy displayed JSON
                </Button>
              </div>
            </>
          )}

          {activeTab === "compare" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div className="space-y-2 min-w-0">
                <Textarea
                  placeholder="Left JSON..."
                  rows={8}
                  value={leftInput}
                  onChange={(e) => setLeftInput(e.target.value)}
                  className="max-h-[70vh] overflow-auto resize-none"
                />
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleCopyLeft} disabled={!leftParsed}>
                    Copy Left JSON
                  </Button>
                </div>
                {leftParsed && (
                  <div className="max-h-[70vh] overflow-auto border rounded-md p-2">
                    <JsonView
                      data={leftParsed}
                      shouldExpandNode={allExpanded}
                      style={darkStyles}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2 min-w-0">
                <Textarea
                  placeholder="Right JSON..."
                  rows={8}
                  value={rightInput}
                  onChange={(e) => setRightInput(e.target.value)}
                  className="max-h-[70vh] overflow-auto resize-none"
                />
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleCopyRight} disabled={!rightParsed}>
                    Copy Right JSON
                  </Button>
                </div>
                {rightParsed && (
                  <div className="max-h-[70vh] overflow-auto border rounded-md p-2">
                    <JsonView
                      data={rightParsed}
                      shouldExpandNode={allExpanded}
                      style={darkStyles}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {parsedJson && (
        <JsonView
          data={parsedJson}
          shouldExpandNode={allExpanded}
          style={darkStyles}
        />
      )}
    </div>
  );
}
