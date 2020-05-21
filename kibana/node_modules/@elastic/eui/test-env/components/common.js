"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keysOf = keysOf;

// utility types:

/**
 * Wraps Object.keys with proper typescript definition of the resulting array
 */
function keysOf(obj) {
  return Object.keys(obj);
}