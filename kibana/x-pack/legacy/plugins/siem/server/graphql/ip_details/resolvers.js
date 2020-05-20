"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIpDetailsResolvers = void 0;

var _create_options = require("../../utils/build_query/create_options");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createIpDetailsResolvers = libs => ({
  Source: {
    async IpOverview(source, args, {
      req
    }, info) {
      const options = { ...(0, _create_options.createOptions)(source, args, info),
        ip: args.ip
      };
      return libs.ipDetails.getIpOverview(req, options);
    },

    async Users(source, args, {
      req
    }, info) {
      const options = { ...(0, _create_options.createOptionsPaginated)(source, args, info),
        ip: args.ip,
        sort: args.sort,
        flowTarget: args.flowTarget
      };
      return libs.ipDetails.getUsers(req, options);
    }

  }
});

exports.createIpDetailsResolvers = createIpDetailsResolvers;