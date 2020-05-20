"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTimeInterval = exports.getTimeInterval = exports.isValidTimeInterval = void 0;

var _multipliers;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TIME_UNIT;

(function (TIME_UNIT) {
  TIME_UNIT["SECONDS"] = "s";
  TIME_UNIT["MINUTES"] = "m";
  TIME_UNIT["HOURS"] = "h";
  TIME_UNIT["DAYS"] = "d";
})(TIME_UNIT || (TIME_UNIT = {}));

var multipliers = (_multipliers = {}, _defineProperty(_multipliers, TIME_UNIT.SECONDS, 1000), _defineProperty(_multipliers, TIME_UNIT.MINUTES, 1000 * 60), _defineProperty(_multipliers, TIME_UNIT.HOURS, 1000 * 60 * 60), _defineProperty(_multipliers, TIME_UNIT.DAYS, 1000 * 60 * 60 * 24), _multipliers);

function isTimeUnit(unit) {
  return unit !== undefined;
}

var isValidTimeInterval = function isValidTimeInterval() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return !!String(val).match(/^([0-9]{1,})([hmsd])$/);
};

exports.isValidTimeInterval = isValidTimeInterval;

var getTimeInterval = function getTimeInterval() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // if it's a number, there is no interval, return undefined
  if (!isNaN(Number(val))) {
    return;
  } // if it's a string, try to parse out the shorthand duration value


  var match = String(val).match(/^([0-9]{1,})([hmsd])$/); // if it's invalid, there is no interval, return undefined

  if (!match) {
    return;
  }

  var interval = parseInt(match[1], 10);
  var unit = match[2];
  var multiplier = isTimeUnit(unit) ? multipliers[unit] : null;

  if (interval && multiplier) {
    return interval * multiplier;
  }
};

exports.getTimeInterval = getTimeInterval;

var createTimeInterval = function createTimeInterval(seconds) {
  if (seconds < multipliers[TIME_UNIT.MINUTES]) {
    return seconds / multipliers[TIME_UNIT.SECONDS] + TIME_UNIT.SECONDS;
  }

  if (seconds < multipliers[TIME_UNIT.HOURS]) {
    return seconds / multipliers[TIME_UNIT.MINUTES] + TIME_UNIT.MINUTES;
  }

  if (seconds < multipliers[TIME_UNIT.DAYS]) {
    return seconds / multipliers[TIME_UNIT.HOURS] + TIME_UNIT.HOURS;
  }

  return seconds / multipliers[TIME_UNIT.DAYS] + TIME_UNIT.DAYS;
};

exports.createTimeInterval = createTimeInterval;