import React, { useState } from "react";
import LatexEditor from "./components/LatexEditor";
import LatexPreview from "./components/LatexPreview";
import DownloadButton from "./components/DownloadButton";

const App = () => {
  const [latexCode, setLatexCode] = useState(""); // State for LaTeX code

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">
        LaTeX Resume Builder
      </h1>
      <div className="flex gap-6">
        {/* LaTeX Editor */}
        <LatexEditor value={latexCode} onChange={(e) => setLatexCode(e.target.value)} />
        {/* LaTeX Preview */}
        <LatexPreview latexCode={latexCode} />
      </div>
      <div className="text-center mt-6">
        {/* Download Button */}
        <DownloadButton latexCode={latexCode} />
      </div>
    </div>
  );
};

export default App;
