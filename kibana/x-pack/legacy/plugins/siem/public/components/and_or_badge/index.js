"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AndOrBadge = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RoundedBadge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "RoundedBadge",
  componentId: "sc-4mnjoc-0"
})(["align-items:center;border-radius:100%;display:inline-flex;font-size:9px;height:34px;justify-content:center;margin:0 5px 0 5px;padding:7px 6px 4px 6px;user-select:none;width:34px;.euiBadge__content{position:relative;top:-1px;}.euiBadge__text{text-overflow:clip;}"]);
RoundedBadge.displayName = 'RoundedBadge';

/** Displays AND / OR in a round badge */
// Ref: https://github.com/elastic/eui/issues/1655
var AndOrBadge = _react.default.memo(function (_ref) {
  var type = _ref.type;
  return _react.default.createElement(RoundedBadge, {
    "data-test-subj": "and-or-badge",
    color: "hollow"
  }, type === 'and' ? i18n.AND : i18n.OR);
});

exports.AndOrBadge = AndOrBadge;
AndOrBadge.displayName = 'AndOrBadge';