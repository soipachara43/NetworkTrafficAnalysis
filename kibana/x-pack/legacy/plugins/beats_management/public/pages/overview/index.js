"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainPage = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _unstated = require("unstated");

var _primary = require("../../components/layouts/primary");

var _child_routes = require("../../components/navigation/child_routes");

var _beats = require("../../containers/beats");

var _tags = require("../../containers/tags");

var _with_url_state = require("../../containers/with_url_state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var MainPageComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MainPageComponent, _React$PureComponent);

  function MainPageComponent(props) {
    var _this;

    _classCallCheck(this, MainPageComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainPageComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onTabClicked", function (path) {
      return function () {
        _this.props.goTo(path);
      };
    });

    _this.state = {
      loadedBeatsAtLeastOnce: false,
      beats: []
    };
    return _this;
  }

  _createClass(MainPageComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_primary.PrimaryLayout, {
        title: _react2.default.createElement(_eui.EuiFlexGroup, {
          alignItems: "center",
          gutterSize: "m"
        }, _react2.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, 'Beats'), _react2.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react2.default.createElement(_eui.EuiBetaBadge, {
          label: _i18n.i18n.translate('xpack.beatsManagement.overview.betaBadgeText', {
            defaultMessage: 'Beta'
          })
        }))),
        hideBreadcrumbs: this.props.libs.framework.versionGreaterThen('6.7.0')
      }, function (renderAction) {
        return _react2.default.createElement(_unstated.Subscribe, {
          to: [_beats.BeatsContainer, _tags.TagsContainer]
        }, function (beats, tags) {
          return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiTabs, null, _react2.default.createElement(_eui.EuiTab, {
            isSelected: "/overview/enrolled_beats" === _this2.props.history.location.pathname,
            onClick: _this2.onTabClicked("/overview/enrolled_beats")
          }, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.beatsManagement.beats.enrolledBeatsTabTitle",
            defaultMessage: "Enrolled Beats"
          })), _react2.default.createElement(_eui.EuiTab, {
            isSelected: "/overview/configuration_tags" === _this2.props.history.location.pathname,
            onClick: _this2.onTabClicked("/overview/configuration_tags")
          }, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.beatsManagement.beats.configurationTagsTabTitle",
            defaultMessage: "Configuration tags"
          }))), _react2.default.createElement(_child_routes.ChildRoutes, _extends({
            routes: _this2.props.routes,
            renderAction: renderAction
          }, _this2.props, {
            beatsContainer: beats,
            tagsContainer: tags
          })));
        });
      });
    }
  }]);

  return MainPageComponent;
}(_react2.default.PureComponent);

var MainPage = (0, _with_url_state.withUrlState)(MainPageComponent);
exports.MainPage = MainPage;