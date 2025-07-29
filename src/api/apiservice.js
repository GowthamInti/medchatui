class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:8000/api';
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
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
