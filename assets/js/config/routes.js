;(function (global) {
  "use strict";

  const routes = Object.freeze({
    "index.html": "/index.html",
    "dashboard.html": "/dashboard.html",
    "department-gateway.html": "/dashboard.html",
    "mailbox.html": "/mailbox.html",
    "notification-center.html": "/notification-center.html",
    "search.html": "/search.html",
    "activity-center.html": "/activity-center.html",
    "file-center.html": "/file-center.html",
    "ai-assistant.html": "/ai-assistant.html",
    "departments.html": "/departments.html",
    "company-assets-documents.html": "/company-assets-documents.html",
    "documents.html": "/documents.html",
    "new-document.html": "/new-document.html",
    "revision.html": "/revision.html",
    "approval.html": "/approval.html",
    "distribution.html": "/distribution.html",
    "archive.html": "/archive.html",
    "document-viewer.html": "/document-viewer.html",

    "capa.html": "/capa.html",
    "risk-register.html": "/risk-register.html",
    "audit.html": "/audit.html",
    "change-management.html": "/change-management.html",
    "process-management.html": "/process-management.html",
    "continuous-improvement.html": "/continuous-improvement.html",
    "apqp.html": "/apqp.html",

    "training-management.html": "/training-management.html",
    "competency-matrix.html": "/competency-matrix.html",
    "users.html": "/users.html",

    "supplier-management.html": "/supplier-management.html",
    "customer-management.html": "/customer-management.html",

    "kpi-reports.html": "/kpi-reports.html",
    "management-review.html": "/management-review.html",
    "action-center.html": "/action-center.html",

    "calibration-management.html": "/calibration-management.html",

    "security-continuity-center.html": "/security-continuity-center.html",
    "standards-compliance.html": "/standards-compliance.html",
    "legal-compliance.html": "/legal-compliance.html"
  });

  const missingTargets = Object.freeze({
    "fmea.html": "/apqp.html#fmea",
    "control-plan.html": "/apqp.html#control-plan",
    "spc.html": "/apqp.html#spc",
    "msa.html": "/apqp.html#msa",
    "ppap.html": "/apqp.html#ppap",
    "revision-management.html": "/revision.html",
    "standard-compliance.html": "/standards-compliance.html",
    "security-continuity.html": "/security-continuity-center.html",
    "calibration.html": "/calibration-management.html",
    "maintenance.html": "/calibration-management.html",
    "equipment.html": "/calibration-management.html",
    "information-security.html": "/security-continuity-center.html",
    "audit-management.html": "/audit.html",
    "audit-to-capa.html": "/capa.html",
    "audit-to-risk.html": "/risk-register.html",
    "audit-to-management-review.html": "/management-review.html",
    "audit-to-action.html": "/action-center.html",
    "audit-to-document.html": "/documents.html",
    "audit-to-training.html": "/training-management.html",
    "audit-to-change.html": "/change-management.html"
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
