"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHelpMenuToAppChrome = addHelpMenuToAppChrome;

var _documentation_links = require("ui/documentation_links");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function addHelpMenuToAppChrome(chrome) {
  chrome.setHelpExtension({
    appName: 'Lens',
    links: [{
      linkType: 'documentation',
      href: "".concat(_documentation_links.ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(_documentation_links.DOC_LINK_VERSION, "/lens.html")
    }, {
      linkType: 'github',
      title: '[Lens]',
      labels: ['Feature:Lens']
    }]
  });
}