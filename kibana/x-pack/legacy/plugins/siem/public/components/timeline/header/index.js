"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineHeader = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _data_providers = require("../data_providers");

var _search_or_filter = require("../search_or_filter");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TimelineHeaderComponent = function TimelineHeaderComponent(_ref) {
  var browserFields = _ref.browserFields,
      id = _ref.id,
      indexPattern = _ref.indexPattern,
      dataProviders = _ref.dataProviders,
      onChangeDataProviderKqlQuery = _ref.onChangeDataProviderKqlQuery,
      onChangeDroppableAndProvider = _ref.onChangeDroppableAndProvider,
      onDataProviderEdited = _ref.onDataProviderEdited,
      onDataProviderRemoved = _ref.onDataProviderRemoved,
      onToggleDataProviderEnabled = _ref.onToggleDataProviderEnabled,
      onToggleDataProviderExcluded = _ref.onToggleDataProviderExcluded,
      show = _ref.show,
      showCallOutUnauthorizedMsg = _ref.showCallOutUnauthorizedMsg;
  return _react.default.createElement(_react.default.Fragment, null, showCallOutUnauthorizedMsg && _react.default.createElement(_eui.EuiCallOut, {
    "data-test-subj": "timelineCallOutUnauthorized",
    title: i18n.CALL_OUT_UNAUTHORIZED_MSG,
    color: "warning",
    iconType: "alert",
    size: "s"
  }), _react.default.createElement(_data_providers.DataProviders, {
    browserFields: browserFields,
    id: id,
    dataProviders: dataProviders,
    onChangeDroppableAndProvider: onChangeDroppableAndProvider,
    onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery,
    onDataProviderEdited: onDataProviderEdited,
    onDataProviderRemoved: onDataProviderRemoved,
    onToggleDataProviderEnabled: onToggleDataProviderEnabled,
    onToggleDataProviderExcluded: onToggleDataProviderExcluded,
    show: show
  }), _react.default.createElement(_search_or_filter.StatefulSearchOrFilter, {
    browserFields: browserFields,
    indexPattern: indexPattern,
    timelineId: id
  }));
};

var TimelineHeader = _react.default.memo(TimelineHeaderComponent, function (prevProps, nextProps) {
  return (0, _fastDeepEqual.default)(prevProps.browserFields, nextProps.browserFields) && prevProps.id === nextProps.id && (0, _fastDeepEqual.default)(prevProps.indexPattern, nextProps.indexPattern) && (0, _fastDeepEqual.default)(prevProps.dataProviders, nextProps.dataProviders) && prevProps.onChangeDataProviderKqlQuery === nextProps.onChangeDataProviderKqlQuery && prevProps.onChangeDroppableAndProvider === nextProps.onChangeDroppableAndProvider && prevProps.onDataProviderEdited === nextProps.onDataProviderEdited && prevProps.onDataProviderRemoved === nextProps.onDataProviderRemoved && prevProps.onToggleDataProviderEnabled === nextProps.onToggleDataProviderEnabled && prevProps.onToggleDataProviderExcluded === nextProps.onToggleDataProviderExcluded && prevProps.show === nextProps.show && prevProps.showCallOutUnauthorizedMsg === nextProps.showCallOutUnauthorizedMsg;
});

exports.TimelineHeader = TimelineHeader;