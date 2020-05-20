"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpanFlyout = SpanFlyout;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../../../../style/variables");

var _Summary = require("../../../../../../shared/Summary");

var _TimestampTooltip = require("../../../../../../shared/TimestampTooltip");

var _DurationSummaryItem = require("../../../../../../shared/Summary/DurationSummaryItem");

var _DiscoverSpanLink = require("../../../../../../shared/Links/DiscoverLinks/DiscoverSpanLink");

var _Stacktrace = require("../../../../../../shared/Stacktrace");

var _ResponsiveFlyout = require("../ResponsiveFlyout");

var _DatabaseContext = require("./DatabaseContext");

var _StickySpanProperties = require("./StickySpanProperties");

var _HttpInfoSummaryItem = require("../../../../../../shared/Summary/HttpInfoSummaryItem");

var _SpanMetadata = require("../../../../../../shared/MetadataTable/SpanMetadata");

var _SyncBadge = require("../SyncBadge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function formatType(type) {
  switch (type) {
    case 'db':
      return 'DB';

    case 'hard-navigation':
      return _i18n.i18n.translate('xpack.apm.transactionDetails.spanFlyout.spanType.navigationTimingLabel', {
        defaultMessage: 'Navigation timing'
      });

    default:
      return type;
  }
}

function formatSubtype(subtype) {
  switch (subtype) {
    case 'mysql':
      return 'MySQL';

    default:
      return subtype;
  }
}

function getSpanTypes(span) {
  var _span$span = span.span,
      type = _span$span.type,
      subtype = _span$span.subtype,
      action = _span$span.action;
  return {
    spanType: formatType(type),
    spanSubtype: formatSubtype(subtype),
    spanAction: action
  };
}

var SpanBadge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "SpanBadge",
  componentId: "sc-1hu9fl2-0"
})(["display:inline-block;margin-right:", ";"], (0, _variables.px)(_variables.units.quarter));
var HttpInfoContainer = (0, _styledComponents.default)('div').withConfig({
  displayName: "HttpInfoContainer",
  componentId: "sc-1hu9fl2-1"
})(["margin-right:", ";"], (0, _variables.px)(_variables.units.quarter));

function SpanFlyout(_ref) {
  var _parentTransaction$se, _httpContext$response, _httpContext$url;

  var span = _ref.span,
      parentTransaction = _ref.parentTransaction,
      totalDuration = _ref.totalDuration,
      onClose = _ref.onClose;

  if (!span) {
    return null;
  }

  var stackframes = span.span.stacktrace;
  var codeLanguage = parentTransaction === null || parentTransaction === void 0 ? void 0 : (_parentTransaction$se = parentTransaction.service.language) === null || _parentTransaction$se === void 0 ? void 0 : _parentTransaction$se.name;
  var dbContext = span.span.db;
  var httpContext = span.span.http;
  var spanTypes = getSpanTypes(span);
  var spanHttpStatusCode = httpContext === null || httpContext === void 0 ? void 0 : (_httpContext$response = httpContext.response) === null || _httpContext$response === void 0 ? void 0 : _httpContext$response.status_code;
  var spanHttpUrl = httpContext === null || httpContext === void 0 ? void 0 : (_httpContext$url = httpContext.url) === null || _httpContext$url === void 0 ? void 0 : _httpContext$url.original;
  var spanHttpMethod = httpContext === null || httpContext === void 0 ? void 0 : httpContext.method;
  return _react.default.createElement(_eui.EuiPortal, null, _react.default.createElement(_ResponsiveFlyout.ResponsiveFlyout, {
    onClose: onClose,
    size: "m",
    ownFocus: true
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.apm.transactionDetails.spanFlyout.spanDetailsTitle', {
    defaultMessage: 'Span details'
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_DiscoverSpanLink.DiscoverSpanLink, {
    span: span
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "discoverApp"
  }, _i18n.i18n.translate('xpack.apm.transactionDetails.spanFlyout.viewSpanInDiscoverButtonLabel', {
    defaultMessage: 'View span in Discover'
  })))))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_StickySpanProperties.StickySpanProperties, {
    span: span,
    transaction: parentTransaction
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_Summary.Summary, {
    items: [_react.default.createElement(_TimestampTooltip.TimestampTooltip, {
      time: span.timestamp.us / 1000
    }), _react.default.createElement(_DurationSummaryItem.DurationSummaryItem, {
      duration: span.span.duration.us,
      totalDuration: totalDuration,
      parentType: "transaction"
    }), _react.default.createElement(_react.default.Fragment, null, spanHttpUrl && _react.default.createElement(HttpInfoContainer, null, _react.default.createElement(_HttpInfoSummaryItem.HttpInfoSummaryItem, {
      method: spanHttpMethod,
      url: spanHttpUrl,
      status: spanHttpStatusCode
    })), _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.apm.transactionDetails.spanFlyout.spanType', {
        defaultMessage: 'Type'
      })
    }, _react.default.createElement(SpanBadge, {
      color: "hollow"
    }, spanTypes.spanType)), spanTypes.spanSubtype && _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.apm.transactionDetails.spanFlyout.spanSubtype', {
        defaultMessage: 'Subtype'
      })
    }, _react.default.createElement(SpanBadge, {
      color: "hollow"
    }, spanTypes.spanSubtype)), spanTypes.spanAction && _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.apm.transactionDetails.spanFlyout.spanAction', {
        defaultMessage: 'Action'
      })
    }, _react.default.createElement(SpanBadge, {
      color: "hollow"
    }, spanTypes.spanAction)), _react.default.createElement(_SyncBadge.SyncBadge, {
      sync: span.span.sync
    }))]
  }), _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_DatabaseContext.DatabaseContext, {
    dbContext: dbContext
  }), _react.default.createElement(_eui.EuiTabbedContent, {
    tabs: [{
      id: 'stack-trace',
      name: _i18n.i18n.translate('xpack.apm.transactionDetails.spanFlyout.stackTraceTabLabel', {
        defaultMessage: 'Stack Trace'
      }),
      content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
        size: "l"
      }), _react.default.createElement(_Stacktrace.Stacktrace, {
        stackframes: stackframes,
        codeLanguage: codeLanguage
      }))
    }, {
      id: 'metadata',
      name: _i18n.i18n.translate('xpack.apm.propertiesTable.tabs.metadataLabel', {
        defaultMessage: 'Metadata'
      }),
      content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_SpanMetadata.SpanMetadata, {
        span: span
      }))
    }]
  }))));
}