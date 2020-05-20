"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _id_generator = require("./id_generator");

Object.keys(_id_generator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _id_generator[key];
    }
  });
});