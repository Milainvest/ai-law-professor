import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Health check endpoint
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Chat API endpoints
export const sendMessage = async (message: string) => {
  try {
    const response = await api.post('/chat', { message });
    return {
      answer: response.data.response // APIのresponseフィールドをanswerフィールドにマッピング
    };
  } catch (error) {
    console.error('Message sending failed:', error);
    throw error;
  }
};

// Error handling interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
