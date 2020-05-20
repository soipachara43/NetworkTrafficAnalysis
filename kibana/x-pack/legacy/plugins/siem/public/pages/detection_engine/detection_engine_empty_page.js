"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectionEngineEmptyPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _kibana = require("../../lib/kibana");

var _empty_page = require("../../components/empty_page");

var i18n = _interopRequireWildcard(require("../common/translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DetectionEngineEmptyPage = _react.default.memo(function () {
  return _react.default.createElement(_empty_page.EmptyPage, {
    actionPrimaryIcon: "gear",
    actionPrimaryLabel: i18n.EMPTY_ACTION_PRIMARY,
    actionPrimaryUrl: "".concat((0, _kibana.useKibana)().services.http.basePath.get(), "/app/kibana#/home/tutorial_directory/siem"),
    actionSecondaryIcon: "popout",
    actionSecondaryLabel: i18n.EMPTY_ACTION_SECONDARY,
    actionSecondaryTarget: "_blank",
    actionSecondaryUrl: (0, _kibana.useKibana)().services.docLinks.links.siem.gettingStarted,
    "data-test-subj": "empty-page",
    message: i18n.EMPTY_MESSAGE,
    title: i18n.EMPTY_TITLE
  });
});

exports.DetectionEngineEmptyPage = DetectionEngineEmptyPage;
DetectionEngineEmptyPage.displayName = 'DetectionEngineEmptyPage';