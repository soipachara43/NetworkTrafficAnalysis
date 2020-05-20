"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useQuery = void 0;

var _react = require("react");

var _constants = require("../../../common/constants");

var _toasters = require("../../components/toasters");

var _kibana = require("../../lib/kibana");

var _helpers = require("../helpers");

var _apollo_context = require("../../utils/apollo_context");

var _index = require("./index.gql_query");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useQuery = function useQuery(_ref) {
  var endDate = _ref.endDate,
      errorMessage = _ref.errorMessage,
      filterQuery = _ref.filterQuery,
      histogramType = _ref.histogramType,
      isInspected = _ref.isInspected,
      stackByField = _ref.stackByField,
      startDate = _ref.startDate;

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_INDEX_KEY),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      defaultIndex = _useUiSetting$2[0];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var refetch = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      data = _useState4[0],
      setData = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      inspect = _useState6[0],
      setInspect = _useState6[1];

  var _useState7 = (0, _react.useState)(-1),
      _useState8 = _slicedToArray(_useState7, 2),
      totalCount = _useState8[0],
      setTotalCount = _useState8[1];

  var apolloClient = (0, _apollo_context.useApolloClient)();
  (0, _react.useEffect)(function () {
    var matrixHistogramVariables = {
      filterQuery: (0, _helpers.createFilter)(filterQuery),
      sourceId: 'default',
      timerange: {
        interval: '12h',
        from: startDate,
        to: endDate
      },
      defaultIndex: defaultIndex,
      inspect: isInspected,
      stackByField: stackByField,
      histogramType: histogramType
    };
    var isSubscribed = true;
    var abortCtrl = new AbortController();
    var abortSignal = abortCtrl.signal;

    function fetchData() {
      return _fetchData.apply(this, arguments);
    }

    function _fetchData() {
      _fetchData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (apolloClient) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", null);

              case 2:
                setLoading(true);
                return _context.abrupt("return", apolloClient.query({
                  query: _index.MatrixHistogramGqlQuery,
                  fetchPolicy: 'network-only',
                  variables: matrixHistogramVariables,
                  context: {
                    fetchOptions: {
                      abortSignal: abortSignal
                    }
                  }
                }).then(function (result) {
                  if (isSubscribed) {
                    var _ref2, _result$data, _result$data$source, _ref3, _ref4, _ref5;

                    var source = (_ref2 = result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : (_result$data$source = _result$data.source) === null || _result$data$source === void 0 ? void 0 : _result$data$source.MatrixHistogram) !== null && _ref2 !== void 0 ? _ref2 : {};
                    setData((_ref3 = source === null || source === void 0 ? void 0 : source.matrixHistogramData) !== null && _ref3 !== void 0 ? _ref3 : []);
                    setTotalCount((_ref4 = source === null || source === void 0 ? void 0 : source.totalCount) !== null && _ref4 !== void 0 ? _ref4 : -1);
                    setInspect((_ref5 = source === null || source === void 0 ? void 0 : source.inspect) !== null && _ref5 !== void 0 ? _ref5 : null);
                    setLoading(false);
                  }
                }, function (error) {
                  if (isSubscribed) {
                    setData(null);
                    setTotalCount(-1);
                    setInspect(null);
                    setLoading(false);
                    (0, _toasters.errorToToaster)({
                      title: errorMessage,
                      error: error,
                      dispatchToaster: dispatchToaster
                    });
                  }
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _fetchData.apply(this, arguments);
    }

    refetch.current = fetchData;
    fetchData();
    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, [defaultIndex, errorMessage, filterQuery, histogramType, isInspected, stackByField, startDate, endDate, data]);
  return {
    data: data,
    loading: loading,
    inspect: inspect,
    totalCount: totalCount,
    refetch: refetch.current
  };
};

exports.useQuery = useQuery;