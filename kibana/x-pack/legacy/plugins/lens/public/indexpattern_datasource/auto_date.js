"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAutoDate = getAutoDate;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getAutoDate(deps) {
  function autoIntervalFromContext(ctx) {
    if (!ctx || !ctx.timeRange) {
      return;
    }

    return deps.data.search.aggs.calculateAutoTimeExpression(ctx.timeRange);
  }
  /**
   * Convert all 'auto' date histograms into a concrete value (e.g. 2h).
   * This allows us to support 'auto' on all date fields, and opens the
   * door to future customizations (e.g. adjusting the level of detail, etc).
   */


  return {
    name: 'lens_auto_date',
    aliases: [],
    help: '',
    inputTypes: ['kibana_context', 'null'],
    args: {
      aggConfigs: {
        types: ['string'],
        default: '""',
        help: ''
      }
    },
    fn: function fn(input, args) {
      var interval = autoIntervalFromContext(input);

      if (!interval) {
        return args.aggConfigs;
      }

      var configs = JSON.parse(args.aggConfigs);
      var updatedConfigs = configs.map(function (c) {
        if (c.type !== 'date_histogram' || !c.params || c.params.interval !== 'auto') {
          return c;
        }

        return _objectSpread({}, c, {
          params: _objectSpread({}, c.params, {
            interval: interval
          })
        });
      });
      return JSON.stringify(updatedConfigs);
    }
  };
}