import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MonthlyView = ({ data, selectedDate, onEdit }) => {
  const [expandedDays, setExpandedDays] = useState(new Set());

  // Get month data
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Group data by date
  const groupedByDate = {};
  data.forEach(entry => {
    const date = entry.date;
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(entry);
  });

  // Generate daily summaries
  const dailySummaries = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0];
    const dayEntries = groupedByDate[dateStr] || [];
    const totalHours = dayEntries.reduce((sum, entry) => sum + entry.hours, 0);
    const billableHours = dayEntries.filter(entry => entry.billable).reduce((sum, entry) => sum + entry.hours, 0);
    const projects = [...new Set(dayEntries.map(entry => entry.project))];

    dailySummaries.push({
      date: dateStr,
      day,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      entries: dayEntries,
      totalHours,
      billableHours,
      projects,
      hasEntries: dayEntries.length > 0
    });
  }

  const toggleDayExpansion = (dateStr) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dateStr)) {
      newExpanded.delete(dateStr);
    } else {
      newExpanded.add(dateStr);
    }
    setExpandedDays(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'draft':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const monthTotal = dailySummaries.reduce((sum, day) => sum + day.totalHours, 0);
  const monthBillable = dailySummaries.reduce((sum, day) => sum + day.billableHours, 0);
  const workingDays = dailySummaries.filter(day => day.hasEntries).length;

  return (
    <div className="p-6">
      {/* Month Summary */}
      <div className="bg-secondary-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-heading-semibold text-text-primary">{monthTotal.toFixed(1)}h</div>
            <div className="text-sm text-text-secondary">Total Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading-semibold text-success">{monthBillable.toFixed(1)}h</div>
            <div className="text-sm text-text-secondary">Billable Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading-semibold text-primary">{workingDays}</div>
            <div className="text-sm text-text-secondary">Working Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading-semibold text-text-primary">
              {workingDays > 0 ? (monthTotal / workingDays).toFixed(1) : '0.0'}h
            </div>
            <div className="text-sm text-text-secondary">Avg per Day</div>
          </div>
        </div>
      </div>

      {/* Daily Entries */}
      <div className="space-y-2">
        {dailySummaries.map((daySummary) => (
          <div key={daySummary.date} className="bg-surface border border-border rounded-lg">
            <div
              className={`p-4 cursor-pointer hover:bg-secondary-50 transition-colors duration-150 ease-out ${
                daySummary.hasEntries ? '' : 'opacity-50'
              }`}
              onClick={() => daySummary.hasEntries && toggleDayExpansion(daySummary.date)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center min-w-12">
                    <div className="text-lg font-heading-medium text-text-primary">{daySummary.day}</div>
                    <div className="text-xs text-text-secondary">{daySummary.dayName}</div>
                  </div>
                  <div>
                    {daySummary.hasEntries ? (
                      <>
                        <div className="font-body-medium text-text-primary">
                          {daySummary.totalHours.toFixed(1)}h total
                          {daySummary.billableHours > 0 && (
                            <span className="text-success ml-2">
                              ({daySummary.billableHours.toFixed(1)}h billable)
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {daySummary.projects.length} project{daySummary.projects.length !== 1 ? 's' : ''}: {daySummary.projects.join(', ')}
                        </div>
                      </>
                    ) : (
                      <div className="text-text-secondary">No time entries</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {daySummary.hasEntries && (
                    <>
                      <div className="flex items-center space-x-1">
                        {daySummary.entries.map((entry, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              entry.status === 'approved' ? 'bg-success' :
                              entry.status === 'pending' ? 'bg-warning' : 'bg-secondary-300'
                            }`}
                            title={`${entry.project} - ${entry.status}`}
                          />
                        ))}
                      </div>
                      <Icon
                        name={expandedDays.has(daySummary.date) ? "ChevronUp" : "ChevronDown"}
                        size={16}
                        className="text-text-secondary"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Day Details */}
            {expandedDays.has(daySummary.date) && daySummary.hasEntries && (
              <div className="border-t border-border">
                <div className="p-4 space-y-3">
                  {daySummary.entries.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 cursor-pointer transition-colors duration-150 ease-out"
                      onClick={() => onEdit(entry)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="font-body-medium text-text-primary">{entry.project}</div>
                          <div className="text-sm text-text-secondary">•</div>
                          <div className="text-sm text-text-secondary">{entry.task}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </div>
                        </div>
                        {entry.description && (
                          <div className="text-sm text-text-secondary mt-1 max-w-2xl truncate">
                            {entry.description}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-body-medium text-text-primary">{entry.hours}h</div>
                          <div className="text-xs text-text-secondary">
                            {new Date(`2000-01-01T${entry.startTime}`).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })} - {new Date(`2000-01-01T${entry.endTime}`).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </div>
                        </div>
                        <Icon name="Edit2" size={16} className="text-text-secondary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {dailySummaries.filter(day => day.hasEntries).length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-heading-medium text-text-primary mb-2">No time entries for this month</h3>
          <p className="text-text-secondary">Start tracking your time to see monthly summaries.</p>
        </div>
      )}
    </div>
  );
};

export default MonthlyView;