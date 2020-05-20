"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

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
const markdownPluginInitializer = ({
  Plugin
}) => new Plugin({
  id: 'markdown_vis',
  require: ['kibana', 'elasticsearch'],
  publicDir: (0, _path.resolve)(__dirname, 'public'),
  uiExports: {
    styleSheetPaths: (0, _path.resolve)(__dirname, 'public/index.scss'),
    hacks: [(0, _path.resolve)(__dirname, 'public/legacy')],
    injectDefaultVars: server => ({})
  },
  init: server => ({}),

  config(Joi) {
    return Joi.object({
      enabled: Joi.boolean().default(true)
    }).default();
  }

}); // eslint-disable-next-line import/no-default-export


var _default = markdownPluginInitializer;
exports.default = _default;
module.exports = exports.default;