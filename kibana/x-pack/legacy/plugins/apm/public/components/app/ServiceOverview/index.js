"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceOverview = ServiceOverview;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _url = _interopRequireDefault(require("url"));

var _public = require("../../../../../../../../src/plugins/kibana_react/public");

var _useFetcher2 = require("../../../hooks/useFetcher");

var _NoServicesMessage = require("./NoServicesMessage");

var _ServiceList = require("./ServiceList");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _public2 = require("../../../../../../../plugins/observability/public");

var _typings = require("../../../../../../../plugins/apm/common/projections/typings");

var _LocalUIFilters = require("../../shared/LocalUIFilters");

var _useApmPluginContext2 = require("../../../hooks/useApmPluginContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var initalData = {
  items: [],
  hasHistoricalData: true,
  hasLegacyData: false
};
var hasDisplayedToast = false;

function ServiceOverview() {
  var _useApmPluginContext = (0, _useApmPluginContext2.useApmPluginContext)(),
      core = _useApmPluginContext.core;

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      _useUrlParams$urlPara = _useUrlParams.urlParams,
      start = _useUrlParams$urlPara.start,
      end = _useUrlParams$urlPara.end,
      uiFilters = _useUrlParams.uiFilters;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (start && end) {
      return callApmApi({
        pathname: '/api/apm/services',
        params: {
          query: {
            start: start,
            end: end,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [start, end, uiFilters]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? initalData : _useFetcher$data,
      status = _useFetcher.status;

  (0, _react.useEffect)(function () {
    if (data.hasLegacyData && !hasDisplayedToast) {
      hasDisplayedToast = true;
      core.notifications.toasts.addWarning({
        title: _i18n.i18n.translate('xpack.apm.serviceOverview.toastTitle', {
          defaultMessage: 'Legacy data was detected within the selected time range'
        }),
        text: (0, _public.toMountPoint)(_react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.serviceOverview.toastText', {
          defaultMessage: "You're running Elastic Stack 7.0+ and we've detected incompatible data from a previous 6.x version. If you want to view this data in APM, you should migrate it. See more in "
        }), _react.default.createElement(_eui.EuiLink, {
          href: _url.default.format({
            pathname: core.http.basePath.prepend('/app/kibana'),
            hash: '/management/elasticsearch/upgrade_assistant'
          })
        }, _i18n.i18n.translate('xpack.apm.serviceOverview.upgradeAssistantLink', {
          defaultMessage: 'the upgrade assistant'
        }))))
      });
    }
  }, [data.hasLegacyData, core.http.basePath, core.notifications.toasts]);
  (0, _public2.useTrackPageview)({
    app: 'apm',
    path: 'services_overview'
  });
  (0, _public2.useTrackPageview)({
    app: 'apm',
    path: 'services_overview',
    delay: 15000
  });
  var localFiltersConfig = (0, _react.useMemo)(function () {
    return {
      filterNames: ['host', 'agentName'],
      projection: _typings.PROJECTION.SERVICES
    };
  }, []);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_LocalUIFilters.LocalUIFilters, localFiltersConfig)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 7
  }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_ServiceList.ServiceList, {
    items: data.items,
    noItemsMessage: _react.default.createElement(_NoServicesMessage.NoServicesMessage, {
      historicalDataFound: data.hasHistoricalData,
      status: status
    })
  })))));
}