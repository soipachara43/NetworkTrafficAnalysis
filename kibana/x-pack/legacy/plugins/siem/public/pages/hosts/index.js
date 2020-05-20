"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostsContainer = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _details = require("./details");

var _model = require("../../store/hosts/model");

var _global_time = require("../../containers/global_time");

var _types = require("../home/types");

var _hosts = require("./hosts");

var _types2 = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getHostsTabPath = function getHostsTabPath(pagePath) {
  return "".concat(pagePath, "/:tabName(") + "".concat(_model.HostsTableType.hosts, "|") + "".concat(_model.HostsTableType.authentications, "|") + "".concat(_model.HostsTableType.uncommonProcesses, "|") + "".concat(_model.HostsTableType.anomalies, "|") + "".concat(_model.HostsTableType.events, "|") + "".concat(_model.HostsTableType.alerts, ")");
};

var getHostDetailsTabPath = function getHostDetailsTabPath(pagePath) {
  return "".concat(_types2.hostDetailsPagePath, "/:tabName(") + "".concat(_model.HostsTableType.authentications, "|") + "".concat(_model.HostsTableType.uncommonProcesses, "|") + "".concat(_model.HostsTableType.anomalies, "|") + "".concat(_model.HostsTableType.events, "|") + "".concat(_model.HostsTableType.alerts, ")");
};

var HostsContainer = _react.default.memo(function (_ref) {
  var url = _ref.url;
  return _react.default.createElement(_global_time.GlobalTime, null, function (_ref2) {
    var to = _ref2.to,
        from = _ref2.from,
        setQuery = _ref2.setQuery,
        deleteQuery = _ref2.deleteQuery,
        isInitializing = _ref2.isInitializing;
    return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      strict: true,
      exact: true,
      path: getHostsTabPath(_types2.hostsPagePath),
      render: function render() {
        return _react.default.createElement(_hosts.Hosts, {
          hostsPagePath: _types2.hostsPagePath,
          from: from,
          to: to,
          setQuery: setQuery,
          isInitializing: isInitializing,
          deleteQuery: deleteQuery
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      strict: true,
      path: getHostDetailsTabPath(_types2.hostsPagePath),
      render: function render(_ref3) {
        var detailName = _ref3.match.params.detailName;
        return _react.default.createElement(_details.HostDetails, {
          hostDetailsPagePath: _types2.hostDetailsPagePath,
          detailName: detailName,
          from: from,
          to: to,
          setQuery: setQuery,
          isInitializing: isInitializing,
          deleteQuery: deleteQuery
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: _types2.hostDetailsPagePath,
      render: function render(_ref4) {
        var detailName = _ref4.match.params.detailName,
            _ref4$location$search = _ref4.location.search,
            search = _ref4$location$search === void 0 ? '' : _ref4$location$search;
        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: "".concat(url, "/").concat(detailName, "/").concat(_model.HostsTableType.authentications).concat(search)
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "".concat(_types2.hostsPagePath, "/"),
      render: function render(_ref5) {
        var _ref5$location$search = _ref5.location.search,
            search = _ref5$location$search === void 0 ? '' : _ref5$location$search;
        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: "/".concat(_types.SiemPageName.hosts, "/").concat(_model.HostsTableType.hosts).concat(search)
        });
      }
    }));
  });
});

exports.HostsContainer = HostsContainer;
HostsContainer.displayName = 'HostsContainer';