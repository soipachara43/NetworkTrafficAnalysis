"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionStorageMock = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SessionStorageMock =
/*#__PURE__*/
function () {
  function SessionStorageMock() {
    _classCallCheck(this, SessionStorageMock);

    _defineProperty(this, "store", {});
  }

  _createClass(SessionStorageMock, [{
    key: "clear",
    value: function clear() {
      this.store = {};
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      return this.store[key] || null;
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this.store[key] = value.toString();
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      delete this.store[key];
    }
  }]);

  return SessionStorageMock;
}();

exports.SessionStorageMock = SessionStorageMock;