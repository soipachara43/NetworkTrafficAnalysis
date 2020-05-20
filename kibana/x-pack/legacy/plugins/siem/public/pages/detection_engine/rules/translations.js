"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IMPORT_FAILED_DETAILED = exports.IMPORT_FAILED = exports.SUCCESSFULLY_IMPORTED_RULES = exports.OVERWRITE_WITH_SAME_NAME = exports.INITIAL_PROMPT_TEXT = exports.SELECT_RULE = exports.IMPORT_RULE_BTN_TITLE = exports.RELOAD_MISSING_PREPACKAGED_RULES = exports.LOAD_PREPACKAGED_RULES = exports.DELETE = exports.UPDATE = exports.CONTINUE = exports.OPTIONAL_FIELD = exports.ACTIONS = exports.SCHEDULE = exports.ABOUT = exports.DEFINITION = exports.RULE_ACTIONS = exports.SCHEDULE_RULE = exports.ABOUT_RULE = exports.DEFINE_RULE = exports.NO_RULES_BODY = exports.NO_RULES = exports.NO_TAGS_AVAILABLE = exports.TAGS = exports.ELASTIC_RULES = exports.CUSTOM_RULES = exports.MONITORING_TAB = exports.RULES_TAB = exports.COLUMN_LAST_LOOKBACK_DATE = exports.COLUMN_GAP = exports.COLUMN_QUERY_TIMES = exports.COLUMN_INDEXING_TIMES = exports.COLUMN_ACTIVATE = exports.COLUMN_TAGS = exports.COLUMN_LAST_RESPONSE = exports.COLUMN_LAST_COMPLETE_RUN = exports.COLUMN_SEVERITY = exports.COLUMN_RISK_SCORE = exports.COLUMN_RULE = exports.DELETE_RULE = exports.EXPORT_RULE = exports.DUPLICATE_RULE_ERROR = exports.SUCCESSFULLY_DUPLICATED_RULES = exports.DUPLICATE_RULE = exports.DUPLICATE = exports.EDIT_RULE_SETTINGS = exports.SELECTED_RULES = exports.SHOWING_RULES = exports.SEARCH_PLACEHOLDER = exports.SEARCH_RULES = exports.ALL_RULES = exports.SUCCESSFULLY_EXPORTED_RULES = exports.EXPORT_FILENAME = exports.BATCH_ACTION_DELETE_SELECTED_ERROR = exports.BATCH_ACTION_DELETE_SELECTED_IMMUTABLE = exports.BATCH_ACTION_DELETE_SELECTED = exports.BATCH_ACTION_DUPLICATE_SELECTED = exports.BATCH_ACTION_EXPORT_SELECTED = exports.BATCH_ACTION_DEACTIVATE_SELECTED_ERROR = exports.BATCH_ACTION_DEACTIVATE_SELECTED = exports.BATCH_ACTION_ACTIVATE_SELECTED_ERROR = exports.BATCH_ACTION_ACTIVATE_SELECTED = exports.INACTIVE = exports.ACTIVE = exports.BATCH_ACTIONS = exports.REFRESH = exports.EDIT_PAGE_TITLE = exports.ADD_PAGE_TITLE = exports.PAGE_TITLE = exports.ADD_NEW_RULE = exports.IMPORT_RULE = exports.BACK_TO_DETECTION_ENGINE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BACK_TO_DETECTION_ENGINE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.backOptionsHeader', {
  defaultMessage: 'Back to detections'
});

exports.BACK_TO_DETECTION_ENGINE = BACK_TO_DETECTION_ENGINE;

var IMPORT_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.importRuleTitle', {
  defaultMessage: 'Import rule…'
});

exports.IMPORT_RULE = IMPORT_RULE;

var ADD_NEW_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.addNewRuleTitle', {
  defaultMessage: 'Create new rule'
});

exports.ADD_NEW_RULE = ADD_NEW_RULE;

var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.pageTitle', {
  defaultMessage: 'Signal detection rules'
});

exports.PAGE_TITLE = PAGE_TITLE;

var ADD_PAGE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.addPageTitle', {
  defaultMessage: 'Create'
});

exports.ADD_PAGE_TITLE = ADD_PAGE_TITLE;

var EDIT_PAGE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.editPageTitle', {
  defaultMessage: 'Edit'
});

exports.EDIT_PAGE_TITLE = EDIT_PAGE_TITLE;

var REFRESH = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.refreshTitle', {
  defaultMessage: 'Refresh'
});

exports.REFRESH = REFRESH;

var BATCH_ACTIONS = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.batchActionsTitle', {
  defaultMessage: 'Bulk actions'
});

exports.BATCH_ACTIONS = BATCH_ACTIONS;

var ACTIVE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.activeRuleDescription', {
  defaultMessage: 'active'
});

exports.ACTIVE = ACTIVE;

var INACTIVE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.inactiveRuleDescription', {
  defaultMessage: 'inactive'
});

exports.INACTIVE = INACTIVE;

var BATCH_ACTION_ACTIVATE_SELECTED = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.batchActions.activateSelectedTitle', {
  defaultMessage: 'Activate selected'
});

exports.BATCH_ACTION_ACTIVATE_SELECTED = BATCH_ACTION_ACTIVATE_SELECTED;

var BATCH_ACTION_ACTIVATE_SELECTED_ERROR = function BATCH_ACTION_ACTIVATE_SELECTED_ERROR(totalRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.batchActions.activateSelectedErrorTitle', {
    values: {
      totalRules: totalRules
    },
    defaultMessage: 'Error activating {totalRules, plural, =1 {rule} other {rules}}…'
  });
};

exports.BATCH_ACTION_ACTIVATE_SELECTED_ERROR = BATCH_ACTION_ACTIVATE_SELECTED_ERROR;

var BATCH_ACTION_DEACTIVATE_SELECTED = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.batchActions.deactivateSelectedTitle', {
  defaultMessage: 'Deactivate selected'
});

exports.BATCH_ACTION_DEACTIVATE_SELECTED = BATCH_ACTION_DEACTIVATE_SELECTED;

var BATCH_ACTION_DEACTIVATE_SELECTED_ERROR = function BATCH_ACTION_DEACTIVATE_SELECTED_ERROR(totalRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.batchActions.deactivateSelectedErrorTitle', {
    values: {
      totalRules: totalRules
    },
    defaultMessage: 'Error deactivating {totalRules, plural, =1 {rule} other {rules}}…'
  });
};

exports.BATCH_ACTION_DEACTIVATE_SELECTED_ERROR = BATCH_ACTION_DEACTIVATE_SELECTED_ERROR;

var BATCH_ACTION_EXPORT_SELECTED = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.batchActions.exportSelectedTitle', {
  defaultMessage: 'Export selected'
});

exports.BATCH_ACTION_EXPORT_SELECTED = BATCH_ACTION_EXPORT_SELECTED;

var BATCH_ACTION_DUPLICATE_SELECTED = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.batchActions.duplicateSelectedTitle', {
  defaultMessage: 'Duplicate selected…'
});

exports.BATCH_ACTION_DUPLICATE_SELECTED = BATCH_ACTION_DUPLICATE_SELECTED;

var BATCH_ACTION_DELETE_SELECTED = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.batchActions.deleteSelectedTitle', {
  defaultMessage: 'Delete selected…'
});

exports.BATCH_ACTION_DELETE_SELECTED = BATCH_ACTION_DELETE_SELECTED;

var BATCH_ACTION_DELETE_SELECTED_IMMUTABLE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.batchActions.deleteSelectedImmutableTitle', {
  defaultMessage: 'Selection contains immutable rules which cannot be deleted'
});

exports.BATCH_ACTION_DELETE_SELECTED_IMMUTABLE = BATCH_ACTION_DELETE_SELECTED_IMMUTABLE;

var BATCH_ACTION_DELETE_SELECTED_ERROR = function BATCH_ACTION_DELETE_SELECTED_ERROR(totalRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.batchActions.deleteSelectedErrorTitle', {
    values: {
      totalRules: totalRules
    },
    defaultMessage: 'Error deleting {totalRules, plural, =1 {rule} other {rules}}…'
  });
};

exports.BATCH_ACTION_DELETE_SELECTED_ERROR = BATCH_ACTION_DELETE_SELECTED_ERROR;

var EXPORT_FILENAME = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.exportFilenameTitle', {
  defaultMessage: 'rules_export'
});

exports.EXPORT_FILENAME = EXPORT_FILENAME;

var SUCCESSFULLY_EXPORTED_RULES = function SUCCESSFULLY_EXPORTED_RULES(totalRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.successfullyExportedRulesTitle', {
    values: {
      totalRules: totalRules
    },
    defaultMessage: 'Successfully exported {totalRules, plural, =0 {all rules} =1 {{totalRules} rule} other {{totalRules} rules}}'
  });
};

exports.SUCCESSFULLY_EXPORTED_RULES = SUCCESSFULLY_EXPORTED_RULES;

var ALL_RULES = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.tableTitle', {
  defaultMessage: 'All rules'
});

exports.ALL_RULES = ALL_RULES;

var SEARCH_RULES = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.searchAriaLabel', {
  defaultMessage: 'Search rules'
});

exports.SEARCH_RULES = SEARCH_RULES;

var SEARCH_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.searchPlaceholder', {
  defaultMessage: 'e.g. rule name'
});

exports.SEARCH_PLACEHOLDER = SEARCH_PLACEHOLDER;

var SHOWING_RULES = function SHOWING_RULES(totalRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.showingRulesTitle', {
    values: {
      totalRules: totalRules
    },
    defaultMessage: 'Showing {totalRules} {totalRules, plural, =1 {rule} other {rules}}'
  });
};

exports.SHOWING_RULES = SHOWING_RULES;

var SELECTED_RULES = function SELECTED_RULES(selectedRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.selectedRulesTitle', {
    values: {
      selectedRules: selectedRules
    },
    defaultMessage: 'Selected {selectedRules} {selectedRules, plural, =1 {rule} other {rules}}'
  });
};

exports.SELECTED_RULES = SELECTED_RULES;

var EDIT_RULE_SETTINGS = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.actions.editRuleSettingsDescription', {
  defaultMessage: 'Edit rule settings'
});

exports.EDIT_RULE_SETTINGS = EDIT_RULE_SETTINGS;

var DUPLICATE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.actions.duplicateTitle', {
  defaultMessage: 'Duplicate'
});

exports.DUPLICATE = DUPLICATE;

var DUPLICATE_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.actions.duplicateRuleDescription', {
  defaultMessage: 'Duplicate rule…'
});

exports.DUPLICATE_RULE = DUPLICATE_RULE;

var SUCCESSFULLY_DUPLICATED_RULES = function SUCCESSFULLY_DUPLICATED_RULES(totalRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.successfullyDuplicatedRulesTitle', {
    values: {
      totalRules: totalRules
    },
    defaultMessage: 'Successfully duplicated {totalRules, plural, =1 {{totalRules} rule} other {{totalRules} rules}}'
  });
};

exports.SUCCESSFULLY_DUPLICATED_RULES = SUCCESSFULLY_DUPLICATED_RULES;

var DUPLICATE_RULE_ERROR = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.actions.duplicateRuleErrorDescription', {
  defaultMessage: 'Error duplicating rule…'
});

exports.DUPLICATE_RULE_ERROR = DUPLICATE_RULE_ERROR;

var EXPORT_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.actions.exportRuleDescription', {
  defaultMessage: 'Export rule'
});

exports.EXPORT_RULE = EXPORT_RULE;

var DELETE_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.actions.deleteeRuleDescription', {
  defaultMessage: 'Delete rule…'
});

exports.DELETE_RULE = DELETE_RULE;

var COLUMN_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.ruleTitle', {
  defaultMessage: 'Rule'
});

exports.COLUMN_RULE = COLUMN_RULE;

var COLUMN_RISK_SCORE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.riskScoreTitle', {
  defaultMessage: 'Risk score'
});

exports.COLUMN_RISK_SCORE = COLUMN_RISK_SCORE;

var COLUMN_SEVERITY = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.severityTitle', {
  defaultMessage: 'Severity'
});

exports.COLUMN_SEVERITY = COLUMN_SEVERITY;

var COLUMN_LAST_COMPLETE_RUN = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.lastRunTitle', {
  defaultMessage: 'Last run'
});

exports.COLUMN_LAST_COMPLETE_RUN = COLUMN_LAST_COMPLETE_RUN;

var COLUMN_LAST_RESPONSE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.lastResponseTitle', {
  defaultMessage: 'Last response'
});

exports.COLUMN_LAST_RESPONSE = COLUMN_LAST_RESPONSE;

var COLUMN_TAGS = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.tagsTitle', {
  defaultMessage: 'Tags'
});

exports.COLUMN_TAGS = COLUMN_TAGS;

var COLUMN_ACTIVATE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.activateTitle', {
  defaultMessage: 'Activated'
});

exports.COLUMN_ACTIVATE = COLUMN_ACTIVATE;

var COLUMN_INDEXING_TIMES = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.indexingTimes', {
  defaultMessage: 'Indexing Time (ms)'
});

exports.COLUMN_INDEXING_TIMES = COLUMN_INDEXING_TIMES;

var COLUMN_QUERY_TIMES = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.queryTimes', {
  defaultMessage: 'Query Time (ms)'
});

exports.COLUMN_QUERY_TIMES = COLUMN_QUERY_TIMES;

var COLUMN_GAP = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.gap', {
  defaultMessage: 'Gap (if any)'
});

exports.COLUMN_GAP = COLUMN_GAP;

var COLUMN_LAST_LOOKBACK_DATE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.columns.lastLookBackDate', {
  defaultMessage: 'Last Look-Back Date'
});

exports.COLUMN_LAST_LOOKBACK_DATE = COLUMN_LAST_LOOKBACK_DATE;

var RULES_TAB = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.tabs.rules', {
  defaultMessage: 'Rules'
});

exports.RULES_TAB = RULES_TAB;

var MONITORING_TAB = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.tabs.monitoring', {
  defaultMessage: 'Monitoring'
});

exports.MONITORING_TAB = MONITORING_TAB;

var CUSTOM_RULES = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.filters.customRulesTitle', {
  defaultMessage: 'Custom rules'
});

exports.CUSTOM_RULES = CUSTOM_RULES;

var ELASTIC_RULES = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.filters.elasticRulesTitle', {
  defaultMessage: 'Elastic rules'
});

exports.ELASTIC_RULES = ELASTIC_RULES;

var TAGS = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.filters.tagsLabel', {
  defaultMessage: 'Tags'
});

exports.TAGS = TAGS;

var NO_TAGS_AVAILABLE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.filters.noTagsAvailableDescription', {
  defaultMessage: 'No tags available'
});

exports.NO_TAGS_AVAILABLE = NO_TAGS_AVAILABLE;

var NO_RULES = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.filters.noRulesTitle', {
  defaultMessage: 'No rules found'
});

exports.NO_RULES = NO_RULES;

var NO_RULES_BODY = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.allRules.filters.noRulesBodyTitle', {
  defaultMessage: "We weren't able to find any rules with the above filters."
});

exports.NO_RULES_BODY = NO_RULES_BODY;

var DEFINE_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.defineRuleTitle', {
  defaultMessage: 'Define rule'
});

exports.DEFINE_RULE = DEFINE_RULE;

var ABOUT_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.aboutRuleTitle', {
  defaultMessage: 'About rule'
});

exports.ABOUT_RULE = ABOUT_RULE;

var SCHEDULE_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.scheduleRuleTitle', {
  defaultMessage: 'Schedule rule'
});

exports.SCHEDULE_RULE = SCHEDULE_RULE;

var RULE_ACTIONS = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.ruleActionsTitle', {
  defaultMessage: 'Rule actions'
});

exports.RULE_ACTIONS = RULE_ACTIONS;

var DEFINITION = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.stepDefinitionTitle', {
  defaultMessage: 'Definition'
});

exports.DEFINITION = DEFINITION;

var ABOUT = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.stepAboutTitle', {
  defaultMessage: 'About'
});

exports.ABOUT = ABOUT;

var SCHEDULE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.stepScheduleTitle', {
  defaultMessage: 'Schedule'
});

exports.SCHEDULE = SCHEDULE;

var ACTIONS = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.stepActionsTitle', {
  defaultMessage: 'Actions'
});

exports.ACTIONS = ACTIONS;

var OPTIONAL_FIELD = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.optionalFieldDescription', {
  defaultMessage: 'Optional'
});

exports.OPTIONAL_FIELD = OPTIONAL_FIELD;

var CONTINUE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.continueButtonTitle', {
  defaultMessage: 'Continue'
});

exports.CONTINUE = CONTINUE;

var UPDATE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.updateButtonTitle', {
  defaultMessage: 'Update'
});

exports.UPDATE = UPDATE;

var DELETE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.deleteDescription', {
  defaultMessage: 'Delete'
});

exports.DELETE = DELETE;

var LOAD_PREPACKAGED_RULES = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.loadPrePackagedRulesButton', {
  defaultMessage: 'Load Elastic prebuilt rules'
});

exports.LOAD_PREPACKAGED_RULES = LOAD_PREPACKAGED_RULES;

var RELOAD_MISSING_PREPACKAGED_RULES = function RELOAD_MISSING_PREPACKAGED_RULES(missingRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.reloadMissingPrePackagedRulesButton', {
    values: {
      missingRules: missingRules
    },
    defaultMessage: 'Install {missingRules} Elastic prebuilt {missingRules, plural, =1 {rule} other {rules}} '
  });
};

exports.RELOAD_MISSING_PREPACKAGED_RULES = RELOAD_MISSING_PREPACKAGED_RULES;

var IMPORT_RULE_BTN_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.components.importRuleModal.importRuleTitle', {
  defaultMessage: 'Import rule'
});

exports.IMPORT_RULE_BTN_TITLE = IMPORT_RULE_BTN_TITLE;

var SELECT_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.components.importRuleModal.selectRuleDescription', {
  defaultMessage: 'Select a SIEM rule (as exported from the Detection Engine view) to import'
});

exports.SELECT_RULE = SELECT_RULE;

var INITIAL_PROMPT_TEXT = _i18n.i18n.translate('xpack.siem.detectionEngine.components.importRuleModal.initialPromptTextDescription', {
  defaultMessage: 'Select or drag and drop a valid rules_export.ndjson file'
});

exports.INITIAL_PROMPT_TEXT = INITIAL_PROMPT_TEXT;

var OVERWRITE_WITH_SAME_NAME = _i18n.i18n.translate('xpack.siem.detectionEngine.components.importRuleModal.overwriteDescription', {
  defaultMessage: 'Automatically overwrite saved objects with the same rule ID'
});

exports.OVERWRITE_WITH_SAME_NAME = OVERWRITE_WITH_SAME_NAME;

var SUCCESSFULLY_IMPORTED_RULES = function SUCCESSFULLY_IMPORTED_RULES(totalRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.components.importRuleModal.successfullyImportedRulesTitle', {
    values: {
      totalRules: totalRules
    },
    defaultMessage: 'Successfully imported {totalRules} {totalRules, plural, =1 {rule} other {rules}}'
  });
};

exports.SUCCESSFULLY_IMPORTED_RULES = SUCCESSFULLY_IMPORTED_RULES;

var IMPORT_FAILED = _i18n.i18n.translate('xpack.siem.detectionEngine.components.importRuleModal.importFailedTitle', {
  defaultMessage: 'Failed to import rules'
});

exports.IMPORT_FAILED = IMPORT_FAILED;

var IMPORT_FAILED_DETAILED = function IMPORT_FAILED_DETAILED(ruleId, statusCode, message) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.components.importRuleModal.importFailedDetailedTitle', {
    values: {
      ruleId: ruleId,
      statusCode: statusCode,
      message: message
    },
    defaultMessage: 'Rule ID: {ruleId}\n Status Code: {statusCode}\n Message: {message}'
  });
};

exports.IMPORT_FAILED_DETAILED = IMPORT_FAILED_DETAILED;