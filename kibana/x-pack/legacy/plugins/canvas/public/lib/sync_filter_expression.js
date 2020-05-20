"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncFilterExpression = syncFilterExpression;

var _common = require("@kbn/interpreter/common");

var _objectPathImmutable = _interopRequireDefault(require("object-path-immutable"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore internal untyped
var set = _objectPathImmutable.default.set,
    del = _objectPathImmutable.default.del;

function syncFilterExpression(config, filterExpression) {
  var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var changed = false;
  var filterAst = (0, _common.fromExpression)(filterExpression);
  var newAst = fields.reduce(function (ast, field) {
    var val = (0, _lodash.get)(ast, "chain[0].arguments.".concat(field, "[0]"));

    if (val !== config[field]) {
      changed = true;

      if (!config[field]) {
        // remove value if not in expression
        return del(ast, "chain.0.arguments.".concat(field));
      }

      return set(ast, "chain.0.arguments.".concat(field, ".0"), config[field]);
    }

    return ast;
  }, filterAst);
  return {
    changed: changed,
    newAst: newAst
  };
}