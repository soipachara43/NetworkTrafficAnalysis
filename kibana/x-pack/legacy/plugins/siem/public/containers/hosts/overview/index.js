"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostOverviewByNameQuery = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _reactApollo = require("react-apollo");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _constants = require("../../../../common/constants");

var _store = require("../../../store");

var _helpers = require("../../helpers");

var _query_template = require("../../query_template");

var _kibana = require("../../../lib/kibana");

var _host_overview = require("./host_overview.gql_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ID = 'hostOverviewQuery';

var HostOverviewByNameComponentQuery =
/*#__PURE__*/
function (_QueryTemplate) {
  _inherits(HostOverviewByNameComponentQuery, _QueryTemplate);

  function HostOverviewByNameComponentQuery() {
    _classCallCheck(this, HostOverviewByNameComponentQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(HostOverviewByNameComponentQuery).apply(this, arguments));
  }

  _createClass(HostOverviewByNameComponentQuery, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$id = _this$props.id,
          id = _this$props$id === void 0 ? ID : _this$props$id,
          isInspected = _this$props.isInspected,
          children = _this$props.children,
          hostName = _this$props.hostName,
          kibana = _this$props.kibana,
          skip = _this$props.skip,
          sourceId = _this$props.sourceId,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate;
      return _react.default.createElement(_reactApollo.Query, {
        query: _host_overview.HostOverviewQuery,
        fetchPolicy: (0, _helpers.getDefaultFetchPolicy)(),
        notifyOnNetworkStatusChange: true,
        skip: skip,
        variables: {
          sourceId: sourceId,
          hostName: hostName,
          timerange: {
            interval: '12h',
            from: startDate,
            to: endDate
          },
          defaultIndex: kibana.services.uiSettings.get(_constants.DEFAULT_INDEX_KEY),
          inspect: isInspected
        }
      }, function (_ref) {
        var data = _ref.data,
            loading = _ref.loading,
            refetch = _ref.refetch;
        var hostOverview = (0, _fp.getOr)([], 'source.HostOverview', data);
        return children({
          id: id,
          inspect: (0, _fp.getOr)(null, 'source.HostOverview.inspect', data),
          refetch: refetch,
          loading: loading,
          hostOverview: hostOverview,
          startDate: startDate,
          endDate: endDate
        });
      });
    }
  }]);

  return HostOverviewByNameComponentQuery;
}(_query_template.QueryTemplate);

var makeMapStateToProps = function makeMapStateToProps() {
  var getQuery = _store.inputsSelectors.globalQueryByIdSelector();

  var mapStateToProps = function mapStateToProps(state, _ref2) {
    var _ref2$id = _ref2.id,
        id = _ref2$id === void 0 ? ID : _ref2$id;

    var _getQuery = getQuery(state, id),
        isInspected = _getQuery.isInspected;

    return {
      isInspected: isInspected
    };
  };

  return mapStateToProps;
};

var HostOverviewByNameQuery = (0, _redux.compose)((0, _reactRedux.connect)(makeMapStateToProps), _kibana.withKibana)(HostOverviewByNameComponentQuery);
exports.HostOverviewByNameQuery = HostOverviewByNameQuery;