"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSignalsActions = exports.requiredFieldsForActions = exports.signalsDefaultModel = exports.signalsHeaders = exports.buildSignalsRuleIdFilter = exports.signalsClosedFilters = exports.signalsOpenFilters = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _default_headers = require("../../../../components/timeline/body/column_headers/default_headers");

var _constants = require("../../../../components/timeline/body/constants");

var _defaults = require("../../../../store/timeline/defaults");

var _signals_filter_group = require("./signals_filter_group");

var _actions = require("./actions");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var signalsOpenFilters = [{
  meta: {
    alias: null,
    negate: false,
    disabled: false,
    type: 'phrase',
    key: 'signal.status',
    params: {
      query: 'open'
    }
  },
  query: {
    match_phrase: {
      'signal.status': 'open'
    }
  }
}];
exports.signalsOpenFilters = signalsOpenFilters;
var signalsClosedFilters = [{
  meta: {
    alias: null,
    negate: false,
    disabled: false,
    type: 'phrase',
    key: 'signal.status',
    params: {
      query: 'closed'
    }
  },
  query: {
    match_phrase: {
      'signal.status': 'closed'
    }
  }
}];
exports.signalsClosedFilters = signalsClosedFilters;

var buildSignalsRuleIdFilter = function buildSignalsRuleIdFilter(ruleId) {
  return [{
    meta: {
      alias: null,
      negate: false,
      disabled: false,
      type: 'phrase',
      key: 'signal.rule.id',
      params: {
        query: ruleId
      }
    },
    query: {
      match_phrase: {
        'signal.rule.id': ruleId
      }
    }
  }];
};

exports.buildSignalsRuleIdFilter = buildSignalsRuleIdFilter;
var signalsHeaders = [{
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: '@timestamp',
  width: _constants.DEFAULT_DATE_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'signal.rule.name',
  label: i18n.SIGNALS_HEADERS_RULE,
  linkField: 'signal.rule.id',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'signal.rule.version',
  label: i18n.SIGNALS_HEADERS_VERSION,
  width: 100
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'signal.rule.type',
  label: i18n.SIGNALS_HEADERS_METHOD,
  width: 100
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'signal.rule.severity',
  label: i18n.SIGNALS_HEADERS_SEVERITY,
  width: 105
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'signal.rule.risk_score',
  label: i18n.SIGNALS_HEADERS_RISK_SCORE,
  width: 115
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'event.module',
  linkField: 'rule.reference',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  category: 'event',
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'event.action',
  type: 'string',
  aggregatable: true,
  width: 140
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'event.category',
  width: 150
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'host.name',
  width: 120
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'user.name',
  width: 120
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'source.ip',
  width: 120
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'destination.ip',
  width: 140
}];
exports.signalsHeaders = signalsHeaders;

var signalsDefaultModel = _objectSpread({}, _defaults.timelineDefaults, {
  columns: signalsHeaders,
  showCheckboxes: true,
  showRowRenderers: false
});

exports.signalsDefaultModel = signalsDefaultModel;
var requiredFieldsForActions = ['@timestamp', 'signal.original_time', 'signal.rule.filters', 'signal.rule.from', 'signal.rule.language', 'signal.rule.query', 'signal.rule.to', 'signal.rule.id'];
exports.requiredFieldsForActions = requiredFieldsForActions;

var getSignalsActions = function getSignalsActions(_ref) {
  var apolloClient = _ref.apolloClient,
      canUserCRUD = _ref.canUserCRUD,
      hasIndexWrite = _ref.hasIndexWrite,
      setEventsLoading = _ref.setEventsLoading,
      setEventsDeleted = _ref.setEventsDeleted,
      createTimeline = _ref.createTimeline,
      status = _ref.status,
      updateTimelineIsLoading = _ref.updateTimelineIsLoading;
  return [{
    getAction: function getAction(_ref2) {
      var ecsData = _ref2.ecsData;
      return _react.default.createElement(_eui.EuiToolTip, {
        "data-test-subj": "send-signal-to-timeline-tool-tip",
        content: i18n.ACTION_INVESTIGATE_IN_TIMELINE
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        "data-test-subj": "send-signal-to-timeline-button",
        onClick: function onClick() {
          return (0, _actions.sendSignalToTimelineAction)({
            apolloClient: apolloClient,
            createTimeline: createTimeline,
            ecsData: ecsData,
            updateTimelineIsLoading: updateTimelineIsLoading
          });
        },
        iconType: "timeline",
        "aria-label": "Next"
      }));
    },
    id: 'sendSignalToTimeline',
    width: 26
  }, {
    getAction: function getAction(_ref3) {
      var eventId = _ref3.eventId;
      return _react.default.createElement(_eui.EuiToolTip, {
        "data-test-subj": "update-signal-status-tool-tip",
        content: status === _signals_filter_group.FILTER_OPEN ? i18n.ACTION_OPEN_SIGNAL : i18n.ACTION_CLOSE_SIGNAL
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        "data-test-subj": 'update-signal-status-button',
        onClick: function onClick() {
          return (0, _actions.updateSignalStatusAction)({
            signalIds: [eventId],
            status: status,
            setEventsLoading: setEventsLoading,
            setEventsDeleted: setEventsDeleted
          });
        },
        isDisabled: !canUserCRUD || !hasIndexWrite,
        iconType: status === _signals_filter_group.FILTER_OPEN ? 'securitySignalDetected' : 'securitySignalResolved',
        "aria-label": "Next"
      }));
    },
    id: 'updateSignalStatus',
    width: 26
  }];
};

exports.getSignalsActions = getSignalsActions;