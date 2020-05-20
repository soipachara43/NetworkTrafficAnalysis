"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TlsQuery = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _reactApollo = require("react-apollo");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _constants = require("../../../common/constants");

var _store = require("../../store");

var _kibana = require("../../lib/kibana");

var _helpers = require("../helpers");

var _helpers2 = require("../../components/paginated_table/helpers");

var _query_template_paginated = require("../query_template_paginated");

var _index = require("./index.gql_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ID = 'tlsQuery';

var TlsComponentQuery =
/*#__PURE__*/
function (_QueryTemplatePaginat) {
  _inherits(TlsComponentQuery, _QueryTemplatePaginat);

  function TlsComponentQuery() {
    _classCallCheck(this, TlsComponentQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(TlsComponentQuery).apply(this, arguments));
  }

  _createClass(TlsComponentQuery, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          activePage = _this$props.activePage,
          children = _this$props.children,
          endDate = _this$props.endDate,
          filterQuery = _this$props.filterQuery,
          flowTarget = _this$props.flowTarget,
          _this$props$id = _this$props.id,
          id = _this$props$id === void 0 ? ID : _this$props$id,
          ip = _this$props.ip,
          isInspected = _this$props.isInspected,
          kibana = _this$props.kibana,
          limit = _this$props.limit,
          skip = _this$props.skip,
          sourceId = _this$props.sourceId,
          startDate = _this$props.startDate,
          sort = _this$props.sort;
      var variables = {
        defaultIndex: kibana.services.uiSettings.get(_constants.DEFAULT_INDEX_KEY),
        filterQuery: (0, _helpers.createFilter)(filterQuery),
        flowTarget: flowTarget,
        inspect: isInspected,
        ip: ip,
        pagination: (0, _helpers2.generateTablePaginationOptions)(activePage, limit),
        sort: sort,
        sourceId: sourceId,
        timerange: {
          interval: '12h',
          from: startDate ? startDate : 0,
          to: endDate ? endDate : Date.now()
        }
      };
      return _react.default.createElement(_reactApollo.Query, {
        query: _index.tlsQuery,
        fetchPolicy: (0, _helpers.getDefaultFetchPolicy)(),
        notifyOnNetworkStatusChange: true,
        skip: skip,
        variables: variables
      }, function (_ref) {
        var data = _ref.data,
            loading = _ref.loading,
            fetchMore = _ref.fetchMore,
            networkStatus = _ref.networkStatus,
            refetch = _ref.refetch;
        var tls = (0, _fp.getOr)([], 'source.Tls.edges', data);

        _this.setFetchMore(fetchMore);

        _this.setFetchMoreOptions(function (newActivePage) {
          return {
            variables: {
              pagination: (0, _helpers2.generateTablePaginationOptions)(newActivePage, limit)
            },
            updateQuery: function updateQuery(prev, _ref2) {
              var fetchMoreResult = _ref2.fetchMoreResult;

              if (!fetchMoreResult) {
                return prev;
              }

              return _objectSpread({}, fetchMoreResult, {
                source: _objectSpread({}, fetchMoreResult.source, {
                  Tls: _objectSpread({}, fetchMoreResult.source.Tls, {
                    edges: _toConsumableArray(fetchMoreResult.source.Tls.edges)
                  })
                })
              });
            }
          };
        });

        var isLoading = _this.isItAValidLoading(loading, variables, networkStatus);

        return children({
          id: id,
          inspect: (0, _fp.getOr)(null, 'source.Tls.inspect', data),
          isInspected: isInspected,
          loading: isLoading,
          loadPage: _this.wrappedLoadMore,
          pageInfo: (0, _fp.getOr)({}, 'source.Tls.pageInfo', data),
          refetch: _this.memoizedRefetchQuery(variables, limit, refetch),
          tls: tls,
          totalCount: (0, _fp.getOr)(-1, 'source.Tls.totalCount', data)
        });
      });
    }
  }]);

  return TlsComponentQuery;
}(_query_template_paginated.QueryTemplatePaginated);

var makeMapStateToProps = function makeMapStateToProps() {
  var getTlsSelector = _store.networkSelectors.tlsSelector();

  var getQuery = _store.inputsSelectors.globalQueryByIdSelector();

  return function (state, _ref3) {
    var flowTarget = _ref3.flowTarget,
        _ref3$id = _ref3.id,
        id = _ref3$id === void 0 ? ID : _ref3$id,
        type = _ref3.type;

    var _getQuery = getQuery(state, id),
        isInspected = _getQuery.isInspected;

    return _objectSpread({}, getTlsSelector(state, type, flowTarget), {
      isInspected: isInspected
    });
  };
};

var TlsQuery = (0, _redux.compose)((0, _reactRedux.connect)(makeMapStateToProps), _kibana.withKibana)(TlsComponentQuery);
exports.TlsQuery = TlsQuery;