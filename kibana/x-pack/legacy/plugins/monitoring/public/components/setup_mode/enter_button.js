"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetupModeEnterButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SetupModeEnterButton = function SetupModeEnterButton(props) {
  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isLoading = _React$useState2[0],
      setIsLoading = _React$useState2[1];

  if (!props.enabled) {
    return null;
  }

  function enterSetupMode() {
    return _enterSetupMode.apply(this, arguments);
  }

  function _enterSetupMode() {
    _enterSetupMode = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              _context.next = 3;
              return props.toggleSetupMode(true);

            case 3:
              setIsLoading(false);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _enterSetupMode.apply(this, arguments);
  }

  return _react.default.createElement("div", {
    className: "monSetupModeEnterButton__buttonWrapper"
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: enterSetupMode,
    iconType: "flag",
    size: "s",
    iconSide: "right",
    isLoading: isLoading
  }, _i18n.i18n.translate('xpack.monitoring.setupMode.enter', {
    defaultMessage: 'Enter setup mode'
  })));
};

exports.SetupModeEnterButton = SetupModeEnterButton;