# Summarize & Visualize

A React application that uses Hugging Face's AI models to summarize text and generate images based on the summaries.

## Features

- Upload text files or paste text directly
- Summarize text using Hugging Face's BART-large-CNN model
- Generate images based on the summary using Stability AI's Stable Diffusion XL
- Edit summaries and regenerate images
- Generate multiple images at once
- Clean, responsive UI with animations and modern design

## Getting Started

### Prerequisites

- Node.js (v16+)
- A Hugging Face API key

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on the provided `.env.example` file:

```bash
cp .env.example .env
```

4. Add your Hugging Face API key to the `.env` file:

```
VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key
```

### Running the App

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173 (or the port specified by Vite).

### Building for Production

Build the app for production:

```bash
npm run build
```

The production-ready files will be available in the `dist` directory.

## Technologies Used

- React
- TypeScript
- Vite
- TailwindCSS
- Hugging Face API (BART-large-CNN & Stable Diffusion XL)

## API References

- Text Summarization: [facebook/bart-large-cnn](https://huggingface.co/facebook/bart-large-cnn)
- Image Generation: [stabilityai/stable-diffusion-xl-base-1.0](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)