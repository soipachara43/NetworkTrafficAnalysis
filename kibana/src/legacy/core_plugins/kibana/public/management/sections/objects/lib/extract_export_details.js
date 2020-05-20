"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractExportDetails = extractExportDetails;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
function extractExportDetails(_x) {
  return _extractExportDetails.apply(this, arguments);
}

function _extractExportDetails() {
  _extractExportDetails = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(blob) {
    var reader, content, lines, maybeDetails;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reader = new FileReader();
            _context.next = 3;
            return new Promise(function (resolve, reject) {
              reader.addEventListener('loadend', function (e) {
                resolve(e.target.result);
              });
              reader.addEventListener('error', function (e) {
                reject(e);
              });
              reader.readAsText(blob, 'utf-8');
            });

          case 3:
            content = _context.sent;
            lines = content.split('\n').filter(function (l) {
              return l.length > 0;
            });
            maybeDetails = JSON.parse(lines[lines.length - 1]);

            if (!isExportDetails(maybeDetails)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", maybeDetails);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _extractExportDetails.apply(this, arguments);
}

function isExportDetails(object) {
  return 'exportedCount' in object && 'missingRefCount' in object && 'missingReferences' in object;
}