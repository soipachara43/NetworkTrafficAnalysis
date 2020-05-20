"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Waterfall = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactSticky = require("react-sticky");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../../../style/variables");

var _history = require("../../../../../../utils/history");

var _Timeline = require("../../../../../shared/charts/Timeline");

var _url_helpers = require("../../../../../shared/Links/url_helpers");

var _get_agent_marks = require("../Marks/get_agent_marks");

var _get_error_marks = require("../Marks/get_error_marks");

var _WaterfallFlyout = require("./WaterfallFlyout");

var _WaterfallItem = require("./WaterfallItem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Container = _styledComponents.default.div.withConfig({
  displayName: "Container",
  componentId: "c399qo-0"
})(["transition:0.1s padding ease;position:relative;overflow:hidden;"]);

var TIMELINE_MARGINS = {
  top: 40,
  left: 50,
  right: 50,
  bottom: 0
};

var toggleFlyout = function toggleFlyout(_ref) {
  var item = _ref.item,
      location = _ref.location;

  _history.history.replace(_objectSpread({}, location, {
    search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(location.search), {
      flyoutDetailTab: undefined,
      waterfallItemId: item === null || item === void 0 ? void 0 : item.id
    }))
  }));
};

var WaterfallItemsContainer = _styledComponents.default.div.withConfig({
  displayName: "WaterfallItemsContainer",
  componentId: "c399qo-1"
})(["padding-top:", ";"], function (props) {
  return (0, _variables.px)(props.paddingTop);
});

var Waterfall = function Waterfall(_ref2) {
  var waterfall = _ref2.waterfall,
      exceedsMax = _ref2.exceedsMax,
      waterfallItemId = _ref2.waterfallItemId,
      location = _ref2.location;
  var itemContainerHeight = 58; // TODO: This is a nasty way to calculate the height of the svg element. A better approach should be found

  var waterfallHeight = itemContainerHeight * waterfall.items.length;
  var serviceColors = waterfall.serviceColors,
      duration = waterfall.duration;
  var agentMarks = (0, _get_agent_marks.getAgentMarks)(waterfall.entryTransaction);
  var errorMarks = (0, _get_error_marks.getErrorMarks)(waterfall.errorItems, serviceColors);

  var renderWaterfallItem = function renderWaterfallItem(item) {
    var errorCount = item.docType === 'transaction' ? waterfall.errorsPerTransaction[item.doc.transaction.id] : 0;
    return _react.default.createElement(_WaterfallItem.WaterfallItem, {
      key: item.id,
      timelineMargins: TIMELINE_MARGINS,
      color: serviceColors[item.doc.service.name],
      item: item,
      totalDuration: duration,
      isSelected: item.id === waterfallItemId,
      errorCount: errorCount,
      onClick: function onClick() {
        return toggleFlyout({
          item: item,
          location: location
        });
      }
    });
  };

  return _react.default.createElement(Container, null, exceedsMax && _react.default.createElement(_eui.EuiCallOut, {
    color: "warning",
    size: "s",
    iconType: "alert",
    title: _i18n.i18n.translate('xpack.apm.waterfall.exceedsMax', {
      defaultMessage: 'Number of items in this trace exceed what is displayed'
    })
  }), _react.default.createElement(_reactSticky.StickyContainer, null, _react.default.createElement(_Timeline.Timeline, {
    marks: [].concat(_toConsumableArray(agentMarks), _toConsumableArray(errorMarks)),
    xMax: duration,
    height: waterfallHeight,
    margins: TIMELINE_MARGINS
  }), _react.default.createElement(WaterfallItemsContainer, {
    paddingTop: TIMELINE_MARGINS.top
  }, waterfall.items.map(renderWaterfallItem))), _react.default.createElement(_WaterfallFlyout.WaterfallFlyout, {
    waterfallItemId: waterfallItemId,
    waterfall: waterfall,
    location: location,
    toggleFlyout: toggleFlyout
  }));
};

exports.Waterfall = Waterfall;