"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShortenUrlRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _short_url_assert_valid = require("./lib/short_url_assert_valid");

var _short_url_routes = require("../../common/short_url_routes");

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
const createShortenUrlRoute = ({
  shortUrlLookup,
  router
}) => {
  router.post({
    path: _short_url_routes.CREATE_PATH,
    validate: {
      body: _configSchema.schema.object({
        url: _configSchema.schema.string()
      })
    }
  }, router.handleLegacyErrors(async function (context, request, response) {
    (0, _short_url_assert_valid.shortUrlAssertValid)(request.body.url);
    const urlId = await shortUrlLookup.generateUrlId(request.body.url, {
      savedObjects: context.core.savedObjects.client
    });
    return response.ok({
      body: {
        urlId
      }
    });
  }));
};

exports.createShortenUrlRoute = createShortenUrlRoute;