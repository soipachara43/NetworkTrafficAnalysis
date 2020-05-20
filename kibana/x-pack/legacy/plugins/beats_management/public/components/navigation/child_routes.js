"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildRoutes = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ChildRoutes = function ChildRoutes(_ref) {
  var routes = _ref.routes,
      _ref$useSwitch = _ref.useSwitch,
      useSwitch = _ref$useSwitch === void 0 ? true : _ref$useSwitch,
      rest = _objectWithoutProperties(_ref, ["routes", "useSwitch"]);

  if (!routes) {
    return null;
  }

  var Parent = useSwitch ? _reactRouterDom.Switch : _react.default.Fragment;
  return _react.default.createElement(Parent, null, routes.map(function (route) {
    return _react.default.createElement(_reactRouterDom.Route, {
      key: route.path,
      path: route.path,
      render: function render(routeProps) {
        var Component = route.component;
        return _react.default.createElement(Component, _extends({}, routeProps, {
          routes: route.routes
        }, rest));
      }
    });
  }));
};

exports.ChildRoutes = ChildRoutes;