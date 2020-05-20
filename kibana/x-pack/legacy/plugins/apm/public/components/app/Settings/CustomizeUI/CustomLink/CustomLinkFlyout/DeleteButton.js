"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteButton = DeleteButton;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _variables = require("../../../../../../style/variables");

var _createCallApmApi = require("../../../../../../services/rest/createCallApmApi");

var _useApmPluginContext = require("../../../../../../hooks/useApmPluginContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DeleteButton(_ref) {
  var onDelete = _ref.onDelete,
      customLinkId = _ref.customLinkId;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isDeleting = _useState2[0],
      setIsDeleting = _useState2[1];

  var toasts = (0, _useApmPluginContext.useApmPluginContext)().core.notifications.toasts;
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "danger",
    isLoading: isDeleting,
    iconSide: "right",
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsDeleting(true);
              _context.next = 3;
              return deleteConfig(customLinkId, toasts);

            case 3:
              setIsDeleting(false);
              onDelete();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    style: {
      marginRight: (0, _variables.px)(_variables.unit)
    }
  }, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.delete', {
    defaultMessage: 'Delete'
  }));
}

function deleteConfig(_x, _x2) {
  return _deleteConfig.apply(this, arguments);
}

function _deleteConfig() {
  _deleteConfig = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(customLinkId, toasts) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _createCallApmApi.callApmApi)({
              pathname: '/api/apm/settings/custom_links/{id}',
              method: 'DELETE',
              params: {
                path: {
                  id: customLinkId
                }
              }
            });

          case 3:
            toasts.addSuccess({
              iconType: 'trash',
              title: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.delete.successed', {
                defaultMessage: 'Deleted custom link.'
              })
            });
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            toasts.addDanger({
              iconType: 'cross',
              title: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.delete.failed', {
                defaultMessage: 'Custom link could not be deleted'
              })
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return _deleteConfig.apply(this, arguments);
}