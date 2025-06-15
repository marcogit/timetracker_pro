import React from 'react';
import Icon from '../../../components/AppIcon';

const ApprovalStats = ({ timesheets }) => {
  const stats = {
    pending: timesheets.filter(t => t.status === 'pending').length,
    approved: timesheets.filter(t => t.status === 'approved').length,
    rejected: timesheets.filter(t => t.status === 'rejected').length,
    totalHours: timesheets.reduce((sum, t) => sum + t.totalHours, 0),
    overtimeHours: timesheets.reduce((sum, t) => sum + t.overtimeHours, 0),
    policyViolations: timesheets.filter(t => t.policyViolations.length > 0).length
  };

  const approvalRate = stats.approved + stats.rejected > 0 
    ? Math.round((stats.approved / (stats.approved + stats.rejected)) * 100) 
    : 0;

  const avgProcessingTime = '2.3 hours'; // Mock data
  const teamOvertimeAlerts = [
    { department: 'Engineering', count: 3, trend: 'up' },
    { department: 'Marketing', count: 1, trend: 'down' },
    { department: 'Design', count: 0, trend: 'stable' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="font-heading-medium text-text-primary mb-4">Approval Overview</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-warning rounded-full mr-2"></div>
              <span className="text-sm text-text-secondary">Pending</span>
            </div>
            <span className="font-body-medium text-text-primary">{stats.pending}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
              <span className="text-sm text-text-secondary">Approved</span>
            </div>
            <span className="font-body-medium text-text-primary">{stats.approved}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-error rounded-full mr-2"></div>
              <span className="text-sm text-text-secondary">Rejected</span>
            </div>
            <span className="font-body-medium text-text-primary">{stats.rejected}</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="font-heading-medium text-text-primary mb-4">Key Metrics</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Approval Rate</span>
            <div className="flex items-center">
              <span className="font-body-medium text-text-primary mr-2">{approvalRate}%</span>
              <Icon name="TrendingUp" size={14} className="text-accent" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Avg Processing Time</span>
            <span className="font-body-medium text-text-primary">{avgProcessingTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Total Hours</span>
            <span className="font-body-medium text-text-primary">{stats.totalHours}h</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Overtime Hours</span>
            <span className="font-body-medium text-warning">{stats.overtimeHours}h</span>
          </div>
        </div>
      </div>

      {/* Team Overtime Alerts */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading-medium text-text-primary">Overtime Alerts</h3>
          <Icon name="AlertTriangle" size={16} className="text-warning" />
        </div>
        <div className="space-y-3">
          {teamOvertimeAlerts.map((alert, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <span className="text-sm font-body-medium text-text-primary">{alert.department}</span>
                <div className="text-xs text-text-secondary">{alert.count} employees</div>
              </div>
              <div className="flex items-center">
                <Icon 
                  name={alert.trend === 'up' ? 'TrendingUp' : alert.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  size={14} 
                  className={`${
                    alert.trend === 'up' ? 'text-error' : 
                    alert.trend === 'down'? 'text-accent' : 'text-text-secondary'
                  }`} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Violations */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading-medium text-text-primary">Policy Violations</h3>
          {stats.policyViolations > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium bg-warning-100 text-warning-700">
              {stats.policyViolations} active
            </span>
          )}
        </div>
        {stats.policyViolations > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center text-sm text-warning">
              <Icon name="AlertTriangle" size={14} className="mr-2" />
              Overtime threshold exceeded
            </div>
            <div className="flex items-center text-sm text-warning">
              <Icon name="AlertTriangle" size={14} className="mr-2" />
              Insufficient detail in entries
            </div>
          </div>
        ) : (
          <div className="flex items-center text-sm text-accent">
            <Icon name="CheckCircle" size={14} className="mr-2" />
            No policy violations
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="font-heading-medium text-text-primary mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full inline-flex items-center justify-center px-3 py-2 bg-primary text-white rounded-md text-sm font-body-medium hover:bg-primary-700 transition-colors duration-150 ease-out">
            <Icon name="CheckSquare" size={14} className="mr-2" />
            Bulk Approve All
          </button>
          <button className="w-full inline-flex items-center justify-center px-3 py-2 bg-surface border border-border rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-150 ease-out">
            <Icon name="Download" size={14} className="mr-2" />
            Export Report
          </button>
          <button className="w-full inline-flex items-center justify-center px-3 py-2 bg-surface border border-border rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-colors duration-150 ease-out">
            <Icon name="Settings" size={14} className="mr-2" />
            Configure Rules
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="font-heading-medium text-text-primary mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <div>
              <div className="text-sm font-body-medium text-text-primary">Sarah Johnson's timesheet approved</div>
              <div className="text-xs text-text-secondary">2 minutes ago</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-error rounded-full mt-2"></div>
            <div>
              <div className="text-sm font-body-medium text-text-primary">David Kim's timesheet rejected</div>
              <div className="text-xs text-text-secondary">15 minutes ago</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
            <div>
              <div className="text-sm font-body-medium text-text-primary">New submission from Michael Chen</div>
              <div className="text-xs text-text-secondary">1 hour ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalStats;