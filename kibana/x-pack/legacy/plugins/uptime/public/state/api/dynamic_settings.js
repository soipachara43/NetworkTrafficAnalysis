"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDynamicSettings = exports.getDynamicSettings = void 0;

var _runtime_types = require("../../../common/runtime_types");

var _utils = require("./utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var apiPath = '/api/uptime/dynamic_settings';

var getDynamicSettings =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var basePath;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            basePath = _ref2.basePath;
            _context.next = 3;
            return _utils.apiService.get(apiPath, undefined, _runtime_types.DynamicSettingsType);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDynamicSettings(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getDynamicSettings = getDynamicSettings;

var setDynamicSettings =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref4) {
    var basePath, settings;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            basePath = _ref4.basePath, settings = _ref4.settings;
            _context2.next = 3;
            return _utils.apiService.post(apiPath, settings, _runtime_types.DynamicSettingsSaveType);

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function setDynamicSettings(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.setDynamicSettings = setDynamicSettings;