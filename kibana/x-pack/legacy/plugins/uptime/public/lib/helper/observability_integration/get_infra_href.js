"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInfraIpHref = exports.getInfraKubernetesHref = exports.getInfraContainerHref = void 0;

var _add_base_path = require("./add_base_path");

var _build_href = require("./build_href");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getInfraContainerHref = function getInfraContainerHref(summary, basePath) {
  var getHref = function getHref(value) {
    if (!value) {
      return undefined;
    }

    var ret = !Array.isArray(value) ? value : value[0];
    return (0, _add_base_path.addBasePath)(basePath, "/app/metrics/link-to/container-detail/".concat(encodeURIComponent(ret)));
  };

  return (0, _build_href.buildHref)(summary.state.checks || [], 'container.id', getHref);
};

exports.getInfraContainerHref = getInfraContainerHref;

var getInfraKubernetesHref = function getInfraKubernetesHref(summary, basePath) {
  var getHref = function getHref(value) {
    if (!value) {
      return undefined;
    }

    var ret = !Array.isArray(value) ? value : value[0];
    return (0, _add_base_path.addBasePath)(basePath, "/app/metrics/link-to/pod-detail/".concat(encodeURIComponent(ret)));
  };

  return (0, _build_href.buildHref)(summary.state.checks || [], 'kubernetes.pod.uid', getHref);
};

exports.getInfraKubernetesHref = getInfraKubernetesHref;

var getInfraIpHref = function getInfraIpHref(summary, basePath) {
  var getHref = function getHref(value) {
    if (!value) {
      return undefined;
    }

    if (!Array.isArray(value)) {
      var expression = encodeURIComponent("host.ip : ".concat(value));
      return (0, _add_base_path.addBasePath)(basePath, "/app/metrics/inventory?waffleFilter=(expression:'".concat(expression, "',kind:kuery)"));
    }

    var ips = value.reduce(function (str, cur) {
      return !str ? "host.ip : ".concat(cur) : str + " or host.ip : ".concat(cur);
    }, '');
    return ips === '' ? undefined : (0, _add_base_path.addBasePath)(basePath, "/app/metrics/inventory?waffleFilter=(expression:'".concat(encodeURIComponent(ips), "',kind:kuery)"));
  };

  return (0, _build_href.buildHref)(summary.state.checks || [], 'monitor.ip', getHref);
};

exports.getInfraIpHref = getInfraIpHref;