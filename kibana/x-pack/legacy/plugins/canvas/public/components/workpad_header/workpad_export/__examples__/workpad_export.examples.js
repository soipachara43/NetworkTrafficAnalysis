"use strict";

var _react = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _react2 = _interopRequireDefault(require("react"));

var _workpad_export = require("../workpad_export");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/Export/WorkpadExport', module).add('enabled', function () {
  return _react2.default.createElement(_workpad_export.WorkpadExport, {
    onCopy: (0, _addonActions.action)('onCopy'),
    onExport: (0, _addonActions.action)('onExport'),
    getExportUrl: function getExportUrl(type) {
      (0, _addonActions.action)("getExportUrl('".concat(type, "')"));
      return type;
    }
  });
});