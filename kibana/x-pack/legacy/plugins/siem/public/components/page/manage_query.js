"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manageQuery = manageQuery;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function manageQuery(WrappedComponent) {
  var ManageQuery =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(ManageQuery, _React$PureComponent);

    function ManageQuery() {
      _classCallCheck(this, ManageQuery);

      return _possibleConstructorReturn(this, _getPrototypeOf(ManageQuery).apply(this, arguments));
    }

    _createClass(ManageQuery, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this$props = this.props,
            loading = _this$props.loading,
            id = _this$props.id,
            refetch = _this$props.refetch,
            setQuery = _this$props.setQuery,
            _this$props$inspect = _this$props.inspect,
            inspect = _this$props$inspect === void 0 ? null : _this$props$inspect;
        setQuery({
          id: id,
          inspect: inspect,
          loading: loading,
          refetch: refetch
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this$props2 = this.props,
            deleteQuery = _this$props2.deleteQuery,
            id = _this$props2.id;

        if (deleteQuery) {
          deleteQuery({
            id: id
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var otherProps = (0, _fp.omit)(['refetch', 'setQuery'], this.props);
        return _react.default.createElement(WrappedComponent, otherProps);
      }
    }]);

    return ManageQuery;
  }(_react.default.PureComponent);

  _defineProperty(ManageQuery, "displayName", void 0);

  ManageQuery.displayName = "ManageQuery (".concat(WrappedComponent.displayName || 'Unknown', ")");
  return ManageQuery;
}