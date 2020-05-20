"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorGroupDetails = ErrorGroupDetails;

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n2 = require("../../../../../../../plugins/apm/common/i18n");

var _useFetcher3 = require("../../../hooks/useFetcher");

var _variables = require("../../../style/variables");

var _ApmHeader = require("../../shared/ApmHeader");

var _DetailView = require("./DetailView");

var _Distribution = require("./Distribution");

var _useLocation = require("../../../hooks/useLocation");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _public = require("../../../../../../../plugins/observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Titles = _styledComponents.default.div.withConfig({
  displayName: "Titles",
  componentId: "n5cwlo-0"
})(["margin-bottom:", ";"], (0, _variables.px)(_variables.units.plus));

var Label = _styledComponents.default.div.withConfig({
  displayName: "Label",
  componentId: "n5cwlo-1"
})(["margin-bottom:", ";font-size:", ";color:", ";"], (0, _variables.px)(_variables.units.quarter), _variables.fontSizes.small, _eui_theme_light.default.euiColorMediumShade);

var Message = _styledComponents.default.div.withConfig({
  displayName: "Message",
  componentId: "n5cwlo-2"
})(["font-family:", ";font-weight:bold;font-size:", ";margin-bottom:", ";"], _variables.fontFamilyCode, _variables.fontSizes.large, (0, _variables.px)(_variables.units.half));

var Culprit = _styledComponents.default.div.withConfig({
  displayName: "Culprit",
  componentId: "n5cwlo-3"
})(["font-family:", ";"], _variables.fontFamilyCode);

function getShortGroupId(errorGroupId) {
  if (!errorGroupId) {
    return _i18n2.NOT_AVAILABLE_LABEL;
  }

  return errorGroupId.slice(0, 5);
}

function ErrorGroupDetails() {
  var _errorGroupData$error, _errorGroupData$error2, _errorGroupData$error3, _errorGroupData$error4, _errorGroupData$error5, _errorGroupData$error6, _errorGroupData$error7;

  var location = (0, _useLocation.useLocation)();

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams,
      uiFilters = _useUrlParams.uiFilters;

  var serviceName = urlParams.serviceName,
      start = urlParams.start,
      end = urlParams.end,
      errorGroupId = urlParams.errorGroupId;

  var _useFetcher = (0, _useFetcher3.useFetcher)(function (callApmApi) {
    if (serviceName && start && end && errorGroupId) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/errors/{groupId}',
        params: {
          path: {
            serviceName: serviceName,
            groupId: errorGroupId
          },
          query: {
            start: start,
            end: end,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [serviceName, start, end, errorGroupId, uiFilters]),
      errorGroupData = _useFetcher.data;

  var _useFetcher2 = (0, _useFetcher3.useFetcher)(function (callApmApi) {
    if (serviceName && start && end && errorGroupId) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/errors/distribution',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            groupId: errorGroupId,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [serviceName, start, end, errorGroupId, uiFilters]),
      errorDistributionData = _useFetcher2.data;

  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'error_group_details'
  });
  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'error_group_details',
    delay: 15000
  });

  if (!errorGroupData || !errorDistributionData) {
    return null;
  } // If there are 0 occurrences, show only distribution chart w. empty message


  var showDetails = errorGroupData.occurrencesCount !== 0;
  var logMessage = (_errorGroupData$error = errorGroupData.error) === null || _errorGroupData$error === void 0 ? void 0 : (_errorGroupData$error2 = _errorGroupData$error.error.log) === null || _errorGroupData$error2 === void 0 ? void 0 : _errorGroupData$error2.message;
  var excMessage = (_errorGroupData$error3 = errorGroupData.error) === null || _errorGroupData$error3 === void 0 ? void 0 : (_errorGroupData$error4 = _errorGroupData$error3.error.exception) === null || _errorGroupData$error4 === void 0 ? void 0 : _errorGroupData$error4[0].message;
  var culprit = (_errorGroupData$error5 = errorGroupData.error) === null || _errorGroupData$error5 === void 0 ? void 0 : _errorGroupData$error5.error.culprit;
  var isUnhandled = ((_errorGroupData$error6 = errorGroupData.error) === null || _errorGroupData$error6 === void 0 ? void 0 : (_errorGroupData$error7 = _errorGroupData$error6.error.exception) === null || _errorGroupData$error7 === void 0 ? void 0 : _errorGroupData$error7[0].handled) === false;
  return _react.default.createElement("div", null, _react.default.createElement(_ApmHeader.ApmHeader, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, _i18n.i18n.translate('xpack.apm.errorGroupDetails.errorGroupTitle', {
    defaultMessage: 'Error group {errorGroupId}',
    values: {
      errorGroupId: getShortGroupId(urlParams.errorGroupId)
    }
  })))), isUnhandled && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiBadge, {
    color: "warning"
  }, _i18n.i18n.translate('xpack.apm.errorGroupDetails.unhandledLabel', {
    defaultMessage: 'Unhandled'
  }))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiPanel, null, showDetails && _react.default.createElement(Titles, null, _react.default.createElement(_eui.EuiText, null, logMessage && _react.default.createElement(_react.Fragment, null, _react.default.createElement(Label, null, _i18n.i18n.translate('xpack.apm.errorGroupDetails.logMessageLabel', {
    defaultMessage: 'Log message'
  })), _react.default.createElement(Message, null, logMessage)), _react.default.createElement(Label, null, _i18n.i18n.translate('xpack.apm.errorGroupDetails.exceptionMessageLabel', {
    defaultMessage: 'Exception message'
  })), _react.default.createElement(Message, null, excMessage || _i18n2.NOT_AVAILABLE_LABEL), _react.default.createElement(Label, null, _i18n.i18n.translate('xpack.apm.errorGroupDetails.culpritLabel', {
    defaultMessage: 'Culprit'
  })), _react.default.createElement(Culprit, null, culprit || _i18n2.NOT_AVAILABLE_LABEL))), _react.default.createElement(_Distribution.ErrorDistribution, {
    distribution: errorDistributionData,
    title: _i18n.i18n.translate('xpack.apm.errorGroupDetails.occurrencesChartLabel', {
      defaultMessage: 'Occurrences'
    })
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), showDetails && _react.default.createElement(_DetailView.DetailView, {
    errorGroup: errorGroupData,
    urlParams: urlParams,
    location: location
  }));
}