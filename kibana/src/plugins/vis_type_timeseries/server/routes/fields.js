"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldsRoutes = void 0;

var _boom = require("boom");

var _configSchema = require("@kbn/config-schema");

var _get_fields = require("../lib/get_fields");

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
const fieldsRoutes = framework => {
  framework.router.get({
    path: '/api/metrics/fields',
    validate: {
      query: _configSchema.schema.object({
        index: _configSchema.schema.string()
      })
    }
  }, async (context, req, res) => {
    try {
      return res.ok({
        body: await (0, _get_fields.getFields)(context, req, framework, req.query.index)
      });
    } catch (err) {
      if ((0, _boom.isBoom)(err) && err.output.statusCode === 401) {
        return res.customError({
          body: err.output.payload,
          statusCode: err.output.statusCode,
          headers: err.output.headers
        });
      }

      return res.ok({
        body: []
      });
    }
  });
};

exports.fieldsRoutes = fieldsRoutes;