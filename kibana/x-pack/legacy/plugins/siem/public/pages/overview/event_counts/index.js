"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventCounts = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _overview_host = require("../../../components/page/overview/overview_host");

var _overview_network = require("../../../components/page/overview/overview_network");

var _alerts_query_tab_body = require("../../hosts/navigation/alerts_query_tab_body");

var _kibana = require("../../../lib/kibana");

var _keury = require("../../../lib/keury");

var _alerts_query_tab_body2 = require("../../network/navigation/alerts_query_tab_body");

var _public = require("../../../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var HorizontalSpacer = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "HorizontalSpacer",
  componentId: "sc-13x0q08-0"
})(["width:24px;"]);
var NO_FILTERS = [];
var DEFAULT_QUERY = {
  query: '',
  language: 'kuery'
};

var EventCountsComponent = function EventCountsComponent(_ref) {
  var _ref$filters = _ref.filters,
      filters = _ref$filters === void 0 ? NO_FILTERS : _ref$filters,
      from = _ref.from,
      indexPattern = _ref.indexPattern,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? DEFAULT_QUERY : _ref$query,
      setQuery = _ref.setQuery,
      to = _ref.to;
  var kibana = (0, _kibana.useKibana)();
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_overview_host.OverviewHost, {
    endDate: to,
    filterQuery: (0, _keury.convertToBuildEsQuery)({
      config: _public.esQuery.getEsQueryConfig(kibana.services.uiSettings),
      indexPattern: indexPattern,
      queries: [query],
      filters: [].concat(_toConsumableArray(filters), _toConsumableArray(_alerts_query_tab_body.filterHostData))
    }),
    startDate: from,
    setQuery: setQuery
  })), _react.default.createElement(HorizontalSpacer, {
    grow: false
  }), _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_overview_network.OverviewNetwork, {
    endDate: to,
    filterQuery: (0, _keury.convertToBuildEsQuery)({
      config: _public.esQuery.getEsQueryConfig(kibana.services.uiSettings),
      indexPattern: indexPattern,
      queries: [query],
      filters: [].concat(_toConsumableArray(filters), _toConsumableArray(_alerts_query_tab_body2.filterNetworkData))
    }),
    startDate: from,
    setQuery: setQuery
  })));
};

var EventCounts = _react.default.memo(EventCountsComponent);

exports.EventCounts = EventCounts;