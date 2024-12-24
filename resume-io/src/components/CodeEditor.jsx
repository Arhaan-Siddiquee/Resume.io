import React from 'react';

const CodeEditor = ({ latexCode, setLatexCode }) => {
  return (
    <div className="w-1/2 p-4 bg-white border-r border-gray-300">
      <h2 className="text-lg font-bold mb-2">LaTeX Code Editor</h2>
      <textarea
        className="w-full h-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={latexCode}
        onChange={(e) => setLatexCode(e.target.value)}
      />
    </div>
  );
};

export default CodeEditor;
