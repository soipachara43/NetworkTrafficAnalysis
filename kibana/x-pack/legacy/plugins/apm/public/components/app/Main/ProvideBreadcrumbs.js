"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreadcrumb = getBreadcrumb;
exports.getBreadcrumbs = getBreadcrumbs;
exports.ProvideBreadcrumbs = void 0;

var _reactRouterDom = require("react-router-dom");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var parse = function parse(options) {
  var breadcrumb = options.breadcrumb,
      match = options.match,
      location = options.location;
  var value;

  if (typeof breadcrumb === 'function') {
    value = breadcrumb({
      match: match,
      location: location
    });
  } else {
    value = breadcrumb;
  }

  return {
    value: value,
    match: match,
    location: location
  };
};

function getBreadcrumb(_ref) {
  var location = _ref.location,
      currentPath = _ref.currentPath,
      routes = _ref.routes;
  return routes.reduce(function (found, _ref2) {
    var breadcrumb = _ref2.breadcrumb,
        route = _objectWithoutProperties(_ref2, ["breadcrumb"]);

    if (found) {
      return found;
    }

    if (!breadcrumb) {
      return null;
    }

    var match = (0, _reactRouterDom.matchPath)(currentPath, route);

    if (match) {
      return parse({
        breadcrumb: breadcrumb,
        match: match,
        location: location
      });
    }

    return null;
  }, null);
}

function getBreadcrumbs(_ref3) {
  var routes = _ref3.routes,
      location = _ref3.location;
  var breadcrumbs = [];
  var pathname = location.pathname;
  pathname.split('?')[0].replace(/\/$/, '').split('/').reduce(function (acc, next) {
    // `/1/2/3` results in match checks for `/1`, `/1/2`, `/1/2/3`.
    var currentPath = !next ? '/' : "".concat(acc, "/").concat(next);
    var breadcrumb = getBreadcrumb({
      location: location,
      currentPath: currentPath,
      routes: routes
    });

    if (breadcrumb) {
      breadcrumbs.push(breadcrumb);
    }

    return currentPath === '/' ? '' : currentPath;
  }, '');
  return breadcrumbs;
}

function ProvideBreadcrumbsComponent(_ref4) {
  var _ref4$routes = _ref4.routes,
      routes = _ref4$routes === void 0 ? [] : _ref4$routes,
      render = _ref4.render,
      location = _ref4.location,
      match = _ref4.match,
      history = _ref4.history;
  var breadcrumbs = getBreadcrumbs({
    routes: routes,
    location: location
  });
  return render({
    breadcrumbs: breadcrumbs,
    location: location,
    match: match,
    history: history
  });
}

var ProvideBreadcrumbs = (0, _reactRouterDom.withRouter)(ProvideBreadcrumbsComponent);
exports.ProvideBreadcrumbs = ProvideBreadcrumbs;