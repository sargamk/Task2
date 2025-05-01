import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';

interface ControlPanelProps {
  onGenerateImages: (count: number) => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  onGenerateImages, 
  isLoading 
}) => {
  const [imageCount, setImageCount] = useState(1);

  const handleGenerateImages = () => {
    onGenerateImages(imageCount);
  };

  return (
    <div className="w-full bg-gray-800 rounded-xl p-5 shadow-lg backdrop-blur-sm border border-gray-700">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Options</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Number of images to generate
          </label>
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((count) => (
              <button
                key={count}
                onClick={() => setImageCount(count)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  imageCount === count
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerateImages}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ImagePlus size={18} />
          {isLoading ? 'Generating...' : `Generate ${imageCount} Image${imageCount > 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;