"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceLegends = ServiceLegends;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../../style/variables");

var _Legend = require("../../../../shared/charts/Legend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Legends = _styledComponents.default.div.withConfig({
  displayName: "Legends",
  componentId: "am8gae-0"
})(["display:flex;> *{margin-right:", ";&:last-child{margin-right:0;}}"], (0, _variables.px)(_variables.unit));

function ServiceLegends(_ref) {
  var serviceColors = _ref.serviceColors;
  return _react.default.createElement(Legends, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.apm.transactionDetails.servicesTitle', {
    defaultMessage: 'Services'
  }))), Object.entries(serviceColors).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        label = _ref3[0],
        color = _ref3[1];

    return _react.default.createElement(_Legend.Legend, {
      key: color,
      color: color,
      text: label
    });
  }));
}