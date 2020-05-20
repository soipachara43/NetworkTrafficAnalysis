"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewNetwork = void 0;

var _fp = require("lodash/fp");

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _constants = require("../../../../../common/constants");

var _header_section = require("../../../header_section");

var _kibana = require("../../../../lib/kibana");

var _manage_query = require("../../../page/manage_query");

var _overview_network = require("../../../../containers/overview/overview_network");

var _overview_network_stats = require("../overview_network_stats");

var _link_to = require("../../../link_to");

var _inspect = require("../../../inspect");

var _use_get_url_search = require("../../../navigation/use_get_url_search");

var _home_navigations = require("../../../../pages/home/home_navigations");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var OverviewNetworkStatsManage = (0, _manage_query.manageQuery)(_overview_network_stats.OverviewNetworkStats);

var OverviewNetworkComponent = function OverviewNetworkComponent(_ref) {
  var endDate = _ref.endDate,
      filterQuery = _ref.filterQuery,
      startDate = _ref.startDate,
      setQuery = _ref.setQuery;

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_NUMBER_FORMAT),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      defaultNumberFormat = _useUiSetting$2[0];

  var urlSearch = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.network);
  var networkPageButton = (0, _react2.useMemo)(function () {
    return _react2.default.createElement(_eui.EuiButton, {
      href: (0, _link_to.getNetworkUrl)(urlSearch)
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.networkAction",
      defaultMessage: "View network"
    }));
  }, [urlSearch]);
  return _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_inspect.InspectButtonContainer, null, _react2.default.createElement(_eui.EuiPanel, null, _react2.default.createElement(_overview_network.OverviewNetworkQuery, {
    "data-test-subj": "overview-network-query",
    endDate: endDate,
    filterQuery: filterQuery,
    sourceId: "default",
    startDate: startDate
  }, function (_ref2) {
    var overviewNetwork = _ref2.overviewNetwork,
        loading = _ref2.loading,
        id = _ref2.id,
        inspect = _ref2.inspect,
        refetch = _ref2.refetch;
    var networkEventsCount = (0, _overview_network_stats.getOverviewNetworkStats)(overviewNetwork).reduce(function (total, stat) {
      return total + stat.count;
    }, 0);
    var formattedNetworkEventsCount = (0, _numeral.default)(networkEventsCount).format(defaultNumberFormat);
    return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_header_section.HeaderSection, {
      id: _overview_network.ID,
      subtitle: !(0, _fp.isEmpty)(overviewNetwork) ? _react2.default.createElement(_react.FormattedMessage, {
        defaultMessage: "Showing: {formattedNetworkEventsCount} {networkEventsCount, plural, one {event} other {events}}",
        id: "xpack.siem.overview.overviewNetwork.networkSubtitle",
        values: {
          formattedNetworkEventsCount: formattedNetworkEventsCount,
          networkEventsCount: networkEventsCount
        }
      }) : _react2.default.createElement(_react2.default.Fragment, null, ''),
      title: _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.siem.overview.networkTitle",
        defaultMessage: "Network events"
      })
    }, networkPageButton), _react2.default.createElement(OverviewNetworkStatsManage, {
      loading: loading,
      data: overviewNetwork,
      id: id,
      inspect: inspect,
      setQuery: setQuery,
      refetch: refetch
    }));
  }))));
};

OverviewNetworkComponent.displayName = 'OverviewNetworkComponent';

var OverviewNetwork = _react2.default.memo(OverviewNetworkComponent);

exports.OverviewNetwork = OverviewNetwork;