"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _app = require("./app");

var _store = require("./store");

var _http = require("./services/http");

var _navigation = require("./services/navigation");

var _documentation = require("./services/documentation");

var _ui_metric = require("./services/ui_metric");

var _notification = require("./services/notification");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var renderApp = function renderApp(appDependencies) {
  var _appDependencies$lega = appDependencies.legacy,
      redirect = _appDependencies$lega.redirect,
      createUiStatsReporter = _appDependencies$lega.createUiStatsReporter,
      I18nContext = appDependencies.I18nContext,
      http = appDependencies.http,
      toasts = appDependencies.toasts,
      fatalErrors = appDependencies.fatalErrors,
      _appDependencies$docL = appDependencies.docLinks,
      ELASTIC_WEBSITE_URL = _appDependencies$docL.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = _appDependencies$docL.DOC_LINK_VERSION,
      element = appDependencies.element; // Initialize services

  (0, _http.init)(http);
  (0, _navigation.init)(redirect);
  (0, _documentation.init)("".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/"));
  (0, _ui_metric.init)(createUiStatsReporter);
  (0, _notification.init)(toasts, fatalErrors);
  (0, _reactDom.render)(_react.default.createElement(I18nContext, null, _react.default.createElement(_reactRedux.Provider, {
    store: (0, _store.indexLifecycleManagementStore)()
  }, _react.default.createElement(_app.App, null))), element);
  return function () {
    return (0, _reactDom.unmountComponentAtNode)(element);
  };
};

exports.renderApp = renderApp;