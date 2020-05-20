"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatRule = exports.formatActionsStepData = exports.formatAboutStepData = exports.formatScheduleStepData = exports.formatDefineStepData = exports.filterRuleFieldsForType = exports.getTimeTypeValue = void 0;

var _fp = require("lodash/fp");

var _moment = _interopRequireDefault(require("moment"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _constants = require("../../../../../common/constants");

var _transform_actions = require("../../../../../common/detection_engine/transform_actions");

var _ml_helpers = require("../../../../../common/detection_engine/ml_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var getTimeTypeValue = function getTimeTypeValue(time) {
  var timeObj = {
    unit: '',
    value: 0
  };
  var filterTimeVal = time.match(/\d+/g);
  var filterTimeType = time.match(/[a-zA-Z]+/g);

  if (!(0, _fp.isEmpty)(filterTimeVal) && filterTimeVal != null && !isNaN(Number(filterTimeVal[0]))) {
    timeObj.value = Number(filterTimeVal[0]);
  }

  if (!(0, _fp.isEmpty)(filterTimeType) && filterTimeType != null && ['s', 'm', 'h'].includes(filterTimeType[0])) {
    timeObj.unit = filterTimeType[0];
  }

  return timeObj;
};

exports.getTimeTypeValue = getTimeTypeValue;

var isMlFields = function isMlFields(fields) {
  return (0, _fp.has)('anomalyThreshold', fields);
};

var filterRuleFieldsForType = function filterRuleFieldsForType(fields, type) {
  if ((0, _ml_helpers.isMlRule)(type)) {
    var index = fields.index,
        queryBar = fields.queryBar,
        mlRuleFields = _objectWithoutProperties(fields, ["index", "queryBar"]);

    return mlRuleFields;
  } else {
    var anomalyThreshold = fields.anomalyThreshold,
        machineLearningJobId = fields.machineLearningJobId,
        queryRuleFields = _objectWithoutProperties(fields, ["anomalyThreshold", "machineLearningJobId"]);

    return queryRuleFields;
  }
};

exports.filterRuleFieldsForType = filterRuleFieldsForType;

var formatDefineStepData = function formatDefineStepData(defineStepData) {
  var _ruleFields$queryBar, _ruleFields$queryBar2, _ruleFields$queryBar3, _ruleFields$queryBar4, _ruleFields$queryBar5, _ruleFields$queryBar6, _ruleFields$queryBar7;

  var ruleFields = filterRuleFieldsForType(defineStepData, defineStepData.ruleType);
  var ruleType = ruleFields.ruleType,
      timeline = ruleFields.timeline;

  var baseFields = _objectSpread({
    type: ruleType
  }, timeline.id != null && timeline.title != null && {
    timeline_id: timeline.id,
    timeline_title: timeline.title
  });

  var typeFields = isMlFields(ruleFields) ? {
    anomaly_threshold: ruleFields.anomalyThreshold,
    machine_learning_job_id: ruleFields.machineLearningJobId
  } : _objectSpread({
    index: ruleFields.index,
    filters: (_ruleFields$queryBar = ruleFields.queryBar) === null || _ruleFields$queryBar === void 0 ? void 0 : _ruleFields$queryBar.filters,
    language: (_ruleFields$queryBar2 = ruleFields.queryBar) === null || _ruleFields$queryBar2 === void 0 ? void 0 : (_ruleFields$queryBar3 = _ruleFields$queryBar2.query) === null || _ruleFields$queryBar3 === void 0 ? void 0 : _ruleFields$queryBar3.language,
    query: (_ruleFields$queryBar4 = ruleFields.queryBar) === null || _ruleFields$queryBar4 === void 0 ? void 0 : (_ruleFields$queryBar5 = _ruleFields$queryBar4.query) === null || _ruleFields$queryBar5 === void 0 ? void 0 : _ruleFields$queryBar5.query,
    saved_id: (_ruleFields$queryBar6 = ruleFields.queryBar) === null || _ruleFields$queryBar6 === void 0 ? void 0 : _ruleFields$queryBar6.saved_id
  }, ruleType === 'query' && ((_ruleFields$queryBar7 = ruleFields.queryBar) === null || _ruleFields$queryBar7 === void 0 ? void 0 : _ruleFields$queryBar7.saved_id) && {
    type: 'saved_query'
  });
  return _objectSpread({}, baseFields, {}, typeFields);
};

exports.formatDefineStepData = formatDefineStepData;

var formatScheduleStepData = function formatScheduleStepData(scheduleData) {
  var isNew = scheduleData.isNew,
      formatScheduleData = _objectWithoutProperties(scheduleData, ["isNew"]);

  if (!(0, _fp.isEmpty)(formatScheduleData.interval) && !(0, _fp.isEmpty)(formatScheduleData.from)) {
    var _getTimeTypeValue = getTimeTypeValue(formatScheduleData.interval),
        intervalUnit = _getTimeTypeValue.unit,
        intervalValue = _getTimeTypeValue.value;

    var _getTimeTypeValue2 = getTimeTypeValue(formatScheduleData.from),
        fromUnit = _getTimeTypeValue2.unit,
        fromValue = _getTimeTypeValue2.value;

    var duration = _moment.default.duration(intervalValue, intervalUnit);

    duration.add(fromValue, fromUnit);
    formatScheduleData.from = "now-".concat(duration.asSeconds(), "s");
    formatScheduleData.to = 'now';
  }

  return _objectSpread({}, formatScheduleData, {
    meta: {
      from: scheduleData.from
    }
  });
};

exports.formatScheduleStepData = formatScheduleStepData;

var formatAboutStepData = function formatAboutStepData(aboutStepData) {
  var falsePositives = aboutStepData.falsePositives,
      references = aboutStepData.references,
      riskScore = aboutStepData.riskScore,
      threat = aboutStepData.threat,
      isNew = aboutStepData.isNew,
      note = aboutStepData.note,
      rest = _objectWithoutProperties(aboutStepData, ["falsePositives", "references", "riskScore", "threat", "isNew", "note"]);

  return _objectSpread({
    false_positives: falsePositives.filter(function (item) {
      return !(0, _fp.isEmpty)(item);
    }),
    references: references.filter(function (item) {
      return !(0, _fp.isEmpty)(item);
    }),
    risk_score: riskScore,
    threat: threat.filter(function (singleThreat) {
      return singleThreat.tactic.name !== 'none';
    }).map(function (singleThreat) {
      return _objectSpread({}, singleThreat, {
        framework: 'MITRE ATT&CK',
        technique: singleThreat.technique.map(function (technique) {
          var id = technique.id,
              name = technique.name,
              reference = technique.reference;
          return {
            id: id,
            name: name,
            reference: reference
          };
        })
      });
    })
  }, !(0, _fp.isEmpty)(note) ? {
    note: note
  } : {}, {}, rest);
};

exports.formatAboutStepData = formatAboutStepData;

var formatActionsStepData = function formatActionsStepData(actionsStepData) {
  var _actionsStepData$acti = actionsStepData.actions,
      actions = _actionsStepData$acti === void 0 ? [] : _actionsStepData$acti,
      enabled = actionsStepData.enabled,
      kibanaSiemAppUrl = actionsStepData.kibanaSiemAppUrl,
      _actionsStepData$thro = actionsStepData.throttle,
      throttle = _actionsStepData$thro === void 0 ? _constants.NOTIFICATION_THROTTLE_NO_ACTIONS : _actionsStepData$thro;
  return {
    actions: actions.map(_transform_actions.transformAlertToRuleAction),
    enabled: enabled,
    throttle: actions.length ? throttle : _constants.NOTIFICATION_THROTTLE_NO_ACTIONS,
    meta: {
      kibana_siem_app_url: kibanaSiemAppUrl
    }
  };
};

exports.formatActionsStepData = formatActionsStepData;

var formatRule = function formatRule(defineStepData, aboutStepData, scheduleData, actionsData) {
  return _deepmerge.default.all([formatDefineStepData(defineStepData), formatAboutStepData(aboutStepData), formatScheduleStepData(scheduleData), formatActionsStepData(actionsData)]);
};

exports.formatRule = formatRule;