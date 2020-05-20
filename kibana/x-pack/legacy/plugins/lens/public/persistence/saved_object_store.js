"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectIndexStore = exports.DOC_TYPE = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
var DOC_TYPE = 'lens';
exports.DOC_TYPE = DOC_TYPE;

var SavedObjectIndexStore =
/*#__PURE__*/
function () {
  function SavedObjectIndexStore(client) {
    _classCallCheck(this, SavedObjectIndexStore);

    _defineProperty(this, "client", void 0);

    this.client = client;
  }

  _createClass(SavedObjectIndexStore, [{
    key: "save",
    value: function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(vis) {
        var id, type, rest, attributes, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = vis.id, type = vis.type, rest = _objectWithoutProperties(vis, ["id", "type"]); // TODO: SavedObjectAttributes should support this kind of object,
                // remove this workaround when SavedObjectAttributes is updated.

                attributes = rest;
                _context.next = 4;
                return id ? this.client.update(DOC_TYPE, id, attributes) : this.client.create(DOC_TYPE, attributes);

              case 4:
                result = _context.sent;
                return _context.abrupt("return", _objectSpread({}, vis, {
                  id: result.id
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var _ref, type, attributes, error;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.client.get(DOC_TYPE, id);

              case 2:
                _ref = _context2.sent;
                type = _ref.type;
                attributes = _ref.attributes;
                error = _ref.error;

                if (!error) {
                  _context2.next = 8;
                  break;
                }

                throw error;

              case 8:
                return _context2.abrupt("return", _objectSpread({}, attributes, {
                  id: id,
                  type: type
                }));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function load(_x2) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }]);

  return SavedObjectIndexStore;
}();

exports.SavedObjectIndexStore = SavedObjectIndexStore;