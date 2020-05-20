"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textFromRequest = textFromRequest;
exports.jsonToString = jsonToString;
exports.formatRequestBodyDoc = formatRequestBodyDoc;
exports.extractDeprecationMessages = extractDeprecationMessages;
exports.unescape = unescape;
exports.splitOnUnquotedCommaSpace = splitOnUnquotedCommaSpace;

var _lodash = _interopRequireDefault(require("lodash"));

var _lib = require("../../../../es_ui_shared/console_lang/lib");

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
function textFromRequest(request) {
  var data = request.data;

  if (typeof data !== 'string') {
    data = data.join('\n');
  }

  return request.method + ' ' + request.url + '\n' + data;
}

function jsonToString(data, indent) {
  return JSON.stringify(data, null, indent ? 2 : 0);
}

function formatRequestBodyDoc(data, indent) {
  var changed = false;
  var formattedData = [];

  for (var i = 0; i < data.length; i++) {
    var curDoc = data[i];

    try {
      var newDoc = jsonToString(JSON.parse((0, _lib.collapseLiteralStrings)(curDoc)), indent);

      if (indent) {
        newDoc = (0, _lib.expandLiteralStrings)(newDoc);
      }

      changed = changed || newDoc !== curDoc;
      formattedData.push(newDoc);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      formattedData.push(curDoc);
    }
  }

  return {
    changed: changed,
    data: formattedData
  };
}

function extractDeprecationMessages(warnings) {
  // pattern for valid warning header
  var re = /\d{3} [0-9a-zA-Z!#$%&'*+-.^_`|~]+ \"((?:\t| |!|[\x23-\x5b]|[\x5d-\x7e]|[\x80-\xff]|\\\\|\\")*)\"(?: \"[^"]*\")?/; // split on any comma that is followed by an even number of quotes

  return _lodash.default.map(splitOnUnquotedCommaSpace(warnings), function (warning) {
    var match = re.exec(warning); // extract the actual warning if there was a match

    return '#! Deprecation: ' + (match !== null ? unescape(match[1]) : warning);
  });
}

function unescape(s) {
  return s.replace(/\\\\/g, '\\').replace(/\\"/g, '"');
}

function splitOnUnquotedCommaSpace(s) {
  var quoted = false;
  var arr = [];
  var buffer = '';
  var i = 0;

  while (i < s.length) {
    var token = s.charAt(i++);

    if (token === '\\' && i < s.length) {
      token += s.charAt(i++);
    } else if (token === ',' && i < s.length && s.charAt(i) === ' ') {
      token += s.charAt(i++);
    }

    if (token === '"') {
      quoted = !quoted;
    } else if (!quoted && token === ', ') {
      arr.push(buffer);
      buffer = '';
      continue;
    }

    buffer += token;
  }

  arr.push(buffer);
  return arr;
}