"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18n_getters = require("../../../../plugins/maps/common/i18n_getters");

Object.keys(_i18n_getters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _i18n_getters[key];
    }
  });
});