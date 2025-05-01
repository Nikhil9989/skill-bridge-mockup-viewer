import React, { useState, useEffect } from 'react';
import { Layers, Columns, Grid, Code, ExternalLink, ChevronRight, ChevronLeft, Monitor, Search } from 'lucide-react';

const MockupViewer = () => {
  const [mockups, setMockups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('grid');
  const [selectedMockup, setSelectedMockup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // List of mockup files and their descriptions
  const mockupFiles = [
    {
      id: 'ai-personalization',
      name: 'AI Personalization',
      filename: 'ai-personalization.tsx',
      description: 'AI-powered learning assistant that provides personalized recommendations and insights based on learning patterns.',
      category: 'AI Features',
      tags: ['personalization', 'ai', 'learning assistant', 'recommendations']
    },
    {
      id: 'career-connections',
      name: 'Career Connections',
      filename: 'career-connections.tsx',
      description: 'Interface for connecting learning with career opportunities, including skill mapping and job matching.',
      category: 'Career Development',
      tags: ['career', 'jobs', 'skills', 'professional development']
    },
    {
      id: 'collaborative-learning',
      name: 'Collaborative Learning',
      filename: 'collaborative-learning.tsx',
      description: 'Tools for collaborative learning, peer feedback, and group projects.',
      category: 'Social Learning',
      tags: ['collaboration', 'groups', 'peer learning', 'teamwork']
    },
    {
      id: 'credential-portfolio-system',
      name: 'Credential & Portfolio System',
      filename: 'credential-portfolio-system-fixed.tsx',
      description: 'System for managing and showcasing credentials, certificates, and portfolio projects.',
      category: 'Assessment & Credentials',
      tags: ['credentials', 'portfolio', 'certification', 'showcase']
    },
    {
      id: 'domain-progression-dashboard',
      name: 'Domain Progression Dashboard',
      filename: 'domain-progression-dashboard.tsx',
      description: 'Dashboard showing progress across different learning domains and skill areas.',
      category: 'Progress Tracking',
      tags: ['dashboard', 'progress', 'domains', 'skills']
    },
    {
      id: 'fixed-dashboard-complete',
      name: 'Learning Analytics Dashboard',
      filename: 'fixed-dashboard-complete.tsx',
      description: 'Comprehensive dashboard with learning analytics, performance metrics, and personalized insights.',
      category: 'Analytics & Feedback',
      tags: ['dashboard', 'analytics', 'metrics', 'feedback']
    },
    {
      id: 'immersive-learning-simulations',
      name: 'Immersive Learning Simulations',
      filename: 'immersive-learning-simulations.tsx',
      description: 'Interactive simulations and immersive learning experiences for practical skill development.',
      category: 'Experiential Learning',
      tags: ['simulations', 'interactive', 'immersive', 'practical']
    },
    {
      id: 'interactive-component',
      name: 'Interactive Learning Component',
      filename: 'interactive-component.tsx',
      description: 'Interactive components for engaging learning experiences with immediate feedback.',
      category: 'Content Delivery',
      tags: ['interactive', 'component', 'engagement', 'feedback']
    },
    {
      id: 'learning-platform-dashboard',
      name: 'Learning Platform Dashboard',
      filename: 'learning-platform-dashboard.tsx',
      description: 'Main dashboard for the learning platform with navigation and overview of learning activities.',
      category: 'Core Platform',
      tags: ['dashboard', 'navigation', 'overview', 'platform']
    },
    {
      id: 'live-session-facilitation',
      name: 'Live Session Facilitation',
      filename: 'live-session-facilitation.tsx',
      description: 'Tools for facilitating live learning sessions, including video, chat, and collaborative features.',
      category: 'Synchronous Learning',
      tags: ['live', 'session', 'video', 'facilitation']
    },
    {
      id: 'microlearning-adaptive-content',
      name: 'Microlearning & Adaptive Content',
      filename: 'microlearning-adaptive-content.tsx',
      description: 'Bite-sized learning modules that adapt based on learner performance and preferences.',
      category: 'Content Delivery',
      tags: ['microlearning', 'adaptive', 'content', 'personalization']
    },
    {
      id: 'multi-resource-learning-module',
      name: 'Multi-Resource Learning Module',
      filename: 'multi-resource-learning-module.tsx',
      description: 'Learning modules that integrate multiple resources and content types for comprehensive learning.',
      category: 'Content Delivery',
      tags: ['resources', 'modules', 'multi-format', 'integration']
    },
    {
      id: 'onboarding-assessment',
      name: 'Onboarding & Assessment',
      filename: 'onboarding-assessment.tsx',
      description: 'User onboarding flow and initial skill assessment to personalize the learning journey.',
      category: 'User Experience',
      tags: ['onboarding', 'assessment', 'skills', 'personalization']
    },
    {
      id: 'personalized-learning-path',
      name: 'Personalized Learning Path',
      filename: 'personalized-learning-path.tsx',
      description: 'Customized learning pathways based on goals, existing skills, and learning preferences.',
      category: 'Personalization',
      tags: ['learning path', 'personalization', 'customization', 'goals']
    },
    {
      id: 'project-based-learning',
      name: 'Project-Based Learning',
      filename: 'project-based-learning.tsx',
      description: 'Project-based learning environment with real-world challenges and outcomes.',
      category: 'Experiential Learning',
      tags: ['projects', 'practical', 'real-world', 'application']
    },
    {
      id: 'project-based-skill-verification',
      name: 'Project-Based Skill Verification',
      filename: 'project-based-skill-verification.tsx',
      description: 'System for verifying skills through project completion and assessment.',
      category: 'Assessment & Credentials',
      tags: ['verification', 'projects', 'assessment', 'skills']
    },
    {
      id: 'real-world-concept-mapping',
      name: 'Real-World Concept Mapping',
      filename: 'real-world-concept-mapping.tsx',
      description: 'Tools for mapping concepts to real-world applications and examples.',
      category: 'Knowledge Management',
      tags: ['concept mapping', 'real-world', 'application', 'context']
    },
    {
      id: 'social-learning-community',
      name: 'Social Learning Community',
      filename: 'social-learning-community.tsx',
      description: 'Community features for social learning, discussion, and knowledge sharing.',
      category: 'Social Learning',
      tags: ['community', 'social', 'discussion', 'sharing']
    }
  ];

  useEffect(() => {
    // Simulate fetching mockups
    setMockups(mockupFiles);
    setLoading(false);
  }, []);

  // Filter mockups based on search query
  const filteredMockups = mockups.filter(mockup => {
    const searchLower = searchQuery.toLowerCase();
    return (
      mockup.name.toLowerCase().includes(searchLower) ||
      mockup.description.toLowerCase().includes(searchLower) ||
      mockup.category.toLowerCase().includes(searchLower) ||
      mockup.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  // Group mockups by category for the category view
  const mockupsByCategory = filteredMockups.reduce((acc, mockup) => {
    if (!acc[mockup.category]) {
      acc[mockup.category] = [];
    }
    acc[mockup.category].push(mockup);
    return acc;
  }, {});

  // Handle mockup selection
  const handleSelectMockup = (mockup) => {
    setSelectedMockup(mockup);
  };

  // Handle back to list view
  const handleBackToList = () => {
    setSelectedMockup(null);
  };

  // External link to GitHub repository
  const handleViewOnGitHub = (mockup) => {
    window.open(`https://github.com/Nikhil9989/skill-bridge-lms-mockups/blob/master/${mockup.filename}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Layers className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-xl font-bold text-slate-800">SKILL BRIDGE LMS Mockups</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-slate-100 p-1 rounded-md flex space-x-1">
                <button 
                  onClick={() => setActiveView('grid')} 
                  className={`p-2 rounded-md ${activeView === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  <Grid size={16} />
                </button>
                <button 
                  onClick={() => setActiveView('list')} 
                  className={`p-2 rounded-md ${activeView === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  <Layers size={16} />
                </button>
                <button 
                  onClick={() => setActiveView('category')} 
                  className={`p-2 rounded-md ${activeView === 'category' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  <Columns size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedMockup ? (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <button 
                onClick={handleBackToList} 
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <ChevronLeft size={20} />
                <span className="ml-1">Back to mockups</span>
              </button>
              <button 
                onClick={() => handleViewOnGitHub(selectedMockup)} 
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <span className="mr-1">View on GitHub</span>
                <ExternalLink size={18} />
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-slate-800">{selectedMockup.name}</h2>
                <p className="text-slate-600 mt-1">{selectedMockup.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {selectedMockup.category}
                  </span>
                  {selectedMockup.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="px-6 py-4 flex flex-col items-center">
                <div className="text-center mb-4">
                  <Monitor size={24} className="inline-block text-slate-400 mb-2" />
                  <p className="text-slate-600 text-sm">This is a React component mockup.</p>
                  <p className="text-slate-600 text-sm mt-1">
                    To view this mockup, please check the GitHub repository.
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleViewOnGitHub(selectedMockup)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Code size={16} className="mr-2" />
                    View Code on GitHub
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-medium text-slate-800">Implementation Notes</h3>
              </div>
              <div className="px-6 py-4">
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-1.5 mr-2"></span>
                    This mockup demonstrates {selectedMockup.name.toLowerCase()} functionality in the SKILL BRIDGE LMS platform.
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-1.5 mr-2"></span>
                    The component is built with React and styled using Tailwind CSS.
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-1.5 mr-2"></span>
                    Lucide React icons are used for the UI elements.
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-1.5 mr-2"></span>
                    This mockup addresses gaps in traditional LMS platforms by focusing on {selectedMockup.tags.join(', ')}.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search mockups by name, description, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading mockups...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <>
                {/* Grid View */}
                {activeView === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMockups.map((mockup) => (
                      <div 
                        key={mockup.id} 
                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleSelectMockup(mockup)}
                      >
                        <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center p-4">
                          <div className="bg-white/20 p-4 rounded-full">
                            <Layers size={40} className="text-white" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-slate-800 mb-1">{mockup.name}</h3>
                          <p className="text-sm text-slate-600 line-clamp-2">{mockup.description}</p>
                          <div className="mt-3 flex justify-between items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {mockup.category}
                            </span>
                            <button 
                              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewOnGitHub(mockup);
                              }}
                            >
                              <Code size={16} className="mr-1" />
                              <span className="text-xs">View Code</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* List View */}
                {activeView === 'list' && (
                  <div className="bg-white overflow-hidden rounded-xl shadow-sm">
                    <ul className="divide-y divide-slate-200">
                      {filteredMockups.map((mockup) => (
                        <li 
                          key={mockup.id} 
                          className="hover:bg-slate-50 cursor-pointer"
                          onClick={() => handleSelectMockup(mockup)}
                        >
                          <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-indigo-100 p-2 rounded-md mr-4">
                                  <Layers size={20} className="text-indigo-600" />
                                </div>
                                <div>
                                  <h3 className="text-md font-medium text-slate-800">{mockup.name}</h3>
                                  <p className="text-sm text-slate-600 mt-1">{mockup.description}</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                      {mockup.category}
                                    </span>
                                    {mockup.tags.slice(0, 3).map(tag => (
                                      <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                        {tag}
                                      </span>
                                    ))}
                                    {mockup.tags.length > 3 && (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                                        +{mockup.tags.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button 
                                  className="text-indigo-600 hover:text-indigo-800 p-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewOnGitHub(mockup);
                                  }}
                                >
                                  <ExternalLink size={18} />
                                </button>
                                <button className="text-slate-400">
                                  <ChevronRight size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Category View */}
                {activeView === 'category' && (
                  <div className="space-y-8">
                    {Object.entries(mockupsByCategory).map(([category, mockups]) => (
                      <div key={category}>
                        <h2 className="text-lg font-semibold text-slate-800 mb-4">{category}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {mockups.map((mockup) => (
                            <div 
                              key={mockup.id} 
                              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-slate-200"
                              onClick={() => handleSelectMockup(mockup)}
                            >
                              <div className="p-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="bg-indigo-100 p-1.5 rounded-md">
                                    <Layers size={16} className="text-indigo-600" />
                                  </div>
                                  <h3 className="text-md font-medium text-slate-800">{mockup.name}</h3>
                                </div>
                                <p className="text-sm text-slate-600 line-clamp-2">{mockup.description}</p>
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {mockup.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                      {tag}
                                    </span>
                                  ))}
                                  {mockup.tags.length > 2 && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                                      +{mockup.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredMockups.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-slate-600">No mockups found matching your search.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm">
            SKILL BRIDGE LMS Mockups — Addressing gaps in traditional Learning Management Systems
          </p>
          <p className="text-center text-slate-400 text-xs mt-1">
            <a 
              href="https://github.com/Nikhil9989/skill-bridge-lms-mockups" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MockupViewer;