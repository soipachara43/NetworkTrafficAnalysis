"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  breadcrumbService: true,
  docTitleService: true
};
Object.defineProperty(exports, "breadcrumbService", {
  enumerable: true,
  get: function get() {
    return _breadcrumb.breadcrumbService;
  }
});
Object.defineProperty(exports, "docTitleService", {
  enumerable: true,
  get: function get() {
    return _doc_title.docTitleService;
  }
});

var _breadcrumb = require("./breadcrumb");

var _doc_title = require("./doc_title");

var _links = require("./links");

Object.keys(_links).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _links[key];
    }
  });
});