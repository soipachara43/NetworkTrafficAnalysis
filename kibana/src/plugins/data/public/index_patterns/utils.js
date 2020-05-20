"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findByTitle = findByTitle;
exports.getRoutes = getRoutes;

var _lodash = require("lodash");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Returns an object matching a given title
 *
 * @param client {SavedObjectsClientContract}
 * @param title {string}
 * @returns {Promise<SimpleSavedObject|undefined>}
 */
function findByTitle(_x, _x2) {
  return _findByTitle.apply(this, arguments);
}

function _findByTitle() {
  _findByTitle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(client, title) {
    var _ref, savedObjects;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (title) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", Promise.resolve());

          case 2:
            _context.next = 4;
            return client.find({
              type: 'index-pattern',
              perPage: 10,
              search: "\"".concat(title, "\""),
              searchFields: ['title'],
              fields: ['title']
            });

          case 4:
            _ref = _context.sent;
            savedObjects = _ref.savedObjects;
            return _context.abrupt("return", (0, _lodash.find)(savedObjects, function (obj) {
              return obj.get('title').toLowerCase() === title.toLowerCase();
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _findByTitle.apply(this, arguments);
}

function getRoutes() {
  return {
    edit: '/management/kibana/index_patterns/{{id}}',
    addField: '/management/kibana/index_patterns/{{id}}/create-field',
    indexedFields: '/management/kibana/index_patterns/{{id}}?_a=(tab:indexedFields)',
    scriptedFields: '/management/kibana/index_patterns/{{id}}?_a=(tab:scriptedFields)',
    sourceFilters: '/management/kibana/index_patterns/{{id}}?_a=(tab:sourceFilters)'
  };
}