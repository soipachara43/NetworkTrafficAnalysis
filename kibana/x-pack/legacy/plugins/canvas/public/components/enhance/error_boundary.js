"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorBoundary = exports.errorBoundaryHoc = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ErrorBoundaryComponent = function ErrorBoundaryComponent(props) {
  return _react.default.createElement(_react.Fragment, null, props.children({
    error: props.error,
    errorInfo: props.errorInfo,
    resetErrorState: props.resetErrorState
  }));
};

ErrorBoundaryComponent.propTypes = {
  children: _propTypes.default.func.isRequired,
  error: _propTypes.default.object,
  errorInfo: _propTypes.default.object,
  resetErrorState: _propTypes.default.func.isRequired
};
var errorBoundaryHoc = (0, _recompose.compose)((0, _recompose.withState)('error', 'setError', null), (0, _recompose.withState)('errorInfo', 'setErrorInfo', null), (0, _recompose.withHandlers)({
  resetErrorState: function resetErrorState(_ref) {
    var setError = _ref.setError,
        setErrorInfo = _ref.setErrorInfo;
    return function () {
      setError(null);
      setErrorInfo(null);
    };
  }
}), (0, _recompose.lifecycle)({
  componentDidCatch: function componentDidCatch(error, errorInfo) {
    this.props.setError(error);
    this.props.setErrorInfo(errorInfo);
  }
}), (0, _recompose.mapProps)(function (props) {
  return (0, _lodash.omit)(props, ['setError', 'setErrorInfo']);
}));
exports.errorBoundaryHoc = errorBoundaryHoc;
var ErrorBoundary = errorBoundaryHoc(ErrorBoundaryComponent);
exports.ErrorBoundary = ErrorBoundary;