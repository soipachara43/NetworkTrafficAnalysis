"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabs = getTabs;
exports.metadataTab = exports.exceptionStacktraceTab = exports.logStacktraceTab = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var logStacktraceTab = {
  key: 'log_stacktrace',
  label: _i18n.i18n.translate('xpack.apm.propertiesTable.tabs.logStacktraceLabel', {
    defaultMessage: 'Log stack trace'
  })
};
exports.logStacktraceTab = logStacktraceTab;
var exceptionStacktraceTab = {
  key: 'exception_stacktrace',
  label: _i18n.i18n.translate('xpack.apm.propertiesTable.tabs.exceptionStacktraceLabel', {
    defaultMessage: 'Exception stack trace'
  })
};
exports.exceptionStacktraceTab = exceptionStacktraceTab;
var metadataTab = {
  key: 'metadata',
  label: _i18n.i18n.translate('xpack.apm.propertiesTable.tabs.metadataLabel', {
    defaultMessage: 'Metadata'
  })
};
exports.metadataTab = metadataTab;

function getTabs(error) {
  var _error$error$log;

  var hasLogStacktrace = !(0, _lodash.isEmpty)((_error$error$log = error.error.log) === null || _error$error$log === void 0 ? void 0 : _error$error$log.stacktrace);
  return [].concat(_toConsumableArray(hasLogStacktrace ? [logStacktraceTab] : []), [exceptionStacktraceTab, metadataTab]);
}