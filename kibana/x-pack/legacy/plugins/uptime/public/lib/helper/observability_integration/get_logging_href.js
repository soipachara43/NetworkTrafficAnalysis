"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoggingIpHref = exports.getLoggingKubernetesHref = exports.getLoggingContainerHref = void 0;

var _add_base_path = require("./add_base_path");

var _build_href = require("./build_href");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getLoggingContainerHref = function getLoggingContainerHref(summary, basePath) {
  var getHref = function getHref(value) {
    if (!value) {
      return undefined;
    }

    var ret = !Array.isArray(value) ? value : value[0];
    return (0, _add_base_path.addBasePath)(basePath, "/app/logs?logFilter=".concat(encodeURI("(expression:'container.id : ".concat(ret, "',kind:kuery)"))));
  };

  return (0, _build_href.buildHref)(summary.state.checks || [], 'container.id', getHref);
};

exports.getLoggingContainerHref = getLoggingContainerHref;

var getLoggingKubernetesHref = function getLoggingKubernetesHref(summary, basePath) {
  var getHref = function getHref(value) {
    if (!value) {
      return undefined;
    }

    var ret = !Array.isArray(value) ? value : value[0];
    return (0, _add_base_path.addBasePath)(basePath, "/app/logs?logFilter=".concat(encodeURI("(expression:'pod.uid : ".concat(ret, "',kind:kuery)"))));
  };

  return (0, _build_href.buildHref)(summary.state.checks || [], 'kubernetes.pod.uid', getHref);
};

exports.getLoggingKubernetesHref = getLoggingKubernetesHref;

var getLoggingIpHref = function getLoggingIpHref(summary, basePath) {
  var getHref = function getHref(value) {
    if (!value) {
      return undefined;
    }

    var ret = !Array.isArray(value) ? value : value[0];
    return (0, _add_base_path.addBasePath)(basePath, "/app/logs?logFilter=(expression:'".concat(encodeURIComponent("host.ip : ".concat(ret)), "',kind:kuery)"));
  };

  return (0, _build_href.buildHref)(summary.state.checks || [], 'monitor.ip', getHref);
};

exports.getLoggingIpHref = getLoggingIpHref;