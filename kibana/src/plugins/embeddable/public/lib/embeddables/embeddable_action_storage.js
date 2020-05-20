"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddableActionStorage = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Below two interfaces are here temporarily, they will move to `ui_actions`
 * plugin once #58216 is merged.
 */
var EmbeddableActionStorage =
/*#__PURE__*/
function () {
  function EmbeddableActionStorage(embbeddable) {
    _classCallCheck(this, EmbeddableActionStorage);

    this.embbeddable = embbeddable;
  }

  _createClass(EmbeddableActionStorage, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(event) {
        var input, events, exists;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                input = this.embbeddable.getInput();
                events = input.events || [];
                exists = !!events.find(function (_ref) {
                  var eventId = _ref.eventId;
                  return eventId === event.eventId;
                });

                if (!exists) {
                  _context.next = 5;
                  break;
                }

                throw new Error("[EEXIST]: Event with [eventId = ".concat(event.eventId, "] already exists on ") + "[embeddable.id = ".concat(input.id, ", embeddable.title = ").concat(input.title, "]."));

              case 5:
                this.embbeddable.updateInput(_objectSpread({}, input, {
                  events: [].concat(_toConsumableArray(events), [event])
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(event) {
        var input, events, index;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = this.embbeddable.getInput();
                events = input.events || [];
                index = events.findIndex(function (_ref2) {
                  var eventId = _ref2.eventId;
                  return eventId === event.eventId;
                });

                if (!(index === -1)) {
                  _context2.next = 5;
                  break;
                }

                throw new Error("[ENOENT]: Event with [eventId = ".concat(event.eventId, "] could not be ") + "updated as it does not exist in " + "[embeddable.id = ".concat(input.id, ", embeddable.title = ").concat(input.title, "]."));

              case 5:
                this.embbeddable.updateInput(_objectSpread({}, input, {
                  events: [].concat(_toConsumableArray(events.slice(0, index)), [event], _toConsumableArray(events.slice(index + 1)))
                }));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(eventId) {
        var input, events, index;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                input = this.embbeddable.getInput();
                events = input.events || [];
                index = events.findIndex(function (event) {
                  return eventId === event.eventId;
                });

                if (!(index === -1)) {
                  _context3.next = 5;
                  break;
                }

                throw new Error("[ENOENT]: Event with [eventId = ".concat(eventId, "] could not be ") + "removed as it does not exist in " + "[embeddable.id = ".concat(input.id, ", embeddable.title = ").concat(input.title, "]."));

              case 5:
                this.embbeddable.updateInput(_objectSpread({}, input, {
                  events: [].concat(_toConsumableArray(events.slice(0, index)), _toConsumableArray(events.slice(index + 1)))
                }));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function remove(_x3) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: "read",
    value: function () {
      var _read = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(eventId) {
        var input, events, event;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                input = this.embbeddable.getInput();
                events = input.events || [];
                event = events.find(function (ev) {
                  return eventId === ev.eventId;
                });

                if (event) {
                  _context4.next = 5;
                  break;
                }

                throw new Error("[ENOENT]: Event with [eventId = ".concat(eventId, "] could not be found in ") + "[embeddable.id = ".concat(input.id, ", embeddable.title = ").concat(input.title, "]."));

              case 5:
                return _context4.abrupt("return", event);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function read(_x4) {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "__list",
    value: function __list() {
      var input = this.embbeddable.getInput();
      return input.events || [];
    }
  }, {
    key: "count",
    value: function () {
      var _count = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.__list().length);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function count() {
        return _count.apply(this, arguments);
      }

      return count;
    }()
  }, {
    key: "list",
    value: function () {
      var _list = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.__list());

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function list() {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }]);

  return EmbeddableActionStorage;
}();

exports.EmbeddableActionStorage = EmbeddableActionStorage;