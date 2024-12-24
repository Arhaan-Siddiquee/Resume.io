import ReactLatex from 'react-latex-next';

const LatexPreview = ({ latexCode }) => {
  return (
    <div className="w-2/3 h-60 p-4 bg-gray-900 text-white border-2 border-purple-400 rounded-md mb-6 overflow-auto">
      <h2 className="text-lg font-bold text-purple-400 mb-2">Preview</h2>
      <ReactLatex>{latexCode}</ReactLatex>
    </div>
  );
};

export default LatexPreview;
