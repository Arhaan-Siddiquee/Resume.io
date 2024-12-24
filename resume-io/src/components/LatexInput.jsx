import React from 'react';

const LatexInput = ({ latexCode, setLatexCode }) => {
  return (
    <textarea
      className="w-2/3 h-60 p-4 bg-gray-900 text-white border-2 border-purple-400 rounded-md mb-6"
      placeholder="Enter your LaTeX resume code here..."
      value={latexCode}
      onChange={(e) => setLatexCode(e.target.value)}
    />
  );
};

export default LatexInput;
