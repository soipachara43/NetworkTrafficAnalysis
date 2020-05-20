"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenClosedStats = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("../all_cases/translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OpenClosedStats = _react.default.memo(function (_ref) {
  var caseCount = _ref.caseCount,
      caseStatus = _ref.caseStatus,
      isLoading = _ref.isLoading;
  var openClosedStats = (0, _react.useMemo)(function () {
    return [{
      title: caseStatus === 'open' ? i18n.OPEN_CASES : i18n.CLOSED_CASES,
      description: isLoading ? _react.default.createElement(_eui.EuiLoadingSpinner, null) : caseCount !== null && caseCount !== void 0 ? caseCount : 'N/A'
    }];
  }, [caseCount, caseStatus, isLoading]);
  return _react.default.createElement(_eui.EuiDescriptionList, {
    textStyle: "reverse",
    listItems: openClosedStats
  });
});

exports.OpenClosedStats = OpenClosedStats;
OpenClosedStats.displayName = 'OpenClosedStats';