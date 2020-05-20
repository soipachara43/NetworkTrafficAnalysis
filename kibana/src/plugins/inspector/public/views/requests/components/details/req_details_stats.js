"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestDetailsStats = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RequestDetailsStats =
/*#__PURE__*/
function (_Component) {
  _inherits(RequestDetailsStats, _Component);

  function RequestDetailsStats() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RequestDetailsStats);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RequestDetailsStats)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderStatRow", function (stat) {
      return [_react.default.createElement(_eui.EuiTableRow, {
        key: stat.id
      }, _react.default.createElement(_eui.EuiTableRowCell, null, _react.default.createElement("span", {
        className: "insRequestDetailsStats__icon"
      }, stat.description ? _react.default.createElement(_eui.EuiIconTip, {
        "aria-label": _i18n.i18n.translate('inspector.requests.descriptionRowIconAriaLabel', {
          defaultMessage: 'Description'
        }),
        type: "questionInCircle",
        color: "subdued",
        content: stat.description
      }) : _react.default.createElement(_eui.EuiIcon, {
        type: "empty"
      })), stat.label), _react.default.createElement(_eui.EuiTableRowCell, null, stat.value))];
    });

    return _this;
  }

  _createClass(RequestDetailsStats, [{
    key: "render",
    value: function render() {
      var stats = this.props.request.stats;

      if (!stats) {
        return null;
      }

      var sortedStats = Object.keys(stats).sort().map(function (id) {
        return _objectSpread({
          id: id
        }, stats[id]);
      });
      return _react.default.createElement(_eui.EuiTable, {
        responsive: false
      }, _react.default.createElement(_eui.EuiTableBody, null, sortedStats.map(this.renderStatRow)));
    }
  }]);

  return RequestDetailsStats;
}(_react.Component);

exports.RequestDetailsStats = RequestDetailsStats;

_defineProperty(RequestDetailsStats, "propTypes", {
  request: _propTypes.default.object.isRequired
});

_defineProperty(RequestDetailsStats, "shouldShow", function (request) {
  return Boolean(request.stats && Object.keys(request.stats).length);
});