import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface ImageCarouselProps {
    images: string[];
    isLoading: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, isLoading }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0);
    }, [images]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleDownload = (imageUrl: string) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `generated-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return (
            <div className="w-full bg-gray-800 rounded-xl p-5 shadow-lg backdrop-blur-sm border border-gray-700 min-h-[300px] flex justify-center items-center">
                <LoadingSpinner size="large" message="Generating images..." />
            </div>
        );
    }

    if (images.length === 0) {
        return (
            <div className="w-full bg-gray-800 rounded-xl p-5 shadow-lg backdrop-blur-sm border border-gray-700 min-h-[300px] flex justify-center items-center">
                <p className="text-gray-400">No images generated yet</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-800 rounded-xl p-5 shadow-lg backdrop-blur-sm border border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Generated Image</h2>
                <div className="text-sm text-gray-400">
                    {images.length > 1 ? `${currentIndex + 1}/${images.length}` : ''}
                </div>
            </div>

            <div className="relative">
                <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-gray-700 relative">
                    <img
                        src={images[currentIndex]}
                        alt={`Generated image ${currentIndex + 1}`}
                        className="w-full h-full object-contain"
                    />

                    <button
                        onClick={() => handleDownload(images[currentIndex])}
                        className="absolute bottom-3 right-3 p-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full text-white transition-colors"
                    >
                        <Download size={18} />
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 md:p-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full text-white transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 md:p-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full text-white transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}
                </div>

                {images.length > 1 && (
                    <div className="flex justify-center mt-3 gap-1">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-indigo-500' : 'bg-gray-600'
                                    } transition-colors`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;
