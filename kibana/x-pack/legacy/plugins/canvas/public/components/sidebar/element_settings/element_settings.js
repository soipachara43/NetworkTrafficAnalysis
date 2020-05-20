"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementSettings = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _datasource = require("../../datasource");

var _function_form_list = require("../../function_form_list");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore unconverted component
// @ts-ignore unconverted component
var strings = _i18n.ComponentStrings.ElementSettings;

var ElementSettings = function ElementSettings(_ref) {
  var element = _ref.element;
  var tabs = [{
    id: 'edit',
    name: strings.getDisplayTabLabel(),
    content: _react.default.createElement("div", {
      className: "canvasSidebar__pop"
    }, _react.default.createElement("div", {
      className: "canvasSidebar--args"
    }, _react.default.createElement(_function_form_list.FunctionFormList, {
      element: element
    })))
  }, {
    id: 'data',
    name: strings.getDataTabLabel(),
    content: _react.default.createElement("div", {
      className: "canvasSidebar__pop"
    }, _react.default.createElement(_datasource.Datasource, null))
  }];
  return _react.default.createElement(_eui.EuiTabbedContent, {
    tabs: tabs,
    initialSelectedTab: tabs[0],
    size: "s"
  });
};

exports.ElementSettings = ElementSettings;
ElementSettings.propTypes = {
  element: _propTypes.default.object
};