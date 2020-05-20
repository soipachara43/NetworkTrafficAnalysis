"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Binder = void 0;

var _d = _interopRequireDefault(require("d3"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Binder =
/*#__PURE__*/
function () {
  function Binder($scope) {
    var _this = this;

    _classCallCheck(this, Binder);

    _defineProperty(this, "disposal", []);

    // support auto-binding to $scope objects
    if ($scope) {
      $scope.$on('$destroy', function () {
        return _this.destroy();
      });
    }
  }

  _createClass(Binder, [{
    key: "on",
    value: function on(emitter) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var on = emitter.on || emitter.addListener;
      var off = emitter.off || emitter.removeListener;
      on.apply(emitter, args);
      this.disposal.push(function () {
        return off.apply(emitter, args);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var destroyers = this.disposal;
      this.disposal = [];
      destroyers.forEach(function (fn) {
        return fn();
      });
    }
  }, {
    key: "jqOn",
    value: function jqOn(el) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var $el = (0, _jquery.default)(el);
      $el.on.apply($el, args);
      this.disposal.push(function () {
        return $el.off.apply($el, args);
      });
    }
  }, {
    key: "fakeD3Bind",
    value: function fakeD3Bind(el, event, handler) {
      var _this2 = this;

      this.jqOn(el, event, function (e) {
        // mimic https://github.com/mbostock/d3/blob/3abb00113662463e5c19eb87cd33f6d0ddc23bc0/src/selection/on.js#L87-L94
        var o = _d.default.event; // Events can be reentrant (e.g., focus).

        _d.default.event = e;

        try {
          // @ts-ignore
          handler.apply(_this2, [_this2.__data__]);
        } finally {
          _d.default.event = o;
        }
      });
    }
  }]);

  return Binder;
}();

exports.Binder = Binder;