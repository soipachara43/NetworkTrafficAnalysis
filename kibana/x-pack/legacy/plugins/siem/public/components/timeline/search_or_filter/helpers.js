"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlaceholderText = exports.options = exports.modes = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _and_or_badge = require("../../and_or_badge");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AndOrContainer = _styledComponents.default.div.withConfig({
  displayName: "AndOrContainer",
  componentId: "sc-84b4bp-0"
})(["position:relative;top:-1px;"]);

AndOrContainer.displayName = 'AndOrContainer';
var modes = {
  filter: {
    mode: 'filter',
    description: i18n.FILTER_DESCRIPTION,
    kqlBarTooltip: i18n.FILTER_KQL_TOOLTIP,
    placeholder: i18n.FILTER_KQL_PLACEHOLDER,
    selectText: i18n.FILTER_KQL_SELECTED_TEXT
  },
  search: {
    mode: 'search',
    description: i18n.SEARCH_DESCRIPTION,
    kqlBarTooltip: i18n.SEARCH_KQL_TOOLTIP,
    placeholder: i18n.SEARCH_KQL_PLACEHOLDER,
    selectText: i18n.SEARCH_KQL_SELECTED_TEXT
  }
};
exports.modes = modes;
var options = [{
  value: modes.filter.mode,
  inputDisplay: _react.default.createElement(AndOrContainer, null, _react.default.createElement(_and_or_badge.AndOrBadge, {
    type: "and"
  }), modes.filter.selectText),
  dropdownDisplay: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_and_or_badge.AndOrBadge, {
    type: "and"
  }), _react.default.createElement("strong", null, modes.filter.selectText), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement("p", {
    className: "euiTextColor--subdued"
  }, modes.filter.description)))
}, {
  value: modes.search.mode,
  inputDisplay: _react.default.createElement(AndOrContainer, null, _react.default.createElement(_and_or_badge.AndOrBadge, {
    type: "or"
  }), modes.search.selectText),
  dropdownDisplay: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_and_or_badge.AndOrBadge, {
    type: "or"
  }), _react.default.createElement("strong", null, modes.search.selectText), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement("p", {
    className: "euiTextColor--subdued"
  }, modes.search.description)))
}];
exports.options = options;

var getPlaceholderText = function getPlaceholderText(kqlMode) {
  return kqlMode === 'filter' ? i18n.FILTER_KQL_PLACEHOLDER : i18n.SEARCH_KQL_PLACEHOLDER;
};

exports.getPlaceholderText = getPlaceholderText;