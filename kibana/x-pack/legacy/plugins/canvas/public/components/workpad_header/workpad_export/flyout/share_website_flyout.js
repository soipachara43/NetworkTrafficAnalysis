"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareWebsiteFlyout = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _components = require("../../../../../i18n/components");

var _constants = require("../../../../../i18n/constants");

var _workpad_step = require("./workpad_step");

var _runtime_step = require("./runtime_step");

var _snippets_step = require("./snippets_step");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _components.ComponentStrings.ShareWebsiteFlyout;

var steps = function steps(onDownload, onCopy) {
  return [{
    title: strings.getWorkpadStepTitle(),
    children: _react.default.createElement(_workpad_step.WorkpadStep, {
      onDownload: onDownload
    })
  }, {
    title: strings.getRuntimeStepTitle(),
    children: _react.default.createElement(_runtime_step.RuntimeStep, {
      onDownload: onDownload
    })
  }, {
    title: strings.getSnippentsStepTitle(),
    children: _react.default.createElement(_snippets_step.SnippetsStep, {
      onCopy: onCopy
    })
  }];
};

var ShareWebsiteFlyout = function ShareWebsiteFlyout(_ref) {
  var onCopy = _ref.onCopy,
      onDownload = _ref.onDownload,
      _onClose = _ref.onClose,
      unsupportedRenderers = _ref.unsupportedRenderers;

  var link = _react.default.createElement(_eui.EuiLink, {
    style: {
      textDecoration: 'underline'
    },
    onClick: function onClick() {
      onDownload('shareZip');
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.canvas.shareWebsiteFlyout.zipDownloadLinkLabel",
    defaultMessage: "download an example {ZIP} file",
    values: {
      ZIP: _constants.ZIP
    }
  }));

  var title = _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.canvas.shareWebsiteFlyout.flyoutCalloutDescription",
    defaultMessage: "To try sharing, you can {link} containing this workpad, the {CANVAS} Shareable Workpad runtime, and a sample {HTML} file.",
    values: {
      CANVAS: _constants.CANVAS,
      HTML: _constants.HTML,
      link: link
    }
  }));

  var warningText = null;

  if (unsupportedRenderers && unsupportedRenderers.length > 0) {
    var warning = [_react.default.createElement(_eui.EuiText, {
      size: "s",
      key: "text"
    }, _react.default.createElement("span", null, strings.getUnsupportedRendererWarning()), unsupportedRenderers.map(function (fn, index) {
      return [_react.default.createElement(_eui.EuiCode, {
        key: "item-".concat(index)
      }, fn), index < unsupportedRenderers.length - 1 ? ', ' : ''];
    })), _react.default.createElement(_eui.EuiSpacer, {
      size: "xs",
      key: "spacer"
    })];
    warningText = [_react.default.createElement(_eui.EuiCallOut, {
      title: warning,
      color: "warning",
      size: "s",
      iconType: "alert",
      key: "callout"
    }), _react.default.createElement(_eui.EuiSpacer, {
      key: "spacer"
    })];
  }

  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: function onClose() {
      return _onClose('share');
    },
    maxWidth: true
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement("h2", {
    id: "flyoutTitle"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, strings.getTitle())), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiBetaBadge, {
    label: "Beta",
    color: "accent"
  }))))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("p", null, strings.getStepsDescription())), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCallOut, {
    size: "s",
    title: title,
    iconType: "iInCircle"
  }), _react.default.createElement(_eui.EuiSpacer, null), warningText, _react.default.createElement(_eui.EuiSteps, {
    steps: steps(onDownload, onCopy)
  })));
};

exports.ShareWebsiteFlyout = ShareWebsiteFlyout;