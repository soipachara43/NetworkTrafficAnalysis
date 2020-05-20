"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SiemClient = void 0;

var _constants = require("../../common/constants");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SiemClient {
  constructor(spaceId, config) {
    this.spaceId = spaceId;
    this.config = config;

    _defineProperty(this, "signalsIndex", void 0);

    const configuredSignalsIndex = this.config().get(`xpack.${_constants.APP_ID}.${_constants.SIGNALS_INDEX_KEY}`);
    this.signalsIndex = `${configuredSignalsIndex}-${this.spaceId}`;
  }

}

exports.SiemClient = SiemClient;