"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSavedDashboardMock = getSavedDashboardMock;

var _mocks = require("../../../../../../../plugins/data/public/mocks");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getSavedDashboardMock(config) {
  return _objectSpread({
    id: '123',
    title: 'my dashboard',
    panelsJSON: '[]',
    searchSource: _mocks.searchSourceMock,
    copyOnSave: false,
    timeRestore: false,
    timeTo: 'now',
    timeFrom: 'now-15m',
    optionsJSON: '',
    lastSavedTitle: '',
    destroy: function destroy() {},
    save: function save() {
      return Promise.resolve('123');
    },
    getQuery: function getQuery() {
      return {
        query: '',
        language: 'kuery'
      };
    },
    getFilters: function getFilters() {
      return [];
    }
  }, config);
}