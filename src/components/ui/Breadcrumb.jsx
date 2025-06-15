import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': { name: 'Dashboard', icon: 'LayoutDashboard' },
    '/time-entry': { name: 'Time Entry', icon: 'Clock' },
    '/timesheet-view': { name: 'Timesheet View', icon: 'Calendar' },
    '/project-management': { name: 'Project Management', icon: 'FolderOpen' },
    '/approval-workflow': { name: 'Approval Workflow', icon: 'CheckCircle' },
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    if (location.pathname !== '/dashboard') {
      breadcrumbs.push({
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'LayoutDashboard'
      });
    }

    // Add current page
    const currentRoute = routeMap[location.pathname];
    if (currentRoute) {
      breadcrumbs.push({
        name: currentRoute.name,
        path: location.pathname,
        icon: currentRoute.icon,
        current: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path, isCurrent) => {
    if (!isCurrent) {
      navigate(path);
    }
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon
                name="ChevronRight"
                size={14}
                className="text-text-secondary mx-2"
              />
            )}
            <button
              onClick={() => handleBreadcrumbClick(breadcrumb.path, breadcrumb.current)}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors duration-150 ease-out ${
                breadcrumb.current
                  ? 'text-text-primary font-body-medium cursor-default' :'text-text-secondary hover:text-primary hover:bg-secondary-50'
              }`}
              disabled={breadcrumb.current}
              aria-current={breadcrumb.current ? 'page' : undefined}
            >
              <Icon
                name={breadcrumb.icon}
                size={14}
                className={breadcrumb.current ? 'text-primary' : 'text-text-secondary'}
              />
              <span>{breadcrumb.name}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;