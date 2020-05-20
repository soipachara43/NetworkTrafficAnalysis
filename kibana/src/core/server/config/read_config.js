"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigFromFiles = void 0;

var _fs = require("fs");

var _jsYaml = require("js-yaml");

var _lodash = require("lodash");

var _ensure_deep_object = require("./ensure_deep_object");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const readYaml = path => (0, _jsYaml.safeLoad)((0, _fs.readFileSync)(path, 'utf8'));

function replaceEnvVarRefs(val) {
  return val.replace(/\$\{(\w+)\}/g, (match, envVarName) => {
    const envVarValue = process.env[envVarName];

    if (envVarValue !== undefined) {
      return envVarValue;
    }

    throw new Error(`Unknown environment variable referenced in config : ${envVarName}`);
  });
}

function merge(target, value, key) {
  if (((0, _lodash.isPlainObject)(value) || Array.isArray(value)) && Object.keys(value).length > 0) {
    for (const [subKey, subVal] of Object.entries(value)) {
      merge(target, subVal, key ? `${key}.${subKey}` : subKey);
    }
  } else if (key !== undefined) {
    (0, _lodash.set)(target, key, typeof value === 'string' ? replaceEnvVarRefs(value) : value);
  }

  return target;
}
/** @internal */


const getConfigFromFiles = configFiles => {
  let mergedYaml = {};

  for (const configFile of configFiles) {
    const yaml = readYaml(configFile);

    if (yaml !== null) {
      mergedYaml = merge(mergedYaml, yaml);
    }
  }

  return (0, _ensure_deep_object.ensureDeepObject)(mergedYaml);
};

exports.getConfigFromFiles = getConfigFromFiles;