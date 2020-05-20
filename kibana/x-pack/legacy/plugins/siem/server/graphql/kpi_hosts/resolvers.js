"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKpiHostsResolvers = void 0;

var _create_options = require("../../utils/build_query/create_options");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createKpiHostsResolvers = libs => ({
  Source: {
    async KpiHosts(source, args, {
      req
    }, info) {
      const options = { ...(0, _create_options.createOptions)(source, args, info)
      };
      return libs.kpiHosts.getKpiHosts(req, options);
    },

    async KpiHostDetails(source, args, {
      req
    }, info) {
      const options = { ...(0, _create_options.createOptions)(source, args, info)
      };
      return libs.kpiHosts.getKpiHostDetails(req, options);
    }

  }
});

exports.createKpiHostsResolvers = createKpiHostsResolvers;