"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InspectPanelAction = exports.ACTION_INSPECT_PANEL = void 0;

var _i18n = require("@kbn/i18n");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ACTION_INSPECT_PANEL = 'openInspector';
exports.ACTION_INSPECT_PANEL = ACTION_INSPECT_PANEL;

var InspectPanelAction =
/*#__PURE__*/
function () {
  function InspectPanelAction(inspector) {
    _classCallCheck(this, InspectPanelAction);

    this.inspector = inspector;

    _defineProperty(this, "type", ACTION_INSPECT_PANEL);

    _defineProperty(this, "id", ACTION_INSPECT_PANEL);

    _defineProperty(this, "order", 10);
  }

  _createClass(InspectPanelAction, [{
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.panel.inspectPanel.displayName', {
        defaultMessage: 'Inspect'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType() {
      return 'inspect';
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
                return _context.abrupt("return", this.inspector.isAvailable(embeddable.getInspectorAdapters()));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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
        var embeddable, adapters, session, originalDestroy;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                embeddable = _ref2.embeddable;
                adapters = embeddable.getInspectorAdapters();
                _context2.next = 4;
                return this.isCompatible({
                  embeddable: embeddable
                });

              case 4:
                _context2.t0 = !_context2.sent;

                if (_context2.t0) {
                  _context2.next = 7;
                  break;
                }

                _context2.t0 = adapters === undefined;

              case 7:
                if (!_context2.t0) {
                  _context2.next = 9;
                  break;
                }

                throw new Error('Action not compatible with context');

              case 9:
                session = this.inspector.open(adapters, {
                  title: embeddable.getTitle()
                }); // Overwrite the embeddables.destroy() function to close the inspector
                // before calling the original destroy method

                originalDestroy = embeddable.destroy;

                embeddable.destroy = function () {
                  session.close();

                  if (originalDestroy) {
                    originalDestroy.call(embeddable);
                  }
                }; // In case the inspector gets closed (otherwise), restore the original destroy function


                session.onClose.finally(function () {
                  embeddable.destroy = originalDestroy;
                });

              case 13:
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

  return InspectPanelAction;
}();

exports.InspectPanelAction = InspectPanelAction;