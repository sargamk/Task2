import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import TextInput from './components/TextInput';
import Summary from './components/Summary';
import ImageCarousel from './components/ImageCarousel';
import ControlPanel from './components/ControlPanel';
import { generateSummary, generateMultipleImages } from './services/api';
import { SummaryData } from './types';

function App() {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    id: uuidv4(),
    originalText: '',
    summary: '',
    images: [],
    isLoadingSummary: false,
    isLoadingImages: false,
  });

  const handleTextSubmit = useCallback(async (text: string) => {
    setSummaryData((prev) => ({
      ...prev,
      originalText: text,
      isLoadingSummary: true,
      error: undefined,
    }));

    try {
      const summaryResponse = await generateSummary(text);
      
      if (!summaryResponse.success) {
        throw new Error(summaryResponse.error || 'Failed to generate summary');
      }
      
      setSummaryData((prev) => ({ 
        ...prev, 
        summary: summaryResponse.data,
        isLoadingSummary: false,
      }));
    } catch (error) {
      console.error('Processing error:', error);
      setSummaryData((prev) => ({
        ...prev,
        isLoadingSummary: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
    }
  }, []);

  const handleEditSummary = useCallback(async (newSummary: string) => {
    setSummaryData((prev) => ({
      ...prev,
      summary: newSummary,
    }));
  }, []);

  const handleRegenerateSummary = useCallback(async () => {
    if (!summaryData.originalText) return;
    
    setSummaryData((prev) => ({
      ...prev,
      isLoadingSummary: true,
      error: undefined,
    }));
    
    try {
      const response = await generateSummary(summaryData.originalText);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to regenerate summary');
      }
      
      setSummaryData((prev) => ({
        ...prev,
        summary: response.data,
        images: [],
        isLoadingSummary: false,
      }));
    } catch (error) {
      console.error('Regeneration error:', error);
      setSummaryData((prev) => ({
        ...prev,
        isLoadingSummary: false,
        error: error instanceof Error ? error.message : 'Failed to regenerate summary',
      }));
    }
  }, [summaryData.originalText]);

  const handleGenerateImages = useCallback(async (count: number = 1) => {
    if (!summaryData.summary) return;
    
    setSummaryData((prev) => ({
      ...prev,
      isLoadingImages: true,
      error: undefined,
    }));
    
    try {
      const response = await generateMultipleImages(summaryData.summary, count);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to generate images');
      }
      
      setSummaryData((prev) => ({
        ...prev,
        images: response.data,
        isLoadingImages: false,
      }));
            console.log(summaryData);
    } catch (error) {
      console.error('Image generation error:', error);
      setSummaryData((prev) => ({
        ...prev,
        isLoadingImages: false,
        error: error instanceof Error ? error.message : 'Failed to generate images',
      }));
    }
  }, [summaryData.summary]);

  const showSummary = summaryData.originalText || summaryData.isLoadingSummary;
  const showImages = summaryData.summary && !summaryData.isLoadingSummary;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <AnimatePresence>
          {summaryData.error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-900 bg-opacity-30 border border-red-800 rounded-lg p-4 flex items-start gap-2"
            >
              <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-200">{summaryData.error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative min-h-[300px]">
          <motion.div
            initial={false}
            animate={{
              gridColumn: showSummary ? "1" : "1 / span 2",
              x: 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <TextInput 
              onTextSubmit={handleTextSubmit} 
              isLoading={summaryData.isLoadingSummary} 
            />
          </motion.div>
          
          <AnimatePresence>
            {showSummary && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Summary 
                  summary={summaryData.summary}
                  isLoading={summaryData.isLoadingSummary}
                  onEdit={handleEditSummary}
                  onRegenerate={handleRegenerateSummary}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showImages && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <ControlPanel 
                onGenerateImages={handleGenerateImages}
                isLoading={summaryData.isLoadingImages}
              />
              
              <ImageCarousel 
                images={summaryData.images} 
                isLoading={summaryData.isLoadingImages} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© 2025 Summarize & Visualize</p>
      </footer>
    </div>
  );
}

export default App;
