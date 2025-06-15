import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RejectedSubmissions = ({ timesheets, onReprocess }) => {
  const [expandedCards, setExpandedCards] = useState(new Set());

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReprocess = (timesheetId) => {
    onReprocess(timesheetId, 'reprocess');
  };

  if (timesheets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-error-100 rounded-full mb-4">
          <Icon name="XCircle" size={32} className="text-error" />
        </div>
        <h3 className="text-lg font-heading-medium text-text-primary mb-2">No Rejected Submissions</h3>
        <p className="text-text-secondary">Rejected timesheets will appear here for review.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          {timesheets.length} rejected timesheet{timesheets.length !== 1 ? 's' : ''}
        </div>
        <button className="inline-flex items-center px-3 py-1.5 bg-surface border border-border rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-150 ease-out">
          <Icon name="Mail" size={14} className="mr-1" />
          Notify Employees
        </button>
      </div>

      {timesheets.map((timesheet) => (
        <div key={timesheet.id} className="bg-surface border border-error-200 rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <Icon name="XCircle" size={16} className="text-error" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-heading-medium text-text-primary">{timesheet.employeeName}</h3>
                    <span className="text-sm text-text-secondary">({timesheet.employeeId})</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium bg-secondary-100 text-secondary-700">
                      {timesheet.department}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium bg-error-100 text-error-700">
                      Rejected
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Period:</span>
                      <div className="font-body-medium text-text-primary">{timesheet.period}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">Total Hours:</span>
                      <div className="font-body-medium text-text-primary">{timesheet.totalHours}h</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">Overtime:</span>
                      <div className={`font-body-medium ${timesheet.overtimeHours > 0 ? 'text-warning' : 'text-text-primary'}`}>
                        {timesheet.overtimeHours}h
                      </div>
                    </div>
                    <div>
                      <span className="text-text-secondary">Rejected By:</span>
                      <div className="font-body-medium text-text-primary">{timesheet.rejectedBy}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">Rejected On:</span>
                      <div className="font-body-medium text-text-primary">{formatDate(timesheet.rejectedDate)}</div>
                    </div>
                  </div>
                  
                  {/* Rejection Reason */}
                  <div className="mt-3 p-3 bg-error-50 border border-error-200 rounded-md">
                    <div className="flex items-start">
                      <Icon name="AlertTriangle" size={16} className="text-error mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-body-medium text-error text-sm mb-1">Rejection Reason</h4>
                        <p className="text-error text-sm">{timesheet.rejectionReason}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleReprocess(timesheet.id)}
                  className="inline-flex items-center px-3 py-1.5 bg-primary text-white rounded-md text-sm font-body-medium hover:bg-primary-700 transition-colors duration-150 ease-out"
                >
                  <Icon name="RotateCcw" size={14} className="mr-1" />
                  Reprocess
                </button>
                <button
                  onClick={() => toggleExpanded(timesheet.id)}
                  className="p-1.5 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-out"
                >
                  <Icon 
                    name={expandedCards.has(timesheet.id) ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                  />
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedCards.has(timesheet.id) && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-body-medium text-text-primary mb-3">Time Entries</h4>
                    <div className="space-y-2">
                      {timesheet.entries.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-secondary-50 rounded-md">
                          <div>
                            <div className="font-body-medium text-text-primary text-sm">{entry.date}</div>
                            <div className="text-text-secondary text-xs">{entry.project}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-body-medium text-text-primary text-sm">{entry.hours}h</div>
                            <div className="text-text-secondary text-xs">{entry.notes}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-body-medium text-text-primary mb-3">Employee Notes</h4>
                    <div className="p-3 bg-secondary-50 rounded-md">
                      <p className="text-text-secondary text-sm">{timesheet.employeeNotes}</p>
                    </div>
                    
                    {timesheet.policyViolations.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-body-medium text-warning mb-2">Policy Violations</h4>
                        <div className="space-y-1">
                          {timesheet.policyViolations.map((violation, index) => (
                            <div key={index} className="flex items-center text-sm text-warning">
                              <Icon name="AlertTriangle" size={14} className="mr-2" />
                              {violation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <h4 className="font-body-medium text-text-primary mb-2">Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full inline-flex items-center justify-center px-3 py-2 bg-surface border border-border rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-150 ease-out">
                          <Icon name="Mail" size={14} className="mr-2" />
                          Send Notification to Employee
                        </button>
                        <button className="w-full inline-flex items-center justify-center px-3 py-2 bg-surface border border-border rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-150 ease-out">
                          <Icon name="MessageSquare" size={14} className="mr-2" />
                          Add Follow-up Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RejectedSubmissions;