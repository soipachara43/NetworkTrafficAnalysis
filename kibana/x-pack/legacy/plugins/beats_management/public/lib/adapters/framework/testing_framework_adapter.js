"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestingFrameworkAdapter = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TestingFrameworkAdapter =
/*#__PURE__*/
function () {
  _createClass(TestingFrameworkAdapter, [{
    key: "info",
    get: function get() {
      if (this.xpackInfo) {
        return this.xpackInfo;
      } else {
        throw new Error('framework adapter must have init called before anything else');
      }
    }
  }, {
    key: "currentUser",
    get: function get() {
      return this.shieldUser;
    }
  }]);

  function TestingFrameworkAdapter(xpackInfo, shieldUser, version) {
    var _this = this;

    _classCallCheck(this, TestingFrameworkAdapter);

    this.xpackInfo = xpackInfo;
    this.shieldUser = shieldUser;
    this.version = version;

    _defineProperty(this, "settings", void 0);

    _defineProperty(this, "setUISettings", function (key, value) {
      _this.settings[key] = value;
    });
  } // We dont really want to have this, but it's needed to conditionaly render for k7 due to
  // when that data is needed.


  _createClass(TestingFrameworkAdapter, [{
    key: "getUISetting",
    value: function getUISetting(key) {
      return this.settings[key];
    }
  }, {
    key: "waitUntilFrameworkReady",
    value: function () {
      var _waitUntilFrameworkReady = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return");

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function waitUntilFrameworkReady() {
        return _waitUntilFrameworkReady.apply(this, arguments);
      }

      return waitUntilFrameworkReady;
    }()
  }, {
    key: "renderUIAtPath",
    value: function renderUIAtPath(path, component) {
      var toController = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'self';
      throw new Error('not yet implamented');
    }
  }, {
    key: "registerManagementSection",
    value: function registerManagementSection(settings) {
      throw new Error('not yet implamented');
    }
  }, {
    key: "registerManagementUI",
    value: function registerManagementUI(settings) {
      throw new Error('not yet implamented');
    }
  }]);

  return TestingFrameworkAdapter;
}();

exports.TestingFrameworkAdapter = TestingFrameworkAdapter;