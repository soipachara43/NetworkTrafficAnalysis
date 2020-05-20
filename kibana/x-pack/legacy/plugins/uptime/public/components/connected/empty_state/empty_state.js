"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyState = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../state/actions");

var _selectors = require("../../../state/selectors");

var _empty_state = require("../../functional/empty_state/empty_state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyState = function EmptyState(_ref) {
  var children = _ref.children;

  var _useSelector = (0, _reactRedux.useSelector)(_selectors.indexStatusSelector),
      data = _useSelector.data,
      loading = _useSelector.loading,
      error = _useSelector.error;

  var dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(function () {
    dispatch(_actions.indexStatusAction.get());
  }, [dispatch]);
  return _react.default.createElement(_empty_state.EmptyStateComponent, {
    statesIndexStatus: data,
    loading: loading,
    errors: error ? [error] : undefined,
    children: children
  });
};

exports.EmptyState = EmptyState;