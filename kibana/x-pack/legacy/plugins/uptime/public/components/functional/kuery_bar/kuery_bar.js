"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KueryBarComponent = KueryBarComponent;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react2 = require("@kbn/i18n/react");

var _typeahead = require("./typeahead");

var _hooks = require("../../../hooks");

var _public = require("../../../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Container = _styledComponents.default.div.withConfig({
  displayName: "Container",
  componentId: "eaq0av-0"
})(["margin-bottom:10px;"]);

function convertKueryToEsQuery(kuery, indexPattern) {
  var ast = _public.esKuery.fromKueryExpression(kuery);

  return _public.esKuery.toElasticsearchQuery(ast, indexPattern);
}

function KueryBarComponent(_ref) {
  var ariaLabel = _ref['aria-label'],
      autocompleteService = _ref.autocomplete,
      dataTestSubj = _ref['data-test-subj'],
      loadIndexPattern = _ref.loadIndexPattern,
      indexPattern = _ref.indexPattern,
      loading = _ref.loading;
  (0, _react.useEffect)(function () {
    if (!indexPattern) {
      loadIndexPattern();
    }
  }, [indexPattern, loadIndexPattern]);

  var _useState = (0, _react.useState)({
    suggestions: [],
    isLoadingIndexPattern: true
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoadingSuggestions = _useState4[0],
      setIsLoadingSuggestions = _useState4[1];

  var currentRequestCheck;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 2),
      getUrlParams = _useUrlParams2[0],
      updateUrlParams = _useUrlParams2[1];

  var _getUrlParams = getUrlParams(),
      kuery = _getUrlParams.search;

  var indexPatternMissing = loading && !indexPattern;

  function onChange(_x, _x2) {
    return _onChange.apply(this, arguments);
  }

  function _onChange() {
    _onChange = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(inputValue, selectionStart) {
      var currentRequest, suggestions;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (indexPattern) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              setIsLoadingSuggestions(true);
              setState(_objectSpread({}, state, {
                suggestions: []
              }));
              currentRequest = (0, _lodash.uniqueId)();
              currentRequestCheck = currentRequest;
              _context.prev = 6;
              _context.next = 9;
              return autocompleteService.getQuerySuggestions({
                language: 'kuery',
                indexPatterns: [indexPattern],
                query: inputValue,
                selectionStart: selectionStart,
                selectionEnd: selectionStart
              });

            case 9:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 12;
                break;
              }

              _context.t0 = [];

            case 12:
              _context.t1 = function (suggestion) {
                return !(0, _lodash.startsWith)(suggestion.text, 'span.');
              };

              suggestions = _context.t0.filter(_context.t1).slice(0, 15);

              if (!(currentRequest !== currentRequestCheck)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return");

            case 16:
              setIsLoadingSuggestions(false);
              setState(_objectSpread({}, state, {
                suggestions: suggestions
              }));
              _context.next = 23;
              break;

            case 20:
              _context.prev = 20;
              _context.t2 = _context["catch"](6);
              // eslint-disable-next-line no-console
              console.error('Error while fetching suggestions', _context.t2);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 20]]);
    }));
    return _onChange.apply(this, arguments);
  }

  function onSubmit(inputValue) {
    if (indexPattern === null) {
      return;
    }

    try {
      var res = convertKueryToEsQuery(inputValue, indexPattern);

      if (!res) {
        return;
      }

      updateUrlParams({
        search: inputValue.trim()
      });
    } catch (e) {
      console.log('Invalid kuery syntax'); // eslint-disable-line no-console
    }
  }

  return _react.default.createElement(Container, null, _react.default.createElement(_typeahead.Typeahead, {
    "aria-label": ariaLabel,
    "data-test-subj": dataTestSubj,
    disabled: indexPatternMissing,
    isLoading: isLoadingSuggestions || loading,
    initialValue: kuery,
    onChange: onChange,
    onSubmit: onSubmit,
    suggestions: state.suggestions,
    queryExample: ""
  }), indexPatternMissing && _react.default.createElement(_eui.EuiCallOut, {
    style: {
      display: 'inline-block',
      marginTop: '10px'
    },
    title: _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.kueryBar.indexPatternMissingWarningMessage" // TODO: we need to determine the best instruction to provide if the index pattern is missing
      ,
      defaultMessage: "There was an error retrieving the index pattern."
    })),
    color: "warning",
    iconType: "alert",
    size: "s"
  }));
}