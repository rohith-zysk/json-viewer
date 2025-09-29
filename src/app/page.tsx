import JsonViewer from "@/components/json-viewer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">JSON Viewer</h1>
      <JsonViewer />
    </main>
  );
}
