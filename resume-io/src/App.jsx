import React from 'react';
import CodeEditor from './components/CodeEditor';
import PreviewPane from './components/PreviewPane';
import DownloadButton from './components/DownloadButton';

const App = () => {
  const [latexCode, setLatexCode] = React.useState('');

  return (
    <div className="flex h-screen">
      <CodeEditor latexCode={latexCode} setLatexCode={setLatexCode} />
      <PreviewPane latexCode={latexCode} />
      <DownloadButton latexCode={latexCode} />
    </div>
  );
};

export default App;
