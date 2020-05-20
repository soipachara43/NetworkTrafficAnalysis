"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@kbn/i18n");

var _alter = _interopRequireDefault(require("../lib/alter.js"));

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
var _default = new _chainable.default('label', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'label',
    types: ['string'],
    help: _i18n.i18n.translate('timelion.help.functions.label.args.labelHelpText', {
      defaultMessage: 'Legend value for series. You can use $1, $2, etc, in the string to match up with the regex capture groups',
      description: '"$1" and "$2" are part of the expression and must not be translated.'
    })
  }, {
    name: 'regex',
    types: ['string', 'null'],
    help: _i18n.i18n.translate('timelion.help.functions.label.args.regexHelpText', {
      defaultMessage: 'A regex with capture group support'
    })
  }],
  help: _i18n.i18n.translate('timelion.help.functions.labelHelpText', {
    defaultMessage: 'Change the label of the series. Use %s to reference the existing label'
  }),
  fn: function labelFn(args) {
    const config = args.byName;
    return (0, _alter.default)(args, function (eachSeries) {
      if (config.regex) {
        eachSeries.label = eachSeries.label.replace(new RegExp(config.regex), config.label);
      } else {
        eachSeries.label = config.label;
      }

      return eachSeries;
    });
  }
});

exports.default = _default;
module.exports = exports.default;