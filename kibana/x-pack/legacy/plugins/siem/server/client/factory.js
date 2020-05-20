"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SiemClientFactory = void 0;

var _client = require("./client");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SiemClientFactory {
  constructor() {
    _defineProperty(this, "getSpaceId", void 0);

    _defineProperty(this, "config", void 0);
  }

  setup({
    getSpaceId,
    config
  }) {
    this.getSpaceId = getSpaceId;
    this.config = config;
  }

  create(request) {
    var _ref, _this$getSpaceId;

    if (this.config == null) {
      throw new Error('Cannot create SiemClient as config is not present. Did you forget to call setup()?');
    }

    const spaceId = (_ref = (_this$getSpaceId = this.getSpaceId) === null || _this$getSpaceId === void 0 ? void 0 : _this$getSpaceId.call(this, request)) !== null && _ref !== void 0 ? _ref : 'default';
    return new _client.SiemClient(spaceId, this.config);
  }

}

exports.SiemClientFactory = SiemClientFactory;