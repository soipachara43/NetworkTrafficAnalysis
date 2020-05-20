"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkEmptyPage = void 0;

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
var NetworkEmptyPage = _react.default.memo(function () {
  var _useKibana$services = (0, _kibana.useKibana)().services,
      http = _useKibana$services.http,
      docLinks = _useKibana$services.docLinks;
  var basePath = http.basePath.get();
  return _react.default.createElement(_empty_page.EmptyPage, {
    actionPrimaryIcon: "gear",
    actionPrimaryLabel: i18n.EMPTY_ACTION_PRIMARY,
    actionPrimaryUrl: "".concat(basePath, "/app/kibana#/home/tutorial_directory/siem"),
    actionSecondaryIcon: "popout",
    actionSecondaryLabel: i18n.EMPTY_ACTION_SECONDARY,
    actionSecondaryTarget: "_blank",
    actionSecondaryUrl: docLinks.links.siem.gettingStarted,
    "data-test-subj": "empty-page",
    title: i18n.EMPTY_TITLE,
    message: i18n.EMPTY_MESSAGE
  });
});

exports.NetworkEmptyPage = NetworkEmptyPage;
NetworkEmptyPage.displayName = 'NetworkEmptyPage';