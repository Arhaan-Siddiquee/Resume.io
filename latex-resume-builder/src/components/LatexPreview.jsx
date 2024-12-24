import React from "react";
import Latex from "react-latex-next"; // Install using `npm install react-latex-next`
import "katex/dist/katex.min.css"; // Install using `npm install katex`

const LatexPreview = ({ latexCode }) => {
  return (
    <div className="w-full h-[500px] bg-gray-800 text-white border border-purple-400 rounded-lg p-4 overflow-auto">
      <Latex>{latexCode || "Your LaTeX preview will appear here..."}</Latex>
    </div>
  );
};

export default LatexPreview;
