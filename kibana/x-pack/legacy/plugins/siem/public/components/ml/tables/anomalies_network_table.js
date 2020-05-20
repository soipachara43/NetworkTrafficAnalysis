"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomaliesNetworkTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _use_anomalies_table_data = require("../anomaly/use_anomalies_table_data");

var _header_section = require("../../header_section");

var i18n = _interopRequireWildcard(require("./translations"));

var _convert_anomalies_to_network = require("./convert_anomalies_to_network");

var _loader = require("../../loader");

var _get_anomalies_network_table_columns = require("./get_anomalies_network_table_columns");

var _use_ml_capabilities = require("../../ml_popover/hooks/use_ml_capabilities");

var _has_ml_user_permissions = require("../permissions/has_ml_user_permissions");

var _basic_table = require("./basic_table");

var _network_equality = require("./network_equality");

var _get_criteria_from_network_type = require("../criteria/get_criteria_from_network_type");

var _panel = require("../../panel");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sorting = {
  sort: {
    field: 'anomaly.severity',
    direction: 'desc'
  }
};

var AnomaliesNetworkTableComponent = function AnomaliesNetworkTableComponent(_ref) {
  var startDate = _ref.startDate,
      endDate = _ref.endDate,
      skip = _ref.skip,
      ip = _ref.ip,
      type = _ref.type,
      flowTarget = _ref.flowTarget;
  var capabilities = (0, _use_ml_capabilities.useMlCapabilities)();

  var _useAnomaliesTableDat = (0, _use_anomalies_table_data.useAnomaliesTableData)({
    startDate: startDate,
    endDate: endDate,
    skip: skip,
    criteriaFields: (0, _get_criteria_from_network_type.getCriteriaFromNetworkType)(type, ip, flowTarget)
  }),
      _useAnomaliesTableDat2 = _slicedToArray(_useAnomaliesTableDat, 2),
      loading = _useAnomaliesTableDat2[0],
      tableData = _useAnomaliesTableDat2[1];

  var networks = (0, _convert_anomalies_to_network.convertAnomaliesToNetwork)(tableData, ip);
  var columns = (0, _get_anomalies_network_table_columns.getAnomaliesNetworkTableColumnsCurated)(type, startDate, endDate, flowTarget);
  var pagination = {
    initialPageIndex: 0,
    initialPageSize: 10,
    totalItemCount: networks.length,
    pageSizeOptions: [5, 10, 20, 50],
    hidePerPageOptions: false
  };

  if (!(0, _has_ml_user_permissions.hasMlUserPermissions)(capabilities)) {
    return null;
  } else {
    return _react.default.createElement(_panel.Panel, {
      loading: loading
    }, _react.default.createElement(_header_section.HeaderSection, {
      subtitle: "".concat(i18n.SHOWING, ": ").concat(pagination.totalItemCount.toLocaleString(), " ").concat(i18n.UNIT(pagination.totalItemCount)),
      title: i18n.ANOMALIES,
      tooltip: i18n.TOOLTIP
    }), _react.default.createElement(_basic_table.BasicTable // @ts-ignore the Columns<T, U> type is not as specific as EUI's...
    , {
      columns: columns,
      compressed: true // @ts-ignore ...which leads to `networks` not "matching" the columns
      ,
      items: networks,
      pagination: pagination,
      sorting: sorting
    }), loading && _react.default.createElement(_loader.Loader, {
      "data-test-subj": "anomalies-network-table-loading-panel",
      overlay: true,
      size: "xl"
    }));
  }
};

var AnomaliesNetworkTable = _react.default.memo(AnomaliesNetworkTableComponent, _network_equality.networkEquality);

exports.AnomaliesNetworkTable = AnomaliesNetworkTable;