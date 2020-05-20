"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filters = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MY_RECENTLY_REPORTED_ID = 'myRecentlyReported';
var toggleButtonIcons = [{
  id: 'recentlyCreated',
  label: i18n.RECENTLY_CREATED_CASES,
  iconType: 'folderExclamation'
}, {
  id: MY_RECENTLY_REPORTED_ID,
  label: i18n.MY_RECENTLY_REPORTED_CASES,
  iconType: 'reporter'
}];

var Filters = _react.default.memo(function (_ref) {
  var filterBy = _ref.filterBy,
      setFilterBy = _ref.setFilterBy,
      showMyRecentlyReported = _ref.showMyRecentlyReported;
  var options = (0, _react.useMemo)(function () {
    return showMyRecentlyReported ? toggleButtonIcons : toggleButtonIcons.filter(function (x) {
      return x.id !== MY_RECENTLY_REPORTED_ID;
    });
  }, [showMyRecentlyReported]);
  var onChange = (0, _react.useCallback)(function (filterMode) {
    setFilterBy(filterMode);
  }, [setFilterBy]);
  return _react.default.createElement(_eui.EuiButtonGroup, {
    options: options,
    idSelected: filterBy,
    onChange: onChange,
    isIconOnly: true
  });
});

exports.Filters = Filters;
Filters.displayName = 'Filters';