"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hydrateIndexPattern = hydrateIndexPattern;

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

/**
 * After creation or fetching from ES, ensure that the searchSources index indexPattern
 * is an bonafide IndexPattern object.
 *
 * @return {Promise<IndexPattern | null>}
 */
function hydrateIndexPattern(_x, _x2, _x3, _x4) {
  return _hydrateIndexPattern.apply(this, arguments);
}

function _hydrateIndexPattern() {
  _hydrateIndexPattern = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id, savedObject, indexPatterns, config) {
    var clearSavedIndexPattern, indexPattern, index, indexObj;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            clearSavedIndexPattern = !!config.clearSavedIndexPattern;
            indexPattern = config.indexPattern;

            if (savedObject.searchSource) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", null);

          case 4:
            if (!clearSavedIndexPattern) {
              _context.next = 7;
              break;
            }

            savedObject.searchSource.setField('index', undefined);
            return _context.abrupt("return", null);

          case 7:
            index = id || indexPattern || savedObject.searchSource.getOwnField('index');

            if (!(typeof index !== 'string' || !index)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", null);

          case 10:
            _context.next = 12;
            return indexPatterns.get(index);

          case 12:
            indexObj = _context.sent;
            savedObject.searchSource.setField('index', indexObj);
            return _context.abrupt("return", indexObj);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _hydrateIndexPattern.apply(this, arguments);
}