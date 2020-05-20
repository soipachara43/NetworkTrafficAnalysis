"use strict";

var _new_platform = require("ui/new_platform");

var _feature_catalogue_entry = require("./feature_catalogue_entry");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var home = _new_platform.npSetup.plugins.home;
home.featureCatalogue.register(_feature_catalogue_entry.featureCatalogueEntry);