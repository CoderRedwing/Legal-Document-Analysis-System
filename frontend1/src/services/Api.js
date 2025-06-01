// import axios from 'axios';

// // Create axios instance with better configuration
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
//   timeout: 10000, // 10-second timeout
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Request interceptor for logging
// api.interceptors.request.use(config => {
//   console.log('Request:', config.method?.toUpperCase(), config.url);
//   return config;
// });

// // Response interceptor for error handling
// api.interceptors.response.use(
//   response => response,
//   error => {
//     console.error('API Error:', {
//       url: error.config?.url,
//       status: error.response?.status,
//       data: error.response?.data
//     });
//     return Promise.reject(error);
//   }
// );

// // Enhanced API functions
// export const fetchDocuments = (page = 1, limit = 10) => 
//   api.get(`/documents?page=${page}&limit=${limit}`);

// export const fetchDocument = (id) => 
//   api.get(`/documents/${id}`);

// export const uploadDocument = (file, onUploadProgress) => {
//   const formData = new FormData();
//   formData.append('file', file);
  
//   return api.post('/documents', formData, {
//     onUploadProgress,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       'X-Requested-With': 'XMLHttpRequest'
//     },
//     transformRequest: data => data // Bypass JSON transformation
//   });
// };

// export const deleteDocument = (id) => 
//   api.delete(`/documents/${id}`);

// // Add these troubleshooting utilities
// export const checkBackendConnection = async () => {
//   try {
//     const response = await api.get('/health');
//     return response.data;
//   } catch (error) {
//     return {
//       status: 'disconnected',
//       error: error.message
//     };
//   }
// };

// export const verifyCORS = async () => {
//   try {
//     const response = await fetch(api.defaults.baseURL + '/documents', {
//       method: 'OPTIONS'
//     });
//     return {
//       headers: Object.fromEntries(response.headers.entries()),
//       status: response.status
//     };
//   } catch (error) {
//     return { error: error.message };
//   }
// };


import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/docs',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Logging requests
api.interceptors.request.use(config => {
  console.log('Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Handle API errors
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    }); 
    return Promise.reject(error);
  }
);

// API functions
export const fetchDocuments = () =>
  api.get('/history');

export const fetchDocumentAnalysis = (id) =>
  api.get(`/analyze/${id}`);

export const fetchDocumentSummary = (id) =>
  api.get(`/summary/${id}`);

export const uploadDocument = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/upload', formData, {
    onUploadProgress,
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest'
    },
    transformRequest: data => data
  });
};

export const deleteDocument = (id) =>
  api.delete(`/delete/${id}`);
