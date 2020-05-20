"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrimaryLayout = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _breadcrumb = require("../navigation/breadcrumb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PrimaryLayout =
/*#__PURE__*/
function (_Component) {
  _inherits(PrimaryLayout, _Component);

  function PrimaryLayout(props) {
    var _this;

    _classCallCheck(this, PrimaryLayout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PrimaryLayout).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "actionSection", null);

    _defineProperty(_assertThisInitialized(_this), "renderAction", function (component) {
      _this.actionSection = component;

      _this.forceUpdate();
    });

    return _this;
  }

  _createClass(PrimaryLayout, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react.default.createElement(_react.default.Fragment, null, !this.props.hideBreadcrumbs && _react.default.createElement(_breadcrumb.BreadcrumbConsumer, null, function (_ref) {
        var breadcrumbs = _ref.breadcrumbs;
        return _react.default.createElement(HeaderWrapper, null, _react.default.createElement(_eui.EuiHeaderSection, null, _react.default.createElement(_eui.EuiHeaderBreadcrumbs, {
          breadcrumbs: breadcrumbs
        })));
      }), _react.default.createElement(_eui.EuiPage, null, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageHeader, null, _react.default.createElement(_eui.EuiPageHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, this.props.title))), _react.default.createElement(_eui.EuiPageHeaderSection, null, this.actionSection && this.actionSection() || this.props.actionSection)), _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentBody, null, (children && typeof children === 'function' ? children(this.renderAction) : children) || _react.default.createElement("span", null))))));
    }
  }]);

  return PrimaryLayout;
}(_react.Component);

exports.PrimaryLayout = PrimaryLayout;
var HeaderWrapper = (0, _styledComponents.default)(_eui.EuiHeader).withConfig({
  displayName: "HeaderWrapper",
  componentId: "sc-1am5rdi-0"
})(["height:29px;"]);