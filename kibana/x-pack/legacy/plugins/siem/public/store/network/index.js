"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  networkActions: true,
  networkModel: true,
  networkSelectors: true
};
exports.networkSelectors = exports.networkModel = exports.networkActions = void 0;

var networkActions = _interopRequireWildcard(require("./actions"));

exports.networkActions = networkActions;

var networkModel = _interopRequireWildcard(require("./model"));

exports.networkModel = networkModel;

var networkSelectors = _interopRequireWildcard(require("./selectors"));

exports.networkSelectors = networkSelectors;

var _reducer = require("./reducer");

Object.keys(_reducer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reducer[key];
    }
  });
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }