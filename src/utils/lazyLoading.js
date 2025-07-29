import { lazy, Suspense } from 'react';

// Loading component for lazy loaded routes
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Lazy loading wrapper with error boundary
const withLazyLoading = (importFunc, fallback = <LoadingSpinner />) => {
  const LazyComponent = lazy(importFunc);
  
  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Pre-load components for better UX
export const preloadComponent = (importFunc) => {
  const componentImport = importFunc();
  return componentImport;
};

// Lazy loaded components
export const LazyChat = withLazyLoading(() => import('../components/Chat'));
export const LazyGrammarRules = withLazyLoading(() => import('../components/GrammarRules'));
export const LazyLogin = withLazyLoading(() => import('../components/Login'));

// Export utilities
export default {
  withLazyLoading,
  preloadComponent,
  LoadingSpinner
};