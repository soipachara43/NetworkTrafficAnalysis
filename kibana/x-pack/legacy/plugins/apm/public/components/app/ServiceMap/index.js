"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceMap = ServiceMap;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _service_map = require("../../../../../../../plugins/apm/common/service_map");

var _useFetcher2 = require("../../../hooks/useFetcher");

var _useLicense = require("../../../hooks/useLicense");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _createCallApmApi = require("../../../services/rest/createCallApmApi");

var _BetaBadge = require("./BetaBadge");

var _LicensePrompt = require("../../shared/LicensePrompt");

var _Controls = require("./Controls");

var _Cytoscape = require("./Cytoscape");

var _cytoscapeOptions = require("./cytoscapeOptions");

var _EmptyBanner = require("./EmptyBanner");

var _Popover = require("./Popover");

var _useRefDimensions2 = require("./useRefDimensions");

var _public = require("../../../../../../../plugins/observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function ServiceMap(_ref) {
  var _ref2;

  var serviceName = _ref.serviceName;
  var license = (0, _useLicense.useLicense)();

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function () {
    // When we don't have a license or a valid license, don't make the request.
    if (!license || !(0, _service_map.isValidPlatinumLicense)(license)) {
      return;
    }

    var start = urlParams.start,
        end = urlParams.end,
        environment = urlParams.environment;

    if (start && end) {
      return (0, _createCallApmApi.callApmApi)({
        isCachable: false,
        pathname: '/api/apm/service-map',
        params: {
          query: {
            start: start,
            end: end,
            environment: environment,
            serviceName: serviceName
          }
        }
      });
    }
  }, [license, serviceName, urlParams]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? {
    elements: []
  } : _useFetcher$data;

  var _useRefDimensions = (0, _useRefDimensions2.useRefDimensions)(),
      ref = _useRefDimensions.ref,
      height = _useRefDimensions.height,
      width = _useRefDimensions.width;

  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'service_map'
  });
  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'service_map',
    delay: 15000
  });

  if (!license) {
    return null;
  }

  return (0, _service_map.isValidPlatinumLicense)(license) ? _react.default.createElement("div", {
    style: {
      height: height - parseInt(_eui_theme_light.default.gutterTypes.gutterLarge, 10)
    },
    ref: ref
  }, _react.default.createElement(_Cytoscape.Cytoscape, {
    elements: (_ref2 = data === null || data === void 0 ? void 0 : data.elements) !== null && _ref2 !== void 0 ? _ref2 : [],
    height: height,
    serviceName: serviceName,
    style: _cytoscapeOptions.cytoscapeDivStyle,
    width: width
  }, _react.default.createElement(_Controls.Controls, null), _react.default.createElement(_BetaBadge.BetaBadge, null), serviceName && _react.default.createElement(_EmptyBanner.EmptyBanner, null), _react.default.createElement(_Popover.Popover, {
    focusedServiceName: serviceName
  }))) : _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceAround" // Set the height to give it some top margin
    ,
    style: {
      height: '60vh'
    }
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      width: 600,
      textAlign: 'center'
    }
  }, _react.default.createElement(_LicensePrompt.LicensePrompt, {
    text: _service_map.invalidLicenseMessage,
    showBetaBadge: true
  })));
}