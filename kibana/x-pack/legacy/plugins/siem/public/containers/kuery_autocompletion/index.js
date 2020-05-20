"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KueryAutocompletion = void 0;

var _react = _interopRequireWildcard(require("react"));

var _kibana = require("../../lib/kibana");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var KueryAutocompletion = _react.default.memo(function (_ref) {
  var children = _ref.children,
      indexPattern = _ref.indexPattern;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentRequest = _useState2[0],
      setCurrentRequest = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      suggestions = _useState4[0],
      setSuggestions = _useState4[1];

  var kibana = (0, _kibana.useKibana)();

  var loadSuggestions =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(expression, cursorPosition, maxSuggestions) {
      var language, futureRequest, newSuggestions;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              language = 'kuery';

              if (kibana.services.data.autocomplete.hasQuerySuggestions(language)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              futureRequest = {
                expression: expression,
                cursorPosition: cursorPosition
              };
              setCurrentRequest({
                expression: expression,
                cursorPosition: cursorPosition
              });
              setSuggestions([]);

              if (!(futureRequest && futureRequest.expression !== (currentRequest && currentRequest.expression) && futureRequest.cursorPosition !== (currentRequest && currentRequest.cursorPosition))) {
                _context.next = 15;
                break;
              }

              _context.next = 9;
              return kibana.services.data.autocomplete.getQuerySuggestions({
                language: 'kuery',
                indexPatterns: [indexPattern],
                boolFilter: [],
                query: expression,
                selectionStart: cursorPosition,
                selectionEnd: cursorPosition
              });

            case 9:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 12;
                break;
              }

              _context.t0 = [];

            case 12:
              newSuggestions = _context.t0;
              setCurrentRequest(null);
              setSuggestions(maxSuggestions ? newSuggestions.slice(0, maxSuggestions) : newSuggestions);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function loadSuggestions(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  return children({
    isLoadingSuggestions: currentRequest !== null,
    loadSuggestions: loadSuggestions,
    suggestions: suggestions
  });
});

exports.KueryAutocompletion = KueryAutocompletion;
KueryAutocompletion.displayName = 'KueryAutocompletion';