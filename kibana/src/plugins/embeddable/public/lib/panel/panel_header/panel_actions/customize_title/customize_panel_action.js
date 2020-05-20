"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizePanelTitleAction = exports.ACTION_CUSTOMIZE_PANEL = void 0;

var _i18n = require("@kbn/i18n");

var _types = require("../../../../types");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ACTION_CUSTOMIZE_PANEL = 'ACTION_CUSTOMIZE_PANEL';
exports.ACTION_CUSTOMIZE_PANEL = ACTION_CUSTOMIZE_PANEL;

var CustomizePanelTitleAction =
/*#__PURE__*/
function () {
  function CustomizePanelTitleAction(getDataFromUser) {
    _classCallCheck(this, CustomizePanelTitleAction);

    this.getDataFromUser = getDataFromUser;

    _defineProperty(this, "type", ACTION_CUSTOMIZE_PANEL);

    _defineProperty(this, "id", ACTION_CUSTOMIZE_PANEL);

    _defineProperty(this, "order", 10);

    this.order = 10;
  }

  _createClass(CustomizePanelTitleAction, [{
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.customizePanel.action.displayName', {
        defaultMessage: 'Customize panel'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType() {
      return 'pencil';
    }
  }, {
    key: "isCompatible",
    value: function () {
      var _isCompatible = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var embeddable;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                embeddable = _ref.embeddable;
                return _context.abrupt("return", embeddable.getInput().viewMode === _types.ViewMode.EDIT ? true : false);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function isCompatible(_x) {
        return _isCompatible.apply(this, arguments);
      }

      return isCompatible;
    }()
  }, {
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref2) {
        var embeddable, customTitle;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                embeddable = _ref2.embeddable;
                _context2.next = 3;
                return this.getDataFromUser({
                  embeddable: embeddable
                });

              case 3:
                customTitle = _context2.sent;
                embeddable.updateInput(customTitle);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function execute(_x2) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);

  return CustomizePanelTitleAction;
}();

exports.CustomizePanelTitleAction = CustomizePanelTitleAction;