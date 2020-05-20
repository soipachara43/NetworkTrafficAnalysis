"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDynamicSettingsEffect = fetchDynamicSettingsEffect;
exports.setDynamicSettingsEffect = setDynamicSettingsEffect;

var _effects = require("redux-saga/effects");

var _i18n = require("@kbn/i18n");

var _fetch_effect = require("./fetch_effect");

var _dynamic_settings = require("../actions/dynamic_settings");

var _api = require("../api");

var _selectors = require("../selectors");

var _kibana_service = require("../kibana_service");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetchDynamicSettingsEffect),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(setDynamicSettingsEffect);

function fetchDynamicSettingsEffect() {
  return regeneratorRuntime.wrap(function fetchDynamicSettingsEffect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(String(_dynamic_settings.getDynamicSettings), (0, _fetch_effect.fetchEffectFactory)(_api.getDynamicSettings, _dynamic_settings.getDynamicSettingsSuccess, _dynamic_settings.getDynamicSettingsFail));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function setDynamicSettingsEffect() {
  var couldNotSaveSettingsText;
  return regeneratorRuntime.wrap(function setDynamicSettingsEffect$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          couldNotSaveSettingsText = _i18n.i18n.translate('xpack.uptime.settings.error.couldNotSave', {
            defaultMessage: 'Could not save settings!'
          });
          _context3.next = 3;
          return (0, _effects.takeLatest)(String(_dynamic_settings.setDynamicSettings),
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(action) {
            var err, basePath;
            return regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;

                    if (action.payload) {
                      _context2.next = 7;
                      break;
                    }

                    err = new Error('Cannot fetch effect without a payload');
                    _context2.next = 5;
                    return (0, _effects.put)((0, _dynamic_settings.setDynamicSettingsFail)(err));

                  case 5:
                    _kibana_service.kibanaService.core.notifications.toasts.addError(err, {
                      title: couldNotSaveSettingsText
                    });

                    return _context2.abrupt("return");

                  case 7:
                    _context2.next = 9;
                    return (0, _effects.select)(_selectors.getBasePath);

                  case 9:
                    basePath = _context2.sent;
                    _context2.next = 12;
                    return (0, _effects.call)(_api.setDynamicSettings, {
                      settings: action.payload,
                      basePath: basePath
                    });

                  case 12:
                    _context2.next = 14;
                    return (0, _effects.put)((0, _dynamic_settings.setDynamicSettingsSuccess)(action.payload));

                  case 14:
                    _kibana_service.kibanaService.core.notifications.toasts.addSuccess('Settings saved!');

                    _context2.next = 22;
                    break;

                  case 17:
                    _context2.prev = 17;
                    _context2.t0 = _context2["catch"](0);

                    _kibana_service.kibanaService.core.notifications.toasts.addError(_context2.t0, {
                      title: couldNotSaveSettingsText
                    });

                    _context2.next = 22;
                    return (0, _effects.put)((0, _dynamic_settings.setDynamicSettingsFail)(_context2.t0));

                  case 22:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee, null, [[0, 17]]);
          }));

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked2);
}