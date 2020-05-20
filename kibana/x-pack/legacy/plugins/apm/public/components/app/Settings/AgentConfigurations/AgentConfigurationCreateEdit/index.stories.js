"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _useFetcher = require("../../../../../hooks/useFetcher");

var _createCallApmApi = require("../../../../../services/rest/createCallApmApi");

var _index = require("./index");

var _ApmPluginContext = require("../../../../../context/ApmPluginContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('app/Settings/AgentConfigurations/AgentConfigurationCreateEdit', module).add('with config', function () {
  var httpMock = {}; // mock

  (0, _createCallApmApi.createCallApmApi)(httpMock);
  var contextMock = {
    core: {
      notifications: {
        toasts: {
          addWarning: function addWarning() {},
          addDanger: function addDanger() {}
        }
      }
    }
  };
  return _react2.default.createElement(_ApmPluginContext.ApmPluginContext.Provider, {
    value: contextMock
  }, _react2.default.createElement(_index.AgentConfigurationCreateEdit, {
    pageStep: "choose-settings-step",
    existingConfigResult: {
      status: _useFetcher.FETCH_STATUS.SUCCESS,
      data: {
        service: {
          name: 'opbeans-node',
          environment: 'production'
        },
        settings: {}
      }
    }
  }));
}, {
  info: {
    source: false
  }
});