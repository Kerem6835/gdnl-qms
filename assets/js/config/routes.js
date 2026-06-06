;(function (global) {
  "use strict";

  const routes = Object.freeze({
    "index.html": "/index.html",
    "dashboard.html": "/dashboard.html",
    "department-gateway.html": "/department-gateway.html",
    "management-dashboard.html": "/modules/departments/management/management-dashboard.html",
    "management-board.html": "/modules/departments/management/management-board.html",
    "management-decisions.html": "/modules/departments/management/management-decisions.html",
    "management-kpi.html": "/modules/departments/management/management-kpi.html",
    "management-goals.html": "/modules/departments/management/management-goals.html",
    "management-budget.html": "/modules/departments/management/management-budget.html",
    "management-workforce.html": "/modules/departments/management/management-workforce.html",
    "management-projects.html": "/modules/departments/management/management-projects.html",
    "management-reports.html": "/modules/departments/management/management-reports.html",
    "management-calendar.html": "/modules/departments/management/management-calendar.html",
    "management-organization.html": "/modules/departments/management/management-organization.html",
    "management-policies.html": "/modules/departments/management/management-policies.html",
    "hr-dashboard.html": "/modules/departments/human-resources/hr-dashboard.html",
    "hr-employees.html": "/modules/departments/human-resources/hr-employees.html",
    "hr-recruitment.html": "/modules/departments/human-resources/hr-recruitment.html",
    "hr-internship.html": "/modules/departments/human-resources/hr-internship.html",
    "hr-onboarding.html": "/modules/departments/human-resources/hr-onboarding.html",
    "hr-attendance.html": "/modules/departments/human-resources/hr-attendance.html",
    "hr-shift-planning.html": "/modules/departments/human-resources/hr-shift-planning.html",
    "hr-overtime.html": "/modules/departments/human-resources/hr-overtime.html",
    "hr-payroll.html": "/modules/departments/human-resources/hr-payroll.html",
    "hr-leave.html": "/modules/departments/human-resources/hr-leave.html",
    "hr-performance.html": "/modules/departments/human-resources/hr-performance.html",
    "hr-competency.html": "/modules/departments/human-resources/hr-competency.html",
    "hr-training.html": "/modules/departments/human-resources/hr-training.html",
    "hr-assets.html": "/modules/departments/human-resources/hr-assets.html",
    "hr-exit.html": "/modules/departments/human-resources/hr-exit.html",
    "hr-reports.html": "/modules/departments/human-resources/hr-reports.html",
    "hr-policies.html": "/modules/departments/human-resources/hr-policies.html",
    "maintenance-dashboard.html": "/modules/departments/maintenance/maintenance-dashboard.html",
    "maintenance-machines.html": "/modules/departments/maintenance/maintenance-machines.html",
    "maintenance-breakdowns.html": "/modules/departments/maintenance/maintenance-breakdowns.html",
    "maintenance-preventive.html": "/modules/departments/maintenance/maintenance-preventive.html",
    "maintenance-work-orders.html": "/modules/departments/maintenance/maintenance-work-orders.html",
    "maintenance-spare-parts.html": "/modules/departments/maintenance/maintenance-spare-parts.html",
    "maintenance-purchase-requests.html": "/modules/departments/maintenance/maintenance-purchase-requests.html",
    "maintenance-calendar.html": "/modules/departments/maintenance/maintenance-calendar.html",
    "maintenance-reports.html": "/modules/departments/maintenance/maintenance-reports.html",
    "maintenance-documents.html": "/modules/departments/maintenance/maintenance-documents.html",

    "company-assets-documents.html": "/modules/documents/company-assets-documents.html",
    "documents.html": "/modules/documents/documents.html",
    "new-document.html": "/modules/documents/new-document.html",
    "revision.html": "/modules/documents/revision.html",
    "approval.html": "/modules/documents/approval.html",
    "distribution.html": "/modules/documents/distribution.html",
    "archive.html": "/modules/documents/archive.html",
    "document-viewer.html": "/modules/documents/document-viewer.html",

    "capa.html": "/modules/quality/capa.html",
    "risk-register.html": "/modules/quality/risk-register.html",
    "audit.html": "/modules/quality/audit.html",
    "change-management.html": "/modules/quality/change-management.html",
    "process-management.html": "/modules/quality/process-management.html",
    "continuous-improvement.html": "/modules/quality/continuous-improvement.html",
    "apqp.html": "/modules/quality/iatf/apqp.html",

    "training-management.html": "/modules/organization/training-management.html",
    "competency-matrix.html": "/modules/organization/competency-matrix.html",
    "users.html": "/modules/organization/users.html",

    "supplier-management.html": "/modules/stakeholders/supplier-management.html",
    "customer-management.html": "/modules/stakeholders/customer-management.html",

    "kpi-reports.html": "/modules/performance/kpi-reports.html",
    "management-review.html": "/modules/performance/management-review.html",
    "action-center.html": "/modules/performance/action-center.html",
    "notification-center.html": "/modules/performance/notification-center.html",

    "calibration-management.html": "/modules/technical/calibration-management.html",

    "security-continuity-center.html": "/modules/compliance/security-continuity-center.html",
    "standards-compliance.html": "/modules/compliance/standards-compliance.html",
    "legal-compliance.html": "/modules/compliance/legal-compliance.html"
  });

  const missingTargets = Object.freeze({
    "fmea.html": "/modules/quality/iatf/fmea.html",
    "control-plan.html": "/modules/quality/iatf/control-plan.html",
    "spc.html": "/modules/quality/iatf/spc.html",
    "msa.html": "/modules/quality/iatf/msa.html",
    "revision-management.html": "/modules/documents/revision.html",
    "standard-compliance.html": "/modules/compliance/standards-compliance.html",
    "security-continuity.html": "/modules/compliance/security-continuity-center.html",
    "calibration.html": "/modules/technical/calibration-management.html",
    "maintenance.html": "/modules/departments/maintenance/maintenance.html",
    "equipment.html": "/modules/technical/equipment.html",
    "information-security.html": "/modules/compliance/information-security.html",
    "audit-management.html": "/modules/quality/audit.html",
    "audit-to-capa.html": "/modules/quality/capa.html",
    "audit-to-risk.html": "/modules/quality/risk-register.html",
    "audit-to-management-review.html": "/modules/performance/management-review.html",
    "audit-to-action.html": "/modules/performance/action-center.html",
    "audit-to-document.html": "/modules/documents/documents.html",
    "audit-to-training.html": "/modules/organization/training-management.html",
    "audit-to-change.html": "/modules/quality/change-management.html"
  });

  function splitUrl(value) {
    const source = String(value || "");
    const match = source.match(/^([^?#]*)([?#].*)?$/);
    return {
      path: match ? match[1] : source,
      suffix: match && match[2] ? match[2] : ""
    };
  }

  function resolveRoute(value, options) {
    const config = options || {};
    const parsed = splitUrl(value);
    const key = parsed.path.split("/").pop();
    const route = routes[key] || (config.includeMissing ? missingTargets[key] : "");
    return route ? route + parsed.suffix : value;
  }

  global.GDNL_ROUTES = {
    routes,
    missingTargets,
    resolveRoute
  };
})(window);
