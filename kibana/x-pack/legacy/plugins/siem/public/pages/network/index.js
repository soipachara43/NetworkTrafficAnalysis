"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _use_ml_capabilities = require("../../components/ml_popover/hooks/use_ml_capabilities");

var _has_ml_user_permissions = require("../../components/ml/permissions/has_ml_user_permissions");

var _types = require("../../graphql/types");

var _ip_details = require("./ip_details");

var _network = require("./network");

var _global_time = require("../../containers/global_time");

var _types2 = require("../home/types");

var _navigation = require("./navigation");

var _types3 = require("./navigation/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var networkPagePath = "/:pageName(".concat(_types2.SiemPageName.network, ")");
var ipDetailsPageBasePath = "".concat(networkPagePath, "/ip/:detailName");

var NetworkContainerComponent = function NetworkContainerComponent() {
  var capabilities = (0, _use_ml_capabilities.useMlCapabilities)();
  var capabilitiesFetched = capabilities.capabilitiesFetched;
  var userHasMlUserPermissions = (0, _react.useMemo)(function () {
    return (0, _has_ml_user_permissions.hasMlUserPermissions)(capabilities);
  }, [capabilities]);
  var networkRoutePath = (0, _react.useMemo)(function () {
    return (0, _navigation.getNetworkRoutePath)(networkPagePath, capabilitiesFetched, userHasMlUserPermissions);
  }, [capabilitiesFetched, userHasMlUserPermissions]);
  return _react.default.createElement(_global_time.GlobalTime, null, function (_ref) {
    var to = _ref.to,
        from = _ref.from,
        setQuery = _ref.setQuery,
        deleteQuery = _ref.deleteQuery,
        isInitializing = _ref.isInitializing;
    return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      strict: true,
      path: networkRoutePath,
      render: function render() {
        return _react.default.createElement(_network.Network, {
          networkPagePath: networkPagePath,
          to: to,
          from: from,
          setQuery: setQuery,
          deleteQuery: deleteQuery,
          isInitializing: isInitializing,
          capabilitiesFetched: capabilities.capabilitiesFetched,
          hasMlUserPermissions: userHasMlUserPermissions
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "".concat(ipDetailsPageBasePath, "/:flowTarget"),
      render: function render(_ref2) {
        var _ref2$match$params = _ref2.match.params,
            detailName = _ref2$match$params.detailName,
            flowTarget = _ref2$match$params.flowTarget;
        return _react.default.createElement(_ip_details.IPDetails, {
          detailName: detailName,
          flowTarget: flowTarget,
          to: to,
          from: from,
          setQuery: setQuery,
          deleteQuery: deleteQuery,
          isInitializing: isInitializing
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: ipDetailsPageBasePath,
      render: function render(_ref3) {
        var _ref3$location$search = _ref3.location.search,
            search = _ref3$location$search === void 0 ? '' : _ref3$location$search,
            detailName = _ref3.match.params.detailName;
        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: "/".concat(_types2.SiemPageName.network, "/ip/").concat(detailName, "/").concat(_types.FlowTarget.source).concat(search)
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/".concat(_types2.SiemPageName.network, "/"),
      render: function render(_ref4) {
        var _ref4$location$search = _ref4.location.search,
            search = _ref4$location$search === void 0 ? '' : _ref4$location$search;
        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: "/".concat(_types2.SiemPageName.network, "/").concat(_types3.NetworkRouteType.flows).concat(search)
        });
      }
    }));
  });
};

var NetworkContainer = _react.default.memo(NetworkContainerComponent);

exports.NetworkContainer = NetworkContainer;