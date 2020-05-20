"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerContract = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * This is a public representation of a trigger that is provided to other plugins.
 */
var TriggerContract =
/**
 * Unique name of the trigger as identified in `ui_actions` plugin trigger
 * registry, such as "SELECT_RANGE_TRIGGER" or "VALUE_CLICK_TRIGGER".
 */

/**
 * User friendly name of the trigger.
 */

/**
 * A longer user friendly description of the trigger.
 */
function TriggerContract(internal) {
  var _this = this;

  _classCallCheck(this, TriggerContract);

  this.internal = internal;

  _defineProperty(this, "id", void 0);

  _defineProperty(this, "title", void 0);

  _defineProperty(this, "description", void 0);

  _defineProperty(this, "exec",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(context) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.internal.execute(context);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  this.id = this.internal.trigger.id;
  this.title = this.internal.trigger.title;
  this.description = this.internal.trigger.description;
}
/**
 * Use this method to execute action attached to this trigger.
 */
;

exports.TriggerContract = TriggerContract;