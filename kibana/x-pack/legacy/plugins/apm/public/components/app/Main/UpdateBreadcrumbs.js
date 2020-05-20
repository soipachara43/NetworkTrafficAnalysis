"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateBreadcrumbs = UpdateBreadcrumbs;

var _react = _interopRequireDefault(require("react"));

var _APMLink = require("../../shared/Links/apm/APMLink");

var _ProvideBreadcrumbs = require("./ProvideBreadcrumbs");

var _useApmPluginContext2 = require("../../../hooks/useApmPluginContext");

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

function getTitleFromBreadCrumbs(breadcrumbs) {
  return breadcrumbs.map(function (_ref) {
    var value = _ref.value;
    return value;
  }).reverse().join(' | ');
}

var UpdateBreadcrumbsComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UpdateBreadcrumbsComponent, _React$Component);

  function UpdateBreadcrumbsComponent() {
    _classCallCheck(this, UpdateBreadcrumbsComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(UpdateBreadcrumbsComponent).apply(this, arguments));
  }

  _createClass(UpdateBreadcrumbsComponent, [{
    key: "updateHeaderBreadcrumbs",
    value: function updateHeaderBreadcrumbs() {
      var _this = this;

      var breadcrumbs = this.props.breadcrumbs.map(function (_ref2) {
        var value = _ref2.value,
            match = _ref2.match;
        return {
          text: value,
          href: (0, _APMLink.getAPMHref)(match.url, _this.props.location.search)
        };
      });
      document.title = getTitleFromBreadCrumbs(this.props.breadcrumbs);
      this.props.core.chrome.setBreadcrumbs(breadcrumbs);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateHeaderBreadcrumbs();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateHeaderBreadcrumbs();
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return UpdateBreadcrumbsComponent;
}(_react.default.Component);

function UpdateBreadcrumbs(_ref3) {
  var routes = _ref3.routes;

  var _useApmPluginContext = (0, _useApmPluginContext2.useApmPluginContext)(),
      core = _useApmPluginContext.core;

  return _react.default.createElement(_ProvideBreadcrumbs.ProvideBreadcrumbs, {
    routes: routes,
    render: function render(_ref4) {
      var breadcrumbs = _ref4.breadcrumbs,
          location = _ref4.location;
      return _react.default.createElement(UpdateBreadcrumbsComponent, {
        breadcrumbs: breadcrumbs,
        location: location,
        core: core
      });
    }
  });
}