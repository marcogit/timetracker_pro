import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PendingApprovals = ({ timesheets, onApproval, onBulkApproval }) => {
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [selectedTimesheets, setSelectedTimesheets] = useState(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkComment, setBulkComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [actionComment, setActionComment] = useState('');

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const toggleSelected = (id) => {
    const newSelected = new Set(selectedTimesheets);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTimesheets(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  const selectAll = () => {
    if (selectedTimesheets.size === timesheets.length) {
      setSelectedTimesheets(new Set());
      setShowBulkActions(false);
    } else {
      setSelectedTimesheets(new Set(timesheets.map(t => t.id)));
      setShowBulkActions(true);
    }
  };

  const handleSingleAction = (timesheetId, action) => {
    if (action === 'reject') {
      setCurrentAction({ type: 'single', id: timesheetId, action });
      setShowCommentModal(true);
    } else {
      onApproval(timesheetId, action);
    }
  };

  const handleBulkAction = (action) => {
    if (action === 'reject') {
      setCurrentAction({ type: 'bulk', ids: Array.from(selectedTimesheets), action });
      setShowCommentModal(true);
    } else {
      onBulkApproval(Array.from(selectedTimesheets), action);
      setSelectedTimesheets(new Set());
      setShowBulkActions(false);
    }
  };

  const confirmAction = () => {
    if (currentAction.type === 'single') {
      onApproval(currentAction.id, currentAction.action, actionComment);
    } else {
      onBulkApproval(currentAction.ids, currentAction.action, actionComment);
      setSelectedTimesheets(new Set());
      setShowBulkActions(false);
    }
    setShowCommentModal(false);
    setActionComment('');
    setCurrentAction(null);
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

  if (timesheets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
          <Icon name="CheckCircle" size={32} className="text-secondary-500" />
        </div>
        <h3 className="text-lg font-heading-medium text-text-primary mb-2">No Pending Approvals</h3>
        <p className="text-text-secondary">All timesheets have been reviewed and processed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions Header */}
      {showBulkActions && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="CheckSquare" size={20} className="text-primary mr-2" />
              <span className="font-body-medium text-primary">
                {selectedTimesheets.size} timesheet{selectedTimesheets.size !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="inline-flex items-center px-3 py-1.5 bg-accent text-white rounded-md text-sm font-body-medium hover:bg-accent-700 transition-colors duration-150 ease-out"
              >
                <Icon name="Check" size={14} className="mr-1" />
                Approve All
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="inline-flex items-center px-3 py-1.5 bg-error text-white rounded-md text-sm font-body-medium hover:bg-red-600 transition-colors duration-150 ease-out"
              >
                <Icon name="X" size={14} className="mr-1" />
                Reject All
              </button>
              <button
                onClick={() => {
                  setSelectedTimesheets(new Set());
                  setShowBulkActions(false);
                }}
                className="text-text-secondary hover:text-text-primary transition-colors duration-150 ease-out"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Select All Control */}
      <div className="flex items-center justify-between">
        <button
          onClick={selectAll}
          className="flex items-center text-sm text-text-secondary hover:text-primary transition-colors duration-150 ease-out"
        >
          <Icon 
            name={selectedTimesheets.size === timesheets.length ? "CheckSquare" : "Square"} 
            size={16} 
            className="mr-2" 
          />
          Select All ({timesheets.length})
        </button>
        <div className="text-sm text-text-secondary">
          {timesheets.length} pending approval{timesheets.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Timesheet Cards */}
      {timesheets.map((timesheet) => (
        <div key={timesheet.id} className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleSelected(timesheet.id)}
                  className="mt-1 text-text-secondary hover:text-primary transition-colors duration-150 ease-out"
                >
                  <Icon 
                    name={selectedTimesheets.has(timesheet.id) ? "CheckSquare" : "Square"} 
                    size={16} 
                  />
                </button>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-heading-medium text-text-primary">{timesheet.employeeName}</h3>
                    <span className="text-sm text-text-secondary">({timesheet.employeeId})</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium bg-secondary-100 text-secondary-700">
                      {timesheet.department}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                      <span className="text-text-secondary">Submitted:</span>
                      <div className="font-body-medium text-text-primary">{formatDate(timesheet.submissionDate)}</div>
                    </div>
                  </div>
                  {timesheet.policyViolations.length > 0 && (
                    <div className="mt-3 flex items-center">
                      <Icon name="AlertTriangle" size={16} className="text-warning mr-2" />
                      <span className="text-sm text-warning font-body-medium">Policy violations detected</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSingleAction(timesheet.id, 'approve')}
                  className="inline-flex items-center px-3 py-1.5 bg-accent text-white rounded-md text-sm font-body-medium hover:bg-accent-700 transition-colors duration-150 ease-out"
                >
                  <Icon name="Check" size={14} className="mr-1" />
                  Approve
                </button>
                <button
                  onClick={() => handleSingleAction(timesheet.id, 'reject')}
                  className="inline-flex items-center px-3 py-1.5 bg-error text-white rounded-md text-sm font-body-medium hover:bg-red-600 transition-colors duration-150 ease-out"
                >
                  <Icon name="X" size={14} className="mr-1" />
                  Reject
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
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1003">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-heading-medium text-text-primary mb-4">
              {currentAction?.action === 'reject' ? 'Rejection Reason' : 'Add Comment'}
            </h3>
            <textarea
              value={actionComment}
              onChange={(e) => setActionComment(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required={currentAction?.action === 'reject'}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setActionComment('');
                  setCurrentAction(null);
                }}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-out"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={currentAction?.action === 'reject' && !actionComment.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-out"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;