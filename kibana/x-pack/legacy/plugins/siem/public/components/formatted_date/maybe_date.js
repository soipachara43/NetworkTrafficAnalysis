"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMaybeDate = void 0;

var _fp = require("lodash/fp");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getMaybeDate = function getMaybeDate(value) {
  if ((0, _fp.isString)(value) && value.trim() !== '') {
    var maybeDate = (0, _moment.default)(new Date(value));

    if (maybeDate.isValid() || isNaN(+value)) {
      return maybeDate;
    } else {
      return (0, _moment.default)(new Date(+value));
    }
  } else {
    return (0, _moment.default)(new Date(value));
  }
};

exports.getMaybeDate = getMaybeDate;