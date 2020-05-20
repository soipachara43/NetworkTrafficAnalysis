"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBulkItems = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getBulkItems = function getBulkItems(_ref) {
  var caseStatus = _ref.caseStatus,
      closePopover = _ref.closePopover,
      deleteCasesAction = _ref.deleteCasesAction,
      selectedCaseIds = _ref.selectedCaseIds,
      updateCaseStatus = _ref.updateCaseStatus;
  return [caseStatus === 'open' ? _react.default.createElement(_eui.EuiContextMenuItem, {
    "data-test-subj": "cases-bulk-close-button",
    disabled: selectedCaseIds.length === 0,
    key: i18n.BULK_ACTION_CLOSE_SELECTED,
    icon: "folderCheck",
    onClick: function onClick() {
      closePopover();
      updateCaseStatus('closed');
    }
  }, i18n.BULK_ACTION_CLOSE_SELECTED) : _react.default.createElement(_eui.EuiContextMenuItem, {
    "data-test-subj": "cases-bulk-open-button",
    disabled: selectedCaseIds.length === 0,
    key: i18n.BULK_ACTION_OPEN_SELECTED,
    icon: "folderExclamation",
    onClick: function onClick() {
      closePopover();
      updateCaseStatus('open');
    }
  }, i18n.BULK_ACTION_OPEN_SELECTED), _react.default.createElement(_eui.EuiContextMenuItem, {
    "data-test-subj": "cases-bulk-delete-button",
    key: i18n.BULK_ACTION_DELETE_SELECTED,
    icon: "trash",
    disabled: selectedCaseIds.length === 0,
    onClick: function onClick() {
      closePopover();
      deleteCasesAction(selectedCaseIds);
    }
  }, i18n.BULK_ACTION_DELETE_SELECTED)];
};

exports.getBulkItems = getBulkItems;