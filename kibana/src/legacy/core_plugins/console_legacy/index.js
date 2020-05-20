"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.readLegacyEsConfig = void 0;

var _operators = require("rxjs/operators");

var _lodash = require("lodash");

var _url = _interopRequireDefault(require("url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// TODO: Remove this hack once we can get the ES config we need for Console proxy a better way.
let _legacyEsConfig;

const readLegacyEsConfig = () => {
  return _legacyEsConfig;
}; // eslint-disable-next-line import/no-default-export


exports.readLegacyEsConfig = readLegacyEsConfig;

function _default(kibana) {
  return new kibana.Plugin({
    id: 'console_legacy',

    async init(server) {
      _legacyEsConfig = await server.newPlatform.__internals.elasticsearch.legacy.config$.pipe((0, _operators.first)()).toPromise();
    },

    uiExports: {
      injectDefaultVars: () => ({
        elasticsearchUrl: _url.default.format(Object.assign(_url.default.parse((0, _lodash.head)(_legacyEsConfig.hosts)), {
          auth: false
        }))
      })
    }
  });
}