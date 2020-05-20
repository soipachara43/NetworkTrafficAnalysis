"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

var _configSchema = require("@kbn/config-schema");

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
const config = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  proxyFilter: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
    defaultValue: ['.*']
  }),
  ssl: _configSchema.schema.object({
    verify: _configSchema.schema.boolean({
      defaultValue: false
    })
  }, {}),
  // This does not actually work, track this issue: https://github.com/elastic/kibana/issues/55576
  proxyConfig: _configSchema.schema.arrayOf(_configSchema.schema.object({
    match: _configSchema.schema.object({
      protocol: _configSchema.schema.string({
        defaultValue: '*'
      }),
      host: _configSchema.schema.string({
        defaultValue: '*'
      }),
      port: _configSchema.schema.string({
        defaultValue: '*'
      }),
      path: _configSchema.schema.string({
        defaultValue: '*'
      })
    }),
    timeout: _configSchema.schema.number(),
    ssl: _configSchema.schema.object({
      verify: _configSchema.schema.boolean(),
      ca: _configSchema.schema.arrayOf(_configSchema.schema.string()),
      cert: _configSchema.schema.string(),
      key: _configSchema.schema.string()
    }, {
      defaultValue: undefined
    })
  }), {
    defaultValue: []
  })
}, {
  defaultValue: undefined
});

exports.config = config;