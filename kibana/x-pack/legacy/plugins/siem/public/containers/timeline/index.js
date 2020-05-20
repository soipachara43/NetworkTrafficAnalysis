"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineQuery = void 0;

var _fp = require("lodash/fp");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _react = _interopRequireDefault(require("react"));

var _reactApollo = require("react-apollo");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _constants = require("../../../common/constants");

var _store = require("../../store");

var _kibana = require("../../lib/kibana");

var _helpers = require("../helpers");

var _query_template = require("../query_template");

var _index = require("./index.gql_query");

var _timeline = require("../../store/timeline");

var _signals = require("../../pages/detection_engine/components/signals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimelineQueryComponent =
/*#__PURE__*/
function (_QueryTemplate) {
  _inherits(TimelineQueryComponent, _QueryTemplate);

  function TimelineQueryComponent(props) {
    var _this;

    _classCallCheck(this, TimelineQueryComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimelineQueryComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "updatedDate", Date.now());

    _defineProperty(_assertThisInitialized(_this), "memoizedTimelineEvents", void 0);

    _defineProperty(_assertThisInitialized(_this), "getUpdatedAt", function () {
      return _this.updatedDate;
    });

    _defineProperty(_assertThisInitialized(_this), "getTimelineEvents", function (variables, timelineEdges) {
      return timelineEdges.map(function (e) {
        return e.node;
      });
    });

    _this.memoizedTimelineEvents = (0, _memoizeOne.default)(_this.getTimelineEvents);
    return _this;
  }

  _createClass(TimelineQueryComponent, [{
    key: "render",
    value: function render() {
      var _ref,
          _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          clearSignalsState = _this$props.clearSignalsState,
          _this$props$eventType = _this$props.eventType,
          eventType = _this$props$eventType === void 0 ? 'raw' : _this$props$eventType,
          id = _this$props.id,
          indexPattern = _this$props.indexPattern,
          _this$props$indexToAd = _this$props.indexToAdd,
          indexToAdd = _this$props$indexToAd === void 0 ? [] : _this$props$indexToAd,
          isInspected = _this$props.isInspected,
          kibana = _this$props.kibana,
          limit = _this$props.limit,
          fields = _this$props.fields,
          filterQuery = _this$props.filterQuery,
          sourceId = _this$props.sourceId,
          sortField = _this$props.sortField;
      var defaultKibanaIndex = kibana.services.uiSettings.get(_constants.DEFAULT_INDEX_KEY);
      var defaultIndex = indexPattern == null || indexPattern != null && indexPattern.title === '' ? [].concat(_toConsumableArray(['all', 'raw'].includes(eventType) ? defaultKibanaIndex : []), _toConsumableArray(['all', 'signal'].includes(eventType) ? indexToAdd : [])) : (_ref = indexPattern === null || indexPattern === void 0 ? void 0 : indexPattern.title.split(',')) !== null && _ref !== void 0 ? _ref : [];
      var variables = {
        fieldRequested: fields,
        filterQuery: (0, _helpers.createFilter)(filterQuery),
        sourceId: sourceId,
        pagination: {
          limit: limit,
          cursor: null,
          tiebreaker: null
        },
        sortField: sortField,
        defaultIndex: defaultIndex,
        inspect: isInspected
      };
      return _react.default.createElement(_reactApollo.Query, {
        query: _index.timelineQuery,
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: variables
      }, function (_ref2) {
        var data = _ref2.data,
            loading = _ref2.loading,
            fetchMore = _ref2.fetchMore,
            refetch = _ref2.refetch;

        _this2.setRefetch(refetch);

        _this2.setExecuteBeforeRefetch(clearSignalsState);

        _this2.setExecuteBeforeFetchMore(clearSignalsState);

        var timelineEdges = (0, _fp.getOr)([], 'source.Timeline.edges', data);

        _this2.setFetchMore(fetchMore);

        _this2.setFetchMoreOptions(function (newCursor, tiebreaker) {
          return {
            variables: {
              pagination: {
                cursor: newCursor,
                tiebreaker: tiebreaker,
                limit: limit
              }
            },
            updateQuery: function updateQuery(prev, _ref3) {
              var fetchMoreResult = _ref3.fetchMoreResult;

              if (!fetchMoreResult) {
                return prev;
              }

              return _objectSpread({}, fetchMoreResult, {
                source: _objectSpread({}, fetchMoreResult.source, {
                  Timeline: _objectSpread({}, fetchMoreResult.source.Timeline, {
                    edges: (0, _fp.uniqBy)('node._id', [].concat(_toConsumableArray(prev.source.Timeline.edges), _toConsumableArray(fetchMoreResult.source.Timeline.edges)))
                  })
                })
              });
            }
          };
        });

        _this2.updatedDate = Date.now();
        return children({
          id: id,
          inspect: (0, _fp.getOr)(null, 'source.Timeline.inspect', data),
          refetch: _this2.wrappedRefetch,
          loading: loading,
          totalCount: (0, _fp.getOr)(0, 'source.Timeline.totalCount', data),
          pageInfo: (0, _fp.getOr)({}, 'source.Timeline.pageInfo', data),
          events: _this2.memoizedTimelineEvents(JSON.stringify(variables), timelineEdges),
          loadMore: _this2.wrappedLoadMore,
          getUpdatedAt: _this2.getUpdatedAt
        });
      });
    }
  }]);

  return TimelineQueryComponent;
}(_query_template.QueryTemplate);

var makeMapStateToProps = function makeMapStateToProps() {
  var getQuery = _store.inputsSelectors.timelineQueryByIdSelector();

  var mapStateToProps = function mapStateToProps(state, _ref4) {
    var id = _ref4.id;

    var _getQuery = getQuery(state, id),
        isInspected = _getQuery.isInspected;

    return {
      isInspected: isInspected
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    clearSignalsState: function clearSignalsState(_ref5) {
      var id = _ref5.id;

      if (id != null && id === _signals.SIGNALS_PAGE_TIMELINE_ID) {
        dispatch(_timeline.timelineActions.clearEventsLoading({
          id: id
        }));
        dispatch(_timeline.timelineActions.clearEventsDeleted({
          id: id
        }));
      }
    }
  };
};

var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var TimelineQuery = (0, _redux.compose)(connector, _kibana.withKibana)(TimelineQueryComponent);
exports.TimelineQuery = TimelineQuery;