"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeFloatString = exports.getGapBetweenRuns = exports.getDriftTolerance = exports.parseScheduleDates = exports.parseInterval = exports.generateId = void 0;

var _crypto = require("crypto");

var _moment = _interopRequireDefault(require("moment"));

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _server = require("../../../../../../../plugins/alerting/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const generateId = (docIndex, docId, version, ruleId) => (0, _crypto.createHash)('sha256').update(docIndex.concat(docId, version, ruleId)).digest('hex');

exports.generateId = generateId;

const parseInterval = intervalString => {
  try {
    return _moment.default.duration((0, _server.parseDuration)(intervalString));
  } catch (err) {
    return null;
  }
};

exports.parseInterval = parseInterval;

const parseScheduleDates = time => {
  const isValidDateString = !isNaN(Date.parse(time));
  const isValidInput = isValidDateString || time.trim().startsWith('now');
  const formattedDate = isValidDateString ? (0, _moment.default)(time) : isValidInput ? _datemath.default.parse(time) : null;
  return formattedDate !== null && formattedDate !== void 0 ? formattedDate : null;
};

exports.parseScheduleDates = parseScheduleDates;

const getDriftTolerance = ({
  from,
  to,
  interval,
  now = (0, _moment.default)()
}) => {
  var _parseScheduleDates, _parseScheduleDates2;

  const toDate = (_parseScheduleDates = parseScheduleDates(to)) !== null && _parseScheduleDates !== void 0 ? _parseScheduleDates : now;
  const fromDate = (_parseScheduleDates2 = parseScheduleDates(from)) !== null && _parseScheduleDates2 !== void 0 ? _parseScheduleDates2 : _datemath.default.parse('now-6m');
  const timeSegment = toDate.diff(fromDate);

  const duration = _moment.default.duration(timeSegment);

  if (duration !== null) {
    return duration.subtract(interval);
  } else {
    return null;
  }
};

exports.getDriftTolerance = getDriftTolerance;

const getGapBetweenRuns = ({
  previousStartedAt,
  interval,
  from,
  to,
  now = (0, _moment.default)()
}) => {
  if (previousStartedAt == null) {
    return null;
  }

  const intervalDuration = parseInterval(interval);

  if (intervalDuration == null) {
    return null;
  }

  const driftTolerance = getDriftTolerance({
    from,
    to,
    interval: intervalDuration
  });

  if (driftTolerance == null) {
    return null;
  }

  const diff = _moment.default.duration(now.diff(previousStartedAt));

  const drift = diff.subtract(intervalDuration);
  return drift.subtract(driftTolerance);
};

exports.getGapBetweenRuns = getGapBetweenRuns;

const makeFloatString = num => Number(num).toFixed(2);

exports.makeFloatString = makeFloatString;