"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaterfallItem = WaterfallItem;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _agent_name = require("../../../../../../../../../../plugins/apm/common/agent_name");

var _variables = require("../../../../../../style/variables");

var _formatters = require("../../../../../../utils/formatters");

var _ErrorCount = require("../../ErrorCount");

var _ErrorOverviewLink = require("../../../../../shared/Links/apm/ErrorOverviewLink");

var _elasticsearch_fieldnames = require("../../../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _SyncBadge = require("./SyncBadge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Container = _styledComponents.default.div.withConfig({
  displayName: "Container",
  componentId: "sc-1vw3f18-0"
})(["position:relative;display:block;user-select:none;padding-top:", ";padding-bottom:", ";margin-right:", ";margin-left:", ";border-top:1px solid ", ";background-color:", ";cursor:pointer;&:hover{background-color:", ";}"], (0, _variables.px)(_variables.units.half), (0, _variables.px)(_variables.units.plus), function (props) {
  return (0, _variables.px)(props.timelineMargins.right);
}, function (props) {
  return (0, _variables.px)(props.timelineMargins.left);
}, _eui_theme_light.default.euiColorLightShade, function (props) {
  return props.isSelected ? _eui_theme_light.default.euiColorLightestShade : 'initial';
}, _eui_theme_light.default.euiColorLightestShade);

var ItemBar = _styledComponents.default.div.withConfig({
  displayName: "ItemBar",
  componentId: "sc-1vw3f18-1"
})(["box-sizing:border-box;position:relative;height:", ";min-width:2px;background-color:", ";"], (0, _variables.px)(_variables.unit), function (props) {
  return props.color;
});

var ItemText = _styledComponents.default.span.withConfig({
  displayName: "ItemText",
  componentId: "sc-1vw3f18-2"
})(["position:absolute;right:0;display:flex;align-items:center;height:", ";& > *{margin-right:", ";white-space:nowrap;}"], (0, _variables.px)(_variables.units.plus), (0, _variables.px)(_variables.units.half));

function PrefixIcon(_ref) {
  var item = _ref.item;

  switch (item.docType) {
    case 'span':
      {
        // icon for database spans
        var isDbType = item.doc.span.type.startsWith('db');

        if (isDbType) {
          return _react.default.createElement(_eui.EuiIcon, {
            type: "database"
          });
        } // omit icon for other spans


        return null;
      }

    case 'transaction':
      {
        // icon for RUM agent transactions
        if ((0, _agent_name.isRumAgentName)(item.doc.agent.name)) {
          return _react.default.createElement(_eui.EuiIcon, {
            type: "globe"
          });
        } // icon for other transactions


        return _react.default.createElement(_eui.EuiIcon, {
          type: "merge"
        });
      }

    default:
      return null;
  }
}

var SpanActionToolTip = function SpanActionToolTip(_ref2) {
  var item = _ref2.item,
      children = _ref2.children;

  if ((item === null || item === void 0 ? void 0 : item.docType) === 'span') {
    return _react.default.createElement(_eui.EuiToolTip, {
      content: "".concat(item.doc.span.subtype, ".").concat(item.doc.span.action)
    }, _react.default.createElement(_react.default.Fragment, null, children));
  }

  return _react.default.createElement(_react.default.Fragment, null, children);
};

function Duration(_ref3) {
  var item = _ref3.item;
  return _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "xs"
  }, (0, _formatters.asDuration)(item.duration));
}

function HttpStatusCode(_ref4) {
  var item = _ref4.item;
  // http status code for transactions of type 'request'
  var httpStatusCode = item.docType === 'transaction' && item.doc.transaction.type === 'request' ? item.doc.transaction.result : undefined;

  if (!httpStatusCode) {
    return null;
  }

  return _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, httpStatusCode);
}

function NameLabel(_ref5) {
  var item = _ref5.item;

  switch (item.docType) {
    case 'span':
      return _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, item.doc.span.name);

    case 'transaction':
      return _react.default.createElement(_eui.EuiTitle, {
        size: "xxs"
      }, _react.default.createElement("h5", null, item.doc.transaction.name));

    default:
      return null;
  }
}

function WaterfallItem(_ref6) {
  var timelineMargins = _ref6.timelineMargins,
      totalDuration = _ref6.totalDuration,
      item = _ref6.item,
      color = _ref6.color,
      isSelected = _ref6.isSelected,
      errorCount = _ref6.errorCount,
      onClick = _ref6.onClick;

  if (!totalDuration) {
    return null;
  }

  var width = item.duration / totalDuration * 100;
  var left = (item.offset + item.skew) / totalDuration * 100;

  var tooltipContent = _i18n.i18n.translate('xpack.apm.transactionDetails.errorsOverviewLinkTooltip', {
    values: {
      errorCount: errorCount
    },
    defaultMessage: '{errorCount, plural, one {View 1 related error} other {View # related errors}}'
  });

  return _react.default.createElement(Container, {
    type: item.docType,
    timelineMargins: timelineMargins,
    isSelected: isSelected,
    onClick: onClick
  }, _react.default.createElement(ItemBar // using inline styles instead of props to avoid generating a css class for each item
  , {
    style: {
      left: "".concat(left, "%"),
      width: "".concat(width, "%")
    },
    color: color,
    type: item.docType
  }), _react.default.createElement(ItemText // using inline styles instead of props to avoid generating a css class for each item
  , {
    style: {
      minWidth: "".concat(Math.max(100 - left, 0), "%")
    }
  }, _react.default.createElement(SpanActionToolTip, {
    item: item
  }, _react.default.createElement(PrefixIcon, {
    item: item
  })), _react.default.createElement(HttpStatusCode, {
    item: item
  }), _react.default.createElement(NameLabel, {
    item: item
  }), errorCount > 0 && item.docType === 'transaction' ? _react.default.createElement(_ErrorOverviewLink.ErrorOverviewLink, {
    serviceName: item.doc.service.name,
    query: {
      kuery: encodeURIComponent("".concat(_elasticsearch_fieldnames.TRACE_ID, " : \"").concat(item.doc.trace.id, "\" and transaction.id : \"").concat(item.doc.transaction.id, "\""))
    },
    color: "danger",
    style: {
      textDecoration: 'none'
    }
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: tooltipContent
  }, _react.default.createElement(_ErrorCount.ErrorCount, {
    count: errorCount
  }))) : null, _react.default.createElement(Duration, {
    item: item
  }), item.docType === 'span' && _react.default.createElement(_SyncBadge.SyncBadge, {
    sync: item.doc.span.sync
  })));
}