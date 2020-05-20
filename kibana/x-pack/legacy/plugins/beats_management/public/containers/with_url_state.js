"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withUrlState = withUrlState;
exports.WithURLState = exports.WithURLStateComponent = void 0;

var _queryString = require("query-string");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WithURLStateComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WithURLStateComponent, _React$Component);

  function WithURLStateComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WithURLStateComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithURLStateComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "historyListener", null);

    _defineProperty(_assertThisInitialized(_this), "setURLState",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(state) {
        var newState, pastState, search, newLocation;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pastState = _this.URLState;

                if (!(typeof state === 'function')) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return state(pastState);

              case 4:
                newState = _context.sent;
                _context.next = 8;
                break;

              case 7:
                newState = state;

              case 8:
                search = (0, _queryString.stringify)(_objectSpread({}, pastState, {}, newState), {
                  sort: false
                });
                newLocation = _objectSpread({}, _this.props.history.location, {
                  search: search
                });

                _this.props.history.replace(newLocation);

                _this.forceUpdate();

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "goTo", function (path) {
      _this.props.history.push({
        pathname: path,
        search: _this.props.history.location.search
      });
    });

    return _this;
  }

  _createClass(WithURLStateComponent, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.historyListener) {
        this.historyListener();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children({
        goTo: this.goTo,
        setUrlState: this.setURLState,
        urlState: this.URLState || {}
      });
    }
  }, {
    key: "URLState",
    get: function get() {
      // slice because parse does not account for the initial ? in the search string
      return (0, _queryString.parse)(decodeURIComponent(this.props.history.location.search).substring(1), {
        sort: false
      });
    }
  }]);

  return WithURLStateComponent;
}(_react.default.Component);

exports.WithURLStateComponent = WithURLStateComponent;
var WithURLState = (0, _reactRouterDom.withRouter)(WithURLStateComponent);
exports.WithURLState = WithURLState;

function withUrlState(UnwrappedComponent) {
  return function (origProps) {
    return _react.default.createElement(WithURLState, null, function (URLProps) {
      return _react.default.createElement(UnwrappedComponent, _extends({}, URLProps, origProps));
    });
  };
}