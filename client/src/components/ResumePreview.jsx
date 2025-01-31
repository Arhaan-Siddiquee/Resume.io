import React from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

const ResumePreview = ({ content }) => {
  return (
    <div id="resume-preview" className="p-4 overflow-auto h-full bg-white">
      <Latex>{content}</Latex>
    </div>
  );
};

export default ResumePreview;
