"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternsMissingPrompt = exports.IndexPatternsMissingPromptComponent = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _kibana = require("../../lib/kibana");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IndexPatternsMissingPromptComponent = function IndexPatternsMissingPromptComponent() {
  var docLinks = (0, _kibana.useKibana)().services.docLinks;
  var kibanaBasePath = "".concat((0, _kibana.useBasePath)(), "/app/kibana");
  return _react2.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "gisApp",
    title: _react2.default.createElement("h2", null, i18n.ERROR_TITLE),
    titleSize: "xs",
    body: _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      defaultMessage: "To display map data, you must define SIEM indices ({defaultIndex}) and Kibana index patterns with matching glob patterns. When using {beats}, you can run the {setup} command on your hosts to automatically create the index patterns. For example: {example}.",
      id: "xpack.siem.components.embeddables.indexPatternsMissingPrompt.errorDescription1",
      values: {
        defaultIndex: _react2.default.createElement("a", {
          href: "".concat(kibanaBasePath, "#/management/kibana/settings"),
          rel: "noopener noreferrer",
          target: "_blank"
        }, 'siem:defaultIndex'),
        beats: _react2.default.createElement("a", {
          href: "".concat(docLinks.ELASTIC_WEBSITE_URL, "guide/en/beats/libbeat/").concat(docLinks.DOC_LINK_VERSION, "/getting-started.html"),
          rel: "noopener noreferrer",
          target: "_blank"
        }, 'beats'),
        setup: _react2.default.createElement(_eui.EuiCode, null, 'setup'),
        example: _react2.default.createElement(_eui.EuiCode, null, './packetbeat setup')
      }
    })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      defaultMessage: "You can also configure index patterns manually in Kibana.",
      id: "xpack.siem.components.embeddables.indexPatternsMissingPrompt.errorDescription2"
    }))),
    actions: _react2.default.createElement(_eui.EuiButton, {
      href: "".concat(kibanaBasePath, "#/management/kibana/index_patterns"),
      color: "primary",
      target: "_blank",
      fill: true
    }, i18n.ERROR_BUTTON)
  });
};

exports.IndexPatternsMissingPromptComponent = IndexPatternsMissingPromptComponent;
IndexPatternsMissingPromptComponent.displayName = 'IndexPatternsMissingPromptComponent';

var IndexPatternsMissingPrompt = _react2.default.memo(IndexPatternsMissingPromptComponent);

exports.IndexPatternsMissingPrompt = IndexPatternsMissingPrompt;
IndexPatternsMissingPrompt.displayName = 'IndexPatternsMissingPrompt';