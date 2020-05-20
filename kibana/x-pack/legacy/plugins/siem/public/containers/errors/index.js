"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reTryOneTimeOnErrorLink = exports.reTryOneTimeOnErrorHandler = exports.errorLink = exports.errorLinkHandler = void 0;

var _apolloLinkError = require("apollo-link-error");

var _fp = require("lodash/fp");

var _uuid = _interopRequireDefault(require("uuid"));

var i18n = _interopRequireWildcard(require("./translations"));

var _store = require("../../store");

var _actions = require("../../store/actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var errorLinkHandler = function errorLinkHandler(_ref) {
  var graphQLErrors = _ref.graphQLErrors,
      networkError = _ref.networkError;
  var store = (0, _store.getStore)();
  var dispatch = (0, _fp.throttle)(50, store != null ? store.dispatch : _fp.noop);

  if (graphQLErrors != null && store != null) {
    dispatch(_actions.appActions.addError({
      id: _uuid.default.v4(),
      title: i18n.DATA_FETCH_FAILURE,
      message: graphQLErrors.map(function (_ref2) {
        var message = _ref2.message;
        return message;
      })
    }));
  }

  if (networkError != null && store != null) {
    dispatch(_actions.appActions.addError({
      id: _uuid.default.v4(),
      title: i18n.NETWORK_FAILURE,
      message: [networkError.message]
    }));
  }
};

exports.errorLinkHandler = errorLinkHandler;
var errorLink = (0, _apolloLinkError.onError)(errorLinkHandler);
exports.errorLink = errorLink;

var reTryOneTimeOnErrorHandler = function reTryOneTimeOnErrorHandler(_ref3) {
  var networkError = _ref3.networkError,
      operation = _ref3.operation,
      forward = _ref3.forward;

  if (networkError != null) {
    var statusCode = (0, _fp.get)('statusCode', networkError);

    if (statusCode != null && statusCode === 503) {
      return forward(operation);
    }
  }
};

exports.reTryOneTimeOnErrorHandler = reTryOneTimeOnErrorHandler;
var reTryOneTimeOnErrorLink = (0, _apolloLinkError.onError)(reTryOneTimeOnErrorHandler);
exports.reTryOneTimeOnErrorLink = reTryOneTimeOnErrorLink;