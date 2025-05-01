import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Loading...' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`${sizeClasses[size]} border-t-indigo-500 border-r-purple-500 border-b-blue-500 border-l-transparent rounded-full animate-spin`}
      />
      {message && (
        <p className="mt-2 text-sm text-gray-300 animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;