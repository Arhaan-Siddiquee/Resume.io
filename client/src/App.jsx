import React, { useState } from "react";
import SplitPane from "react-split-pane";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";
import PdfExport from "./components/PdfExport";

const initialLatex = `
\\documentclass{article}
\\usepackage{geometry}
\\geometry{a4paper, margin=1in}
\\begin{document}

\\title{\\Huge Your Name Here}
\\author{\\Large Your Email | Your Phone}
\\date{}

\\maketitle

\\section*{Education}
\\textbf{Your Degree}, Your University, Year of Graduation

\\section*{Experience}
\\textbf{Job Title} - Company (Year-Year)\\\\
\\textit{Description of your work.}

\\section*{Skills}
\\begin{itemize}
  \\item Skill 1
  \\item Skill 2
  \\item Skill 3
\\end{itemize}

\\end{document}
`;

function App() {
  const [content, setContent] = useState(initialLatex);

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-center text-2xl font-bold py-2 bg-gray-800 text-white">
        LaTeX Resume Maker
      </h1>
      <SplitPane split="vertical" minSize={300} defaultSize="50%">
        <div className="h-full">
          <ResumeEditor content={content} setContent={setContent} />
        </div>
        <div className="h-full bg-gray-100">
          <ResumePreview content={content} />
        </div>
      </SplitPane>
      <div className="flex justify-center">
        <PdfExport />
      </div>
    </div>
  );
}

export default App;
