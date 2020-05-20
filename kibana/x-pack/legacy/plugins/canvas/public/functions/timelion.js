"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timelion = timelion;

var _lodash = require("lodash");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _new_platform = require("ui/new_platform");

var _fetch = require("../../common/lib/fetch");

var _build_bool_array = require("../../server/lib/build_bool_array");

var _i18n = require("../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local

/**
 * This function parses a given time range containing date math
 * and returns ISO dates. Parsing is done respecting the given time zone.
 * @param timeRange time range to parse
 * @param timeZone time zone to do the parsing in
 */
function parseDateMath(timeRange, timeZone) {
  // the datemath plugin always parses dates by using the current default moment time zone.
  // to use the configured time zone, we are switching just for the bounds calculation.
  var defaultTimezone = (0, _momentTimezone.default)().zoneName();

  _momentTimezone.default.tz.setDefault(timeZone);

  var parsedRange = _new_platform.npStart.plugins.data.query.timefilter.timefilter.calculateBounds(timeRange); // reset default moment timezone


  _momentTimezone.default.tz.setDefault(defaultTimezone);

  return parsedRange;
}

function timelion() {
  var _getFunctionHelp$time = (0, _i18n.getFunctionHelp)().timelion,
      help = _getFunctionHelp$time.help,
      argHelp = _getFunctionHelp$time.args;
  return {
    name: 'timelion',
    type: 'datatable',
    inputTypes: ['filter'],
    help: help,
    args: {
      query: {
        types: ['string'],
        aliases: ['_', 'q'],
        help: argHelp.query,
        default: '".es(*)"'
      },
      interval: {
        types: ['string'],
        help: argHelp.interval,
        default: 'auto'
      },
      from: {
        types: ['string'],
        help: argHelp.from,
        default: 'now-1y'
      },
      to: {
        types: ['string'],
        help: argHelp.to,
        default: 'now'
      },
      timezone: {
        types: ['string'],
        help: argHelp.timezone,
        default: 'UTC'
      }
    },
    fn: function fn(input, args) {
      // Timelion requires a time range. Use the time range from the timefilter element in the
      // workpad, if it exists. Otherwise fall back on the function args.
      var timeFilter = input.and.find(function (and) {
        return and.type === 'time';
      });
      var range = timeFilter ? {
        min: timeFilter.from,
        max: timeFilter.to
      } : parseDateMath({
        from: args.from,
        to: args.to
      }, args.timezone);
      var body = {
        extended: {
          es: {
            filter: {
              bool: {
                must: (0, _build_bool_array.buildBoolArray)(input.and)
              }
            }
          }
        },
        sheet: [args.query],
        time: {
          from: range.min,
          to: range.max,
          interval: args.interval,
          timezone: args.timezone
        }
      };
      return (0, _fetch.fetch)(_chrome.default.addBasePath("/api/timelion/run"), {
        method: 'POST',
        responseType: 'json',
        data: body
      }).then(function (resp) {
        var seriesList = resp.data.sheet[0].list;
        var rows = (0, _lodash.flatten)(seriesList.map(function (series) {
          return series.data.map(function (row) {
            return {
              '@timestamp': row[0],
              value: row[1],
              label: series.label
            };
          });
        }));
        return {
          type: 'datatable',
          columns: [{
            name: '@timestamp',
            type: 'date'
          }, {
            name: 'value',
            type: 'number'
          }, {
            name: 'label',
            type: 'string'
          }],
          rows: rows
        };
      });
    }
  };
}