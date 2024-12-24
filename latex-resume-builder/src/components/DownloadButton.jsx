import React from "react";
import { pdf } from "@react-pdf/renderer"; // Install using `npm install @react-pdf/renderer`

const DownloadButton = ({ latexCode }) => {
  const handleDownload = async () => {
    const blob = new Blob([latexCode], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button
      className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-600 focus:outline-none"
      onClick={handleDownload}
    >
      Download PDF
    </button>
  );
};

export default DownloadButton;
