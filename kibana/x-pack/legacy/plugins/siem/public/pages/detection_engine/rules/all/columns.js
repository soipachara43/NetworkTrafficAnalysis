"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonitoringColumns = exports.getColumns = exports.getActions = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _empty_value = require("../../../../components/empty_value");

var _formatted_date = require("../../../../components/formatted_date");

var _redirect_to_detection_engine = require("../../../../components/link_to/redirect_to_detection_engine");

var _truncatable_text = require("../../../../components/truncatable_text");

var _helpers = require("../components/rule_status/helpers");

var _rule_switch = require("../components/rule_switch");

var _severity_badge = require("../components/severity_badge");

var i18n = _interopRequireWildcard(require("../translations"));

var _actions = require("./actions");

var _localized_date_tooltip = require("../../../../components/localized_date_tooltip");

var detectionI18n = _interopRequireWildcard(require("../../translations"));

var _ml_helpers = require("../../../../../common/detection_engine/ml_helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getActions = function getActions(dispatch, dispatchToaster, history, reFetchRules) {
  return [{
    description: i18n.EDIT_RULE_SETTINGS,
    type: 'icon',
    icon: 'controlsHorizontal',
    name: i18n.EDIT_RULE_SETTINGS,
    onClick: function onClick(rowItem) {
      return (0, _actions.editRuleAction)(rowItem, history);
    }
  }, {
    description: i18n.DUPLICATE_RULE,
    type: 'icon',
    icon: 'copy',
    name: i18n.DUPLICATE_RULE,
    onClick: function () {
      var _onClick = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(rowItem) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _actions.duplicateRulesAction)([rowItem], [rowItem.id], dispatch, dispatchToaster);

              case 2:
                _context.next = 4;
                return reFetchRules(true);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onClick(_x) {
        return _onClick.apply(this, arguments);
      }

      return onClick;
    }()
  }, {
    description: i18n.EXPORT_RULE,
    type: 'icon',
    icon: 'exportAction',
    name: i18n.EXPORT_RULE,
    onClick: function onClick(rowItem) {
      return (0, _actions.exportRulesAction)([rowItem.rule_id], dispatch);
    },
    enabled: function enabled(rowItem) {
      return !rowItem.immutable;
    }
  }, {
    'data-test-subj': 'deleteRuleAction',
    description: i18n.DELETE_RULE,
    type: 'icon',
    icon: 'trash',
    name: i18n.DELETE_RULE,
    onClick: function () {
      var _onClick2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(rowItem) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _actions.deleteRulesAction)([rowItem.id], dispatch, dispatchToaster);

              case 2:
                _context2.next = 4;
                return reFetchRules(true);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onClick(_x2) {
        return _onClick2.apply(this, arguments);
      }

      return onClick;
    }()
  }];
};

exports.getActions = getActions;

// Michael: Are we able to do custom, in-table-header filters, as shown in my wireframes?
var getColumns = function getColumns(_ref) {
  var dispatch = _ref.dispatch,
      dispatchToaster = _ref.dispatchToaster,
      history = _ref.history,
      hasMlPermissions = _ref.hasMlPermissions,
      hasNoPermissions = _ref.hasNoPermissions,
      loadingRuleIds = _ref.loadingRuleIds,
      reFetchRules = _ref.reFetchRules;
  var cols = [{
    field: 'name',
    name: i18n.COLUMN_RULE,
    render: function render(value, item) {
      return _react2.default.createElement(_eui.EuiLink, {
        "data-test-subj": "ruleName",
        href: (0, _redirect_to_detection_engine.getRuleDetailsUrl)(item.id)
      }, value);
    },
    truncateText: true,
    width: '24%'
  }, {
    field: 'risk_score',
    name: i18n.COLUMN_RISK_SCORE,
    render: function render(value) {
      return _react2.default.createElement(_eui.EuiText, {
        "data-test-subj": "riskScore",
        size: "s"
      }, value);
    },
    truncateText: true,
    width: '14%'
  }, {
    field: 'severity',
    name: i18n.COLUMN_SEVERITY,
    render: function render(value) {
      return _react2.default.createElement(_severity_badge.SeverityBadge, {
        value: value
      });
    },
    truncateText: true,
    width: '16%'
  }, {
    field: 'status_date',
    name: i18n.COLUMN_LAST_COMPLETE_RUN,
    render: function render(value) {
      return value == null ? (0, _empty_value.getEmptyTagValue)() : _react2.default.createElement(_localized_date_tooltip.LocalizedDateTooltip, {
        fieldName: i18n.COLUMN_LAST_COMPLETE_RUN,
        date: new Date(value)
      }, _react2.default.createElement(_react.FormattedRelative, {
        value: value
      }));
    },
    truncateText: true,
    width: '20%'
  }, {
    field: 'status',
    name: i18n.COLUMN_LAST_RESPONSE,
    render: function render(value) {
      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiHealth, {
        color: (0, _helpers.getStatusColor)(value !== null && value !== void 0 ? value : null)
      }, value !== null && value !== void 0 ? value : (0, _empty_value.getEmptyTagValue)()));
    },
    width: '16%',
    truncateText: true
  }, {
    field: 'tags',
    name: i18n.COLUMN_TAGS,
    render: function render(value) {
      return _react2.default.createElement(_truncatable_text.TruncatableText, {
        "data-test-subj": "tags"
      }, value.map(function (tag, i) {
        return _react2.default.createElement(_eui.EuiBadge, {
          color: "hollow",
          key: "".concat(tag, "-").concat(i)
        }, tag);
      }));
    },
    truncateText: true,
    width: '20%'
  }, {
    align: 'center',
    field: 'enabled',
    name: i18n.COLUMN_ACTIVATE,
    render: function render(value, item) {
      return _react2.default.createElement(_eui.EuiToolTip, {
        position: "top",
        content: (0, _ml_helpers.isMlRule)(item.type) && !hasMlPermissions ? detectionI18n.ML_RULES_DISABLED_MESSAGE : undefined
      }, _react2.default.createElement(_rule_switch.RuleSwitch, {
        "data-test-subj": "enabled",
        dispatch: dispatch,
        id: item.id,
        enabled: item.enabled,
        isDisabled: hasNoPermissions || (0, _ml_helpers.isMlRule)(item.type) && !hasMlPermissions && !item.enabled,
        isLoading: loadingRuleIds.includes(item.id)
      }));
    },
    sortable: true,
    width: '95px'
  }];
  var actions = [{
    actions: getActions(dispatch, dispatchToaster, history, reFetchRules),
    width: '40px'
  }];
  return hasNoPermissions ? cols : [].concat(cols, actions);
};

exports.getColumns = getColumns;

var getMonitoringColumns = function getMonitoringColumns() {
  var cols = [{
    field: 'name',
    name: i18n.COLUMN_RULE,
    render: function render(value, item) {
      return _react2.default.createElement(_eui.EuiLink, {
        "data-test-subj": "ruleName",
        href: (0, _redirect_to_detection_engine.getRuleDetailsUrl)(item.id)
      }, value);
    },
    truncateText: true,
    width: '24%'
  }, {
    field: 'current_status.bulk_create_time_durations',
    name: i18n.COLUMN_INDEXING_TIMES,
    render: function render(value) {
      return _react2.default.createElement(_eui.EuiText, {
        "data-test-subj": "bulk_create_time_durations",
        size: "s"
      }, value != null && value.length > 0 ? Math.max.apply(Math, _toConsumableArray(value === null || value === void 0 ? void 0 : value.map(function (item) {
        return Number.parseFloat(item);
      }))) : null);
    },
    truncateText: true,
    width: '14%'
  }, {
    field: 'current_status.search_after_time_durations',
    name: i18n.COLUMN_QUERY_TIMES,
    render: function render(value) {
      return _react2.default.createElement(_eui.EuiText, {
        "data-test-subj": "search_after_time_durations",
        size: "s"
      }, value != null && value.length > 0 ? Math.max.apply(Math, _toConsumableArray(value === null || value === void 0 ? void 0 : value.map(function (item) {
        return Number.parseFloat(item);
      }))) : null);
    },
    truncateText: true,
    width: '14%'
  }, {
    field: 'current_status.gap',
    name: i18n.COLUMN_GAP,
    render: function render(value) {
      return _react2.default.createElement(_eui.EuiText, {
        "data-test-subj": "gap",
        size: "s"
      }, value);
    },
    truncateText: true,
    width: '14%'
  }, {
    field: 'current_status.last_look_back_date',
    name: i18n.COLUMN_LAST_LOOKBACK_DATE,
    render: function render(value) {
      return value == null ? (0, _empty_value.getEmptyTagValue)() : _react2.default.createElement(_formatted_date.FormattedDate, {
        value: value,
        fieldName: 'last look back date'
      });
    },
    truncateText: true,
    width: '16%'
  }, {
    field: 'current_status.status_date',
    name: i18n.COLUMN_LAST_COMPLETE_RUN,
    render: function render(value) {
      return value == null ? (0, _empty_value.getEmptyTagValue)() : _react2.default.createElement(_localized_date_tooltip.LocalizedDateTooltip, {
        fieldName: i18n.COLUMN_LAST_COMPLETE_RUN,
        date: new Date(value)
      }, _react2.default.createElement(_react.FormattedRelative, {
        value: value
      }));
    },
    truncateText: true,
    width: '20%'
  }, {
    field: 'current_status.status',
    name: i18n.COLUMN_LAST_RESPONSE,
    render: function render(value) {
      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiHealth, {
        color: (0, _helpers.getStatusColor)(value !== null && value !== void 0 ? value : null)
      }, value !== null && value !== void 0 ? value : (0, _empty_value.getEmptyTagValue)()));
    },
    width: '16%',
    truncateText: true
  }, {
    field: 'activate',
    name: i18n.COLUMN_ACTIVATE,
    render: function render(value) {
      return _react2.default.createElement(_eui.EuiText, {
        "data-test-subj": "search_after_time_durations",
        size: "s"
      }, value ? i18n.ACTIVE : i18n.INACTIVE);
    },
    width: '95px'
  }];
  return cols;
};

exports.getMonitoringColumns = getMonitoringColumns;