import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Download, RefreshCw, Copy, FileText, Loader, Check } from 'lucide-react';
import docs from "../assets/docs.pdf";

export default function Latex() {
  const [latex, setLatex] = useState('');
  const [htmlPreview, setHtmlPreview] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [error, setError] = useState('');
  const [compileMessage, setCompileMessage] = useState('');
  const [activeTab, setActiveTab] = useState('editor');
  const [copySuccess, setCopySuccess] = useState(false);
  const editorRef = useRef(null);
  const previewRef = useRef(null);
  const previewContainerRef = useRef(null);

  // Initialize with sample LaTeX if empty
  useEffect(() => {
    if (!latex) {
      setLatex(``);
    }
  }, [latex]);

  // Capture current editor height
  useEffect(() => {
    if (editorRef.current) {
      const height = window.innerHeight - 200; // Adjust based on headers/footers
      editorRef.current.style.height = `${height}px`;
      if (previewRef.current) {
        previewRef.current.style.height = `${height}px`;
      }
    }
  }, []);

  // More robust LaTeX to HTML conversion function
  const compileLatex = () => {
    setIsCompiling(true);
    setError('');
    setCompileMessage('');
    
    // Simulating server delay
    setTimeout(() => {
      try {
        if (!latex.includes('\\begin{document}')) {
          throw new Error('Missing \\begin{document} - Required for proper compilation');
        }
        
        // Extract the document content for rendering
        const documentMatch = latex.match(/\\begin{document}([\s\S]*?)\\end{document}/);
        if (!documentMatch) {
          throw new Error('Could not find document content between \\begin{document} and \\end{document}');
        }
        
        let documentContent = documentMatch[1];
        
        // Extract title and author if available
        const titleMatch = latex.match(/\\title{([^}]*)}/);
        const title = titleMatch ? titleMatch[1] : '';
        
        const authorMatch = latex.match(/\\author{([^}]*)}/);
        const author = authorMatch ? authorMatch[1] : '';
        
        // Handle document structure with maketitle
        if (documentContent.includes('\\maketitle')) {
          documentContent = documentContent.replace('\\maketitle', 
            `<div class="text-center mb-6 p-4 border-b">
              <h1 class="text-2xl font-bold">${title}</h1>
              <p class="text-gray-600">${author}</p>
            </div>`
          );
        }
        
        // Process sections and subsections
        documentContent = documentContent.replace(/\\section{([^}]*)}/g, 
          '<div class="mt-6 mb-3"><h2 class="text-xl font-bold">$1</h2><hr class="border-t border-gray-300 mt-1"></div>'
        );
        documentContent = documentContent.replace(/\\subsection{([^}]*)}/g, 
          '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>'
        );
        
        // Process environments
        documentContent = documentContent.replace(/\\begin{center}([\s\S]*?)\\end{center}/g, 
          '<div class="text-center my-3">$1</div>'
        );
        
        documentContent = documentContent.replace(/\\begin{itemize}([\s\S]*?)\\end{itemize}/g, (match, content) => {
          const items = content.split('\\item').filter(item => item.trim() !== '');
          const listItems = items.map(item => `<li class="ml-5 mb-1">${item.trim()}</li>`).join('');
          return `<ul class="list-disc my-3">${listItems}</ul>`;
        });
        
        documentContent = documentContent.replace(/\\begin{enumerate}([\s\S]*?)\\end{enumerate}/g, (match, content) => {
          const items = content.split('\\item').filter(item => item.trim() !== '');
          const listItems = items.map(item => `<li class="ml-5 mb-1">${item.trim()}</li>`).join('');
          return `<ol class="list-decimal my-3">${listItems}</ol>`;
        });
        
        // Process math delimiters
        documentContent = documentContent.replace(/\$\$(.*?)\$\$/g, 
          '<div class="bg-gray-100 p-2 my-3 font-mono text-center">$1</div>'
        );
        documentContent = documentContent.replace(/\$(.*?)\$/g, 
          '<span class="font-mono bg-gray-50 px-1">$1</span>'
        );
        
        // Handle text formatting
        documentContent = documentContent.replace(/\\textbf{([^}]*)}/g, '<strong>$1</strong>');
        documentContent = documentContent.replace(/\\textit{([^}]*)}/g, '<em>$1</em>');
        documentContent = documentContent.replace(/\\emph{([^}]*)}/g, '<em>$1</em>');
        documentContent = documentContent.replace(/\\texttt{([^}]*)}/g, '<code class="font-mono bg-gray-50 px-1 rounded">$1</code>');
        
        // Handle newlines and paragraphs
        documentContent = documentContent.replace(/\\\\/g, '<br>');
        documentContent = documentContent.replace(/\n\n+/g, '<br><br>');
        
        // Handle special commands and resume-specific formatting
        documentContent = documentContent.replace(/\\Huge\s+\\scshape\s+([^\\\n]+)/g, 
          '<div class="text-2xl font-bold uppercase">$1</div>'
        );
        
        // Handle hyper references
        documentContent = documentContent.replace(/\\href{([^}]*)}{([^}]*)}/g, 
          '<a href="$1" class="text-blue-600 underline hover:text-blue-800">$2</a>'
        );
        
        // Handle basic tables
        documentContent = documentContent.replace(/\\begin{tabular\*}{[^}]*}{[^}]*}([\s\S]*?)\\end{tabular\*}/g, (match, content) => {
          // Basic table conversion (simplified)
          let tableContent = content.replace(/\\\\/g, '</tr><tr>');
          tableContent = tableContent.replace(/&/g, '</td><td>');
          return `<table class="border-collapse my-3"><tr><td>${tableContent}</td></tr></table>`;
        });
        
        // Handle resume-specific commands
        documentContent = documentContent.replace(/\\resumeItem{([^}]*)}/g, 
          '<li class="ml-5 mb-2 text-sm">$1</li>'
        );
        
        documentContent = documentContent.replace(/\\resumeSubheading{([^}]*)}{([^}]*)}{([^}]*)}{([^}]*)}/g, 
          '<div class="mb-3">' +
          '  <div class="flex justify-between">' +
          '    <span class="font-bold">$1</span>' +
          '    <span>$2</span>' +
          '  </div>' +
          '  <div class="flex justify-between text-sm italic">' +
          '    <span>$3</span>' +
          '    <span>$4</span>' +
          '  </div>' +
          '</div>'
        );
        
        documentContent = documentContent.replace(/\\resumeProjectHeading{([^}]*)}{([^}]*)}/g,
          '<div class="mb-3">' +
          '  <div class="flex justify-between">' +
          '    <span>$1</span>' +
          '    <span>$2</span>' +
          '  </div>' +
          '</div>'
        );
        
        // Process custom list environments from resume template
        documentContent = documentContent.replace(/\\resumeSubHeadingListStart([\s\S]*?)\\resumeSubHeadingListEnd/g,
          '<div class="my-2">$1</div>'
        );
        
        documentContent = documentContent.replace(/\\resumeItemListStart([\s\S]*?)\\resumeItemListEnd/g,
          '<ul class="list-disc my-2">$1</ul>'
        );
        
        setHtmlPreview(`<div class="p-6 max-w-4xl mx-auto bg-white" id="pdf-content">${documentContent}</div>`);
        setCompileMessage('Preview generated successfully. Note: This is a simplified rendering for preview purposes.');
        setIsCompiling(false);
      } catch (err) {
        setError(`Error compiling LaTeX: ${err.message}`);
        setIsCompiling(false);
      }
    }, 800);
  };

  // Compile on initial load and when latex changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (latex) {
        compileLatex();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [latex]);

  // Function to generate and download PDF
  const downloadPDF = () => {
    if (!previewContainerRef.current) {
      setError('Preview not available. Please compile the LaTeX document first.');
      return;
    }

    setIsGeneratingPdf(true);
    setCompileMessage('Generating PDF...');
    
    // Extract title for the filename
    const titleMatch = latex.match(/\\title{([^}]*)}/);
    const title = titleMatch ? titleMatch[1].replace(/\s+/g, '_') : 'document';
    
    // Get the HTML content to convert
    const element = previewContainerRef.current.querySelector('#pdf-content');
    
    if (!element) {
      setError('Could not find content to convert to PDF.');
      setIsGeneratingPdf(false);
      return;
    }
    
    // PDF generation options
    const opt = {
      margin: 10,
      filename: `${title}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Check if html2pdf is available
    if (typeof window.html2pdf === 'undefined') {
      setError('PDF generation library not loaded. Please include html2pdf.js in your project.');
      setIsGeneratingPdf(false);
      return;
    }
    
    // Generate and download PDF
    window.html2pdf().from(element).set(opt).save()
      .then(() => {
        setCompileMessage('PDF downloaded successfully!');
        setIsGeneratingPdf(false);
      })
      .catch(err => {
        setError(`Error generating PDF: ${err.message}`);
        setIsGeneratingPdf(false);
      });
  };

  // Load a resume sample
  const loadResumeSample = () => {
    setLatex(`%-------------------------
% Resume in Latex
% Author:  Arhaan Siddiquee
% Based off of: https://github.com/Arhaan-Siddiquee/My-Resume-LateX/
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

%----------FONT OPTIONS----------
\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Section formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure ATS compatibility
\\pdfgentounicode=1

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape Arhaan Siddiquee} \\\\ 
    7070000629 $|$ \\href{mailto:siddiqueearhaan@gmail.com}{siddiqueearhaan@gmail.com} $|$ 
    \\href{https://www.linkedin.com/in/arhaansiddiquee/}{linkedin/arhaansiddiquee/} $|$
    \\href{https://github.com/Arhaan-Siddiquee}{github/Arhaan-Siddiquee}
\\end{center}
\\section{Summary}
\\resumeItemListStart
  \\resumeItem{Dynamic Frontend Developer with over 2 years of experience in designing, developing, and implementing user-friendly web applications using the MERN stack. Proven success in enhancing application performance, improving user experience, and increasing engagement through innovative UI/UX design. Adept at collaborating with cross-functional teams and mentoring junior developers. Seeking to leverage expertise in a challenging environment focused on technological advancement and user-centric design.}
\\resumeItemListEnd
\\section{Education}
  \\resumeSubHeadingListStart
      {SRM University}{Chennai, TN}
      {Bachelor of Technology in Computer Science Engineering}{Aug. 2023 -- May 2027}
  \\resumeSubHeadingListEnd
  \\resumeSubHeadingListStart
      {D.A.V Public School}
      {Matriculation and Intermediate}{Aug. 2019 -- May 2023}
  \\resumeSubHeadingListEnd
\\section{Experience}
  \\resumeSubHeadingListStart
      {OpenSource Contributor}{Sep. 2024 -- Present}
      {Hactoberfest}
      \\resumeItemListStart
        \\resumeItem{Contributed to an open-source project during Hacktoberfest, focusing on bug fixes and UI/UX improvements to enhance performance, accessibility, and overall user experience, benefiting both developers and end users.}
      \\resumeItemListEnd
      {Frontend Developer}{Sep. 2024 -- March. 2025}
      {Niramaya Startup}{Hybrid}
      \\resumeItemListStart
        \\resumeItem{Led the development of a SaaS website, enhancing user engagement by 30\\% through optimized UI/UX and effective navigation.}
        \\resumeItem{Integrated RESTful APIs in collaboration with backend teams, significantly improving application functionality and performance.}
      \\resumeItemListEnd
      {Technical Member}{Sep. 2024 -- Present}
      {Codenex Club}{SRM University, Chennai}
      \\resumeItemListStart
        \\resumeItem{Played a crucial role in developing full-stack applications, providing mentorship to over 10 junior developers on best coding practices.}
      \\resumeItemListEnd
      {Creative Associate}{Oct. 2023 -- Present}
      {Founder's Club}{SRM University, Chennai}
      \\resumeItemListStart
        \\resumeItem{Directed UI/UX design for multiple projects, achieving a 25\\% increase in user interaction and satisfaction.}
      \\resumeItemListEnd
      {Creative Designer}{Oct. 2023 -- Mar. 2024}
      {dBug Labs}{SRM University, Chennai}
      \\resumeItemListStart
        \\resumeItem{Designed intuitive UI/UX for 5+ web and mobile applications, leading to a 20\\% increase in user satisfaction based on user feedback.}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd
  \\section{Major Projects}
  \\resumeSubHeadingListStart
    {\\textbf{10xCoders} $|$ \\emph{Technologies: React.js, Node.js, CSS, JavaScript}}{Group Project}
    \\resumeItemListStart
      \\resumeItem{Developed a tech resources platform that serves over 100 active users, enhancing their learning journeys with accessible resources.}
    \\resumeItemListEnd
    {\\textbf{ShikshaSoladu.ia} $|$ \\emph{Technologies: HTML, CSS, Java, MySQL}}{Hackathon Project}
    \\resumeItemListStart
      \\resumeItem{Built an inclusive learning platform for students with disabilities, incorporating features like speech-to-text, color-blind accessibility, and audio lessons.}
    \\resumeItemListEnd
    {\\textbf{Enigma} $|$ \\emph{Technologies: Python, JavaScript, Firebase}}{CTF Management Platform}
    \\resumeItemListStart
      \\resumeItem{Created a CTF hosting platform used in a university tech fest, with real-time scoreboard, hint system, and secure challenge deployment.}
    \\resumeItemListEnd
    {\\textbf{FitFlow Exercise} $|$ \\emph{Technologies: React Native, Firebase}}{Personal Project}
    \\resumeItemListStart
      \\resumeItem{Designed a mobile app offering personalized fitness routines and tracking, resulting in improved consistency and engagement among beta users.}
    \\resumeItemListEnd
  \\resumeSubHeadingListEnd
\\section{Skills}
  \\resumeSubHeadingListStart
    \\resumeItem{Programming Languages: C, Java, Python, JavaScript, HTML, CSS}
    \\resumeItem{Frameworks: React.js, Node.js, Express.js, Tailwind CSS}
    \\resumeItem{Databases: MongoDB, MySQL}
    \\resumeItem{Tools: Git, Docker, Figma, Visual Studio Code}
    \\resumeItem{Soft Skills: Team Leadership, Communication, Problem Solving, Mentoring}
  \\resumeSubHeadingListEnd
\\section{Certifications}
  \\resumeSubHeadingListStart
    \\resumeItem{Ranked 10th Position out of 155 Teams in Hackathon - RedBull Basement}
    \\resumeItem{Introduction to Cybersecurity - Cisco}
    \\resumeItem{Introduction to PHP - Simplilearn}
    \\resumeItem{C Programming For Beginners - Udemy}
    \\resumeItem{C++ Programming - Udemy}
  \\resumeSubHeadingListEnd
\\section{Interests}
  \\resumeSubHeadingListStart
    \\resumeItem{UI/UX Design, Cybersecurity, Entrepreneurship, Web Development}
  \\resumeSubHeadingListEnd

\\end{document}`);
  };

  // Copy LaTeX to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(latex);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Resume.io</h1>
          <div className="flex space-x-2">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center"
              onClick={loadResumeSample}
            >
              <FileText size={16} className="mr-1" />
              Load Resume Template
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm flex items-center"
            >
              <a href={docs}>Guide Docs</a>
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Tab Navigation for mobile */}
        <div className="md:hidden bg-gray-200 flex">
          <button 
            className={`flex-1 py-2 px-4 ${activeTab === 'editor' ? 'bg-white border-t-2 border-blue-500' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button 
            className={`flex-1 py-2 px-4 ${activeTab === 'preview' ? 'bg-white border-t-2 border-blue-500' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
        </div>
        
        {/* LaTeX Editor */}
        <div className={`w-full md:w-1/2 p-4 flex flex-col ${activeTab !== 'editor' ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">LaTeX Code</h2>
            <div className="flex space-x-2">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm flex items-center"
                onClick={copyToClipboard}
                disabled={copySuccess}
              >
                {copySuccess ? (
                  <>
                    <Check size={16} className="mr-1 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-1" />
                    Copy
                  </>
                )}
              </button>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center"
                onClick={compileLatex}
              >
                <RefreshCw size={16} className={`mr-1 ${isCompiling ? 'animate-spin' : ''}`} />
                Compile
              </button>
            </div>
          </div>
          <textarea
            ref={editorRef}
            className="flex-1 w-full p-3 font-mono text-sm border rounded shadow-inner"
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            spellCheck="false"
          />
        </div>
        
        {/* Preview Panel */}
        <div className={`w-full md:w-1/2 bg-white p-4 overflow-auto border-l flex flex-col ${activeTab !== 'preview' ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Preview</h2>
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center"
              onClick={downloadPDF}
              disabled={isGeneratingPdf}
            >
              {isGeneratingPdf ? (
                <>
                  <Loader size={16} className="mr-1 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download size={16} className="mr-1" />
                  Download PDF
                </>
              )}
            </button>
          </div>
          
          {isCompiling ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader size={24} className="animate-spin text-blue-500 mb-2" />
                <p className="text-gray-600">Compiling LaTeX...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-start">
              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ) : (
            <div 
              ref={previewRef} 
              className="flex-1 overflow-auto"
            >
              <div 
                ref={previewContainerRef}
                className="preview-container border rounded shadow-inner bg-white"
                dangerouslySetInnerHTML={{ __html: htmlPreview }}
              />
            </div>
          )}
          
          {compileMessage && (
            <div className="mt-2 text-sm text-gray-600 bg-gray-100 p-2 rounded">
              {compileMessage}
            </div>
          )}
        </div>
      </div>
      
      <footer className="bg-gray-200 p-2 text-sm text-gray-600">
      </footer>
    </div>
  );
}

