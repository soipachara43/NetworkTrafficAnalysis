"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowingCount = exports.ShowingCountComponent = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ShowingContainer = _styledComponents.default.div.withConfig({
  displayName: "ShowingContainer",
  componentId: "vaiucl-0"
})(["user-select:none;margin-top:5px;"]);

ShowingContainer.displayName = 'ShowingContainer';

var ShowingCountComponent = function ShowingCountComponent(_ref) {
  var filterResultsLength = _ref.filterResultsLength;
  return _react2.default.createElement(ShowingContainer, {
    "data-test-subj": "showing"
  }, _react2.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "xs"
  }, _react2.default.createElement(_react.FormattedMessage, {
    "data-test-subj": "query-message",
    id: "xpack.siem.components.mlPopup.showingLabel",
    defaultMessage: "Showing: {filterResultsLength} {filterResultsLength, plural, one {job} other {jobs}}",
    values: {
      filterResultsLength: filterResultsLength
    }
  })));
};

exports.ShowingCountComponent = ShowingCountComponent;
ShowingCountComponent.displayName = 'ShowingCountComponent';

var ShowingCount = _react2.default.memo(ShowingCountComponent);

exports.ShowingCount = ShowingCount;
ShowingCount.displayName = 'ShowingCount';