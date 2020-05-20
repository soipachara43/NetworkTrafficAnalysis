"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCache = clearCache;
exports.callApi = callApi;

var _lodash = require("lodash");

var _lruCache = _interopRequireDefault(require("lru-cache"));

var _objectHash = _interopRequireDefault(require("object-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function fetchOptionsWithDebug(fetchOptions) {
  var debugEnabled = sessionStorage.getItem('apm_debug') === 'true' && (0, _lodash.startsWith)(fetchOptions.pathname, '/api/apm');

  var body = fetchOptions.body,
      rest = _objectWithoutProperties(fetchOptions, ["body"]);

  return _objectSpread({}, rest, {}, body !== undefined ? {
    body: JSON.stringify(body)
  } : {}, {
    query: _objectSpread({}, fetchOptions.query, {}, debugEnabled ? {
      _debug: true
    } : {})
  });
}

var cache = new _lruCache.default({
  max: 100,
  maxAge: 1000 * 60 * 60
});

function clearCache() {
  cache.reset();
}

function callApi(_x, _x2) {
  return _callApi.apply(this, arguments);
} // only cache items that has a time range with `start` and `end` params,
// and where `end` is not a timestamp in the future


function _callApi() {
  _callApi = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(http, fetchOptions) {
    var cacheKey, cacheResponse, _fetchOptionsWithDebu, pathname, _fetchOptionsWithDebu2, method, options, lowercaseMethod, res;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cacheKey = getCacheKey(fetchOptions);
            cacheResponse = cache.get(cacheKey);

            if (!cacheResponse) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", cacheResponse);

          case 4:
            _fetchOptionsWithDebu = fetchOptionsWithDebug(fetchOptions), pathname = _fetchOptionsWithDebu.pathname, _fetchOptionsWithDebu2 = _fetchOptionsWithDebu.method, method = _fetchOptionsWithDebu2 === void 0 ? 'get' : _fetchOptionsWithDebu2, options = _objectWithoutProperties(_fetchOptionsWithDebu, ["pathname", "method"]);
            lowercaseMethod = method.toLowerCase();
            _context.next = 8;
            return http[lowercaseMethod](pathname, options);

          case 8:
            res = _context.sent;

            if (isCachable(fetchOptions)) {
              cache.set(cacheKey, res);
            }

            return _context.abrupt("return", res);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _callApi.apply(this, arguments);
}

function isCachable(fetchOptions) {
  if (fetchOptions.isCachable !== undefined) {
    return fetchOptions.isCachable;
  }

  if (!(fetchOptions.query && fetchOptions.query.start && fetchOptions.query.end)) {
    return false;
  }

  return (0, _lodash.isString)(fetchOptions.query.end) && new Date(fetchOptions.query.end).getTime() < Date.now();
} // order the options object to make sure that two objects with the same arguments, produce produce the
// same cache key regardless of the order of properties


function getCacheKey(options) {
  return (0, _objectHash.default)(options);
}