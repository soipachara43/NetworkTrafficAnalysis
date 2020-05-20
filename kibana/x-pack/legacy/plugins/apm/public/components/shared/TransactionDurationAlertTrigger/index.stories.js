"use strict";

var _lodash = require("lodash");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _ = require(".");

var _MockApmPluginContext = require("../../../context/ApmPluginContext/MockApmPluginContext");

var _MockUrlParamsContextProvider = require("../../../context/UrlParamsContext/MockUrlParamsContextProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('app/TransactionDurationAlertTrigger', module).add('example', function (context) {
  var params = {
    threshold: 1500,
    aggregationType: 'avg',
    window: '5m'
  };
  var contextMock = (0, _lodash.merge)((0, _lodash.cloneDeep)(_MockApmPluginContext.mockApmPluginContextValue), {
    core: {
      http: {
        get: function get() {
          return Promise.resolve({
            transactionTypes: ['request']
          });
        }
      }
    }
  });
  return _react2.default.createElement("div", {
    style: {
      width: 400
    }
  }, _react2.default.createElement(_MockApmPluginContext.MockApmPluginContextWrapper, {
    value: contextMock
  }, _react2.default.createElement(_MockUrlParamsContextProvider.MockUrlParamsContextProvider, null, _react2.default.createElement(_.TransactionDurationAlertTrigger, {
    alertParams: params,
    setAlertParams: function setAlertParams() {
      return undefined;
    },
    setAlertProperty: function setAlertProperty() {
      return undefined;
    }
  }))));
});