export const config = {
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY,
    apiEndpoint: process.env.DEEPSEEK_API_ENDPOINT || 'https://api.deepseek.com/v1',
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  },
};

// Utility function to validate configuration
export const validateConfig = () => {
  if (!config.deepseek.apiKey) {
    throw new Error('DEEPSEEK_API_KEY is required but not set in environment variables');
  }
};
