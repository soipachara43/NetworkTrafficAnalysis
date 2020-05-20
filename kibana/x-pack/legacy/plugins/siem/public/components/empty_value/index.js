"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrEmptyTagFromValue = exports.getOrEmptyTag = exports.defaultToEmptyTag = exports.getEmptyStringTag = exports.getEmptyTagValue = exports.getEmptyString = exports.getEmptyValue = void 0;

var _fp = require("lodash/fp");

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
var EmptyWrapper = _styledComponents.default.span.withConfig({
  displayName: "EmptyWrapper",
  componentId: "sc-8xj2nv-0"
})(["color:", ";"], function (props) {
  return props.theme.eui.euiColorMediumShade;
});

EmptyWrapper.displayName = 'EmptyWrapper';

var getEmptyValue = function getEmptyValue() {
  return '—';
};

exports.getEmptyValue = getEmptyValue;

var getEmptyString = function getEmptyString() {
  return "(".concat(i18n.EMPTY_STRING, ")");
};

exports.getEmptyString = getEmptyString;

var getEmptyTagValue = function getEmptyTagValue() {
  return _react.default.createElement(EmptyWrapper, null, getEmptyValue());
};

exports.getEmptyTagValue = getEmptyTagValue;

var getEmptyStringTag = function getEmptyStringTag() {
  return _react.default.createElement(EmptyWrapper, null, getEmptyString());
};

exports.getEmptyStringTag = getEmptyStringTag;

var defaultToEmptyTag = function defaultToEmptyTag(item) {
  if (item == null) {
    return getEmptyTagValue();
  } else if ((0, _fp.isString)(item) && item === '') {
    return getEmptyStringTag();
  } else {
    return _react.default.createElement(_react.default.Fragment, null, item);
  }
};

exports.defaultToEmptyTag = defaultToEmptyTag;

var getOrEmptyTag = function getOrEmptyTag(path, item) {
  var text = (0, _fp.get)(path, item);
  return getOrEmptyTagFromValue(text);
};

exports.getOrEmptyTag = getOrEmptyTag;

var getOrEmptyTagFromValue = function getOrEmptyTagFromValue(value) {
  if (value == null) {
    return getEmptyTagValue();
  } else if (value === '') {
    return getEmptyStringTag();
  } else {
    return _react.default.createElement(_react.default.Fragment, null, value);
  }
};

exports.getOrEmptyTagFromValue = getOrEmptyTagFromValue;