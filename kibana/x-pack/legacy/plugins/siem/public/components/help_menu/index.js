"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _kibana = require("../../lib/kibana");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HelpMenu = _react.default.memo(function () {
  var _useKibana$services = (0, _kibana.useKibana)().services,
      chrome = _useKibana$services.chrome,
      docLinks = _useKibana$services.docLinks;
  (0, _react.useEffect)(function () {
    chrome.setHelpExtension({
      appName: _i18n.i18n.translate('xpack.siem.chrome.help.appName', {
        defaultMessage: 'SIEM'
      }),
      links: [{
        content: _i18n.i18n.translate('xpack.siem.chrome.helpMenu.documentation', {
          defaultMessage: 'SIEM documentation'
        }),
        href: docLinks.links.siem.guide,
        iconType: 'documents',
        linkType: 'custom',
        target: '_blank',
        rel: 'noopener'
      }, {
        content: _i18n.i18n.translate('xpack.siem.chrome.helpMenu.documentation.ecs', {
          defaultMessage: 'ECS documentation'
        }),
        href: "".concat(docLinks.ELASTIC_WEBSITE_URL, "guide/en/ecs/current/index.html"),
        iconType: 'documents',
        linkType: 'custom',
        target: '_blank',
        rel: 'noopener'
      }, {
        linkType: 'discuss',
        href: 'https://discuss.elastic.co/c/siem',
        target: '_blank',
        rel: 'noopener'
      }]
    });
  }, []);
  return null;
});

exports.HelpMenu = HelpMenu;
HelpMenu.displayName = 'HelpMenu';