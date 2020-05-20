"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyStateComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _empty_state_error = require("./empty_state_error");

var _empty_state_loading = require("./empty_state_loading");

var _data_missing = require("./data_missing");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyStateComponent = function EmptyStateComponent(_ref) {
  var children = _ref.children,
      statesIndexStatus = _ref.statesIndexStatus,
      loading = _ref.loading,
      errors = _ref.errors;

  if (errors === null || errors === void 0 ? void 0 : errors.length) {
    return _react.default.createElement(_empty_state_error.EmptyStateError, {
      errors: errors
    });
  }

  if (!loading && statesIndexStatus) {
    var indexExists = statesIndexStatus.indexExists,
        docCount = statesIndexStatus.docCount;

    if (!indexExists) {
      return _react.default.createElement(_data_missing.DataMissing, {
        headingMessage: _i18n.i18n.translate('xpack.uptime.emptyState.noIndexTitle', {
          defaultMessage: 'Uptime index not found'
        })
      });
    } else if (indexExists && docCount === 0) {
      return _react.default.createElement(_data_missing.DataMissing, {
        headingMessage: _i18n.i18n.translate('xpack.uptime.emptyState.noDataMessage', {
          defaultMessage: 'No uptime data found'
        })
      });
    }
    /**
     * We choose to render the children any time the count > 0, even if
     * the component is loading. If we render the loading state for this component,
     * it will blow away the state of child components and trigger an ugly
     * jittery UX any time the components refresh. This way we'll keep the stale
     * state displayed during the fetching process.
     */


    return _react.default.createElement(_react.Fragment, null, children);
  }

  return _react.default.createElement(_empty_state_loading.EmptyStateLoading, null);
};

exports.EmptyStateComponent = EmptyStateComponent;