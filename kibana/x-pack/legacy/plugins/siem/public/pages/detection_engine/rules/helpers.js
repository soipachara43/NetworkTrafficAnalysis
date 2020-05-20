"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userHasNoPermissions = exports.getActionMessageParams = exports.getActionMessageRuleParams = exports.redirectToDetections = exports.setFieldValue = exports.getPrePackagedRuleStatus = exports.useQuery = exports.getModifiedAboutDetailsData = exports.determineDetailsValue = exports.getAboutStepsData = exports.getHumanizedDuration = exports.getScheduleStepsData = exports.getDefineStepsData = exports.getActionsStepsData = exports.getStepsData = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _fp = require("lodash/fp");

var _moment = _interopRequireDefault(require("moment"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reactRouterDom = require("react-router-dom");

var _ml_helpers = require("../../../../common/detection_engine/ml_helpers");

var _transform_actions = require("../../../../common/detection_engine/transform_actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getStepsData = function getStepsData(_ref) {
  var rule = _ref.rule,
      _ref$detailsView = _ref.detailsView,
      detailsView = _ref$detailsView === void 0 ? false : _ref$detailsView;
  var defineRuleData = getDefineStepsData(rule);
  var aboutRuleData = getAboutStepsData(rule, detailsView);
  var modifiedAboutRuleDetailsData = getModifiedAboutDetailsData(rule);
  var scheduleRuleData = getScheduleStepsData(rule);
  var ruleActionsData = getActionsStepsData(rule);
  return {
    aboutRuleData: aboutRuleData,
    modifiedAboutRuleDetailsData: modifiedAboutRuleDetailsData,
    defineRuleData: defineRuleData,
    scheduleRuleData: scheduleRuleData,
    ruleActionsData: ruleActionsData
  };
};

exports.getStepsData = getStepsData;

var getActionsStepsData = function getActionsStepsData(rule) {
  var enabled = rule.enabled,
      throttle = rule.throttle,
      meta = rule.meta,
      _rule$actions = rule.actions,
      actions = _rule$actions === void 0 ? [] : _rule$actions;
  return {
    actions: actions === null || actions === void 0 ? void 0 : actions.map(_transform_actions.transformRuleToAlertAction),
    isNew: false,
    throttle: throttle,
    kibanaSiemAppUrl: meta === null || meta === void 0 ? void 0 : meta.kibana_siem_app_url,
    enabled: enabled
  };
};

exports.getActionsStepsData = getActionsStepsData;

var getDefineStepsData = function getDefineStepsData(rule) {
  var _rule$anomaly_thresho, _rule$machine_learnin, _rule$index, _rule$query, _rule$language, _rule$filters, _rule$timeline_id, _rule$timeline_title;

  return {
    isNew: false,
    ruleType: rule.type,
    anomalyThreshold: (_rule$anomaly_thresho = rule.anomaly_threshold) !== null && _rule$anomaly_thresho !== void 0 ? _rule$anomaly_thresho : 50,
    machineLearningJobId: (_rule$machine_learnin = rule.machine_learning_job_id) !== null && _rule$machine_learnin !== void 0 ? _rule$machine_learnin : '',
    index: (_rule$index = rule.index) !== null && _rule$index !== void 0 ? _rule$index : [],
    queryBar: {
      query: {
        query: (_rule$query = rule.query) !== null && _rule$query !== void 0 ? _rule$query : '',
        language: (_rule$language = rule.language) !== null && _rule$language !== void 0 ? _rule$language : ''
      },
      filters: (_rule$filters = rule.filters) !== null && _rule$filters !== void 0 ? _rule$filters : [],
      saved_id: rule.saved_id
    },
    timeline: {
      id: (_rule$timeline_id = rule.timeline_id) !== null && _rule$timeline_id !== void 0 ? _rule$timeline_id : null,
      title: (_rule$timeline_title = rule.timeline_title) !== null && _rule$timeline_title !== void 0 ? _rule$timeline_title : null
    }
  };
};

exports.getDefineStepsData = getDefineStepsData;

var getScheduleStepsData = function getScheduleStepsData(rule) {
  var interval = rule.interval,
      from = rule.from;
  var fromHumanizedValue = getHumanizedDuration(from, interval);
  return {
    isNew: false,
    interval: interval,
    from: fromHumanizedValue
  };
};

exports.getScheduleStepsData = getScheduleStepsData;

var getHumanizedDuration = function getHumanizedDuration(from, interval) {
  var _dateMath$parse, _dateMath$parse2;

  var fromValue = (_dateMath$parse = _datemath.default.parse(from)) !== null && _dateMath$parse !== void 0 ? _dateMath$parse : (0, _moment.default)();
  var intervalValue = (_dateMath$parse2 = _datemath.default.parse("now-".concat(interval))) !== null && _dateMath$parse2 !== void 0 ? _dateMath$parse2 : (0, _moment.default)();

  var fromDuration = _moment.default.duration(intervalValue.diff(fromValue));

  var fromHumanize = "".concat(Math.floor(fromDuration.asHours()), "h");

  if (fromDuration.asSeconds() < 60) {
    return "".concat(Math.floor(fromDuration.asSeconds()), "s");
  } else if (fromDuration.asMinutes() < 60) {
    return "".concat(Math.floor(fromDuration.asMinutes()), "m");
  }

  return fromHumanize;
};

exports.getHumanizedDuration = getHumanizedDuration;

var getAboutStepsData = function getAboutStepsData(rule, detailsView) {
  var _determineDetailsValu = determineDetailsValue(rule, detailsView),
      name = _determineDetailsValu.name,
      description = _determineDetailsValu.description,
      note = _determineDetailsValu.note;

  var references = rule.references,
      severity = rule.severity,
      falsePositives = rule.false_positives,
      riskScore = rule.risk_score,
      tags = rule.tags,
      threat = rule.threat;
  return {
    isNew: false,
    name: name,
    description: description,
    note: note,
    references: references,
    severity: severity,
    tags: tags,
    riskScore: riskScore,
    falsePositives: falsePositives,
    threat: threat
  };
};

exports.getAboutStepsData = getAboutStepsData;

var determineDetailsValue = function determineDetailsValue(rule, detailsView) {
  var name = rule.name,
      description = rule.description,
      note = rule.note;

  if (detailsView) {
    return {
      name: '',
      description: '',
      note: ''
    };
  }

  return {
    name: name,
    description: description,
    note: note !== null && note !== void 0 ? note : ''
  };
};

exports.determineDetailsValue = determineDetailsValue;

var getModifiedAboutDetailsData = function getModifiedAboutDetailsData(rule) {
  var _rule$note;

  return {
    note: (_rule$note = rule.note) !== null && _rule$note !== void 0 ? _rule$note : '',
    description: rule.description
  };
};

exports.getModifiedAboutDetailsData = getModifiedAboutDetailsData;

var useQuery = function useQuery() {
  return new URLSearchParams((0, _reactRouterDom.useLocation)().search);
};

exports.useQuery = useQuery;

var getPrePackagedRuleStatus = function getPrePackagedRuleStatus(rulesInstalled, rulesNotInstalled, rulesNotUpdated) {
  if (rulesNotInstalled != null && rulesInstalled === 0 && rulesNotInstalled > 0 && rulesNotUpdated === 0) {
    return 'ruleNotInstalled';
  } else if (rulesInstalled != null && rulesInstalled > 0 && rulesNotInstalled === 0 && rulesNotUpdated === 0) {
    return 'ruleInstalled';
  } else if (rulesInstalled != null && rulesNotInstalled != null && rulesInstalled > 0 && rulesNotInstalled > 0 && rulesNotUpdated === 0) {
    return 'someRuleUninstall';
  } else if (rulesInstalled != null && rulesNotInstalled != null && rulesNotUpdated != null && rulesInstalled > 0 && rulesNotInstalled >= 0 && rulesNotUpdated > 0) {
    return 'ruleNeedUpdate';
  }

  return 'unknown';
};

exports.getPrePackagedRuleStatus = getPrePackagedRuleStatus;

var setFieldValue = function setFieldValue(form, schema, defaultValues) {
  return Object.keys(schema).forEach(function (key) {
    var val = (0, _fp.get)(key, defaultValues);

    if (val != null) {
      form.setFieldValue(key, val);
    }
  });
};

exports.setFieldValue = setFieldValue;

var redirectToDetections = function redirectToDetections(isSignalIndexExists, isAuthenticated, hasEncryptionKey) {
  return isSignalIndexExists != null && isAuthenticated != null && hasEncryptionKey != null && (!isSignalIndexExists || !isAuthenticated || !hasEncryptionKey);
};

exports.redirectToDetections = redirectToDetections;

var getActionMessageRuleParams = function getActionMessageRuleParams(ruleType) {
  var commonRuleParamsKeys = ['id', 'name', 'description', 'false_positives', 'rule_id', 'max_signals', 'risk_score', 'output_index', 'references', 'severity', 'timeline_id', 'timeline_title', 'threat', 'type', 'version'];
  var ruleParamsKeys = [].concat(commonRuleParamsKeys, _toConsumableArray((0, _ml_helpers.isMlRule)(ruleType) ? ['anomaly_threshold', 'machine_learning_job_id'] : ['index', 'filters', 'language', 'query', 'saved_id'])).sort();
  return ruleParamsKeys;
};

exports.getActionMessageRuleParams = getActionMessageRuleParams;
var getActionMessageParams = (0, _memoizeOne.default)(function (ruleType) {
  if (!ruleType) {
    return [];
  }

  var actionMessageRuleParams = getActionMessageRuleParams(ruleType);
  return ['state.signals_count', '{context.results_link}'].concat(_toConsumableArray(actionMessageRuleParams.map(function (param) {
    return "context.rule.".concat(param);
  })));
}); // typed as null not undefined as the initial state for this value is null.

exports.getActionMessageParams = getActionMessageParams;

var userHasNoPermissions = function userHasNoPermissions(canUserCRUD) {
  return canUserCRUD != null ? !canUserCRUD : false;
};

exports.userHasNoPermissions = userHasNoPermissions;