import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = ({ onMenuToggle, user = { name: 'John Doe', email: 'john.doe@company.com', avatar: null } }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Timesheet Approved', message: 'Your timesheet for last week has been approved', time: '2 hours ago', unread: true },
    { id: 2, title: 'Project Deadline', message: 'Project Alpha deadline is approaching', time: '4 hours ago', unread: true },
    { id: 3, title: 'Time Entry Reminder', message: 'Don\'t forget to log your time for today', time: '1 day ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  const handleProfileClick = () => {
    // Handle profile navigation
    console.log('Navigate to profile...');
  };

  const handleSettingsClick = () => {
    // Handle settings navigation
    console.log('Navigate to settings...');
  };

  const markNotificationAsRead = (id) => {
    // Handle marking notification as read
    console.log('Mark notification as read:', id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000 h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Menu Toggle */}
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150 ease-out"
            aria-label="Toggle menu"
          >
            <Icon name="Menu" size={20} className="text-text-primary" />
          </button>
        </div>

        {/* Right Section - Notifications and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150 ease-out"
              aria-label="Notifications"
            >
              <Icon name="Bell" size={20} className="text-text-primary" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-modal border border-border z-1001">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading-medium text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border hover:bg-secondary-50 cursor-pointer transition-colors duration-150 ease-out ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-body-medium text-text-primary text-sm">{notification.title}</h4>
                          <p className="text-text-secondary text-sm mt-1">{notification.message}</p>
                          <span className="text-text-secondary text-xs mt-2 block">{notification.time}</span>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <button className="text-primary text-sm font-body-medium hover:text-primary-700 transition-colors duration-150 ease-out">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150 ease-out"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <span className="text-white text-sm font-heading-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-text-primary text-sm font-body-medium">{user.name}</p>
                <p className="text-text-secondary text-xs">{user.email}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface rounded-lg shadow-modal border border-border z-1001">
                <div className="p-4 border-b border-border">
                  <p className="font-body-medium text-text-primary">{user.name}</p>
                  <p className="text-text-secondary text-sm">{user.email}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-colors duration-150 ease-out"
                  >
                    <Icon name="User" size={16} className="mr-3" />
                    Profile
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-colors duration-150 ease-out"
                  >
                    <Icon name="Settings" size={16} className="mr-3" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-150 ease-out"
                  >
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile dropdowns */}
      {(isUserMenuOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-999"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;