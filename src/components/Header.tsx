import React from 'react';
import { FileText, ImageIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-900 bg-opacity-90 backdrop-blur-sm py-4 px-4 md:px-8 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-15 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg shadow-lg">
            <div className="flex items-center justify-center text-white p-2">
              <FileText size={20} className="mr-1" />
              <ImageIcon size={20} />
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Summarize & Visualize
          </h1>
        </div>
        
        
      </div>
    </header>
  );
};

export default Header;
