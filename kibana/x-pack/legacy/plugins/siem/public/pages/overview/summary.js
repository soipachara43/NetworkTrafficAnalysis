"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Summary = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _kibana = require("../../lib/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Summary = _react.default.memo(function () {
  var docLinks = (0, _kibana.useKibana)().services.docLinks;
  return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.siem.overview.startedTitle",
    defaultMessage: "Getting started"
  })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.siem.overview.startedText",
    defaultMessage: "Welcome to Security Information & Event Management (SIEM). Get started by reviewing our {docs} or {data}. For information about upcoming features and tutorials, be sure to check out our {siemSolution} page.",
    values: {
      docs: _react.default.createElement(_eui.EuiLink, {
        href: docLinks.links.siem.guide,
        target: "blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.siem.overview.startedText.docsLinkText",
        defaultMessage: "documentation"
      })),
      data: _react.default.createElement(_eui.EuiLink, {
        href: "kibana#home/tutorial_directory/siem"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.siem.overview.startedText.dataLinkText",
        defaultMessage: "ingesting data"
      })),
      siemSolution: _react.default.createElement(_eui.EuiLink, {
        href: "https://www.elastic.co/solutions/siem",
        target: "blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.siem.overview.startedText.siemSolutionLinkText",
        defaultMessage: "SIEM solution"
      }))
    }
  })), _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.siem.overview.feedbackTitle",
    defaultMessage: "Feedback"
  })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.siem.overview.feedbackText",
    defaultMessage: "If you have input or suggestions regarding your experience with Elastic SIEM, please feel free to {feedback}.",
    values: {
      feedback: _react.default.createElement(_eui.EuiLink, {
        href: "https://discuss.elastic.co/c/siem",
        target: "blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.siem.overview.feedbackText.feedbackLinkText",
        defaultMessage: "submit feedback online"
      }))
    }
  }))));
});

exports.Summary = Summary;
Summary.displayName = 'Summary';