import React from 'react';
import PreviewPane from './components/PreviewPane';

const App = () => {
  const latexCode = `
  \\documentclass{article}
  \\begin{document}
  Hello, this is a LaTeX document.
  \\end{document}
  `;

  return (
    <div className="App">
      <h1>LaTeX Preview</h1>
      <PreviewPane latexCode={latexCode} />
    </div>
  );
};

export default App;
