"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatText = void 0;

var _predicate = require("../predicate");

var formatText = function formatText(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    nil: ''
  };
  return (0, _predicate.isNil)(value) ? options.nil : value.toString();
};

exports.formatText = formatText;