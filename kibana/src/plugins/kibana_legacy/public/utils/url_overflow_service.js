"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlOverflowService = exports.IE_REGEX = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var URL_MAX_IE = 2000;
var URL_MAX_OTHERS = 25000;
var IE_REGEX = /(; ?MSIE |Edge\/\d|Trident\/[\d+\.]+;.*rv:*11\.\d+)/;
exports.IE_REGEX = IE_REGEX;

var UrlOverflowService =
/*#__PURE__*/
function () {
  function UrlOverflowService() {
    var _this = this;

    _classCallCheck(this, UrlOverflowService);

    _defineProperty(this, "_ieLike", void 0);

    _defineProperty(this, "_val", void 0);

    _defineProperty(this, "_sync", void 0);

    var key = 'error/url-overflow/url';
    var store = window.sessionStorage || {
      getItem: function getItem() {},
      setItem: function setItem() {},
      removeItem: function removeItem() {}
    }; // FIXME: Couldn't find a way to test for browser compatibility without
    // complex redirect and cookie based "feature-detection" page, so going
    // with user-agent detection for now.

    this._ieLike = IE_REGEX.test(window.navigator.userAgent);
    this._val = store.getItem(key);

    this._sync = function () {
      if (typeof _this._val === 'string') {
        store.setItem(key, _this._val);
      } else {
        store.removeItem(key);
      }
    };
  }

  _createClass(UrlOverflowService, [{
    key: "failLength",
    value: function failLength() {
      return this._ieLike ? URL_MAX_IE : URL_MAX_OTHERS;
    }
  }, {
    key: "set",
    value: function set(v) {
      this._val = v;

      this._sync();
    }
  }, {
    key: "get",
    value: function get() {
      return this._val;
    }
  }, {
    key: "check",
    value: function check(absUrl) {
      if (!this.get()) {
        var urlLength = absUrl.length;
        var remaining = this.failLength() - urlLength;

        if (remaining > 0) {
          return remaining;
        }

        this.set(absUrl);
      }

      throw new Error("\n      The URL has gotten too big and kibana can no longer\n      continue. Please refresh to return to your previous state.\n    ");
    }
  }, {
    key: "clear",
    value: function clear() {
      this._val = undefined;

      this._sync();
    }
  }]);

  return UrlOverflowService;
}();

exports.UrlOverflowService = UrlOverflowService;