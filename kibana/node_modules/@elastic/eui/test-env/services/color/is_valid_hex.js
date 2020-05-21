"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidHex = isValidHex;

function isValidHex(hex) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
}