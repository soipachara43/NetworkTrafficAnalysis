"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditPanelAction = exports.ACTION_EDIT_PANEL = void 0;

var _i18n = require("@kbn/i18n");

var _types = require("../types");

var _errors = require("../errors");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ACTION_EDIT_PANEL = 'editPanel';
exports.ACTION_EDIT_PANEL = ACTION_EDIT_PANEL;

var EditPanelAction =
/*#__PURE__*/
function () {
  function EditPanelAction(getEmbeddableFactory) {
    _classCallCheck(this, EditPanelAction);

    this.getEmbeddableFactory = getEmbeddableFactory;

    _defineProperty(this, "type", ACTION_EDIT_PANEL);

    _defineProperty(this, "id", ACTION_EDIT_PANEL);

    _defineProperty(this, "order", 15);
  }

  _createClass(EditPanelAction, [{
    key: "getDisplayName",
    value: function getDisplayName(_ref) {
      var embeddable = _ref.embeddable;
      var factory = this.getEmbeddableFactory(embeddable.type);

      if (!factory) {
        throw new _errors.EmbeddableFactoryNotFoundError(embeddable.type);
      }

      return _i18n.i18n.translate('embeddableApi.panel.editPanel.displayName', {
        defaultMessage: 'Edit {value}',
        values: {
          value: factory.getDisplayName()
        }
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
      regeneratorRuntime.mark(function _callee(_ref2) {
        var embeddable, canEditEmbeddable, inDashboardEditMode;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                embeddable = _ref2.embeddable;
                canEditEmbeddable = Boolean(embeddable && embeddable.getOutput().editable && embeddable.getOutput().editUrl);
                inDashboardEditMode = embeddable.getInput().viewMode === _types.ViewMode.EDIT;
                return _context.abrupt("return", Boolean(canEditEmbeddable && inDashboardEditMode));

              case 4:
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
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return");

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function execute() {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: "getHref",
    value: function getHref(_ref3) {
      var embeddable = _ref3.embeddable;
      var editUrl = embeddable ? embeddable.getOutput().editUrl : undefined;
      return editUrl ? editUrl : '';
    }
  }]);

  return EditPanelAction;
}();

exports.EditPanelAction = EditPanelAction;