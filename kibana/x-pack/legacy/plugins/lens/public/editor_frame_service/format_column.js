"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatColumn = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var supportedFormats = {
  number: {
    decimalsToPattern: function decimalsToPattern() {
      var decimals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

      if (decimals === 0) {
        return "0,0";
      }

      return "0,0.".concat('0'.repeat(decimals));
    }
  },
  percent: {
    decimalsToPattern: function decimalsToPattern() {
      var decimals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

      if (decimals === 0) {
        return "0,0%";
      }

      return "0,0.".concat('0'.repeat(decimals), "%");
    }
  },
  bytes: {
    decimalsToPattern: function decimalsToPattern() {
      var decimals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

      if (decimals === 0) {
        return "0,0b";
      }

      return "0,0.".concat('0'.repeat(decimals), "b");
    }
  }
};
var formatColumn = {
  name: 'lens_format_column',
  type: 'kibana_datatable',
  help: '',
  args: {
    format: {
      types: ['string'],
      help: '',
      required: true
    },
    columnId: {
      types: ['string'],
      help: '',
      required: true
    },
    decimals: {
      types: ['number'],
      help: ''
    }
  },
  inputTypes: ['kibana_datatable'],
  fn: function fn(input, _ref) {
    var format = _ref.format,
        columnId = _ref.columnId,
        decimals = _ref.decimals;
    return _objectSpread({}, input, {
      columns: input.columns.map(function (col) {
        if (col.id === columnId) {
          if (supportedFormats[format]) {
            return _objectSpread({}, col, {
              formatHint: {
                id: format,
                params: {
                  pattern: supportedFormats[format].decimalsToPattern(decimals)
                }
              }
            });
          } else {
            return _objectSpread({}, col, {
              formatHint: {
                id: format,
                params: {}
              }
            });
          }
        }

        return col;
      })
    });
  }
};
exports.formatColumn = formatColumn;