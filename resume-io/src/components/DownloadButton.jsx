import { pdf } from '@react-pdf/renderer';
import ReactLatex from 'react-latex-next';
import { Document, Page } from '@react-pdf/renderer';

const DownloadButton = ({ latexCode }) => {
  const generatePDF = async () => {
    const doc = (
      <Document>
        <Page size="A4" style={{ padding: 30 }}>
          <ReactLatex>{latexCode}</ReactLatex>
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.pdf';
    a.click();
  };

  return (
    <button
      className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-400"
      onClick={generatePDF}
    >
      Download PDF
    </button>
  );
};

export default DownloadButton;
