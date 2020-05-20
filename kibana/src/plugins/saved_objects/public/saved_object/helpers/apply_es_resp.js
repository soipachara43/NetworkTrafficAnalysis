"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyESResp = applyESResp;

var _lodash = _interopRequireDefault(require("lodash"));

var _parse_search_source = require("./parse_search_source");

var _public = require("../../../../kibana_utils/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * A given response of and ElasticSearch containing a plain saved object is applied to the given
 * savedObject
 */
function applyESResp(_x, _x2, _x3) {
  return _applyESResp.apply(this, arguments);
}

function _applyESResp() {
  _applyESResp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(resp, savedObject, config) {
    var mapping, esType, injectReferences, hydrateIndexPattern, meta;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mapping = (0, _public.expandShorthand)(config.mapping);
            esType = config.type || '';
            savedObject._source = _lodash.default.cloneDeep(resp._source);
            injectReferences = config.injectReferences;
            hydrateIndexPattern = savedObject.hydrateIndexPattern;

            if (!(typeof resp.found === 'boolean' && !resp.found)) {
              _context.next = 7;
              break;
            }

            throw new _public.SavedObjectNotFound(esType, savedObject.id || '');

          case 7:
            meta = resp._source.kibanaSavedObjectMeta || {};
            delete resp._source.kibanaSavedObjectMeta;

            if (!config.indexPattern && savedObject._source.indexPattern) {
              config.indexPattern = savedObject._source.indexPattern;
              delete savedObject._source.indexPattern;
            } // assign the defaults to the response


            _lodash.default.defaults(savedObject._source, savedObject.defaults); // transform the source using _deserializers


            _lodash.default.forOwn(mapping, function (fieldMapping, fieldName) {
              if (fieldMapping._deserialize && typeof fieldName === 'string') {
                savedObject._source[fieldName] = fieldMapping._deserialize(savedObject._source[fieldName]);
              }
            }); // Give obj all of the values in _source.fields


            _lodash.default.assign(savedObject, savedObject._source);

            savedObject.lastSavedTitle = savedObject.title;
            _context.next = 16;
            return (0, _parse_search_source.parseSearchSource)(savedObject, esType, meta.searchSourceJSON, resp.references);

          case 16:
            _context.next = 18;
            return hydrateIndexPattern();

          case 18:
            if (injectReferences && resp.references && resp.references.length > 0) {
              injectReferences(savedObject, resp.references);
            }

            if (!(typeof config.afterESResp === 'function')) {
              _context.next = 23;
              break;
            }

            _context.next = 22;
            return config.afterESResp(savedObject);

          case 22:
            savedObject = _context.sent;

          case 23:
            return _context.abrupt("return", savedObject);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _applyESResp.apply(this, arguments);
}