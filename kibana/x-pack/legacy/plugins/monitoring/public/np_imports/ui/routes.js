"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Routes = function Routes() {
  var _this = this;

  _classCallCheck(this, Routes);

  _defineProperty(this, "_routes", []);

  _defineProperty(this, "_redirect", void 0);

  _defineProperty(this, "when", function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var routeOptions = args[1];
    routeOptions.reloadOnSearch = false;

    _this._routes.push(args);

    return _this;
  });

  _defineProperty(this, "otherwise", function (redirect) {
    _this._redirect = redirect;
    return _this;
  });

  _defineProperty(this, "addToProvider", function ($routeProvider) {
    _this._routes.forEach(function (args) {
      $routeProvider.when.apply(_this, args);
    });

    if (_this._redirect) {
      $routeProvider.otherwise(_this._redirect);
    }
  });
};

var uiRoutes = new Routes();
var _default = uiRoutes; // eslint-disable-line import/no-default-export

exports.default = _default;
module.exports = exports.default;