"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tag = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Tag = function Tag(config) {
  _classCallCheck(this, Tag);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "color", void 0);

  this.name = config.name;
  this.color = config.color;
};

exports.Tag = Tag;