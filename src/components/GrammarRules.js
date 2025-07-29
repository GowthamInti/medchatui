import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, BookOpen } from 'lucide-react';
import Navigation from './Navigation';

// Copy GrammarRules component body here
function GrammarRules() {
  const [rules, setRules] = useState([
    { id: 1, name: 'Basic Greeting', pattern: 'hello|hi|hey', response: 'Hello! How can I help you?', active: true },
    { id: 2, name: 'Question Pattern', pattern: '\\?$', response: 'That\'s an interesting question!', active: true }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    pattern: '',
    response: '',
    active: true
  });

  const handleCreateRule = async (e) => {
    e.preventDefault();
    try {
      const newRule = {
        id: Date.now(),
        ...formData
      };
      setRules(prev => [...prev, newRule]);
      setFormData({ name: '', pattern: '', response: '', active: true });
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating rule:', error);
    }
  };

  const handleEditRule = async (e) => {
    e.preventDefault();
    try {
      setRules(prev => prev.map(rule => 
        rule.id === editingRule.id ? { ...rule, ...formData } : rule
      ));
      setEditingRule(null);
      setFormData({ name: '', pattern: '', response: '', active: true });
    } catch (error) {
      console.error('Error updating rule:', error);
    }
  };

  const handleDeleteRule = async (id) => {
    try {
      setRules(prev => prev.filter(rule => rule.id !== id));
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  const startEdit = (rule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      pattern: rule.pattern,
      response: rule.response,
      active: rule.active
    });
  };

  const cancelEdit = () => {
    setEditingRule(null);
    setIsCreating(false);
    setFormData({ name: '', pattern: '', response: '', active: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Grammar Rules</h1>
          <p className="text-gray-600">Manage custom grammar rules for your chatbot</p>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingRule) && (
          <div className="bg-white rounded-lg shadow-sm border mb-6 p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingRule ? 'Edit Rule' : 'Create New Rule'}
            </h2>
            <form onSubmit={editingRule ? handleEditRule : handleCreateRule} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rule Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter rule name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pattern (Regex)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pattern}
                    onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter regex pattern"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response
                </label>
                <textarea
                  required
                  value={formData.response}
                  onChange={(e) => setFormData({ ...formData, response: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter response text"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                  Active
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                >
                  <Save className="w-4 h-4 mr-1" />
                  {editingRule ? 'Update Rule' : 'Create Rule'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Rules List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Existing Rules</h2>
            {!isCreating && !editingRule && (
              <button
                onClick={() => setIsCreating(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Rule
              </button>
            )}
          </div>
          
          <div className="divide-y divide-gray-200">
            {rules.map((rule) => (
              <div key={rule.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{rule.name}</h3>
                      <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                        rule.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      <strong>Pattern:</strong> <code className="bg-gray-100 px-1 rounded">{rule.pattern}</code>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Response:</strong> {rule.response}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => startEdit(rule)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {rules.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">No grammar rules yet</p>
                <p className="text-sm">Create your first rule to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}