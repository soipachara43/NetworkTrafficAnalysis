"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toSentenceCase = toSentenceCase;

/**
 * This function returns the same string with the first letter of the first word capitalized.
 *
 * @param {string} strint The input string
 */
function toSentenceCase(string) {
  // First lowercase all letters
  var lowercase = string.toLowerCase(); // Then just uppercase the first letter;

  return string.charAt(0).toUpperCase() + lowercase.slice(1);
}