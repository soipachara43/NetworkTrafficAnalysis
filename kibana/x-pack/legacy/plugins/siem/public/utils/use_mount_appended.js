"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMountAppended = void 0;

var _enzyme = require("enzyme");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useMountAppended = function useMountAppended() {
  var root;
  beforeEach(function () {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });
  afterEach(function () {
    document.body.removeChild(root);
  });

  var mountAppended = function mountAppended(node, options) {
    return (0, _enzyme.mount)(node, _objectSpread({}, options, {
      attachTo: root
    }));
  };

  return mountAppended;
};

exports.useMountAppended = useMountAppended;