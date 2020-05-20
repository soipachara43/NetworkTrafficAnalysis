"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSaveCurrentTextObject = void 0;

var _react = require("react");

var _lodash = require("lodash");

var _contexts = require("../contexts");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WAIT_MS = 500;

var useSaveCurrentTextObject = function useSaveCurrentTextObject() {
  var promiseChainRef = (0, _react.useRef)(Promise.resolve());

  var _useServicesContext = (0, _contexts.useServicesContext)(),
      objectStorageClient = _useServicesContext.services.objectStorageClient;

  var _useEditorReadContext = (0, _contexts.useEditorReadContext)(),
      currentTextObject = _useEditorReadContext.currentTextObject;

  return (0, _react.useCallback)((0, _lodash.throttle)(function (text) {
    var promise = promiseChainRef.current;
    if (!currentTextObject) return;
    promise.finally(function () {
      return objectStorageClient.text.update(_objectSpread({}, currentTextObject, {
        text: text,
        updatedAt: Date.now()
      }));
    });
  }, WAIT_MS, {
    trailing: true
  }), [objectStorageClient, currentTextObject]);
};

exports.useSaveCurrentTextObject = useSaveCurrentTextObject;