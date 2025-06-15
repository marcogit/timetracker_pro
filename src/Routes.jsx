import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import Login from "pages/login";
import Dashboard from "pages/dashboard";
import TimeEntry from "pages/time-entry";
import TimesheetView from "pages/timesheet-view";
import ProjectManagement from "pages/project-management";
import ApprovalWorkflow from "pages/approval-workflow";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Main Application Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/time-entry" element={<TimeEntry />} />
          <Route path="/timesheet-view" element={<TimesheetView />} />
          <Route path="/project-management" element={<ProjectManagement />} />
          <Route path="/approval-workflow" element={<ApprovalWorkflow />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;