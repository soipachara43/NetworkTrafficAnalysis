"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyStateLoading = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyStateLoading = function EmptyStateLoading() {
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    body: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "xl"
    }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiTitle, {
      size: "l"
    }, _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.uptime.emptyState.loadingMessage', {
      defaultMessage: 'Loading…'
    }))))
  });
};

exports.EmptyStateLoading = EmptyStateLoading;