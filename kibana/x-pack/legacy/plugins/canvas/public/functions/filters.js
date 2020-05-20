"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filtersFunctionFactory = filtersFunctionFactory;

var _common = require("@kbn/interpreter/common");

var _lodash = require("lodash");

var _run_interpreter = require("../lib/run_interpreter");

var _store = require("../state/store");

var _workpad = require("../state/selectors/workpad");

var _i18n = require("../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
function getFiltersByGroup(allFilters, groups) {
  var ungrouped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!groups || groups.length === 0) {
    if (!ungrouped) {
      return allFilters;
    } // remove all allFilters that belong to a group


    return allFilters.filter(function (filter) {
      var ast = (0, _common.fromExpression)(filter);
      var expGroups = (0, _lodash.get)(ast, 'chain[0].arguments.filterGroup', []);
      return expGroups.length === 0;
    });
  }

  return allFilters.filter(function (filter) {
    var ast = (0, _common.fromExpression)(filter);
    var expGroups = (0, _lodash.get)(ast, 'chain[0].arguments.filterGroup', []);
    return expGroups.length > 0 && expGroups.every(function (expGroup) {
      return groups.includes(expGroup);
    });
  });
}

function filtersFunctionFactory(initialize) {
  return function filters() {
    var _getFunctionHelp$filt = (0, _i18n.getFunctionHelp)().filters,
        help = _getFunctionHelp$filt.help,
        argHelp = _getFunctionHelp$filt.args;
    return {
      name: 'filters',
      type: 'filter',
      help: help,
      context: {
        types: ['null']
      },
      args: {
        group: {
          aliases: ['_'],
          types: ['string'],
          help: argHelp.group,
          multi: true
        },
        ungrouped: {
          aliases: ['nogroup', 'nogroups'],
          types: ['boolean'],
          help: argHelp.ungrouped,
          default: false
        }
      },
      fn: function fn(input, _ref) {
        var group = _ref.group,
            ungrouped = _ref.ungrouped;
        var filterList = getFiltersByGroup((0, _workpad.getGlobalFilters)((0, _store.getState)()), group, ungrouped);

        if (filterList && filterList.length) {
          var filterExpression = filterList.join(' | ');
          var filterAST = (0, _common.fromExpression)(filterExpression);
          return (0, _run_interpreter.interpretAst)(filterAST);
        } else {
          var filterType = initialize.typesRegistry.get('filter');
          return filterType === null || filterType === void 0 ? void 0 : filterType.from(null, {});
        }
      }
    };
  };
}