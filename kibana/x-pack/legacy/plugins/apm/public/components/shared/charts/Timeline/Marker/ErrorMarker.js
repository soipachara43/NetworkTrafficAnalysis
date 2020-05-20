"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorMarker = void 0;

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _elasticsearch_fieldnames = require("../../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _useUrlParams2 = require("../../../../../hooks/useUrlParams");

var _variables = require("../../../../../style/variables");

var _formatters = require("../../../../../utils/formatters");

var _ErrorDetailLink = require("../../../Links/apm/ErrorDetailLink");

var _Legend = require("../../Legend");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Popover = _styledComponents.default.div.withConfig({
  displayName: "Popover",
  componentId: "nug8b5-0"
})(["max-width:", ";"], (0, _variables.px)(280));

var TimeLegend = (0, _styledComponents.default)(_Legend.Legend).withConfig({
  displayName: "TimeLegend",
  componentId: "nug8b5-1"
})(["margin-bottom:", ";"], (0, _variables.px)(_variables.unit));
var ErrorLink = (0, _styledComponents.default)(_ErrorDetailLink.ErrorDetailLink).withConfig({
  displayName: "ErrorLink",
  componentId: "nug8b5-2"
})(["display:block;margin:", " 0 ", " 0;"], (0, _variables.px)(_variables.units.half), (0, _variables.px)(_variables.units.half));
var Button = (0, _styledComponents.default)(_Legend.Legend).withConfig({
  displayName: "Button",
  componentId: "nug8b5-3"
})(["height:20px;display:flex;align-items:flex-end;"]);

var ErrorMarker = function ErrorMarker(_ref) {
  var _error$trace, _error$transaction, _error$error$log, _error$error$exceptio, _error$error$exceptio2;

  var mark = _ref.mark;

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      showPopover = _useState2[1];

  var togglePopover = function togglePopover() {
    return showPopover(!isPopoverOpen);
  };

  var button = _react.default.createElement(Button, {
    clickable: true,
    color: _eui_theme_light.default.euiColorDanger,
    shape: _Legend.Shape.square,
    onClick: togglePopover
  });

  var error = mark.error;
  var rangeTo = urlParams.rangeTo,
      rangeFrom = urlParams.rangeFrom;
  var query = {
    kuery: encodeURIComponent("".concat(_elasticsearch_fieldnames.TRACE_ID, " : \"").concat((_error$trace = error.trace) === null || _error$trace === void 0 ? void 0 : _error$trace.id, "\" and ").concat(_elasticsearch_fieldnames.TRANSACTION_ID, " : \"").concat((_error$transaction = error.transaction) === null || _error$transaction === void 0 ? void 0 : _error$transaction.id, "\"")),
    rangeFrom: rangeFrom,
    rangeTo: rangeTo
  };
  return _react.default.createElement(_eui.EuiPopover, {
    id: "popover",
    button: button,
    isOpen: isPopoverOpen,
    closePopover: togglePopover,
    anchorPosition: "upCenter"
  }, _react.default.createElement(Popover, null, _react.default.createElement(TimeLegend, {
    text: (0, _formatters.asDuration)(mark.offset),
    indicator: function indicator() {
      return _react.default.createElement("div", {
        style: {
          marginRight: (0, _variables.px)(_variables.units.quarter)
        }
      }, "@");
    }
  }), _react.default.createElement(_Legend.Legend, {
    key: mark.serviceColor,
    color: mark.serviceColor,
    text: error.service.name
  }), _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(ErrorLink, {
    serviceName: error.service.name,
    errorGroupId: error.error.grouping_key,
    query: query
  }, ((_error$error$log = error.error.log) === null || _error$error$log === void 0 ? void 0 : _error$error$log.message) || ((_error$error$exceptio = error.error.exception) === null || _error$error$exceptio === void 0 ? void 0 : (_error$error$exceptio2 = _error$error$exceptio[0]) === null || _error$error$exceptio2 === void 0 ? void 0 : _error$error$exceptio2.message)))));
};

exports.ErrorMarker = ErrorMarker;