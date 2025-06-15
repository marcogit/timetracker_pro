import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import TimeEntryForm from './components/TimeEntryForm';
import DailySummary from './components/DailySummary';
import RecentActivity from './components/RecentActivity';
import BulkEntryModal from './components/BulkEntryModal';

const TimeEntry = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBulkEntryOpen, setIsBulkEntryOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeEntries, setTimeEntries] = useState([]);

  // Mock existing time entries for the selected date
  const mockTimeEntries = [
    {
      id: 1,
      startTime: '09:00',
      endTime: '11:30',
      duration: '2:30',
      description: 'Morning work session',
      status: 'saved'
    },
    {
      id: 2,
      startTime: '13:00',
      endTime: '16:00',
      duration: '3:00',
      description: 'Afternoon work session',
      status: 'saved'
    }
  ];

  useEffect(() => {
    // Load time entries for selected date
    setTimeEntries(mockTimeEntries);
  }, [selectedDate]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTimeEntrySubmit = (entryData) => {
    const newEntry = {
      id: Date.now(),
      ...entryData,
      status: 'saved'
    };
    setTimeEntries([...timeEntries, newEntry]);
  };

  const handleBulkEntrySubmit = (entries) => {
    const newEntries = entries.map(entry => ({
      id: Date.now() + Math.random(),
      ...entry,
      status: 'saved'
    }));
    setTimeEntries([...timeEntries, ...newEntries]);
    setIsBulkEntryOpen(false);
  };

  const totalHours = timeEntries.reduce((total, entry) => {
    const [hours, minutes] = entry.duration.split(':').map(Number);
    return total + hours + (minutes / 60);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <Breadcrumb />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4">
              <div>
                <h1 className="text-2xl font-heading-semibold text-text-primary">Time Entry</h1>
                <p className="text-text-secondary mt-1">Log your daily work hours</p>
              </div>
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <button
                  onClick={() => setIsBulkEntryOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-surface text-text-primary border border-border rounded-lg font-body-medium hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors duration-150 ease-out"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Bulk Entry
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Time Entry Form - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-heading-medium text-text-primary">New Time Entry</h2>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Calendar" size={16} />
                    <span>Today: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                
                <TimeEntryForm
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  onSubmit={handleTimeEntrySubmit}
                />
              </div>

              {/* Recent Activity */}
              <div className="mt-6">
                <RecentActivity timeEntries={timeEntries} />
              </div>
            </div>

            {/* Right Sidebar - Daily Summary */}
            <div className="xl:col-span-1">
              <DailySummary
                selectedDate={selectedDate}
                timeEntries={timeEntries}
                totalHours={totalHours}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {isBulkEntryOpen && (
        <BulkEntryModal
          isOpen={isBulkEntryOpen}
          onClose={() => setIsBulkEntryOpen(false)}
          onSubmit={handleBulkEntrySubmit}
        />
      )}
    </div>
  );
};

export default TimeEntry;