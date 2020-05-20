"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "sourceQuery", {
  enumerable: true,
  get: function get() {
    return _index.sourceQuery;
  }
});
exports.useWithSource = exports.indicesExistOrDataTemporarilyUnavailable = exports.WithSource = exports.getBrowserFields = exports.getIndexFields = exports.getAllFieldsByName = exports.getAllBrowserFields = void 0;

var _lodash = require("lodash");

var _fp = require("lodash/fp");

var _reactApollo = require("react-apollo");

var _react = _interopRequireWildcard(require("react"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _kibana = require("../../lib/kibana");

var _constants = require("../../../common/constants");

var _index = require("./index.gql_query");

var _apollo_context = require("../../utils/apollo_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getAllBrowserFields = function getAllBrowserFields(browserFields) {
  return Object.values(browserFields).reduce(function (acc, namespace) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(Object.values(namespace.fields != null ? namespace.fields : {})));
  }, []);
};

exports.getAllBrowserFields = getAllBrowserFields;

var getAllFieldsByName = function getAllFieldsByName(browserFields) {
  return (0, _fp.keyBy)('name', getAllBrowserFields(browserFields));
};

exports.getAllFieldsByName = getAllFieldsByName;
var getIndexFields = (0, _memoizeOne.default)(function (title, fields) {
  return fields && fields.length > 0 ? {
    fields: fields.map(function (field) {
      return (0, _fp.pick)(['name', 'searchable', 'type', 'aggregatable'], field);
    }),
    title: title
  } : {
    fields: [],
    title: title
  };
});
exports.getIndexFields = getIndexFields;
var getBrowserFields = (0, _memoizeOne.default)(function (title, fields) {
  return fields && fields.length > 0 ? fields.reduce(function (accumulator, field) {
    return (0, _fp.set)([field.category, 'fields', field.name], field, accumulator);
  }, {}) : {};
});
exports.getBrowserFields = getBrowserFields;

var WithSource = _react.default.memo(function (_ref) {
  var children = _ref.children,
      indexToAdd = _ref.indexToAdd,
      sourceId = _ref.sourceId;

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_INDEX_KEY),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      configIndex = _useUiSetting$2[0];

  var defaultIndex = (0, _react.useMemo)(function () {
    if (indexToAdd != null && !(0, _fp.isEmpty)(indexToAdd)) {
      return [].concat(_toConsumableArray(configIndex), _toConsumableArray(indexToAdd));
    }

    return configIndex;
  }, [configIndex, indexToAdd]);
  return _react.default.createElement(_reactApollo.Query, {
    query: _index.sourceQuery,
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    variables: {
      sourceId: sourceId,
      defaultIndex: defaultIndex
    }
  }, function (_ref2) {
    var data = _ref2.data;
    return children({
      indicesExist: (0, _fp.get)('source.status.indicesExist', data),
      browserFields: getBrowserFields(defaultIndex.join(), (0, _fp.get)('source.status.indexFields', data)),
      indexPattern: getIndexFields(defaultIndex.join(), (0, _fp.get)('source.status.indexFields', data))
    });
  });
});

exports.WithSource = WithSource;
WithSource.displayName = 'WithSource';

var indicesExistOrDataTemporarilyUnavailable = function indicesExistOrDataTemporarilyUnavailable(indicesExist) {
  return indicesExist || (0, _lodash.isUndefined)(indicesExist);
};

exports.indicesExistOrDataTemporarilyUnavailable = indicesExistOrDataTemporarilyUnavailable;

var useWithSource = function useWithSource(sourceId, indices) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      updateLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      indicesExist = _useState4[0],
      setIndicesExist = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      browserFields = _useState6[0],
      setBrowserFields = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      indexPattern = _useState8[0],
      setIndexPattern = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      errorMessage = _useState10[0],
      updateErrorMessage = _useState10[1];

  var apolloClient = (0, _apollo_context.useApolloClient)();

  function fetchSource(_x) {
    return _fetchSource.apply(this, arguments);
  }

  function _fetchSource() {
    _fetchSource = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(signal) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              updateLoading(true);

              if (apolloClient) {
                apolloClient.query({
                  query: _index.sourceQuery,
                  fetchPolicy: 'cache-first',
                  variables: {
                    sourceId: sourceId,
                    defaultIndex: indices
                  },
                  context: {
                    fetchOptions: {
                      signal: signal
                    }
                  }
                }).then(function (result) {
                  updateLoading(false);
                  updateErrorMessage(null);
                  setIndicesExist((0, _fp.get)('data.source.status.indicesExist', result));
                  setBrowserFields(getBrowserFields(indices.join(), (0, _fp.get)('data.source.status.indexFields', result)));
                  setIndexPattern(getIndexFields(indices.join(), (0, _fp.get)('data.source.status.indexFields', result)));
                }, function (error) {
                  updateLoading(false);
                  updateErrorMessage(error.message);
                });
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _fetchSource.apply(this, arguments);
  }

  (0, _react.useEffect)(function () {
    var abortCtrl = new AbortController();
    var signal = abortCtrl.signal;
    fetchSource(signal);
    return function () {
      return abortCtrl.abort();
    };
  }, [apolloClient, sourceId, indices]);
  return {
    indicesExist: indicesExist,
    browserFields: browserFields,
    indexPattern: indexPattern,
    loading: loading,
    errorMessage: errorMessage
  };
};

exports.useWithSource = useWithSource;