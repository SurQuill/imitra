import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ScriptGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setScript(data.script);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
  };

  const handleDownload = () => {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "terraform_script.tf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Terraform Script Generator</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={3}
        placeholder="Describe what you want to deploy..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {script && (
        <div className="mt-6">
          <div className="flex justify-end space-x-2 mb-2">
            <button onClick={handleCopy} className="bg-gray-500 text-white px-3 py-1 rounded">
              📋 Copy
            </button>
            <button onClick={handleDownload} className="bg-green-600 text-white px-3 py-1 rounded">
              💾 Download .tf
            </button>
          </div>
          <SyntaxHighlighter language="hcl" style={atomDark}>
            {script}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default ScriptGenerator;
