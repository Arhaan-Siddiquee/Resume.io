import { useState } from 'react';
import LatexInput from './components/LatexInput';
import LatexPreview from './components/LatexPreview';
import DownloadButton from './components/DownloadButton';

function App() {
  const [latexCode, setLatexCode] = useState('');

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-4xl mb-6 text-purple-400">LaTeX Resume Builder</h1>

      <LatexInput latexCode={latexCode} setLatexCode={setLatexCode} />

      <LatexPreview latexCode={latexCode} />

      <DownloadButton latexCode={latexCode} />
    </div>
  );
}

export default App;
