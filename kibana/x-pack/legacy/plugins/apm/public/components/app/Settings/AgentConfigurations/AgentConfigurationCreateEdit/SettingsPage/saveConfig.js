"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveConfig = saveConfig;

var _i18n = require("@kbn/i18n");

var _all_option = require("../../../../../../../../../../plugins/apm/common/agent_configuration/all_option");

var _createCallApmApi = require("../../../../../../services/rest/createCallApmApi");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function saveConfig(_x) {
  return _saveConfig.apply(this, arguments);
}

function _saveConfig() {
  _saveConfig = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var config, isEditMode, toasts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _ref.config, isEditMode = _ref.isEditMode, toasts = _ref.toasts;
            _context.prev = 1;
            _context.next = 4;
            return (0, _createCallApmApi.callApmApi)({
              pathname: '/api/apm/settings/agent-configuration',
              method: 'PUT',
              params: {
                query: {
                  overwrite: isEditMode
                },
                body: _objectSpread({}, config, {
                  service: {
                    name: (0, _all_option.omitAllOption)(config.service.name),
                    environment: (0, _all_option.omitAllOption)(config.service.environment)
                  }
                })
              }
            });

          case 4:
            toasts.addSuccess({
              title: _i18n.i18n.translate('xpack.apm.agentConfig.saveConfig.succeeded.title', {
                defaultMessage: 'Configuration saved'
              }),
              text: _i18n.i18n.translate('xpack.apm.agentConfig.saveConfig.succeeded.text', {
                defaultMessage: 'The configuration for "{serviceName}" was saved. It will take some time to propagate to the agents.',
                values: {
                  serviceName: (0, _all_option.getOptionLabel)(config.service.name)
                }
              })
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            toasts.addDanger({
              title: _i18n.i18n.translate('xpack.apm.agentConfig.saveConfig.failed.title', {
                defaultMessage: 'Configuration could not be saved'
              }),
              text: _i18n.i18n.translate('xpack.apm.agentConfig.saveConfig.failed.text', {
                defaultMessage: 'Something went wrong when saving the configuration for "{serviceName}". Error: "{errorMessage}"',
                values: {
                  serviceName: (0, _all_option.getOptionLabel)(config.service.name),
                  errorMessage: _context.t0.message
                }
              })
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));
  return _saveConfig.apply(this, arguments);
}