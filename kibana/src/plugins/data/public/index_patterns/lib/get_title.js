"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTitle = getTitle;

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
function getTitle(_x, _x2) {
  return _getTitle.apply(this, arguments);
}

function _getTitle() {
  _getTitle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(client, indexPatternId) {
    var savedObject;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.get('index-pattern', indexPatternId);

          case 2:
            savedObject = _context.sent;

            if (!savedObject.error) {
              _context.next = 5;
              break;
            }

            throw new Error("Unable to get index-pattern title: ".concat(savedObject.error.message));

          case 5:
            return _context.abrupt("return", savedObject.attributes.title);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getTitle.apply(this, arguments);
}