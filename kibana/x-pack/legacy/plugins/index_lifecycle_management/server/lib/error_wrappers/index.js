"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "wrapCustomError", {
  enumerable: true,
  get: function () {
    return _wrap_custom_error.wrapCustomError;
  }
});
Object.defineProperty(exports, "wrapEsError", {
  enumerable: true,
  get: function () {
    return _wrap_es_error.wrapEsError;
  }
});
Object.defineProperty(exports, "wrapUnknownError", {
  enumerable: true,
  get: function () {
    return _wrap_unknown_error.wrapUnknownError;
  }
});

var _wrap_custom_error = require("./wrap_custom_error");

var _wrap_es_error = require("./wrap_es_error");

var _wrap_unknown_error = require("./wrap_unknown_error");