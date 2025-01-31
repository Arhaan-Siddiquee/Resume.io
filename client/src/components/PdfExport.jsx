import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfExport = () => {
  const exportToPdf = () => {
    const resume = document.getElementById("resume-preview");

    html2canvas(resume).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
    });
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
      onClick={exportToPdf}
    >
      Export as PDF
    </button>
  );
};

export default PdfExport;
