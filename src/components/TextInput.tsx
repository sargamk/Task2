import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface TextInputProps {
  onTextSubmit: (text: string) => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onTextSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileContent = await file.text();
      setText(fileContent);
      setFileName(file.name);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Failed to read the file. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onTextSubmit(text.trim());
    }
  };

  const clearFile = () => {
    setText('');
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full bg-gray-800 rounded-xl p-5 shadow-lg backdrop-blur-sm border border-gray-700">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Input Text
      </h2>
      
      <form onSubmit={handleSubmit}>
        {fileName && (
          <div className="flex items-center justify-between bg-gray-700 bg-opacity-50 px-4 py-2 rounded-lg mb-3">
            <div className="flex items-center">
              <FileText size={16} className="text-indigo-400 mr-2" />
              <span className="text-sm text-gray-200 truncate max-w-xs">
                {fileName}
              </span>
            </div>
            <button 
              type="button" 
              onClick={clearFile}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Paste your text here or upload a .txt file..."
          className="w-full h-40 bg-gray-700 bg-opacity-50 rounded-lg p-3 text-gray-200 placeholder:text-gray-500 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3">
          <div className="w-full sm:w-auto">
            <label className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors">
              <Upload size={18} className="text-indigo-400" />
              <span className="text-sm text-gray-200">Upload .txt file</span>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Generating Summary...' : 'Generate Summary'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextInput
