"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDescriptionList = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _score_health = require("./score_health");

var _formatted_date = require("../../formatted_date");

var _create_influencers = require("./../influencers/create_influencers");

var i18n = _interopRequireWildcard(require("./translations"));

var _create_explorer_link = require("../links/create_explorer_link");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LargeScore = (0, _styledComponents.default)(_eui.EuiText).withConfig({
  displayName: "LargeScore",
  componentId: "czaf4q-0"
})(["font-size:45px;font-weight:lighter;"]);
LargeScore.displayName = 'LargeScore';

var createDescriptionList = function createDescriptionList(score, startDate, endDate, interval, narrowDateRange) {
  var descriptionList = [{
    title: i18n.MAX_ANOMALY_SCORE,
    description: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(LargeScore, null, (0, _score_health.getScoreString)(score.severity)))
  }, {
    title: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), i18n.ANOMALY_JOB),
    description: _react.default.createElement(_eui.EuiFlexGroup, {
      direction: "column",
      gutterSize: "none",
      responsive: false
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, score.jobId), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiLink, {
      href: (0, _create_explorer_link.createExplorerLink)(score, startDate, endDate),
      target: "_blank"
    }, i18n.VIEW_IN_MACHINE_LEARNING)))
  }, {
    title: i18n.DETECTED,
    description: _react.default.createElement(_eui.EuiFlexGroup, {
      direction: "column",
      gutterSize: "none",
      responsive: false
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_formatted_date.PreferenceFormattedDate, {
      value: new Date(score.time)
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiLink, {
      "data-test-subj": "anomaly-description-narrow-range-link",
      onClick: function onClick() {
        narrowDateRange(score, interval);
      },
      target: "_blank"
    }, i18n.NARROW_TO_THIS_DATE_RANGE)))
  }, {
    title: i18n.ANOMALOUS_ENTITY,
    description: _react.default.createElement(_eui.EuiFlexGroup, {
      direction: "column",
      gutterSize: "none",
      responsive: false
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, "".concat(score.entityName, ": \"").concat(score.entityValue, "\"")))
  }, {
    title: i18n.INFLUENCED_BY,
    description: _react.default.createElement(_eui.EuiFlexGroup, {
      direction: "column",
      gutterSize: "none",
      responsive: false
    }, (0, _create_influencers.createInfluencers)(score.influencers))
  }];
  return descriptionList;
};

exports.createDescriptionList = createDescriptionList;