import { ApiResponse } from '../types';

const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || '';

/**
 * Generate a summary using Hugging Face's BART-large-CNN model
 */
export const generateSummary = async (text: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${HF_API_KEY}`,
                },
                body: JSON.stringify({
                    inputs: `Summarize the following document: ${text.substring(0, 1000)}`, parameters: {
                        max_length: 500,
                        min_length: 100,
                        do_sample: false,
                    },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data: data[0].summary_text };
    } catch (error) {
        console.error('Summary generation error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate summary'
        };
    }
};

/**
 * Generate an image using Stability AI's Stable Diffusion model
 */
export const generateImage = async (prompt: string): Promise<ApiResponse> => {
    try {
        const seed = Math.floor(Math.random() * 1_000_000);
        const response = await fetch(
            'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: prompt,
                    options: {
                        wait_for_model: true,
                    },
                    parameters: {
                        seed: seed,
                    },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        return { success: true, data: imageUrl };
    } catch (error) {
        console.error('Image generation error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate image'
        };
    }
};

/**
 * Generate multiple images using Stability AI's model
 */
export const generateMultipleImages = async (
    prompt: string,
    count: number = 3
): Promise<ApiResponse> => {
    try {
        const imagePromises = Array(count)
            .fill(null)
            .map(() => generateImage(prompt));

        const results = await Promise.all(imagePromises);
        const imageUrls = results
            .filter(result => result.success)
            .map(result => result.data);

        if (imageUrls.length === 0) {
            throw new Error('Failed to generate any images');
        }

        return { success: true, data: imageUrls };
    } catch (error) {
        console.error('Multiple image generation error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate images'
        };
    }
};
