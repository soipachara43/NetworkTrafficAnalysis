"use strict";

var _new_platform = require("ui/new_platform");

var _ = require("./");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var pluginInstance = (0, _.plugin)({});
pluginInstance.setup(_new_platform.npSetup.core, _new_platform.npSetup.plugins);
pluginInstance.start(_new_platform.npStart.core, _new_platform.npStart.plugins);