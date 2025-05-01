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
    }
  ];

  // Additional mockups
  const additionalMockups = [
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
    const allMockups = [...mockupFiles, ...additionalMockups];
    setMockups(allMockups);
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
