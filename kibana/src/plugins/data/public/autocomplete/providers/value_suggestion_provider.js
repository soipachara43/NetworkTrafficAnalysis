"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupValueSuggestionProvider = void 0;

var _lodash = require("lodash");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function resolver(title, field, query, boolFilter) {
  // Only cache results for a minute
  var ttl = Math.floor(Date.now() / 1000 / 60);
  return [ttl, query, title, field.name, JSON.stringify(boolFilter)].join('|');
}

var setupValueSuggestionProvider = function setupValueSuggestionProvider(core) {
  var requestSuggestions = (0, _lodash.memoize)(function (index, field, query) {
    var boolFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var signal = arguments.length > 4 ? arguments[4] : undefined;
    return core.http.fetch("/api/kibana/suggestions/values/".concat(index), {
      method: 'POST',
      body: JSON.stringify({
        query: query,
        field: field.name,
        boolFilter: boolFilter
      }),
      signal: signal
    });
  }, resolver);
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref2) {
        var indexPattern, field, query, boolFilter, signal, shouldSuggestValues, title;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                indexPattern = _ref2.indexPattern, field = _ref2.field, query = _ref2.query, boolFilter = _ref2.boolFilter, signal = _ref2.signal;
                shouldSuggestValues = core.uiSettings.get('filterEditor:suggestValues');
                title = indexPattern.title;

                if (!(field.type === 'boolean')) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", [true, false]);

              case 7:
                if (!(!shouldSuggestValues || !field.aggregatable || field.type !== 'string')) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", []);

              case 9:
                _context.next = 11;
                return requestSuggestions(title, field, query, boolFilter, signal);

              case 11:
                return _context.abrupt("return", _context.sent);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports.setupValueSuggestionProvider = setupValueSuggestionProvider;