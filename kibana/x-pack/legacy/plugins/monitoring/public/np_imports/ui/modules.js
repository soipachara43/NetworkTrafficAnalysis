"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiModules = void 0;

var _angular = _interopRequireDefault(require("angular"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Modules = function Modules() {
  var _this = this;

  _classCallCheck(this, Modules);

  _defineProperty(this, "_services", []);

  _defineProperty(this, "_filters", []);

  _defineProperty(this, "_directives", []);

  _defineProperty(this, "get", function (_name, _dep) {
    return _this;
  });

  _defineProperty(this, "service", function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this._services.push(args);
  });

  _defineProperty(this, "filter", function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this._filters.push(args);
  });

  _defineProperty(this, "directive", function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this._directives.push(args);
  });

  _defineProperty(this, "addToModule", function () {
    _angular.default.module('monitoring/services', []);

    _angular.default.module('monitoring/filters', []);

    _angular.default.module('monitoring/directives', []);

    _this._services.forEach(function (args) {
      _angular.default.module('monitoring/services').service.apply(null, args);
    });

    _this._filters.forEach(function (args) {
      _angular.default.module('monitoring/filters').filter.apply(null, args);
    });

    _this._directives.forEach(function (args) {
      _angular.default.module('monitoring/directives').directive.apply(null, args);
    });
  });
};

var uiModules = new Modules();
exports.uiModules = uiModules;