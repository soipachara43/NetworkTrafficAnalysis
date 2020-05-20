"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureMinimumTime = ensureMinimumTime;
exports.DEFAULT_MINIMUM_TIME_MS = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
 * When you make an async request, typically you want to show the user a spinner while they wait.
 * However, if the request takes less than 300 ms, the spinner will flicker in the UI and the user
 * won't have time to register it as a spinner. This function ensures the spinner (or whatever
 * you're showing the user) displays for at least 300 ms, even if the request completes before then.
 */
var DEFAULT_MINIMUM_TIME_MS = 300;
exports.DEFAULT_MINIMUM_TIME_MS = DEFAULT_MINIMUM_TIME_MS;

function ensureMinimumTime(_x) {
  return _ensureMinimumTime.apply(this, arguments);
}

function _ensureMinimumTime() {
  _ensureMinimumTime = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(promiseOrPromises) {
    var minimumTimeMs,
        returnValue,
        bufferedMinimumTimeMs,
        asyncActionStartTime,
        asyncActionCompletionTime,
        asyncActionDuration,
        additionalWaitingTime,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            minimumTimeMs = _args.length > 1 && _args[1] !== undefined ? _args[1] : DEFAULT_MINIMUM_TIME_MS;
            // https://kibana-ci.elastic.co/job/elastic+kibana+6.x+multijob-intake/128/console
            // We're having periodic failures around the timing here. I'm not exactly sure
            // why it's not consistent but I'm going to add some buffer space here to
            // prevent these random failures
            bufferedMinimumTimeMs = minimumTimeMs + 5; // Block on the async action and start the clock.

            asyncActionStartTime = new Date().getTime();

            if (!Array.isArray(promiseOrPromises)) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return Promise.all(promiseOrPromises);

          case 6:
            returnValue = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.next = 11;
            return promiseOrPromises;

          case 11:
            returnValue = _context.sent;

          case 12:
            // Measure how long the async action took to complete.
            asyncActionCompletionTime = new Date().getTime();
            asyncActionDuration = asyncActionCompletionTime - asyncActionStartTime; // Wait longer if the async action completed too quickly.

            if (!(asyncActionDuration < bufferedMinimumTimeMs)) {
              _context.next = 18;
              break;
            }

            additionalWaitingTime = bufferedMinimumTimeMs - (asyncActionCompletionTime - asyncActionStartTime);
            _context.next = 18;
            return new Promise(function (resolve) {
              return setTimeout(resolve, additionalWaitingTime);
            });

          case 18:
            return _context.abrupt("return", returnValue);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ensureMinimumTime.apply(this, arguments);
}