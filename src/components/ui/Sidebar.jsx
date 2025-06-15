import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationSections = [
    {
      title: 'Overview',
      items: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: 'LayoutDashboard',
          description: 'Overview and quick actions'
        }
      ]
    },
    {
      title: 'Time Tracking',
      items: [
        {
          name: 'Time Entry',
          path: '/time-entry',
          icon: 'Clock',
          description: 'Log your daily time'
        },
        {
          name: 'Timesheet View',
          path: '/timesheet-view',
          icon: 'Calendar',
          description: 'Review and manage timesheets'
        }
      ]
    },
    {
      title: 'Management',
      items: [
        {
          name: 'Approval Workflow',
          path: '/approval-workflow',
          icon: 'CheckCircle',
          description: 'Review and approve timesheets'
        }
      ]
    },
    {
      title: 'Administration',
      items: [
        {
          name: 'Project Management',
          path: '/project-management',
          icon: 'FolderOpen',
          description: 'Manage projects and settings'
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-1001 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 bg-surface border-r border-border z-1002 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Timer" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-heading-semibold text-text-primary text-lg">TimeTracker</h1>
                <p className="text-text-secondary text-xs">Enterprise Edition</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {navigationSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="nav-section">
                <h3 className="nav-section-title">{section.title}</h3>
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`nav-item w-full text-left group ${
                          isActivePath(item.path) ? 'active' : ''
                        }`}
                        title={item.description}
                      >
                        <Icon
                          name={item.icon}
                          size={18}
                          className={`mr-3 transition-colors duration-150 ease-out ${
                            isActivePath(item.path) ? 'text-white' : 'text-text-secondary group-hover:text-primary'
                          }`}
                        />
                        <span className="font-body-medium">{item.name}</span>
                        {isActivePath(item.path) && (
                          <div className="ml-auto w-1 h-1 bg-white rounded-full"></div>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>v2.1.0</span>
              <button
                className="flex items-center space-x-1 hover:text-primary transition-colors duration-150 ease-out"
                onClick={() => console.log('Help clicked')}
              >
                <Icon name="HelpCircle" size={14} />
                <span>Help</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;