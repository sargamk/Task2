export interface SummaryData {
  id: string;
  originalText: string;
  summary: string;
  images: string[];
  isLoadingSummary: boolean;
  isLoadingImages: boolean;
  error?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}
