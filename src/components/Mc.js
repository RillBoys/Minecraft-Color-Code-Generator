import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const colors = {
  '0': { name: 'Black', hex: '#000000' },
  '1': { name: 'Dark Blue', hex: '#0000AA' },
  '2': { name: 'Dark Green', hex: '#00AA00' },
  '3': { name: 'Dark Aqua', hex: '#00AAAA' },
  '4': { name: 'Dark Red', hex: '#AA0000' },
  '5': { name: 'Dark Purple', hex: '#AA00AA' },
  '6': { name: 'Gold', hex: '#FFAA00' },
  '7': { name: 'Gray', hex: '#AAAAAA' },
  '8': { name: 'Dark Gray', hex: '#555555' },
  '9': { name: 'Blue', hex: '#5555FF' },
  'a': { name: 'Green', hex: '#55FF55' },
  'b': { name: 'Aqua', hex: '#55FFFF' },
  'c': { name: 'Red', hex: '#FF5555' },
  'd': { name: 'Light Purple', hex: '#FF55FF' },
  'e': { name: 'Yellow', hex: '#FFFF55' },
  'f': { name: 'White', hex: '#FFFFFF' },
};

const formats = {
  'l': 'font-weight: bold;',
  'o': 'font-style: italic;',
  'n': 'text-decoration: underline;',
  'm': 'text-decoration: line-through;',
  'k': 'animation: magic-text 1s infinite;',
  'r': 'reset',
};

const Mc = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [version, setVersion] = useState('java');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleVersion = () => setVersion(version === 'java' ? 'bedrock' : 'java');

  const formatCode = (code) => version === 'java' ? `&${code}` : `§${code}`;

  const previewText = inputText
    .replace(/([&§])([0-9a-f])/gi, (match, prefix, code) => {
      const colorCode = code.toLowerCase();
      return `<span style="color: ${colors[colorCode].hex}">`;
    })
    .replace(/([&§])([lormnk])/gi, (match, prefix, format) => {
      if (formats[format] === 'reset') {
        return '</span></span></span></span></span><span style="all:unset">';
      }
      return `<span style="${formats[format]}">`;
    })
    .replace(/([&§])r/gi, () => '</span><span style="all:unset">') + '</span>';

  const addFormat = (formatCode) => {
    setInputText(prevText => prevText + `&${formatCode}`);
  };
  
  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(inputText)
        .then(() => toast.success('Text copied to clipboard!', { position: "top-right", autoClose: 3000 }))
        .catch(() => toast.error('Failed to copy text!', { position: "top-right", autoClose: 3000 }));
    } else {
      toast.error('Clipboard API is not supported in this browser.', { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className={`min-h-screen p-4 sm:p-8 transition-bg ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold" style={{ fontFamily: 'Lato, sans-serif' }}>
             Minecraft Color Code Generator
            </h1>
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>

        <div className="mb-4">
          <button onClick={toggleVersion} className={`btn w-full sm:w-auto ${darkMode ? 'btn-primary-dark' : 'btn-primary'}`}>
            Version: {version.charAt(0).toUpperCase() + version.slice(1)}
          </button>
        </div>

        <div className="grid grid-cols-8 gap-1 sm:gap-2 mb-6 sm:mb-8">
          {Object.entries(colors).map(([code, { name, hex }]) => (
            <div
              key={code}
              className="color-box aspect-square flex items-center justify-center text-[0.6rem] sm:text-xs"
              style={{ backgroundColor: hex }}
              onClick={() => setInputText(inputText + formatCode(code))}
            >
              <span className={`font-bold ${['0', '1', '2', '3', '4', '5', '8'].includes(code) ? 'text-white' : 'text-black'}`}>
                {formatCode(code)}
              </span>
            </div>
          ))}
        </div>

        <div className="format-buttons mb-6 sm:mb-8 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          <button onClick={() => addFormat('l')} className={`btn-format ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`} style={{ fontWeight: 'bold' }}>Bold</button>
          <button onClick={() => addFormat('o')} className={`btn-format ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`} style={{ fontStyle: 'italic' }}>Italic</button>
          <button onClick={() => addFormat('n')} className={`btn-format ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`} style={{ textDecoration: 'underline' }}>Underline</button>
          <button onClick={() => addFormat('m')} className={`btn-format ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`} style={{ textDecoration: 'line-through' }}>Strikethrough</button>
          <button onClick={() => addFormat('k')} className={`btn-format ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`} style={{ animation: 'magic-text 0s infinite' }}>Magic</button>
          <button onClick={() => addFormat('r')} className={`btn-format ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>Reset</button>
        </div>

        <div className="mb-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={`text-input minecraft-font ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            placeholder="Enter your text with Minecraft format codes..."
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <button onClick={copyToClipboard} className={`btn-copy w-full sm:w-auto ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} py-2 px-4 rounded-lg`}>
            Copy Text
          </button>
        </div>

        <div className={`preview-area p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} text-base sm:text-lg`}>
          <h2 className="text-xl font-bold mb-2">Preview:</h2>
          <div className="minecraft-font preview-text" dangerouslySetInnerHTML={{ __html: previewText }} />
        </div>

        <ToastContainer />

        <footer className="mt-6 sm:mt-8 text-center text-xs sm:text-sm">
          <p className="text-gray-500">
            Created by <a href="https://discord.com/users/732699880018935959" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Beduu24</a> / <a href="https://discord.com/users/732699880018935959" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">11Rill</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Mc;