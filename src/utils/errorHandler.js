import config from './config.js';

// Error types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  AUTHENTICATION: 'AUTH_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  SERVER: 'SERVER_ERROR',
  CLIENT: 'CLIENT_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Error handler class
class ErrorHandler {
  constructor() {
    this.errorHistory = [];
    this.maxHistorySize = 50;
    
    // Global error listeners
    this.setupGlobalErrorHandlers();
  }
  
  setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.logError(event.reason, ERROR_TYPES.UNKNOWN, ERROR_SEVERITY.HIGH);
    });
    
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('JavaScript error:', event.error);
      this.logError(event.error, ERROR_TYPES.CLIENT, ERROR_SEVERITY.MEDIUM);
    });
  }
  
  // Classify error based on properties
  classifyError(error) {
    if (error.isNetworkError || !navigator.onLine) {
      return ERROR_TYPES.NETWORK;
    }
    
    if (error.isAuthError || error.status === 401) {
      return ERROR_TYPES.AUTHENTICATION;
    }
    
    if (error.isTimeout) {
      return ERROR_TYPES.TIMEOUT;
    }
    
    if (error.status >= 400 && error.status < 500) {
      return ERROR_TYPES.CLIENT;
    }
    
    if (error.status >= 500) {
      return ERROR_TYPES.SERVER;
    }
    
    if (error.name === 'ValidationError') {
      return ERROR_TYPES.VALIDATION;
    }
    
    return ERROR_TYPES.UNKNOWN;
  }
  
  // Get error severity
  getErrorSeverity(error, errorType) {
    if (errorType === ERROR_TYPES.AUTHENTICATION) {
      return ERROR_SEVERITY.HIGH;
    }
    
    if (errorType === ERROR_TYPES.SERVER) {
      return ERROR_SEVERITY.CRITICAL;
    }
    
    if (errorType === ERROR_TYPES.NETWORK || errorType === ERROR_TYPES.TIMEOUT) {
      return ERROR_SEVERITY.MEDIUM;
    }
    
    return ERROR_SEVERITY.LOW;
  }
  
  // Generate user-friendly error message
  getUserFriendlyMessage(error, errorType) {
    const messages = {
      [ERROR_TYPES.NETWORK]: 'Please check your internet connection and try again.',
      [ERROR_TYPES.AUTHENTICATION]: 'Your session has expired. Please log in again.',
      [ERROR_TYPES.TIMEOUT]: 'The request is taking longer than expected. Please try again.',
      [ERROR_TYPES.SERVER]: 'Our servers are temporarily unavailable. Please try again later.',
      [ERROR_TYPES.CLIENT]: 'There was an issue with your request. Please check your input and try again.',
      [ERROR_TYPES.VALIDATION]: 'Please check your input and try again.',
      [ERROR_TYPES.UNKNOWN]: 'An unexpected error occurred. Please try again.'
    };
    
    return messages[errorType] || messages[ERROR_TYPES.UNKNOWN];
  }
  
  // Log error to history and external services
  logError(error, errorType = null, severity = null) {
    const classifiedType = errorType || this.classifyError(error);
    const errorSeverity = severity || this.getErrorSeverity(error, classifiedType);
    
    const errorEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      message: error.message,
      type: classifiedType,
      severity: errorSeverity,
      stack: error.stack,
      status: error.status,
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    // Add to local history
    this.errorHistory.unshift(errorEntry);
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory = this.errorHistory.slice(0, this.maxHistorySize);
    }
    
    // Log to console in development
    if (config.isDevelopment()) {
      console.error('Error logged:', errorEntry);
    }
    
    // Send to external error reporting service in production
    if (config.isProduction() && config.features.errorReporting) {
      this.reportToExternalService(errorEntry);
    }
    
    return errorEntry;
  }
  
  // Report error to external service (placeholder)
  async reportToExternalService(errorEntry) {
    try {
      // This would integrate with services like Sentry, LogRocket, etc.
      // For now, just log to console
      console.log('Would report to external service:', errorEntry);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }
  
  // Handle error with user notification
  handleError(error, options = {}) {
    const {
      showToUser = true,
      customMessage = null,
      context = null
    } = options;
    
    const errorType = this.classifyError(error);
    const severity = this.getErrorSeverity(error, errorType);
    const userMessage = customMessage || this.getUserFriendlyMessage(error, errorType);
    
    // Log the error
    const errorEntry = this.logError(error, errorType, severity);
    
    // Return error information for UI handling
    return {
      id: errorEntry.id,
      type: errorType,
      severity,
      userMessage,
      showToUser,
      context,
      originalError: error
    };
  }
  
  // Get error history
  getErrorHistory() {
    return this.errorHistory;
  }
  
  // Clear error history
  clearErrorHistory() {
    this.errorHistory = [];
  }
  
  // Retry mechanism
  async retry(fn, maxAttempts = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        // Don't retry on authentication or client errors
        const errorType = this.classifyError(error);
        if (errorType === ERROR_TYPES.AUTHENTICATION || errorType === ERROR_TYPES.CLIENT) {
          break;
        }
        
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
      }
    }
    
    throw lastError;
  }
}

// Create singleton instance
const errorHandler = new ErrorHandler();

export default errorHandler;