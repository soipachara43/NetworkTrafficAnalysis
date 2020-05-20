"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "registerIndicesRoute", {
  enumerable: true,
  get: function () {
    return _indices.registerIndicesRoute;
  }
});
Object.defineProperty(exports, "registerFieldsForWildcardRoute", {
  enumerable: true,
  get: function () {
    return _index_patterns.registerFieldsForWildcardRoute;
  }
});
Object.defineProperty(exports, "registerSearchRoute", {
  enumerable: true,
  get: function () {
    return _search.registerSearchRoute;
  }
});
Object.defineProperty(exports, "registerJobsRoute", {
  enumerable: true,
  get: function () {
    return _jobs.registerJobsRoute;
  }
});

var _indices = require("./indices");

var _index_patterns = require("./index_patterns");

var _search = require("./search");

var _jobs = require("./jobs");