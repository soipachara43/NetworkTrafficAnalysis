"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@kbn/i18n");

var _alter = _interopRequireDefault(require("../lib/alter.js"));

var _lodash = _interopRequireDefault(require("lodash"));

var _chainable = _interopRequireDefault(require("../lib/classes/chainable"));

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
var _default = new _chainable.default('cusum', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'base',
    types: ['number'],
    help: _i18n.i18n.translate('timelion.help.functions.cusum.args.baseHelpText', {
      defaultMessage: 'Number to start at. Basically just adds this to the beginning of the series'
    })
  }],
  help: _i18n.i18n.translate('timelion.help.functions.cusumHelpText', {
    defaultMessage: 'Return the cumulative sum of a series, starting at a base.'
  }),
  fn: function cusumFn(args) {
    return (0, _alter.default)(args, function (eachSeries, base) {
      const pairs = eachSeries.data;
      let total = base || 0;
      eachSeries.data = _lodash.default.map(pairs, function (point) {
        total += point[1];
        return [point[0], total];
      });
      return eachSeries;
    });
  }
});

exports.default = _default;
module.exports = exports.default;