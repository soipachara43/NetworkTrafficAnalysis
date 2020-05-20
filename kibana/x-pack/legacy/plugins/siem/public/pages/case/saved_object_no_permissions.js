"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseSavedObjectNoPermissions = void 0;

var _react = _interopRequireDefault(require("react"));

var _empty_page = require("../../components/empty_page");

var i18n = _interopRequireWildcard(require("./translations"));

var _kibana = require("../../lib/kibana");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CaseSavedObjectNoPermissions = _react.default.memo(function () {
  var docLinks = (0, _kibana.useKibana)().services.docLinks;
  return _react.default.createElement(_empty_page.EmptyPage, {
    actionPrimaryIcon: "documents",
    actionPrimaryLabel: i18n.GO_TO_DOCUMENTATION,
    actionPrimaryUrl: "".concat(docLinks.ELASTIC_WEBSITE_URL, "guide/en/siem/guide/").concat(docLinks.DOC_LINK_VERSION, "s"),
    actionPrimaryTarget: "_blank",
    message: i18n.SAVED_OBJECT_NO_PERMISSIONS_MSG,
    "data-test-subj": "no_saved_objects_permissions",
    title: i18n.SAVED_OBJECT_NO_PERMISSIONS_TITLE
  });
});

exports.CaseSavedObjectNoPermissions = CaseSavedObjectNoPermissions;
CaseSavedObjectNoPermissions.displayName = 'CaseSavedObjectNoPermissions';