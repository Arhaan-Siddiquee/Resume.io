import React from "react";

const LatexEditor = ({ value, onChange }) => {
  return (
    <textarea
      className="w-full h-[500px] bg-gray-800 text-white border border-gray-500 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
      placeholder="Enter your LaTeX resume code here..."
      value={value}
      onChange={onChange}
    />
  );
};

export default LatexEditor;
