"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export default function JsonViewer() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedJson, setParsedJson] = useState(null);

  const handleParse = () => {
    try {
      let parsed;

      // Try JSON.parse directly
      parsed = JSON.parse(jsonInput);

      // If the parsed value is a string, try parsing it again
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      setParsedJson(parsed);
      toast.success("JSON Parsed Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Invalid JSON or String cannot be converted");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>JSON Viewer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste JSON here..."
            rows={8}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <Button onClick={handleParse}>Parse JSON</Button>
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
