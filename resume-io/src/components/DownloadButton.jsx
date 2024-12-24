import React from 'react';

const DownloadButton = ({ latexCode }) => {
  const handleDownload = () => {
    // Convert LaTeX to PDF logic goes here
    console.log('Downloading PDF...');
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-md shadow hover:bg-purple-600 focus:outline-none"
      >
        Download PDF
      </button>
    </div>
  );
};

export default DownloadButton;
