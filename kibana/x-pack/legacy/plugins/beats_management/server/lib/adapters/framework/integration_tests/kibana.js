"use strict";

var _lodash = require("lodash");

var kbnTestServer = _interopRequireWildcard(require("../../../../../../../../src/test_utils/kbn_server"));

var _kbn_server_config = require("../../../../../../../test_utils/kbn_server_config");

var _plugin = require("../../../../../common/constants/plugin");

var _plugin2 = require("./../../../../../common/constants/plugin");

var _kibana_framework_adapter = require("./../kibana_framework_adapter");

var _test_contract = require("./test_contract");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// file.skip
// @ts-ignore
// @ts-ignore
let kbnServer;
let kbn;
let esServer;
(0, _test_contract.contractTests)('Kibana  Framework Adapter', {
  async before() {
    const servers = kbnTestServer.createTestServers({
      adjustTimeout: t => jest.setTimeout(t),
      settings: _kbn_server_config.TestKbnServerConfig
    });
    esServer = await servers.startES();
    kbn = await servers.startKibana();
    kbnServer = kbn.kbnServer;
  },

  async after() {
    await kbn.stop();
    await esServer.stop();
  },

  adapterSetup: () => {
    return new _kibana_framework_adapter.KibanaBackendFrameworkAdapter((0, _lodash.camelCase)(_plugin2.PLUGIN.ID), kbnServer.server, _plugin.CONFIG_PREFIX);
  }
});