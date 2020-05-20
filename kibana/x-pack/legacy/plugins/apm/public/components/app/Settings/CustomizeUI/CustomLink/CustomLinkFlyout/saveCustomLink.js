"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveCustomLink = saveCustomLink;

var _i18n = require("@kbn/i18n");

var _createCallApmApi = require("../../../../../../services/rest/createCallApmApi");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function saveCustomLink(_x) {
  return _saveCustomLink.apply(this, arguments);
}

function _saveCustomLink() {
  _saveCustomLink = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var id, label, url, filters, toasts, customLink;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = _ref.id, label = _ref.label, url = _ref.url, filters = _ref.filters, toasts = _ref.toasts;
            _context.prev = 1;
            customLink = {
              label: label,
              url: url,
              filters: filters.filter(function (_ref2) {
                var key = _ref2.key,
                    value = _ref2.value;
                return key && value;
              })
            };

            if (!id) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return (0, _createCallApmApi.callApmApi)({
              pathname: '/api/apm/settings/custom_links/{id}',
              method: 'PUT',
              params: {
                path: {
                  id: id
                },
                body: customLink
              }
            });

          case 6:
            _context.next = 10;
            break;

          case 8:
            _context.next = 10;
            return (0, _createCallApmApi.callApmApi)({
              pathname: '/api/apm/settings/custom_links',
              method: 'POST',
              params: {
                body: customLink
              }
            });

          case 10:
            toasts.addSuccess({
              iconType: 'check',
              title: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.create.successed', {
                defaultMessage: 'Link saved!'
              })
            });
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);
            toasts.addDanger({
              title: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.create.failed', {
                defaultMessage: 'Link could not be saved!'
              }),
              text: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.create.failed.message', {
                defaultMessage: 'Something went wrong when saving the link. Error: "{errorMessage}"',
                values: {
                  errorMessage: _context.t0.message
                }
              })
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));
  return _saveCustomLink.apply(this, arguments);
}