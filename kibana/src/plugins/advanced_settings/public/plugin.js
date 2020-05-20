"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedSettingsPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _component_registry = require("./component_registry");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var component = new _component_registry.ComponentRegistry();

var title = _i18n.i18n.translate('advancedSettings.advancedSettingsLabel', {
  defaultMessage: 'Advanced Settings'
});

var AdvancedSettingsPlugin =
/*#__PURE__*/
function () {
  function AdvancedSettingsPlugin() {
    _classCallCheck(this, AdvancedSettingsPlugin);

    _defineProperty(this, "managementApp", void 0);
  }

  _createClass(AdvancedSettingsPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var management = _ref.management;
      var kibanaSection = management.sections.getSection('kibana');

      if (!kibanaSection) {
        throw new Error('`kibana` management section not found.');
      }

      this.managementApp = kibanaSection.registerApp({
        id: 'settings',
        title: title,
        order: 20,
        mount: function mount(params) {
          return _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _ref2, mountManagementSection;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return import('./management_app/mount_management_section');

                  case 2:
                    _ref2 = _context.sent;
                    mountManagementSection = _ref2.mountManagementSection;
                    return _context.abrupt("return", mountManagementSection(core.getStartServices, params, component.start));

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        }
      });
      return {
        component: component.setup
      };
    }
  }, {
    key: "start",
    value: function start(core) {
      if (!core.application.capabilities.management.kibana.settings) {
        this.managementApp.disable();
      }

      return {
        component: component.start
      };
    }
  }]);

  return AdvancedSettingsPlugin;
}();

exports.AdvancedSettingsPlugin = AdvancedSettingsPlugin;