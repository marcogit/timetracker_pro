import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import TimerWidget from './components/TimerWidget';
import RecentTimeEntries from './components/RecentTimeEntries';
import WeeklyHoursChart from './components/WeeklyHoursChart';
import QuickActions from './components/QuickActions';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: null,
    role: 'Senior Developer'
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onMenuToggle={handleSidebarToggle} user={user} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content */}
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb />
          </div>

          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading-semibold text-text-primary mb-2">
                  Welcome back, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-text-secondary">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Current Time</p>
                  <p className="text-lg font-heading-medium text-text-primary">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timer Widget - Full Width */}
          <div className="mb-8">
            <TimerWidget />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Recent Time Entries - Left Column */}
            <div className="xl:col-span-5">
              <RecentTimeEntries />
            </div>

            {/* Weekly Hours Chart - Center Column */}
            <div className="xl:col-span-4">
              <WeeklyHoursChart />
            </div>

            {/* Quick Actions - Right Column */}
            <div className="xl:col-span-3">
              <QuickActions />
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {/* Today's Hours */}
            <div className="bg-surface rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-body-medium">Today's Hours</p>
                  <p className="text-2xl font-heading-semibold text-text-primary mt-1">7.5h</p>
                </div>
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <Icon name="TrendingUp" size={16} className="text-success mr-1" />
                  <span className="text-success font-body-medium">+0.5h</span>
                  <span className="text-text-secondary ml-1">from yesterday</span>
                </div>
              </div>
            </div>

            {/* This Week */}
            <div className="bg-surface rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-body-medium">This Week</p>
                  <p className="text-2xl font-heading-semibold text-text-primary mt-1">38.2h</p>
                </div>
                <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={24} className="text-accent" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <Icon name="TrendingUp" size={16} className="text-success mr-1" />
                  <span className="text-success font-body-medium">95%</span>
                  <span className="text-text-secondary ml-1">of target</span>
                </div>
              </div>
            </div>

            {/* Active Projects */}
            <div className="bg-surface rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-body-medium">Active Projects</p>
                  <p className="text-2xl font-heading-semibold text-text-primary mt-1">5</p>
                </div>
                <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
                  <Icon name="FolderOpen" size={24} className="text-warning" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <Icon name="Plus" size={16} className="text-primary mr-1" />
                  <span className="text-primary font-body-medium">2 new</span>
                  <span className="text-text-secondary ml-1">this week</span>
                </div>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-surface rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-body-medium">Pending Approvals</p>
                  <p className="text-2xl font-heading-semibold text-text-primary mt-1">2</p>
                </div>
                <div className="w-12 h-12 bg-error-50 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-error" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <Icon name="Clock" size={16} className="text-warning mr-1" />
                  <span className="text-warning font-body-medium">1 overdue</span>
                  <span className="text-text-secondary ml-1">review needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;