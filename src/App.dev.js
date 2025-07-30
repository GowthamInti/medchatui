import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components directly without authentication
import Chat from './components/Chat';
import GrammarRules from './components/GrammarRules';
import Login from './components/Login';
import Navigation from './components/Navigation';

// Mock context for development
const MockAuthContext = React.createContext();

const MockAuthProvider = ({ children }) => {
  const [user] = useState({ username: 'dev_user', token: 'dev_token' });
  
  const mockAuthValue = {
    user,
    login: async () => ({ success: true }),
    logout: () => console.log('Logout clicked'),
    register: async () => ({ success: true }),
    loading: false,
  };

  return (
    <MockAuthContext.Provider value={mockAuthValue}>
      {children}
    </MockAuthContext.Provider>
  );
};

// Development showcase component
const DevShowcase = () => {
  const [currentView, setCurrentView] = useState('overview');

  const views = [
    { id: 'overview', name: 'Overview', component: OverviewComponent },
    { id: 'login', name: 'Login Form', component: LoginComponent },
    { id: 'chat', name: 'Chat Interface', component: ChatComponent },
    { id: 'grammar', name: 'Grammar Rules', component: GrammarComponent },
    { id: 'components', name: 'UI Components', component: ComponentsShowcase },
  ];

  const CurrentComponent = views.find(v => v.id === currentView)?.component || OverviewComponent;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Development Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Medical Chat UI - Development Preview
              </h1>
            </div>
            <div className="flex space-x-1">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setCurrentView(view.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === view.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {view.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CurrentComponent />
      </div>
    </div>
  );
};

// Overview Component
const OverviewComponent = () => (
  <div className="space-y-8">
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Medical Chat UI</h2>
      <p className="text-gray-600 mb-6">
        This is a development preview of the Medical Chat Assistant frontend. 
        Navigate through different views using the tabs above to see all the UI components.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900">Authentication</h3>
          <p className="text-blue-700 text-sm">Modern login/register forms</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900">Chat Interface</h3>
          <p className="text-green-700 text-sm">Real-time messaging UI</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-900">Grammar Rules</h3>
          <p className="text-purple-700 text-sm">Rule management system</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold text-orange-900">Responsive</h3>
          <p className="text-orange-700 text-sm">Mobile-first design</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
      <ul className="space-y-2 text-gray-600">
        <li>✅ Modern React 18 with hooks</li>
        <li>✅ Tailwind CSS styling</li>
        <li>✅ Responsive design</li>
        <li>✅ Authentication flow</li>
        <li>✅ Real-time chat interface</li>
        <li>✅ Error handling</li>
        <li>✅ Loading states</li>
        <li>✅ PWA ready</li>
      </ul>
    </div>
  </div>
);

// Login Component Wrapper
const LoginComponent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Login Form Preview</h2>
    <p className="text-gray-600 mb-6">
      This shows the login/register form with full functionality (form validation, password toggle, etc.)
    </p>
    <div className="border rounded-lg overflow-hidden">
      <Login />
    </div>
  </div>
);

// Chat Component Wrapper
const ChatComponent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Chat Interface Preview</h2>
    <p className="text-gray-600 mb-6">
      This shows the full chat interface with navigation, message history, and input form.
    </p>
    <div className="border rounded-lg overflow-hidden h-96">
      <MockAuthProvider>
        <Chat />
      </MockAuthProvider>
    </div>
  </div>
);

// Grammar Component Wrapper
const GrammarComponent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Grammar Rules Preview</h2>
    <p className="text-gray-600 mb-6">
      This shows the grammar rules management interface with CRUD operations.
    </p>
    <div className="border rounded-lg overflow-hidden">
      <MockAuthProvider>
        <GrammarRules />
      </MockAuthProvider>
    </div>
  </div>
);

// Components Showcase
const ComponentsShowcase = () => (
  <div className="space-y-8">
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">UI Components</h2>
      
      {/* Buttons */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Secondary Button</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Danger Button
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700" disabled>
            Disabled Button
          </button>
        </div>
      </div>

      {/* Form Elements */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Elements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Input</label>
            <input className="input-field" placeholder="Enter text here..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select</label>
            <select className="input-field">
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-900">Basic Card</h4>
            <p className="text-gray-600 text-sm">Simple card content</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900">Info Card</h4>
            <p className="text-blue-700 text-sm">Information card style</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900">Success Card</h4>
            <p className="text-green-700 text-sm">Success card style</p>
          </div>
        </div>
      </div>

      {/* Loading States */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Loading States</h3>
        <div className="flex items-center space-x-4">
          <div className="spinner"></div>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main Development App
function DevApp() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<DevShowcase />} />
      </Routes>
    </Router>
  );
}

export default DevApp;