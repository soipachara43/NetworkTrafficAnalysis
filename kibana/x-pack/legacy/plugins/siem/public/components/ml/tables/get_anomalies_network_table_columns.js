"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnomaliesNetworkTableColumnsCurated = exports.getAnomaliesNetworkTableColumns = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _helpers = require("../../tables/helpers");

var _entity_draggable = require("../entity_draggable");

var _create_compound_key = require("./create_compound_key");

var _links = require("../../links");

var i18n = _interopRequireWildcard(require("./translations"));

var _get_entries = require("../get_entries");

var _draggable_score = require("../score/draggable_score");

var _create_explorer_link = require("../links/create_explorer_link");

var _formatted_date = require("../../formatted_date");

var _model = require("../../../store/network/model");

var _helpers2 = require("../../drag_and_drop/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getAnomaliesNetworkTableColumns = function getAnomaliesNetworkTableColumns(startDate, endDate, flowTarget) {
  return [{
    name: i18n.NETWORK_NAME,
    field: 'ip',
    sortable: true,
    render: function render(ip, anomaliesByNetwork) {
      return (0, _helpers.getRowItemDraggable)({
        rowItem: ip,
        attrName: anomaliesByNetwork.type,
        idPrefix: "anomalies-network-table-ip-".concat((0, _create_compound_key.createCompoundNetworkKey)(anomaliesByNetwork)),
        render: function render(item) {
          return _react.default.createElement(_links.IPDetailsLink, {
            ip: item,
            flowTarget: flowTarget
          });
        }
      });
    }
  }, {
    name: i18n.DETECTOR,
    field: 'anomaly.jobId',
    sortable: true,
    render: function render(jobId, anomaliesByHost) {
      return _react.default.createElement(_eui.EuiLink, {
        href: "".concat((0, _create_explorer_link.createExplorerLink)(anomaliesByHost.anomaly, startDate, endDate)),
        target: "_blank"
      }, jobId);
    }
  }, {
    name: i18n.SCORE,
    field: 'anomaly.severity',
    sortable: true,
    render: function render(_, anomaliesByNetwork) {
      return _react.default.createElement(_draggable_score.DraggableScore, {
        id: (0, _helpers2.escapeDataProviderId)("anomalies-network-table-severity-".concat((0, _create_compound_key.createCompoundNetworkKey)(anomaliesByNetwork))),
        score: anomaliesByNetwork.anomaly
      });
    }
  }, {
    name: i18n.ENTITY,
    field: 'anomaly.entityValue',
    sortable: true,
    render: function render(entityValue, anomaliesByNetwork) {
      return _react.default.createElement(_entity_draggable.EntityDraggable, {
        idPrefix: "anomalies-network-table-entityValue-".concat((0, _create_compound_key.createCompoundNetworkKey)(anomaliesByNetwork)),
        entityName: anomaliesByNetwork.anomaly.entityName,
        entityValue: entityValue
      });
    }
  }, {
    name: i18n.INFLUENCED_BY,
    field: 'anomaly.influencers',
    render: function render(influencers, anomaliesByNetwork) {
      return _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "column",
        gutterSize: "none",
        responsive: false
      }, influencers && influencers.map(function (influencer) {
        var _getEntries = (0, _get_entries.getEntries)(influencer),
            _getEntries2 = _slicedToArray(_getEntries, 2),
            key = _getEntries2[0],
            value = _getEntries2[1];

        var entityName = key != null ? key : '';
        var entityValue = value != null ? value : '';
        return _react.default.createElement(_eui.EuiFlexItem, {
          key: "".concat(entityName, "-").concat(entityValue, "-").concat((0, _create_compound_key.createCompoundNetworkKey)(anomaliesByNetwork)),
          grow: false
        }, _react.default.createElement(_entity_draggable.EntityDraggable, {
          idPrefix: "anomalies-network-table-influencers-".concat(entityName, "-").concat(entityValue, "-").concat((0, _create_compound_key.createCompoundNetworkKey)(anomaliesByNetwork)),
          entityName: entityName,
          entityValue: entityValue
        }));
      }));
    }
  }, {
    name: i18n.TIME_STAMP,
    field: 'anomaly.time',
    sortable: true,
    render: function render(time) {
      return _react.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
        value: time
      });
    }
  }];
};

exports.getAnomaliesNetworkTableColumns = getAnomaliesNetworkTableColumns;

var getAnomaliesNetworkTableColumnsCurated = function getAnomaliesNetworkTableColumnsCurated(pageType, startDate, endDate, flowTarget) {
  var columns = getAnomaliesNetworkTableColumns(startDate, endDate, flowTarget); // Columns to exclude from ip details pages

  if (pageType === _model.NetworkType.details) {
    return columns.filter(function (column) {
      return column.name !== i18n.NETWORK_NAME;
    });
  } else {
    return columns;
  }
};

exports.getAnomaliesNetworkTableColumnsCurated = getAnomaliesNetworkTableColumnsCurated;