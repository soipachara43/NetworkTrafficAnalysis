"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewEmpty = void 0;

var _react = _interopRequireDefault(require("react"));

var i18nCommon = _interopRequireWildcard(require("../../common/translations"));

var _empty_page = require("../../../components/empty_page");

var _kibana = require("../../../lib/kibana");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OverviewEmptyComponent = function OverviewEmptyComponent() {
  var _useKibana$services = (0, _kibana.useKibana)().services,
      http = _useKibana$services.http,
      docLinks = _useKibana$services.docLinks;
  var basePath = http.basePath.get();
  return _react.default.createElement(_empty_page.EmptyPage, {
    actionPrimaryIcon: "gear",
    actionPrimaryLabel: i18nCommon.EMPTY_ACTION_PRIMARY,
    actionPrimaryUrl: "".concat(basePath, "/app/kibana#/home/tutorial_directory/siem"),
    actionSecondaryIcon: "popout",
    actionSecondaryLabel: i18nCommon.EMPTY_ACTION_SECONDARY,
    actionSecondaryTarget: "_blank",
    actionSecondaryUrl: docLinks.links.siem.gettingStarted,
    "data-test-subj": "empty-page",
    message: i18nCommon.EMPTY_MESSAGE,
    title: i18nCommon.EMPTY_TITLE
  });
};

OverviewEmptyComponent.displayName = 'OverviewEmptyComponent';

var OverviewEmpty = _react.default.memo(OverviewEmptyComponent);

exports.OverviewEmpty = OverviewEmpty;