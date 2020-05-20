"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = exports.Public = void 0;

var Public = _interopRequireWildcard(require("./public"));

exports.Public = Public;

var Server = _interopRequireWildcard(require("./server"));

exports.Server = Server;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }