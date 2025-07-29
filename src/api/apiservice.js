import config from '../utils/config.js';

class ApiService {
  constructor() {
    this.baseURL = config.api.baseUrl;
    this.timeout = config.api.timeout;
    this.token = sessionStorage.getItem('authToken');
  }

  setAuthToken(token) {
    this.token = token;
    sessionStorage.setItem('authToken', token);
  }

  removeAuthToken() {
    this.token = null;
    sessionStorage.removeItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    
    // Set timeout
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    };

    try {
      const response = await fetch(url, requestConfig);
      clearTimeout(timeoutId);
      
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (!response.ok) {
        // Handle different HTTP status codes
        const error = new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
        error.status = response.status;
        error.data = data;
        
        // Special handling for authentication errors
        if (response.status === 401) {
          this.removeAuthToken();
          error.isAuthError = true;
        }
        
        throw error;
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Handle different types of errors
      if (error.name === 'AbortError') {
        const timeoutError = new Error('Request timeout');
        timeoutError.isTimeout = true;
        throw timeoutError;
      }
      
      if (!navigator.onLine) {
        const networkError = new Error('No internet connection');
        networkError.isNetworkError = true;
        throw networkError;
      }
      
      console.error('API Error:', {
        endpoint,
        error: error.message,
        status: error.status,
        timestamp: new Date().toISOString()
      });
      
      throw error;
    }
  }

  async login(username, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async register(username, password, email) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
    });
  }

  async sendMessage(message) {
    return this.request('/chat/message', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getChatHistory() {
    return this.request('/chat/history');
  }

  async getGrammarRules() {
    return this.request('/grammar/rules');
  }

  async createGrammarRule(rule) {
    return this.request('/grammar/rules', {
      method: 'POST',
      body: JSON.stringify(rule),
    });
  }

  async updateGrammarRule(id, rule) {
    return this.request(`/grammar/rules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(rule),
    });
  }

  async deleteGrammarRule(id) {
    return this.request(`/grammar/rules/${id}`, {
      method: 'DELETE',
    });
  }
}

const apiService = new ApiService();
export default apiService;
