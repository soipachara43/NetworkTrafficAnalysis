"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iconForNode = iconForNode;
exports.defaultIcon = void 0;

var _agent_name = require("../../../../../../../plugins/apm/common/agent_name");

var _elasticsearch_fieldnames = require("../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _database = _interopRequireDefault(require("./icons/database.svg"));

var _default = _interopRequireDefault(require("./icons/default.svg"));

var _documents = _interopRequireDefault(require("./icons/documents.svg"));

var _dotNet = _interopRequireDefault(require("./icons/dot-net.svg"));

var _elasticsearch = _interopRequireDefault(require("./icons/elasticsearch.svg"));

var _globe = _interopRequireDefault(require("./icons/globe.svg"));

var _go = _interopRequireDefault(require("./icons/go.svg"));

var _java = _interopRequireDefault(require("./icons/java.svg"));

var _nodejs = _interopRequireDefault(require("./icons/nodejs.svg"));

var _php = _interopRequireDefault(require("./icons/php.svg"));

var _python = _interopRequireDefault(require("./icons/python.svg"));

var _ruby = _interopRequireDefault(require("./icons/ruby.svg"));

var _rumjs = _interopRequireDefault(require("./icons/rumjs.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var defaultIcon = _default.default; // The colors here are taken from the logos of the corresponding technologies

exports.defaultIcon = defaultIcon;
var icons = {
  cache: _database.default,
  db: _database.default,
  ext: _globe.default,
  external: _globe.default,
  messaging: _documents.default,
  resource: _globe.default
};
var serviceIcons = {
  dotnet: _dotNet.default,
  go: _go.default,
  java: _java.default,
  'js-base': _rumjs.default,
  nodejs: _nodejs.default,
  php: _php.default,
  python: _python.default,
  ruby: _ruby.default
}; // IE 11 does not properly load some SVGs, which causes a runtime error and the
// map to not work at all. We would prefer to do some kind of feature detection
// rather than browser detection, but IE 11 does support SVG, just not well
// enough for our use in loading icons.
//
// This method of detecting IE is from a Stack Overflow answer:
// https://stackoverflow.com/a/21825207
//
// @ts-ignore `documentMode` is not recognized as a valid property of `document`.

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

function iconForNode(node) {
  var type = node.data(_elasticsearch_fieldnames.SPAN_TYPE);

  if (node.data(_elasticsearch_fieldnames.SERVICE_NAME)) {
    var agentName = node.data(_elasticsearch_fieldnames.AGENT_NAME); // RUM can have multiple names. Normalize it

    var normalizedAgentName = (0, _agent_name.isRumAgentName)(agentName) ? 'js-base' : agentName;
    return serviceIcons[normalizedAgentName];
  } else if (isIE11) {
    return defaultIcon;
  } else if (node.data(_elasticsearch_fieldnames.SPAN_TYPE) === 'db' && node.data(_elasticsearch_fieldnames.SPAN_SUBTYPE) === 'elasticsearch') {
    return _elasticsearch.default;
  } else if (icons[type]) {
    return icons[type];
  } else {
    return defaultIcon;
  }
}