import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import PendingApprovals from './components/PendingApprovals';
import ApprovedEntries from './components/ApprovedEntries';
import RejectedSubmissions from './components/RejectedSubmissions';
import ApprovalStats from './components/ApprovalStats';
import FilterControls from './components/FilterControls';

const ApprovalWorkflow = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [filters, setFilters] = useState({
    employee: '',
    department: '',
    dateRange: 'all',
    hoursThreshold: '',
    search: ''
  });

  // Mock data for timesheets
  const mockTimesheets = [
    {
      id: 1,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP001',
      department: 'Engineering',
      period: '2024-01-15 to 2024-01-21',
      totalHours: 42.5,
      overtimeHours: 2.5,
      submissionDate: '2024-01-22T09:30:00Z',
      status: 'pending',
      entries: [
        { date: '2024-01-15', project: 'Project Alpha', hours: 8.5, notes: 'Frontend development' },
        { date: '2024-01-16', project: 'Project Beta', hours: 8.0, notes: 'Code review and testing' },
        { date: '2024-01-17', project: 'Project Alpha', hours: 8.0, notes: 'Bug fixes' },
        { date: '2024-01-18', project: 'Project Gamma', hours: 9.0, notes: 'New feature implementation' },
        { date: '2024-01-19', project: 'Project Alpha', hours: 9.0, notes: 'Performance optimization' }
      ],
      employeeNotes: 'Extra hours spent on critical bug fixes for production release.',
      policyViolations: ['overtime_threshold']
    },
    {
      id: 2,
      employeeName: 'Michael Chen',
      employeeId: 'EMP002',
      department: 'Marketing',
      period: '2024-01-15 to 2024-01-21',
      totalHours: 40.0,
      overtimeHours: 0,
      submissionDate: '2024-01-22T10:15:00Z',
      status: 'pending',
      entries: [
        { date: '2024-01-15', project: 'Campaign Launch', hours: 8.0, notes: 'Campaign strategy meeting' },
        { date: '2024-01-16', project: 'Content Creation', hours: 8.0, notes: 'Blog post writing' },
        { date: '2024-01-17', project: 'Campaign Launch', hours: 8.0, notes: 'Social media planning' },
        { date: '2024-01-18', project: 'Analytics Review', hours: 8.0, notes: 'Monthly report preparation' },
        { date: '2024-01-19', project: 'Campaign Launch', hours: 8.0, notes: 'Final campaign review' }
      ],
      employeeNotes: 'Standard work week with focus on Q1 campaign launch.',
      policyViolations: []
    },
    {
      id: 3,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP003',
      department: 'Design',
      period: '2024-01-08 to 2024-01-14',
      totalHours: 40.0,
      overtimeHours: 0,
      submissionDate: '2024-01-15T14:20:00Z',
      status: 'approved',
      approvedBy: 'John Manager',
      approvedDate: '2024-01-16T09:00:00Z',
      entries: [
        { date: '2024-01-08', project: 'UI Redesign', hours: 8.0, notes: 'Wireframe creation' },
        { date: '2024-01-09', project: 'UI Redesign', hours: 8.0, notes: 'Design mockups' },
        { date: '2024-01-10', project: 'Brand Guidelines', hours: 8.0, notes: 'Logo variations' },
        { date: '2024-01-11', project: 'UI Redesign', hours: 8.0, notes: 'Prototype development' },
        { date: '2024-01-12', project: 'UI Redesign', hours: 8.0, notes: 'User testing preparation' }
      ],
      employeeNotes: 'Completed UI redesign phase 1 ahead of schedule.',
      policyViolations: []
    },
    {
      id: 4,
      employeeName: 'David Kim',
      employeeId: 'EMP004',
      department: 'Engineering',
      period: '2024-01-01 to 2024-01-07',
      totalHours: 35.0,
      overtimeHours: 0,
      submissionDate: '2024-01-08T16:45:00Z',
      status: 'rejected',
      rejectedBy: 'Jane Supervisor',
      rejectedDate: '2024-01-09T11:30:00Z',
      rejectionReason: 'Insufficient detail in time entries. Please provide more specific task descriptions.',
      entries: [
        { date: '2024-01-01', project: 'Project Delta', hours: 7.0, notes: 'Work' },
        { date: '2024-01-02', project: 'Project Delta', hours: 7.0, notes: 'Development' },
        { date: '2024-01-03', project: 'Project Epsilon', hours: 7.0, notes: 'Coding' },
        { date: '2024-01-04', project: 'Project Delta', hours: 7.0, notes: 'Testing' },
        { date: '2024-01-05', project: 'Project Epsilon', hours: 7.0, notes: 'Bug fixes' }
      ],
      employeeNotes: 'Regular development work across multiple projects.',
      policyViolations: ['insufficient_detail']
    }
  ];

  const filteredTimesheets = useMemo(() => {
    return mockTimesheets.filter(timesheet => {
      if (activeTab !== 'all' && timesheet.status !== activeTab) return false;
      if (filters.employee && !timesheet.employeeName.toLowerCase().includes(filters.employee.toLowerCase())) return false;
      if (filters.department && timesheet.department !== filters.department) return false;
      if (filters.hoursThreshold && timesheet.totalHours < parseFloat(filters.hoursThreshold)) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return timesheet.employeeName.toLowerCase().includes(searchLower) ||
               timesheet.employeeId.toLowerCase().includes(searchLower) ||
               timesheet.department.toLowerCase().includes(searchLower);
      }
      return true;
    });
  }, [mockTimesheets, activeTab, filters]);

  const tabCounts = useMemo(() => {
    return {
      pending: mockTimesheets.filter(t => t.status === 'pending').length,
      approved: mockTimesheets.filter(t => t.status === 'approved').length,
      rejected: mockTimesheets.filter(t => t.status === 'rejected').length
    };
  }, [mockTimesheets]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleApproval = (timesheetId, action, comment = '') => {
    console.log(`${action} timesheet ${timesheetId}`, comment);
    // Handle approval/rejection logic here
  };

  const handleBulkApproval = (timesheetIds, action, comment = '') => {
    console.log(`Bulk ${action} for timesheets:`, timesheetIds, comment);
    // Handle bulk approval logic here
  };

  const tabs = [
    { id: 'pending', label: 'Pending Approvals', count: tabCounts.pending, icon: 'Clock' },
    { id: 'approved', label: 'Approved', count: tabCounts.approved, icon: 'CheckCircle' },
    { id: 'rejected', label: 'Rejected', count: tabCounts.rejected, icon: 'XCircle' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-200 ease-in-out ${isSidebarOpen ? 'lg:ml-60' : 'lg:ml-60'} pt-16`}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <Breadcrumb />
            <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-heading-semibold text-text-primary">Approval Workflow</h1>
                <p className="text-text-secondary mt-1">Review and manage timesheet submissions</p>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                <button className="inline-flex items-center px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-secondary-50 transition-colors duration-150 ease-out">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Report
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-150 ease-out">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Approval Settings
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-3">
              {/* Filter Controls */}
              <FilterControls filters={filters} onFilterChange={handleFilterChange} />

              {/* Tabs */}
              <div className="bg-surface rounded-lg border border-border overflow-hidden">
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center py-4 px-1 border-b-2 font-body-medium text-sm transition-colors duration-150 ease-out ${
                          activeTab === tab.id
                            ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} className="mr-2" />
                        {tab.label}
                        {tab.count > 0 && (
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium ${
                            activeTab === tab.id
                              ? 'bg-primary-100 text-primary-700' :'bg-secondary-100 text-secondary-700'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'pending' && (
                    <PendingApprovals 
                      timesheets={filteredTimesheets.filter(t => t.status === 'pending')}
                      onApproval={handleApproval}
                      onBulkApproval={handleBulkApproval}
                    />
                  )}
                  {activeTab === 'approved' && (
                    <ApprovedEntries 
                      timesheets={filteredTimesheets.filter(t => t.status === 'approved')}
                    />
                  )}
                  {activeTab === 'rejected' && (
                    <RejectedSubmissions 
                      timesheets={filteredTimesheets.filter(t => t.status === 'rejected')}
                      onReprocess={handleApproval}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Stats */}
            <div className="xl:col-span-1">
              <ApprovalStats timesheets={mockTimesheets} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApprovalWorkflow;