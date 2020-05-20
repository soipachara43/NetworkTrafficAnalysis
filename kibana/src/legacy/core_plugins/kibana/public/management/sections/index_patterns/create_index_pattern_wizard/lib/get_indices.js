"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndices = getIndices;

var _lodash = require("lodash");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getIndices(_x, _x2, _x3, _x4) {
  return _getIndices.apply(this, arguments);
}

function _getIndices() {
  _getIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(es, indexPatternCreationType, rawPattern, limit) {
    var pattern, params, response, type;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pattern = rawPattern.trim(); // Searching for `*:` fails for CCS environments. The search request
            // is worthless anyways as the we should only send a request
            // for a specific query (where we do not append *) if there is at
            // least a single character being searched for.

            if (!(pattern === '*:')) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", []);

          case 3:
            if (!(pattern === '')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", []);

          case 5:
            if (!pattern.startsWith(',')) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", []);

          case 7:
            if (limit) {
              _context.next = 9;
              break;
            }

            throw new Error('`getIndices()` was called without the required `limit` parameter.');

          case 9:
            params = {
              ignoreUnavailable: true,
              index: pattern,
              ignore: [404],
              body: {
                size: 0,
                // no hits
                aggs: {
                  indices: {
                    terms: {
                      field: '_index',
                      size: limit
                    }
                  }
                }
              }
            };
            _context.prev = 10;
            _context.next = 13;
            return es.search(params);

          case 13:
            response = _context.sent;

            if (!(!response || response.error || !response.aggregations)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", []);

          case 16:
            return _context.abrupt("return", (0, _lodash.sortBy)(response.aggregations.indices.buckets.map(function (bucket) {
              return bucket.key;
            }).map(function (indexName) {
              return {
                name: indexName,
                tags: indexPatternCreationType.getIndexTags(indexName)
              };
            }), 'name'));

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](10);
            type = (0, _lodash.get)(_context.t0, 'body.error.caused_by.type');

            if (!(type === 'index_not_found_exception')) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", []);

          case 24:
            throw _context.t0;

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 19]]);
  }));
  return _getIndices.apply(this, arguments);
}