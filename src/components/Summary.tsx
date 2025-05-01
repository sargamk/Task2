import React, { useState, useEffect } from 'react';
import { Edit, Check, RefreshCw } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface SummaryProps {
  summary: string;
  isLoading: boolean;
  onEdit: (newSummary: string) => void;
  onRegenerate: () => void;
}

const Summary: React.FC<SummaryProps> = ({ 
  summary, 
  isLoading, 
  onEdit, 
  onRegenerate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);

  useEffect(() => {
    setEditedSummary(summary);
  }, [summary]);

  const handleSave = () => {
    if (editedSummary.trim() && editedSummary !== summary) {
      onEdit(editedSummary);
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-800 rounded-xl p-5 shadow-lg backdrop-blur-sm border border-gray-700 min-h-[150px] flex justify-center items-center">
        <LoadingSpinner message="Generating summary..." />
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-800 rounded-xl p-5 shadow-lg backdrop-blur-sm border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Summary</h2>
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="p-2 bg-green-600 bg-opacity-20 hover:bg-opacity-30 rounded-full text-green-400 transition-colors"
            >
              <Check size={18} />
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 bg-indigo-600 bg-opacity-20 hover:bg-opacity-30 rounded-full text-indigo-400 transition-colors"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={onRegenerate}
                className="p-2 bg-purple-600 bg-opacity-20 hover:bg-opacity-30 rounded-full text-purple-400 transition-colors"
              >
                <RefreshCw size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editedSummary}
          onChange={(e) => setEditedSummary(e.target.value)}
          className="w-full min-h-[230px] bg-gray-700 bg-opacity-50 rounded-lg p-3 text-gray-200 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
        />
      ) : (
        <div className="bg-gray-700 min-h-[250px] bg-opacity-30 rounded-lg p-4 text-gray-300 leading-relaxed">
          {summary || "Your summary will appear here..."}
        </div>
      )}

      {isEditing && (
        <p className="mt-2 text-xs text-gray-400 italic">
          Edit the summary to generate new images based on your changes
        </p>
      )}
    </div>
  );
};

export default Summary;
