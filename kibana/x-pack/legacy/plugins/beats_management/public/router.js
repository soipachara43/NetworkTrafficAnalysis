"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRouter = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _loading = require("./components/loading");

var _child_routes = require("./components/navigation/child_routes");

var _with_url_state = require("./containers/with_url_state");

var _index = require("./pages/index");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AppRouter =
/*#__PURE__*/
function (_Component) {
  _inherits(AppRouter, _Component);

  function AppRouter(props) {
    var _this;

    _classCallCheck(this, AppRouter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppRouter).call(this, props));
    _this.state = {
      loading: true
    };
    return _this;
  }

  _createClass(AppRouter, [{
    key: "UNSAFE_componentWillMount",
    value: function () {
      var _UNSAFE_componentWillMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.state.loading === true)) {
                  _context.next = 11;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return this.props.beatsContainer.reload();

              case 4:
                _context.next = 6;
                return this.props.tagsContainer.reload();

              case 6:
                _context.next = 10;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

              case 10:
                this.setState({
                  loading: false
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function UNSAFE_componentWillMount() {
        return _UNSAFE_componentWillMount.apply(this, arguments);
      }

      return UNSAFE_componentWillMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.loading === true) {
        return _react.default.createElement(_loading.Loading, null);
      }

      var countOfEverything = this.props.beatsContainer.state.list.length + this.props.tagsContainer.state.list.length;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactRouterDom.Switch, null, (0, _lodash.get)(this.props.libs.framework.info, 'license.expired', true) && _react.default.createElement(_reactRouterDom.Route, {
        render: function render(props) {
          return !props.location.pathname.includes('/error') ? _react.default.createElement(_reactRouterDom.Redirect, {
            to: "/error/invalid_license"
          }) : null;
        }
      }), !(0, _lodash.get)(this.props.libs.framework.info, 'security.enabled', true) && _react.default.createElement(_reactRouterDom.Route, {
        render: function render(props) {
          return !props.location.pathname.includes('/error') ? _react.default.createElement(_reactRouterDom.Redirect, {
            to: "/error/enforce_security"
          }) : null;
        }
      }), !this.props.libs.framework.currentUserHasOneOfRoles(['beats_admin'].concat(this.props.libs.framework.info.settings.defaultUserRoles)) && _react.default.createElement(_reactRouterDom.Route, {
        render: function render(props) {
          return !props.location.pathname.includes('/error') ? _react.default.createElement(_reactRouterDom.Redirect, {
            to: "/error/no_access"
          }) : null;
        }
      }), countOfEverything === 0 && _react.default.createElement(_reactRouterDom.Route, {
        render: function render(props) {
          return !props.location.pathname.includes('/walkthrough') ? _react.default.createElement(_reactRouterDom.Redirect, {
            to: "/walkthrough/initial"
          }) : null;
        }
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/",
        exact: true,
        render: function render() {
          return _react.default.createElement(_reactRouterDom.Redirect, {
            to: "/overview/enrolled_beats"
          });
        }
      })), _react.default.createElement(_with_url_state.WithURLState, null, function (URLProps) {
        return _react.default.createElement(_child_routes.ChildRoutes, _extends({
          routes: _index.routeMap
        }, URLProps, {
          libs: _this2.props.libs,
          containers: {
            beats: _this2.props.beatsContainer,
            tags: _this2.props.tagsContainer
          }
        }));
      }));
    }
  }]);

  return AppRouter;
}(_react.Component);

exports.AppRouter = AppRouter;