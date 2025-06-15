import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTree = ({
  projects,
  selectedProject,
  expandedProjects,
  selectedProjects,
  onProjectSelect,
  onProjectToggle,
  onSelectionChange,
  level = 0
}) => {
  const handleCheckboxChange = (projectId, checked) => {
    if (checked) {
      onSelectionChange([...selectedProjects, projectId]);
    } else {
      onSelectionChange(selectedProjects.filter(id => id !== projectId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success-50';
      case 'completed':
        return 'text-primary bg-primary-50';
      case 'on-hold':
        return 'text-warning bg-warning-50';
      case 'cancelled':
        return 'text-error bg-error-50';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  const getProgressPercentage = (totalHours, budgetHours) => {
    if (!budgetHours) return 0;
    return Math.min((totalHours / budgetHours) * 100, 100);
  };

  const renderProject = (project) => {
    const isExpanded = expandedProjects.has(project.id);
    const isSelected = selectedProject?.id === project.id;
    const isChecked = selectedProjects.includes(project.id);
    const hasChildren = project.children && project.children.length > 0;
    const progressPercentage = getProgressPercentage(project.totalHours, project.budgetHours);

    return (
      <div key={project.id} className="select-none">
        <div
          className={`flex items-center p-3 hover:bg-secondary-50 cursor-pointer transition-colors duration-150 ease-out ${
            isSelected ? 'bg-primary-50 border-l-2 border-primary' : ''
          }`}
          style={{ paddingLeft: `${12 + level * 20}px` }}
        >
          {/* Checkbox */}
          <div className="flex items-center mr-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(project.id, e.target.checked)}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
          </div>

          {/* Expand/Collapse Button */}
          <div className="flex items-center mr-2">
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onProjectToggle(project.id);
                }}
                className="p-1 hover:bg-secondary-100 rounded transition-colors duration-150 ease-out"
              >
                <Icon
                  name={isExpanded ? "ChevronDown" : "ChevronRight"}
                  size={14}
                  className="text-text-secondary"
                />
              </button>
            ) : (
              <div className="w-6 h-6"></div>
            )}
          </div>

          {/* Project Info */}
          <div
            className="flex-1 min-w-0"
            onClick={() => onProjectSelect(project)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0 flex-1">
                <Icon name="Folder" size={16} className="text-primary mr-2 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-body-medium text-text-primary truncate">{project.name}</h4>
                  <p className="text-xs text-text-secondary truncate">{project.client}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-2">
                <span className={`px-2 py-1 text-xs font-body-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                <span>{project.totalHours}h / {project.budgetHours}h</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                    progressPercentage > 90 ? 'bg-warning' : progressPercentage > 100 ? 'bg-error' : 'bg-primary'
                  }`}
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            <ProjectTree
              projects={project.children}
              selectedProject={selectedProject}
              expandedProjects={expandedProjects}
              selectedProjects={selectedProjects}
              onProjectSelect={onProjectSelect}
              onProjectToggle={onProjectToggle}
              onSelectionChange={onSelectionChange}
              level={level + 1}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {projects.map(renderProject)}
      {projects.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={32} className="text-text-secondary mx-auto mb-3" />
          <p className="text-text-secondary">No projects found</p>
        </div>
      )}
    </div>
  );
};

export default ProjectTree;