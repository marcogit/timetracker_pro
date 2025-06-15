import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import ProjectTree from './components/ProjectTree';
import ProjectDetails from './components/ProjectDetails';
import CreateProjectModal from './components/CreateProjectModal';
import BulkOperationsModal from './components/BulkOperationsModal';

const ProjectManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [expandedProjects, setExpandedProjects] = useState(new Set(['1', '2']));

  // Mock project data
  const projects = [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Complete redesign and development of the company e-commerce platform with modern UI/UX and enhanced functionality.',
      client: 'TechCorp Solutions',
      status: 'active',
      billingRate: 85.00,
      currency: 'USD',
      teamMembers: [
        { id: '1', name: 'John Doe', role: 'Project Manager', email: 'john.doe@company.com', active: true },
        { id: '2', name: 'Sarah Wilson', role: 'Frontend Developer', email: 'sarah.wilson@company.com', active: true },
        { id: '3', name: 'Mike Johnson', role: 'Backend Developer', email: 'mike.johnson@company.com', active: true }
      ],
      tasks: [
        { id: '1', name: 'User Authentication System', estimation: 40, category: 'Backend', status: 'completed' },
        { id: '2', name: 'Product Catalog Interface', estimation: 32, category: 'Frontend', status: 'in-progress' },
        { id: '3', name: 'Payment Gateway Integration', estimation: 24, category: 'Backend', status: 'pending' }
      ],
      createdAt: '2024-01-15',
      totalHours: 156,
      budgetHours: 320,
      children: []
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application development for iOS and Android with React Native framework.',
      client: 'StartupXYZ',
      status: 'active',
      billingRate: 75.00,
      currency: 'USD',
      teamMembers: [
        { id: '4', name: 'Emily Chen', role: 'Mobile Developer', email: 'emily.chen@company.com', active: true },
        { id: '5', name: 'David Brown', role: 'UI/UX Designer', email: 'david.brown@company.com', active: true }
      ],
      tasks: [
        { id: '4', name: 'App Architecture Setup', estimation: 16, category: 'Development', status: 'completed' },
        { id: '5', name: 'User Interface Design', estimation: 28, category: 'Design', status: 'in-progress' },
        { id: '6', name: 'API Integration', estimation: 20, category: 'Development', status: 'pending' }
      ],
      createdAt: '2024-02-01',
      totalHours: 89,
      budgetHours: 200,
      children: [
        {
          id: '2-1',
          name: 'iOS Development',
          description: 'Native iOS development and App Store deployment.',
          client: 'StartupXYZ',
          status: 'active',
          billingRate: 80.00,
          currency: 'USD',
          teamMembers: [
            { id: '6', name: 'Alex Rodriguez', role: 'iOS Developer', email: 'alex.rodriguez@company.com', active: true }
          ],
          tasks: [
            { id: '7', name: 'iOS UI Components', estimation: 24, category: 'Development', status: 'in-progress' }
          ],
          createdAt: '2024-02-15',
          totalHours: 45,
          budgetHours: 100,
          children: []
        }
      ]
    },
    {
      id: '3',
      name: 'Data Analytics Dashboard',
      description: 'Business intelligence dashboard with real-time data visualization and reporting capabilities.',
      client: 'DataCorp Inc',
      status: 'completed',
      billingRate: 95.00,
      currency: 'USD',
      teamMembers: [
        { id: '7', name: 'Lisa Wang', role: 'Data Analyst', email: 'lisa.wang@company.com', active: false },
        { id: '8', name: 'Tom Anderson', role: 'Full Stack Developer', email: 'tom.anderson@company.com', active: false }
      ],
      tasks: [
        { id: '8', name: 'Data Pipeline Setup', estimation: 32, category: 'Backend', status: 'completed' },
        { id: '9', name: 'Dashboard UI Development', estimation: 40, category: 'Frontend', status: 'completed' }
      ],
      createdAt: '2023-11-01',
      totalHours: 280,
      budgetHours: 280,
      children: []
    }
  ];

  const clients = [
    'TechCorp Solutions',
    'StartupXYZ',
    'DataCorp Inc',
    'InnovateLab',
    'DigitalFirst Agency'
  ];

  const teamMembers = [
    { id: '1', name: 'John Doe', role: 'Project Manager', email: 'john.doe@company.com' },
    { id: '2', name: 'Sarah Wilson', role: 'Frontend Developer', email: 'sarah.wilson@company.com' },
    { id: '3', name: 'Mike Johnson', role: 'Backend Developer', email: 'mike.johnson@company.com' },
    { id: '4', name: 'Emily Chen', role: 'Mobile Developer', email: 'emily.chen@company.com' },
    { id: '5', name: 'David Brown', role: 'UI/UX Designer', email: 'david.brown@company.com' },
    { id: '6', name: 'Alex Rodriguez', role: 'iOS Developer', email: 'alex.rodriguez@company.com' },
    { id: '7', name: 'Lisa Wang', role: 'Data Analyst', email: 'lisa.wang@company.com' },
    { id: '8', name: 'Tom Anderson', role: 'Full Stack Developer', email: 'tom.anderson@company.com' }
  ];

  // Filter projects based on search term
  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects;
    
    const filterProject = (project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const filteredChildren = project.children.map(filterProject).filter(Boolean);
      
      if (matchesSearch || filteredChildren.length > 0) {
        return { ...project, children: filteredChildren };
      }
      
      return null;
    };
    
    return projects.map(filterProject).filter(Boolean);
  }, [projects, searchTerm]);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleProjectToggle = (projectId) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const handleProjectUpdate = (updatedProject) => {
    // Handle project update logic
    console.log('Project updated:', updatedProject);
    setSelectedProject(updatedProject);
  };

  const handleBulkOperation = (operation, projectIds) => {
    console.log('Bulk operation:', operation, projectIds);
    setIsBulkModalOpen(false);
    setSelectedProjects([]);
  };

  const customBreadcrumbs = [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Administration', path: '#', icon: 'Settings' },
    { name: 'Projects', path: '/project-management', icon: 'FolderOpen', current: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4">
              <div>
                <h1 className="text-2xl font-heading-semibold text-text-primary">Project Management</h1>
                <p className="text-text-secondary mt-1">Configure project structures, assign team members, and manage time tracking categories</p>
              </div>
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                {selectedProjects.length > 0 && (
                  <button
                    onClick={() => setIsBulkModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-secondary text-text-primary border border-border rounded-lg font-body-medium hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors duration-150 ease-out"
                  >
                    <Icon name="Settings" size={16} className="mr-2" />
                    Bulk Actions ({selectedProjects.length})
                  </button>
                )}
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  New Project
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Left Panel - Project Tree (40%) */}
            <div className="xl:col-span-2">
              <div className="bg-surface rounded-lg border border-border h-[calc(100vh-12rem)]">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading-medium text-text-primary">Projects</h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setExpandedProjects(new Set(projects.map(p => p.id)))}
                        className="p-1 text-text-secondary hover:text-primary transition-colors duration-150 ease-out"
                        title="Expand All"
                      >
                        <Icon name="ChevronDown" size={16} />
                      </button>
                      <button
                        onClick={() => setExpandedProjects(new Set())}
                        className="p-1 text-text-secondary hover:text-primary transition-colors duration-150 ease-out"
                        title="Collapse All"
                      >
                        <Icon name="ChevronUp" size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Search */}
                  <div className="relative">
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="overflow-y-auto h-[calc(100%-5rem)]">
                  <ProjectTree
                    projects={filteredProjects}
                    selectedProject={selectedProject}
                    expandedProjects={expandedProjects}
                    selectedProjects={selectedProjects}
                    onProjectSelect={handleProjectSelect}
                    onProjectToggle={handleProjectToggle}
                    onSelectionChange={setSelectedProjects}
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Project Details (60%) */}
            <div className="xl:col-span-3">
              <div className="bg-surface rounded-lg border border-border h-[calc(100vh-12rem)]">
                {selectedProject ? (
                  <ProjectDetails
                    project={selectedProject}
                    clients={clients}
                    teamMembers={teamMembers}
                    onProjectUpdate={handleProjectUpdate}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="FolderOpen" size={32} className="text-text-secondary" />
                      </div>
                      <h3 className="font-heading-medium text-text-primary mb-2">Select a Project</h3>
                      <p className="text-text-secondary">Choose a project from the list to view and edit its details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {isCreateModalOpen && (
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          clients={clients}
          teamMembers={teamMembers}
          onProjectCreate={(newProject) => {
            console.log('New project created:', newProject);
            setIsCreateModalOpen(false);
          }}
        />
      )}

      {isBulkModalOpen && (
        <BulkOperationsModal
          isOpen={isBulkModalOpen}
          onClose={() => setIsBulkModalOpen(false)}
          selectedProjects={selectedProjects}
          onBulkOperation={handleBulkOperation}
        />
      )}
    </div>
  );
};

export default ProjectManagement;