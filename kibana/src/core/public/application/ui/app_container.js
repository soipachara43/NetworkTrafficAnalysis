"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _types = require("../types");

var _app_not_found_screen = require("./app_not_found_screen");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AppContainer = function AppContainer(_ref) {
  var mounter = _ref.mounter,
      appId = _ref.appId,
      appPath = _ref.appPath,
      setAppLeaveHandler = _ref.setAppLeaveHandler,
      createScopedHistory = _ref.createScopedHistory,
      appStatus = _ref.appStatus;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      appNotFound = _useState2[0],
      setAppNotFound = _useState2[1];

  var elementRef = (0, _react.useRef)(null);
  var unmountRef = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    var unmount = function unmount() {
      if (unmountRef.current) {
        unmountRef.current();
        unmountRef.current = null;
      }
    };

    if (!mounter || appStatus !== _types.AppStatus.accessible) {
      return setAppNotFound(true);
    }

    setAppNotFound(false);

    if (mounter.unmountBeforeMounting) {
      unmount();
    }

    var mount =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return mounter.mount({
                  appBasePath: mounter.appBasePath,
                  history: createScopedHistory(appPath),
                  element: elementRef.current,
                  onAppLeave: function onAppLeave(handler) {
                    return setAppLeaveHandler(appId, handler);
                  }
                });

              case 2:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 5;
                  break;
                }

                _context.t0 = null;

              case 5:
                unmountRef.current = _context.t0;

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function mount() {
        return _ref2.apply(this, arguments);
      };
    }();

    mount();
    return unmount;
  }, [appId, appStatus, mounter, createScopedHistory, setAppLeaveHandler, appPath]);
  return _react.default.createElement(_react.Fragment, null, appNotFound && _react.default.createElement(_app_not_found_screen.AppNotFound, null), _react.default.createElement("div", {
    key: appId,
    ref: elementRef
  }));
};

exports.AppContainer = AppContainer;