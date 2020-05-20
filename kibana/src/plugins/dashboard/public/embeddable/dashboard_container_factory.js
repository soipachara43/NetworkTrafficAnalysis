"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardContainerFactory = void 0;

var _i18n = require("@kbn/i18n");

var _embeddable_plugin = require("../embeddable_plugin");

var _dashboard_container = require("./dashboard_container");

var _dashboard_constants = require("./dashboard_constants");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DashboardContainerFactory =
/*#__PURE__*/
function (_EmbeddableFactory) {
  _inherits(DashboardContainerFactory, _EmbeddableFactory);

  function DashboardContainerFactory(getStartServices) {
    var _this;

    _classCallCheck(this, DashboardContainerFactory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardContainerFactory).call(this));
    _this.getStartServices = getStartServices;

    _defineProperty(_assertThisInitialized(_this), "isContainerType", true);

    _defineProperty(_assertThisInitialized(_this), "type", _dashboard_constants.DASHBOARD_CONTAINER_TYPE);

    return _this;
  }

  _createClass(DashboardContainerFactory, [{
    key: "isEditable",
    value: function () {
      var _isEditable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, capabilities;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getStartServices();

              case 2:
                _ref = _context.sent;
                capabilities = _ref.capabilities;
                return _context.abrupt("return", !!capabilities.createNew && !!capabilities.showWriteControls);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function isEditable() {
        return _isEditable.apply(this, arguments);
      }

      return isEditable;
    }()
  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('dashboard.factory.displayName', {
        defaultMessage: 'dashboard'
      });
    }
  }, {
    key: "getDefaultInput",
    value: function getDefaultInput() {
      return {
        panels: {},
        isFullScreenMode: false,
        useMargins: true
      };
    }
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(initialInput, parent) {
        var services;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getStartServices();

              case 2:
                services = _context2.sent;
                return _context2.abrupt("return", new _dashboard_container.DashboardContainer(initialInput, services, parent));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return DashboardContainerFactory;
}(_embeddable_plugin.EmbeddableFactory);

exports.DashboardContainerFactory = DashboardContainerFactory;