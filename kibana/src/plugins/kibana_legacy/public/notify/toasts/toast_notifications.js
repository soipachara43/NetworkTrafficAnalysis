"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastNotifications = void 0;

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
var ToastNotifications = function ToastNotifications(toasts) {
  var _this = this;

  _classCallCheck(this, ToastNotifications);

  this.toasts = toasts;

  _defineProperty(this, "list", []);

  _defineProperty(this, "onChangeCallback", void 0);

  _defineProperty(this, "onChange", function (callback) {
    _this.onChangeCallback = callback;
  });

  _defineProperty(this, "add", function (toastOrTitle) {
    return _this.toasts.add(toastOrTitle);
  });

  _defineProperty(this, "remove", function (toast) {
    return _this.toasts.remove(toast);
  });

  _defineProperty(this, "addSuccess", function (toastOrTitle) {
    return _this.toasts.addSuccess(toastOrTitle);
  });

  _defineProperty(this, "addWarning", function (toastOrTitle) {
    return _this.toasts.addWarning(toastOrTitle);
  });

  _defineProperty(this, "addDanger", function (toastOrTitle) {
    return _this.toasts.addDanger(toastOrTitle);
  });

  _defineProperty(this, "addError", function (error, options) {
    return _this.toasts.addError(error, options);
  });

  toasts.get$().subscribe(function (list) {
    _this.list = list;

    if (_this.onChangeCallback) {
      _this.onChangeCallback();
    }
  });
};

exports.ToastNotifications = ToastNotifications;