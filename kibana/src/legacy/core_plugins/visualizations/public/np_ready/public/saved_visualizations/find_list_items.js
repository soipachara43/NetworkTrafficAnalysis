"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findListItems = findListItems;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Search for visualizations and convert them into a list display-friendly format.
 */
function findListItems(_x) {
  return _findListItems.apply(this, arguments);
}

function _findListItems() {
  _findListItems = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var visTypes, search, size, savedObjectsClient, mapSavedObjectApiHits, extensions, extensionByType, searchOption, searchOptions, _ref2, total, savedObjects;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            visTypes = _ref.visTypes, search = _ref.search, size = _ref.size, savedObjectsClient = _ref.savedObjectsClient, mapSavedObjectApiHits = _ref.mapSavedObjectApiHits;
            extensions = visTypes.map(function (v) {
              var _v$appExtensions;

              return (_v$appExtensions = v.appExtensions) === null || _v$appExtensions === void 0 ? void 0 : _v$appExtensions.visualizations;
            }).filter(Boolean);
            extensionByType = extensions.reduce(function (acc, m) {
              return m.docTypes.reduce(function (_acc, type) {
                acc[type] = m;
                return acc;
              }, acc);
            }, {});

            searchOption = function searchOption(field) {
              for (var _len = arguments.length, defaults = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                defaults[_key - 1] = arguments[_key];
              }

              return (0, _lodash.default)(extensions).pluck(field).concat(defaults).compact().flatten().uniq().value();
            };

            searchOptions = {
              type: searchOption('docTypes', 'visualization'),
              searchFields: searchOption('searchFields', 'title^3', 'description'),
              search: search ? "".concat(search, "*") : undefined,
              perPage: size,
              page: 1,
              defaultSearchOperator: 'AND'
            };
            _context.next = 7;
            return savedObjectsClient.find(searchOptions);

          case 7:
            _ref2 = _context.sent;
            total = _ref2.total;
            savedObjects = _ref2.savedObjects;
            return _context.abrupt("return", {
              total: total,
              hits: savedObjects.map(function (savedObject) {
                var config = extensionByType[savedObject.type];

                if (config) {
                  return config.toListItem(savedObject);
                } else {
                  return mapSavedObjectApiHits(savedObject);
                }
              })
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _findListItems.apply(this, arguments);
}