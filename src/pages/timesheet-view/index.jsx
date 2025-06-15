import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import TimesheetTable from './components/TimesheetTable';
import WeeklyGrid from './components/WeeklyGrid';
import MonthlyView from './components/MonthlyView';
import FilterPanel from './components/FilterPanel';
import ExportModal from './components/ExportModal';
import EditTimeModal from './components/EditTimeModal';

const TimesheetView = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('weekly'); // daily, weekly, monthly
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [filters, setFilters] = useState({
    project: '',
    client: '',
    status: '',
    search: ''
  });

  // Mock timesheet data
  const timesheetData = [
    {
      id: 1,
      date: '2024-01-15',
      project: 'Website Redesign',
      client: 'TechCorp Inc.',
      task: 'Frontend Development',
      startTime: '09:00',
      endTime: '12:30',
      hours: 3.5,
      status: 'approved',
      description: 'Implemented responsive navigation component with mobile optimization',
      billable: true
    },
    {
      id: 2,
      date: '2024-01-15',
      project: 'Mobile App',
      client: 'StartupXYZ',
      task: 'UI Design',
      startTime: '13:30',
      endTime: '17:00',
      hours: 3.5,
      status: 'pending',
      description: 'Created wireframes for user onboarding flow',
      billable: true
    },
    {
      id: 3,
      date: '2024-01-16',
      project: 'Internal Tools',
      client: 'Internal',
      task: 'Bug Fixes',
      startTime: '09:00',
      endTime: '11:00',
      hours: 2.0,
      status: 'draft',
      description: 'Fixed authentication issues in admin panel',
      billable: false
    },
    {
      id: 4,
      date: '2024-01-16',
      project: 'Website Redesign',
      client: 'TechCorp Inc.',
      task: 'Backend Integration',
      startTime: '11:30',
      endTime: '16:30',
      hours: 5.0,
      status: 'approved',
      description: 'Integrated payment gateway and user authentication APIs',
      billable: true
    },
    {
      id: 5,
      date: '2024-01-17',
      project: 'Mobile App',
      client: 'StartupXYZ',
      task: 'Development',
      startTime: '09:00',
      endTime: '17:00',
      hours: 8.0,
      status: 'pending',
      description: 'Implemented user registration and profile management features',
      billable: true
    }
  ];

  const projects = [
    { id: 1, name: 'Website Redesign', client: 'TechCorp Inc.' },
    { id: 2, name: 'Mobile App', client: 'StartupXYZ' },
    { id: 3, name: 'Internal Tools', client: 'Internal' },
    { id: 4, name: 'E-commerce Platform', client: 'RetailCorp' }
  ];

  const clients = [
    { id: 1, name: 'TechCorp Inc.' },
    { id: 2, name: 'StartupXYZ' },
    { id: 3, name: 'Internal' },
    { id: 4, name: 'RetailCorp' }
  ];

  // Filter timesheet data based on current filters
  const filteredData = timesheetData.filter(entry => {
    const matchesProject = !filters.project || entry.project === filters.project;
    const matchesClient = !filters.client || entry.client === filters.client;
    const matchesStatus = !filters.status || entry.status === filters.status;
    const matchesSearch = !filters.search || 
      entry.project.toLowerCase().includes(filters.search.toLowerCase()) ||
      entry.task.toLowerCase().includes(filters.search.toLowerCase()) ||
      entry.description.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesProject && matchesClient && matchesStatus && matchesSearch;
  });

  // Calculate totals
  const totalHours = filteredData.reduce((sum, entry) => sum + entry.hours, 0);
  const billableHours = filteredData.filter(entry => entry.billable).reduce((sum, entry) => sum + entry.hours, 0);
  const overtimeHours = Math.max(0, totalHours - 40);

  const handleDateNavigation = (direction) => {
    const newDate = new Date(selectedDate);
    if (currentView === 'daily') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (currentView === 'weekly') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (currentView === 'monthly') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setSelectedDate(newDate);
  };

  const handleEntryEdit = (entry) => {
    setEditingEntry(entry);
    setIsEditModalOpen(true);
  };

  const handleEntryDelete = (entryId) => {
    if (window.confirm('Are you sure you want to delete this time entry?')) {
      console.log('Delete entry:', entryId);
      // Handle delete logic here
    }
  };

  const handleBulkAction = (action) => {
    if (selectedEntries.length === 0) {
      alert('Please select entries to perform bulk actions');
      return;
    }
    
    switch (action) {
      case 'submit': console.log('Submit entries for approval:', selectedEntries);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedEntries.length} entries?`)) {
          console.log('Delete entries:', selectedEntries);
        }
        break;
      default:
        break;
    }
    setSelectedEntries([]);
  };

  const formatDateRange = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    if (currentView === 'daily') {
      return selectedDate.toLocaleDateString('en-US', options);
    } else if (currentView === 'weekly') {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
  };

  const customBreadcrumbs = [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Timesheets', path: '/timesheet-view', icon: 'Calendar' },
    { name: formatDateRange(), path: '/timesheet-view', icon: 'Calendar', current: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
          </div>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading-semibold text-text-primary mb-2">Timesheet View</h1>
              <p className="text-text-secondary">Review and manage your time entries</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-surface text-text-primary border border-border rounded-lg font-body-medium hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </button>
              <button
                onClick={() => navigate('/time-entry')}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Add Time Entry
              </button>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
            {/* View Toggle */}
            <div className="flex items-center bg-surface border border-border rounded-lg p-1">
              {['daily', 'weekly', 'monthly'].map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-4 py-2 text-sm font-body-medium rounded-md transition-colors duration-150 ease-out ${
                    currentView === view
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>

            {/* Date Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleDateNavigation('prev')}
                className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150 ease-out"
              >
                <Icon name="ChevronLeft" size={20} className="text-text-primary" />
              </button>
              <div className="text-center min-w-48">
                <h2 className="text-lg font-heading-medium text-text-primary">{formatDateRange()}</h2>
              </div>
              <button
                onClick={() => handleDateNavigation('next')}
                className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150 ease-out"
              >
                <Icon name="ChevronRight" size={20} className="text-text-primary" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                projects={projects}
                clients={clients}
              />

              {/* Bulk Actions */}
              {selectedEntries.length > 0 && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-body-medium">
                      {selectedEntries.length} entries selected
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleBulkAction('submit')}
                        className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary-700 transition-colors duration-150 ease-out"
                      >
                        Submit for Approval
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete')}
                        className="px-3 py-1 bg-error text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-150 ease-out"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Timesheet Content */}
              <div className="bg-surface rounded-lg border border-border">
                {currentView === 'daily' && (
                  <TimesheetTable
                    data={filteredData}
                    selectedEntries={selectedEntries}
                    onSelectionChange={setSelectedEntries}
                    onEdit={handleEntryEdit}
                    onDelete={handleEntryDelete}
                  />
                )}
                {currentView === 'weekly' && (
                  <WeeklyGrid
                    data={filteredData}
                    selectedDate={selectedDate}
                    onEdit={handleEntryEdit}
                  />
                )}
                {currentView === 'monthly' && (
                  <MonthlyView
                    data={filteredData}
                    selectedDate={selectedDate}
                    onEdit={handleEntryEdit}
                  />
                )}
              </div>
            </div>

            {/* Right Panel - Summary */}
            <div className="xl:col-span-1">
              <div className="bg-surface rounded-lg border border-border p-6">
                <h3 className="text-lg font-heading-medium text-text-primary mb-4">Period Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Total Hours</span>
                    <span className="font-body-medium text-text-primary">{totalHours.toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Billable Hours</span>
                    <span className="font-body-medium text-text-primary">{billableHours.toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Non-billable Hours</span>
                    <span className="font-body-medium text-text-primary">{(totalHours - billableHours).toFixed(1)}h</span>
                  </div>
                  {overtimeHours > 0 && (
                    <div className="flex justify-between items-center text-warning">
                      <span>Overtime Hours</span>
                      <span className="font-body-medium">{overtimeHours.toFixed(1)}h</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-border mt-6 pt-6">
                  <h4 className="font-heading-medium text-text-primary mb-3">Approval Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-secondary">Approved</span>
                      <span className="text-success font-body-medium">
                        {filteredData.filter(e => e.status === 'approved').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-secondary">Pending</span>
                      <span className="text-warning font-body-medium">
                        {filteredData.filter(e => e.status === 'pending').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-secondary">Draft</span>
                      <span className="text-text-secondary font-body-medium">
                        {filteredData.filter(e => e.status === 'draft').length}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBulkAction('submit')}
                  className="w-full mt-6 px-4 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out"
                >
                  Submit All for Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {isExportModalOpen && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          data={filteredData}
        />
      )}

      {isEditModalOpen && (
        <EditTimeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          entry={editingEntry}
          projects={projects}
        />
      )}
    </div>
  );
};

export default TimesheetView;