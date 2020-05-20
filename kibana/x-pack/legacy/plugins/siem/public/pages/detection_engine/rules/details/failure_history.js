"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FailureHistory = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _rules = require("../../../../containers/detection_engine/rules");

var _header_section = require("../../../../components/header_section");

var i18n = _interopRequireWildcard(require("./translations"));

var _formatted_date = require("../../../../components/formatted_date");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FailureHistoryComponent = function FailureHistoryComponent(_ref) {
  var id = _ref.id;

  var _useRuleStatus = (0, _rules.useRuleStatus)(id),
      _useRuleStatus2 = _slicedToArray(_useRuleStatus, 2),
      loading = _useRuleStatus2[0],
      ruleStatus = _useRuleStatus2[1];

  if (loading) {
    return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_header_section.HeaderSection, {
      title: i18n.LAST_FIVE_ERRORS
    }), _react.default.createElement(_eui.EuiLoadingContent, null));
  }

  var columns = [{
    name: i18n.COLUMN_STATUS_TYPE,
    render: function render() {
      return _react.default.createElement(_eui.EuiHealth, {
        color: "danger"
      }, i18n.TYPE_FAILED);
    },
    truncateText: false,
    width: '16%'
  }, {
    field: 'last_failure_at',
    name: i18n.COLUMN_FAILED_AT,
    render: function render(value) {
      return _react.default.createElement(_formatted_date.FormattedDate, {
        value: value,
        fieldName: "last_failure_at"
      });
    },
    sortable: false,
    truncateText: false,
    width: '24%'
  }, {
    field: 'last_failure_message',
    name: i18n.COLUMN_FAILED_MSG,
    render: function render(value) {
      return _react.default.createElement(_react.default.Fragment, null, value);
    },
    sortable: false,
    truncateText: false,
    width: '60%'
  }];
  return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_header_section.HeaderSection, {
    title: i18n.LAST_FIVE_ERRORS
  }), _react.default.createElement(_eui.EuiBasicTable, {
    columns: columns,
    loading: loading,
    items: ruleStatus != null ? ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.failures.filter(function (rs) {
      return rs.last_failure_at != null;
    }) : [],
    sorting: {
      sort: {
        field: 'status_date',
        direction: 'desc'
      }
    }
  }));
};

var FailureHistory = (0, _react.memo)(FailureHistoryComponent);
exports.FailureHistory = FailureHistory;