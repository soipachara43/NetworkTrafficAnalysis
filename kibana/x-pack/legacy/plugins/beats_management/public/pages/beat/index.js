"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeatDetailsPage = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _primary = require("../../components/layouts/primary");

var _breadcrumb = require("../../components/navigation/breadcrumb");

var _child_routes = require("../../components/navigation/child_routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BeatDetailsPageComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(BeatDetailsPageComponent, _React$PureComponent);

  function BeatDetailsPageComponent(props) {
    var _this;

    _classCallCheck(this, BeatDetailsPageComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BeatDetailsPageComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onSelectedTabChanged", function (id) {
      _this.props.history.push({
        pathname: id,
        search: _this.props.location.search
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTabClicked", function (path) {
      return function () {
        _this.props.goTo(path);
      };
    });

    _this.state = {
      beat: undefined,
      beatId: props.match.params.beatId,
      isLoading: true
    };

    _this.loadBeat();

    return _this;
  }

  _createClass(BeatDetailsPageComponent, [{
    key: "renderActionSection",
    value: function renderActionSection(beat) {
      return beat ? _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiText, {
        size: "xs"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beat.actionSectionTypeLabel",
        defaultMessage: "Type: {beatType}.",
        values: {
          beatType: _react2.default.createElement("strong", null, beat.type)
        }
      }))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiText, {
        size: "xs"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beat.actionSectionVersionLabel",
        defaultMessage: "Version: {beatVersion}.",
        values: {
          beatVersion: _react2.default.createElement("strong", null, beat.version)
        }
      }))), beat.last_updated && _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiText, {
        size: "xs"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beat.lastConfigUpdateMessage",
        defaultMessage: "Last Config Update: {lastUpdateTime}.",
        values: {
          lastUpdateTime: _react2.default.createElement("strong", null, (0, _moment.default)(beat.last_updated).fromNow())
        }
      })))) : _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beat.beatNotFoundMessage",
        defaultMessage: "Beat not found"
      });
    }
  }, {
    key: "render",
    value: function render() {
      var intl = this.props.intl;
      var beat = this.state.beat;
      var id;
      var name;

      if (beat) {
        id = beat.id;
        name = beat.name;
      }

      var title = this.state.isLoading ? intl.formatMessage({
        id: 'xpack.beatsManagement.beat.loadingTitle',
        defaultMessage: 'Loading'
      }) : intl.formatMessage({
        id: 'xpack.beatsManagement.beat.beatNameAndIdTitle',
        defaultMessage: 'Beat: {nameOrNoName} (id: {id})'
      }, {
        nameOrNoName: name || intl.formatHTMLMessage({
          id: 'xpack.beatsManagement.beat.noNameReceivedFromBeatTitle',
          defaultMessage: 'No name received from beat'
        }),
        id: id
      });
      return _react2.default.createElement(_primary.PrimaryLayout, {
        title: title,
        actionSection: this.renderActionSection(beat),
        hideBreadcrumbs: this.props.libs.framework.versionGreaterThen('6.7.0')
      }, _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_breadcrumb.Breadcrumb, {
        title: "Enrolled Beats",
        path: "/overview/enrolled_beats"
      }), _react2.default.createElement(_eui.EuiTabs, null, _react2.default.createElement(_eui.EuiTab, {
        isSelected: "/beat/".concat(id, "/details") === this.props.history.location.pathname,
        onClick: this.onTabClicked("/beat/".concat(id, "/details"))
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beat.configTabLabel",
        defaultMessage: "Config"
      })), _react2.default.createElement(_eui.EuiTab, {
        isSelected: "/beat/".concat(id, "/tags") === this.props.history.location.pathname,
        onClick: this.onTabClicked("/beat/".concat(id, "/tags"))
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beat.configurationTagsTabLabel",
        defaultMessage: "Configuration tags"
      }))), !this.state.beat && _react2.default.createElement("div", null, "Beat not found"), this.state.beat && _react2.default.createElement(_reactRouterDom.Switch, null, _react2.default.createElement(_child_routes.ChildRoutes, _extends({
        routes: this.props.routes
      }, this.props, {
        beat: this.state.beat,
        useSwitch: false
      })), id && _react2.default.createElement(_reactRouterDom.Route, {
        render: function render() {
          return _react2.default.createElement(_reactRouterDom.Redirect, {
            to: "/beat/".concat(id, "/details")
          });
        }
      }))));
    }
  }, {
    key: "loadBeat",
    value: function () {
      var _loadBeat = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var intl, beatId, beat;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                intl = this.props.intl;
                beatId = this.props.match.params.beatId;
                _context.prev = 2;
                _context.next = 5;
                return this.props.libs.beats.get(beatId);

              case 5:
                beat = _context.sent;

                if (beat) {
                  _context.next = 8;
                  break;
                }

                throw new Error(intl.formatMessage({
                  id: 'xpack.beatsManagement.beat.beatNotFoundErrorMessage',
                  defaultMessage: 'beat not found'
                }));

              case 8:
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                throw new Error(_context.t0);

              case 13:
                this.setState({
                  beat: beat,
                  isLoading: false
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      function loadBeat() {
        return _loadBeat.apply(this, arguments);
      }

      return loadBeat;
    }()
  }]);

  return BeatDetailsPageComponent;
}(_react2.default.PureComponent);

var BeatDetailsPage = (0, _react.injectI18n)(BeatDetailsPageComponent);
exports.BeatDetailsPage = BeatDetailsPage;