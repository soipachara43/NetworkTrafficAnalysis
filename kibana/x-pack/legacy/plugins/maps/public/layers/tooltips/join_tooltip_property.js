"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JoinTooltipProperty = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
var JoinTooltipProperty =
/*#__PURE__*/
function () {
  function JoinTooltipProperty(tooltipProperty, leftInnerJoins) {
    _classCallCheck(this, JoinTooltipProperty);

    _defineProperty(this, "_tooltipProperty", void 0);

    _defineProperty(this, "_leftInnerJoins", void 0);

    this._tooltipProperty = tooltipProperty;
    this._leftInnerJoins = leftInnerJoins;
  }

  _createClass(JoinTooltipProperty, [{
    key: "isFilterable",
    value: function isFilterable() {
      return true;
    }
  }, {
    key: "getPropertyKey",
    value: function getPropertyKey() {
      return this._tooltipProperty.getPropertyKey();
    }
  }, {
    key: "getPropertyName",
    value: function getPropertyName() {
      return this._tooltipProperty.getPropertyName();
    }
  }, {
    key: "getRawValue",
    value: function getRawValue() {
      return this._tooltipProperty.getRawValue();
    }
  }, {
    key: "getHtmlDisplayValue",
    value: function getHtmlDisplayValue() {
      return this._tooltipProperty.getHtmlDisplayValue();
    }
  }, {
    key: "getESFilters",
    value: function () {
      var _getESFilters = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var esFilters, i, rightSource, termField, esTooltipProperty;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                esFilters = [];

                if (!this._tooltipProperty.isFilterable()) {
                  _context.next = 10;
                  break;
                }

                _context.t0 = esFilters.push;
                _context.t1 = esFilters;
                _context.t2 = _toConsumableArray;
                _context.next = 7;
                return this._tooltipProperty.getESFilters();

              case 7:
                _context.t3 = _context.sent;
                _context.t4 = (0, _context.t2)(_context.t3);

                _context.t0.apply.call(_context.t0, _context.t1, _context.t4);

              case 10:
                i = 0;

              case 11:
                if (!(i < this._leftInnerJoins.length)) {
                  _context.next = 35;
                  break;
                }

                rightSource = this._leftInnerJoins[i].getRightJoinSource();
                termField = rightSource.getTermField();
                _context.prev = 14;
                _context.next = 17;
                return termField.createTooltipProperty(this._tooltipProperty.getRawValue());

              case 17:
                esTooltipProperty = _context.sent;

                if (!esTooltipProperty) {
                  _context.next = 27;
                  break;
                }

                _context.t5 = esFilters.push;
                _context.t6 = esFilters;
                _context.t7 = _toConsumableArray;
                _context.next = 24;
                return esTooltipProperty.getESFilters();

              case 24:
                _context.t8 = _context.sent;
                _context.t9 = (0, _context.t7)(_context.t8);

                _context.t5.apply.call(_context.t5, _context.t6, _context.t9);

              case 27:
                _context.next = 32;
                break;

              case 29:
                _context.prev = 29;
                _context.t10 = _context["catch"](14);
                // eslint-disable-next-line no-console
                console.error('Cannot create joined filter', _context.t10);

              case 32:
                i++;
                _context.next = 11;
                break;

              case 35:
                return _context.abrupt("return", esFilters);

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[14, 29]]);
      }));

      function getESFilters() {
        return _getESFilters.apply(this, arguments);
      }

      return getESFilters;
    }()
  }]);

  return JoinTooltipProperty;
}();

exports.JoinTooltipProperty = JoinTooltipProperty;