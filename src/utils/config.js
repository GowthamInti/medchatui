// Environment configuration utility
const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    timeout: 30000, // 30 seconds
  },
  
  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Medical Chat Assistant',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.NODE_ENV || 'development',
  },
  
  // Feature Flags
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    errorReporting: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
    pwa: import.meta.env.VITE_ENABLE_PWA === 'true',
  },
  
  // Security Settings
  security: {
    enableCSP: import.meta.env.VITE_ENABLE_CSP === 'true',
    sessionTimeout: parseInt(import.meta.env.VITE_SESSION_TIMEOUT) || 3600000, // 1 hour default
  },
  
  // Development Settings
  dev: {
    port: parseInt(import.meta.env.VITE_DEV_PORT) || 3000,
    host: import.meta.env.VITE_DEV_HOST || 'localhost',
  },
  
  // Helper methods
  isDevelopment: () => config.app.environment === 'development',
  isProduction: () => config.app.environment === 'production',
  
  // Validation
  validate: () => {
    const required = ['api.baseUrl', 'app.name'];
    const missing = required.filter(key => {
      const value = key.split('.').reduce((obj, k) => obj?.[k], config);
      return !value;
    });
    
    if (missing.length > 0) {
      throw new Error(`Missing required configuration: ${missing.join(', ')}`);
    }
    
    return true;
  }
};

// Validate configuration on import
try {
  config.validate();
} catch (error) {
  console.error('Configuration validation failed:', error.message);
  if (config.isProduction()) {
    throw error;
  }
}

export default config;