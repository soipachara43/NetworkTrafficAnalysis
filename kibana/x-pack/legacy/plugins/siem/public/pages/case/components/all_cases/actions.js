"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActions = void 0;

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getActions = function getActions(_ref) {
  var caseStatus = _ref.caseStatus,
      dispatchUpdate = _ref.dispatchUpdate,
      deleteCaseOnClick = _ref.deleteCaseOnClick;
  return [{
    description: i18n.DELETE_CASE,
    icon: 'trash',
    name: i18n.DELETE_CASE,
    onClick: deleteCaseOnClick,
    type: 'icon',
    'data-test-subj': 'action-delete'
  }, caseStatus === 'open' ? {
    description: i18n.CLOSE_CASE,
    icon: 'folderCheck',
    name: i18n.CLOSE_CASE,
    onClick: function onClick(theCase) {
      return dispatchUpdate({
        updateKey: 'status',
        updateValue: 'closed',
        caseId: theCase.id,
        version: theCase.version
      });
    },
    type: 'icon',
    'data-test-subj': 'action-close'
  } : {
    description: i18n.REOPEN_CASE,
    icon: 'folderExclamation',
    name: i18n.REOPEN_CASE,
    onClick: function onClick(theCase) {
      return dispatchUpdate({
        updateKey: 'status',
        updateValue: 'open',
        caseId: theCase.id,
        version: theCase.version
      });
    },
    type: 'icon',
    'data-test-subj': 'action-open'
  }];
};

exports.getActions = getActions;