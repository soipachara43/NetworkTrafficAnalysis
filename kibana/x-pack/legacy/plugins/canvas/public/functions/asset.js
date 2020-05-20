"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asset = asset;

var _store = require("../state/store");

var _assets = require("../state/selectors/assets");

var _i18n = require("../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore unconverted local lib
function asset() {
  var _getFunctionHelp$asse = (0, _i18n.getFunctionHelp)().asset,
      help = _getFunctionHelp$asse.help,
      argHelp = _getFunctionHelp$asse.args;
  var errors = (0, _i18n.getFunctionErrors)().asset;
  return {
    name: 'asset',
    aliases: [],
    type: 'string',
    inputTypes: ['null'],
    help: help,
    args: {
      id: {
        aliases: ['_'],
        types: ['string'],
        help: argHelp.id,
        required: true
      }
    },
    fn: function fn(input, args) {
      var assetId = args.id;
      var storedAsset = (0, _assets.getAssetById)((0, _store.getState)(), assetId);

      if (storedAsset !== undefined) {
        return storedAsset.value;
      }

      throw errors.invalidAssetId(assetId);
    }
  };
}