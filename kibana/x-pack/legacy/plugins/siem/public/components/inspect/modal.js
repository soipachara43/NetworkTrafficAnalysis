"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalInspectQuery = void 0;

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

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
var DescriptionListStyled = (0, _styledComponents.default)(_eui.EuiDescriptionList).withConfig({
  displayName: "DescriptionListStyled",
  componentId: "sc-1p60x8n-0"
})(["@media only screen and (min-width:", "){.euiDescriptionList__title{width:30% !important;}.euiDescriptionList__description{width:70% !important;}}"], function (props) {
  return props.theme.eui.euiBreakpoints.s;
});
DescriptionListStyled.displayName = 'DescriptionListStyled';
var MyEuiModal = (0, _styledComponents.default)(_eui.EuiModal).withConfig({
  displayName: "MyEuiModal",
  componentId: "sc-1p60x8n-1"
})([".euiModal__flex{width:60vw;}.euiCodeBlock{height:auto !important;max-width:718px;}"]);
MyEuiModal.displayName = 'MyEuiModal';

var parseInspectString = function parseInspectString(objectStringify) {
  try {
    return JSON.parse(objectStringify);
  } catch (_unused) {
    return null;
  }
};

var manageStringify = function manageStringify(object) {
  try {
    return JSON.stringify(object, null, 2);
  } catch (_unused2) {
    return i18n.SOMETHING_WENT_WRONG;
  }
};

var ModalInspectQuery = function ModalInspectQuery(_ref) {
  var closeModal = _ref.closeModal,
      _ref$isShowing = _ref.isShowing,
      isShowing = _ref$isShowing === void 0 ? false : _ref$isShowing,
      request = _ref.request,
      response = _ref.response,
      title = _ref.title;

  if (!isShowing || request == null || response == null) {
    return null;
  }

  var inspectRequest = parseInspectString(request);
  var inspectResponse = parseInspectString(response);
  var statistics = [{
    title: _react.default.createElement("span", {
      "data-test-subj": "index-pattern-title"
    }, i18n.INDEX_PATTERN, ' ', _react.default.createElement(_eui.EuiIconTip, {
      color: "subdued",
      content: i18n.INDEX_PATTERN_DESC,
      type: "iInCircle"
    })),
    description: _react.default.createElement("span", {
      "data-test-subj": "index-pattern-description"
    }, inspectRequest != null ? inspectRequest.index.join(', ') : i18n.SOMETHING_WENT_WRONG)
  }, {
    title: _react.default.createElement("span", {
      "data-test-subj": "query-time-title"
    }, i18n.QUERY_TIME, ' ', _react.default.createElement(_eui.EuiIconTip, {
      color: "subdued",
      content: i18n.QUERY_TIME_DESC,
      type: "iInCircle"
    })),
    description: _react.default.createElement("span", {
      "data-test-subj": "query-time-description"
    }, inspectResponse != null ? "".concat((0, _numeral.default)(inspectResponse.took).format('0,0'), "ms") : i18n.SOMETHING_WENT_WRONG)
  }, {
    title: _react.default.createElement("span", {
      "data-test-subj": "request-timestamp-title"
    }, i18n.REQUEST_TIMESTAMP, ' ', _react.default.createElement(_eui.EuiIconTip, {
      color: "subdued",
      content: i18n.REQUEST_TIMESTAMP_DESC,
      type: "iInCircle"
    })),
    description: _react.default.createElement("span", {
      "data-test-subj": "request-timestamp-description"
    }, new Date().toISOString())
  }];
  var tabs = [{
    id: 'statistics',
    name: 'Statistics',
    content: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(DescriptionListStyled, {
      listItems: statistics,
      type: "column"
    }))
  }, {
    id: 'request',
    name: 'Request',
    content: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCodeBlock, {
      language: "js",
      fontSize: "m",
      paddingSize: "m",
      color: "dark",
      overflowHeight: 300,
      isCopyable: true
    }, inspectRequest != null ? manageStringify(inspectRequest.body) : i18n.SOMETHING_WENT_WRONG))
  }, {
    id: 'response',
    name: 'Response',
    content: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCodeBlock, {
      language: "js",
      fontSize: "m",
      paddingSize: "m",
      color: "dark",
      overflowHeight: 300,
      isCopyable: true
    }, response))
  }];
  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(MyEuiModal, {
    onClose: closeModal,
    "data-test-subj": "modal-inspect-euiModal"
  }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, i18n.INSPECT, " ", title)), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiTabbedContent, {
    tabs: tabs,
    initialSelectedTab: tabs[0],
    autoFocus: "selected"
  })), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButton, {
    onClick: closeModal,
    fill: true,
    "data-test-subj": "modal-inspect-close"
  }, i18n.CLOSE))));
};

exports.ModalInspectQuery = ModalInspectQuery;