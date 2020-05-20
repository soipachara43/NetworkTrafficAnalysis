"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnmounter = getUnmounter;
exports.createLegacyAppMounter = exports.createAppMounter = exports.createRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createRenderer = function createRenderer(element) {
  var dom = element && (0, _enzyme.mount)(_react.default.createElement(_react2.I18nProvider, null, element));
  return function () {
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(resolve) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (dom) {
                  dom.update();
                }

                setImmediate(function () {
                  return resolve(dom);
                }); // flushes any pending promises

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  };
};

exports.createRenderer = createRenderer;

var createAppMounter = function createAppMounter(_ref2) {
  var appId = _ref2.appId,
      _ref2$html = _ref2.html,
      html = _ref2$html === void 0 ? "<div>App ".concat(appId, "</div>") : _ref2$html,
      _ref2$appRoute = _ref2.appRoute,
      appRoute = _ref2$appRoute === void 0 ? "/app/".concat(appId) : _ref2$appRoute,
      extraMountHook = _ref2.extraMountHook;
  var unmount = jest.fn();
  return [appId, {
    mounter: {
      appRoute: appRoute,
      appBasePath: appRoute,
      mount: jest.fn(
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(params) {
          var basename, element;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  basename = params.appBasePath, element = params.element;
                  Object.assign(element, {
                    innerHTML: "<div>\nbasename: ".concat(basename, "\nhtml: ").concat(html, "\n</div>")
                  });
                  unmount.mockImplementation(function () {
                    return Object.assign(element, {
                      innerHTML: ''
                    });
                  });

                  if (extraMountHook) {
                    extraMountHook(params);
                  }

                  return _context2.abrupt("return", unmount);

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref3.apply(this, arguments);
        };
      }())
    },
    unmount: unmount
  }];
};

exports.createAppMounter = createAppMounter;

var createLegacyAppMounter = function createLegacyAppMounter(appId, legacyMount) {
  return [appId, {
    mounter: {
      appRoute: "/app/".concat(appId.split(':')[0]),
      appBasePath: "/app/".concat(appId.split(':')[0]),
      unmountBeforeMounting: true,
      mount: legacyMount
    },
    unmount: jest.fn()
  }];
};

exports.createLegacyAppMounter = createLegacyAppMounter;

function getUnmounter(app) {
  return app.mounter.mount.mock.results[0].value;
}