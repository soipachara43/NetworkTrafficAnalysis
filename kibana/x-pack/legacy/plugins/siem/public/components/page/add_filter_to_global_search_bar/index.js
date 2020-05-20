"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  AddFilterToGlobalSearchBar: true,
  HoverActionsContainer: true
};
exports.HoverActionsContainer = exports.AddFilterToGlobalSearchBar = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _with_hover_actions = require("../../with_hover_actions");

var _kibana = require("../../../lib/kibana");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers = require("./helpers");

Object.keys(_helpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helpers[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AddFilterToGlobalSearchBar = _react.default.memo(function (_ref) {
  var children = _ref.children,
      filter = _ref.filter,
      onFilterAdded = _ref.onFilterAdded;
  var filterManager = (0, _kibana.useKibana)().services.data.query.filterManager;
  var addToKql = (0, _react.useCallback)(function () {
    filterManager.addFilters(filter);

    if (onFilterAdded != null) {
      onFilterAdded();
    }
  }, [filter, filterManager, onFilterAdded]);
  return _react.default.createElement(_with_hover_actions.WithHoverActions, {
    hoverContent: _react.default.createElement(HoverActionsContainer, {
      "data-test-subj": "hover-actions-container",
      paddingSize: "none"
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: i18n.FILTER_FOR_VALUE
    }, _react.default.createElement(_eui.EuiIcon, {
      "data-test-subj": "add-to-filter",
      type: "filter",
      onClick: addToKql
    }))),
    render: function render() {
      return children;
    }
  });
});

exports.AddFilterToGlobalSearchBar = AddFilterToGlobalSearchBar;
AddFilterToGlobalSearchBar.displayName = 'AddFilterToGlobalSearchBar';
var HoverActionsContainer = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "HoverActionsContainer",
  componentId: "sc-1u162tv-0"
})(["align-items:center;display:flex;flex-direction:row;height:34px;justify-content:center;left:5px;position:absolute;top:-10px;width:34px;cursor:pointer;"]);
exports.HoverActionsContainer = HoverActionsContainer;