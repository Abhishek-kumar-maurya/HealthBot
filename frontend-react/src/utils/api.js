import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },
  
  logout: async () => {
    try {
      await api.post('/auth/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/user/');
    return response.data;
  }
};

// Health Records API calls
export const healthRecordsAPI = {
  getRecords: async () => {
    const response = await api.get('/health-records/');
    return response.data;
  },
  
  createRecord: async (recordData) => {
    const response = await api.post('/health-records/', recordData);
    return response.data;
  },
  
  updateRecord: async (id, recordData) => {
    const response = await api.put(`/health-records/${id}/`, recordData);
    return response.data;
  },
  
  deleteRecord: async (id) => {
    await api.delete(`/health-records/${id}/`);
  }
};

// Chat API calls
export const chatAPI = {
  getChatHistory: async () => {
    const response = await api.get('/chat/messages/');
    return response.data;
  },
  
  sendMessage: async (message) => {
    const response = await api.post('/chat/messages/', { message });
    return response.data;
  },
  
  getChatSessions: async () => {
    const response = await api.get('/chat/sessions/');
    return response.data;
  }
};

// Profile API calls
export const profileAPI = {
  getProfile: async () => {
    const response = await api.get('/profile/');
    return response.data;
  },
  
  updateProfile: async (profileData) => {
    const response = await api.put('/profile/', profileData);
    return response.data;
  }
};

export default api;