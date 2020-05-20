"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KueryBar = KueryBar;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n = require("@kbn/i18n");

var _url_helpers = require("../Links/url_helpers");

var _Typeahead = require("./Typeahead");

var _get_bool_filter = require("./get_bool_filter");

var _useLocation = require("../../../hooks/useLocation");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _history = require("../../../utils/history");

var _useApmPluginContext = require("../../../hooks/useApmPluginContext");

var _useDynamicIndexPattern = require("../../../hooks/useDynamicIndexPattern");

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
  componentId: "sc-8juast-0"
})(["margin-bottom:10px;"]);

function convertKueryToEsQuery(kuery, indexPattern) {
  var ast = _public.esKuery.fromKueryExpression(kuery);

  return _public.esKuery.toElasticsearchQuery(ast, indexPattern);
}

function KueryBar() {
  var _useState = (0, _react.useState)({
    suggestions: [],
    isLoadingSuggestions: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var location = (0, _useLocation.useLocation)();
  var data = (0, _useApmPluginContext.useApmPluginContext)().plugins.data;
  var currentRequestCheck;
  var processorEvent = urlParams.processorEvent;
  var examples = {
    transaction: 'transaction.duration.us > 300000',
    error: 'http.response.status_code >= 400',
    metric: 'process.pid = "1234"',
    defaults: 'transaction.duration.us > 300000 AND http.response.status_code >= 400'
  };
  var example = examples[processorEvent || 'defaults'];

  var _useDynamicIndexPatte = (0, _useDynamicIndexPattern.useDynamicIndexPattern)(processorEvent),
      indexPattern = _useDynamicIndexPatte.indexPattern;

  var placeholder = _i18n.i18n.translate('xpack.apm.kueryBar.placeholder', {
    defaultMessage: "Search {event, select,\n            transaction {transactions}\n            metric {metrics}\n            error {errors}\n            other {transactions, errors and metrics}\n          } (E.g. {queryExample})",
    values: {
      queryExample: example,
      event: processorEvent
    }
  }); // The bar should be disabled when viewing the service map


  var disabled = /\/service-map$/.test(location.pathname);

  var disabledPlaceholder = _i18n.i18n.translate('xpack.apm.kueryBar.disabledPlaceholder', {
    defaultMessage: 'Search is not available for service map'
  });

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
              if (!(indexPattern == null)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              setState(_objectSpread({}, state, {
                suggestions: [],
                isLoadingSuggestions: true
              }));
              currentRequest = (0, _lodash.uniqueId)();
              currentRequestCheck = currentRequest;
              _context.prev = 5;
              _context.next = 8;
              return data.autocomplete.getQuerySuggestions({
                language: 'kuery',
                indexPatterns: [indexPattern],
                boolFilter: (0, _get_bool_filter.getBoolFilter)(urlParams),
                query: inputValue,
                selectionStart: selectionStart,
                selectionEnd: selectionStart
              });

            case 8:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 11;
                break;
              }

              _context.t0 = [];

            case 11:
              _context.t1 = function (suggestion) {
                return !(0, _lodash.startsWith)(suggestion.text, 'span.');
              };

              suggestions = _context.t0.filter(_context.t1).slice(0, 15);

              if (!(currentRequest !== currentRequestCheck)) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return");

            case 15:
              setState(_objectSpread({}, state, {
                suggestions: suggestions,
                isLoadingSuggestions: false
              }));
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t2 = _context["catch"](5);
              // eslint-disable-next-line no-console
              console.error('Error while fetching suggestions', _context.t2);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 18]]);
    }));
    return _onChange.apply(this, arguments);
  }

  function onSubmit(inputValue) {
    if (indexPattern == null) {
      return;
    }

    try {
      var res = convertKueryToEsQuery(inputValue, indexPattern);

      if (!res) {
        return;
      }

      _history.history.push(_objectSpread({}, location, {
        search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(location.search), {
          kuery: encodeURIComponent(inputValue.trim())
        }))
      }));
    } catch (e) {
      console.log('Invalid kuery syntax'); // eslint-disable-line no-console
    }
  }

  return _react.default.createElement(Container, null, _react.default.createElement(_Typeahead.Typeahead, {
    disabled: disabled,
    isLoading: state.isLoadingSuggestions,
    initialValue: urlParams.kuery,
    onChange: onChange,
    onSubmit: onSubmit,
    suggestions: state.suggestions,
    placeholder: disabled ? disabledPlaceholder : placeholder
  }));
}