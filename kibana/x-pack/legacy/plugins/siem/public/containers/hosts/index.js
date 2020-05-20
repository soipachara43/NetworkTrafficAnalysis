"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostsQuery = void 0;

var _fp = require("lodash/fp");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _react = _interopRequireDefault(require("react"));

var _reactApollo = require("react-apollo");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _constants = require("../../../common/constants");

var _store = require("../../store");

var _helpers = require("../helpers");

var _query_template_paginated = require("../query_template_paginated");

var _kibana = require("../../lib/kibana");

var _hosts_table = require("./hosts_table.gql_query");

var _helpers2 = require("../../components/paginated_table/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ID = 'hostsQuery';

var HostsComponentQuery =
/*#__PURE__*/
function (_QueryTemplatePaginat) {
  _inherits(HostsComponentQuery, _QueryTemplatePaginat);

  function HostsComponentQuery(props) {
    var _this;

    _classCallCheck(this, HostsComponentQuery);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HostsComponentQuery).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "memoizedHosts", void 0);

    _defineProperty(_assertThisInitialized(_this), "getHosts", function (variables, source) {
      return (0, _fp.getOr)([], 'Hosts.edges', source);
    });

    _this.memoizedHosts = (0, _memoizeOne.default)(_this.getHosts);
    return _this;
  }

  _createClass(HostsComponentQuery, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          activePage = _this$props.activePage,
          _this$props$id = _this$props.id,
          id = _this$props$id === void 0 ? ID : _this$props$id,
          isInspected = _this$props.isInspected,
          children = _this$props.children,
          direction = _this$props.direction,
          filterQuery = _this$props.filterQuery,
          endDate = _this$props.endDate,
          kibana = _this$props.kibana,
          limit = _this$props.limit,
          startDate = _this$props.startDate,
          skip = _this$props.skip,
          sourceId = _this$props.sourceId,
          sortField = _this$props.sortField;
      var defaultIndex = kibana.services.uiSettings.get(_constants.DEFAULT_INDEX_KEY);
      var variables = {
        sourceId: sourceId,
        timerange: {
          interval: '12h',
          from: startDate,
          to: endDate
        },
        sort: {
          direction: direction,
          field: sortField
        },
        pagination: (0, _helpers2.generateTablePaginationOptions)(activePage, limit),
        filterQuery: (0, _helpers.createFilter)(filterQuery),
        defaultIndex: defaultIndex,
        inspect: isInspected
      };
      return _react.default.createElement(_reactApollo.Query, {
        query: _hosts_table.HostsTableQuery,
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

        _this2.setFetchMore(fetchMore);

        _this2.setFetchMoreOptions(function (newActivePage) {
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
                  Hosts: _objectSpread({}, fetchMoreResult.source.Hosts, {
                    edges: _toConsumableArray(fetchMoreResult.source.Hosts.edges)
                  })
                })
              });
            }
          };
        });

        var isLoading = _this2.isItAValidLoading(loading, variables, networkStatus);

        return children({
          endDate: endDate,
          hosts: _this2.memoizedHosts(JSON.stringify(variables), (0, _fp.get)('source', data)),
          id: id,
          inspect: (0, _fp.getOr)(null, 'source.Hosts.inspect', data),
          isInspected: isInspected,
          loading: isLoading,
          loadPage: _this2.wrappedLoadMore,
          pageInfo: (0, _fp.getOr)({}, 'source.Hosts.pageInfo', data),
          refetch: _this2.memoizedRefetchQuery(variables, limit, refetch),
          startDate: startDate,
          totalCount: (0, _fp.getOr)(-1, 'source.Hosts.totalCount', data)
        });
      });
    }
  }]);

  return HostsComponentQuery;
}(_query_template_paginated.QueryTemplatePaginated);

var makeMapStateToProps = function makeMapStateToProps() {
  var getHostsSelector = _store.hostsSelectors.hostsSelector();

  var getQuery = _store.inputsSelectors.globalQueryByIdSelector();

  var mapStateToProps = function mapStateToProps(state, _ref3) {
    var type = _ref3.type,
        _ref3$id = _ref3.id,
        id = _ref3$id === void 0 ? ID : _ref3$id;

    var _getQuery = getQuery(state, id),
        isInspected = _getQuery.isInspected;

    return _objectSpread({}, getHostsSelector(state, type), {
      isInspected: isInspected
    });
  };

  return mapStateToProps;
};

var HostsQuery = (0, _redux.compose)((0, _reactRedux.connect)(makeMapStateToProps), _kibana.withKibana)(HostsComponentQuery);
exports.HostsQuery = HostsQuery;