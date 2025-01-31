import React from "react";

const ResumeEditor = ({ content, setContent }) => {
  return (
    <textarea
      className="w-full h-full p-4 border-r resize-none focus:outline-none text-sm"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
};

export default ResumeEditor;
