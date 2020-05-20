"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUncommonProcessesResolvers = void 0;

var _create_options = require("../../utils/build_query/create_options");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createUncommonProcessesResolvers = libs => ({
  Source: {
    async UncommonProcesses(source, args, {
      req
    }, info) {
      const options = (0, _create_options.createOptionsPaginated)(source, args, info);
      return libs.uncommonProcesses.getUncommonProcesses(req, options);
    }

  }
});

exports.createUncommonProcessesResolvers = createUncommonProcessesResolvers;