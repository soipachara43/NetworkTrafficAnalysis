"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Delayed = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Delayed =
/*#__PURE__*/
function () {
  function Delayed() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$minimumVisibleDu = _ref.minimumVisibleDuration,
        minimumVisibleDuration = _ref$minimumVisibleDu === void 0 ? 1000 : _ref$minimumVisibleDu,
        _ref$showDelayMs = _ref.showDelayMs,
        showDelayMs = _ref$showDelayMs === void 0 ? 50 : _ref$showDelayMs,
        _ref$hideDelayMs = _ref.hideDelayMs,
        hideDelayMs = _ref$hideDelayMs === void 0 ? 50 : _ref$hideDelayMs;

    _classCallCheck(this, Delayed);

    _defineProperty(this, "displayedAt", 0);

    _defineProperty(this, "hideDelayMs", void 0);

    _defineProperty(this, "isVisible", false);

    _defineProperty(this, "minimumVisibleDuration", void 0);

    _defineProperty(this, "showDelayMs", void 0);

    _defineProperty(this, "timeoutId", void 0);

    _defineProperty(this, "onChangeCallback", function () {
      return null;
    });

    this.minimumVisibleDuration = minimumVisibleDuration;
    this.hideDelayMs = hideDelayMs;
    this.showDelayMs = showDelayMs;
  }

  _createClass(Delayed, [{
    key: "updateState",
    value: function updateState(isVisible) {
      var _this = this;

      window.clearTimeout(this.timeoutId);
      var ms = !isVisible ? Math.max(this.displayedAt + this.minimumVisibleDuration - Date.now(), this.hideDelayMs) : this.showDelayMs;
      this.timeoutId = window.setTimeout(function () {
        if (_this.isVisible !== isVisible) {
          _this.isVisible = isVisible;

          _this.onChangeCallback(isVisible);

          if (isVisible) {
            _this.displayedAt = Date.now();
          }
        }
      }, ms);
    }
  }, {
    key: "show",
    value: function show() {
      this.updateState(true);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.updateState(false);
    }
  }, {
    key: "onChange",
    value: function onChange(onChangeCallback) {
      this.onChangeCallback = onChangeCallback;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.timeoutId) {
        window.clearTimeout(this.timeoutId);
      }
    }
  }]);

  return Delayed;
}();

exports.Delayed = Delayed;