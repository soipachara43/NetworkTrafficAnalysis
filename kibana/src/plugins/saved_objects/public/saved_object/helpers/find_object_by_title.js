"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findObjectByTitle = findObjectByTitle;

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
 * Returns an object matching a given title
 *
 * @param savedObjectsClient {SavedObjectsClientContract}
 * @param type {string}
 * @param title {string}
 * @returns {Promise<SimpleSavedObject|undefined>}
 */
function findObjectByTitle(_x, _x2, _x3) {
  return _findObjectByTitle.apply(this, arguments);
}

function _findObjectByTitle() {
  _findObjectByTitle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(savedObjectsClient, type, title) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (title) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.next = 4;
            return savedObjectsClient.find({
              type: type,
              perPage: 10,
              search: "\"".concat(title, "\""),
              searchFields: ['title'],
              fields: ['title']
            });

          case 4:
            response = _context.sent;
            return _context.abrupt("return", response.savedObjects.find(function (obj) {
              return obj.get('title').toLowerCase() === title.toLowerCase();
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _findObjectByTitle.apply(this, arguments);
}