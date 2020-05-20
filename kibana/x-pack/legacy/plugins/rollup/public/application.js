"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _public = require("../../../../../src/plugins/kibana_react/public");

var _store = require("./crud_app/store");

var _app = require("./crud_app/app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * This module will be loaded asynchronously to reduce the bundle size of your plugin's main bundle.
 */
var renderApp =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(core, _ref2) {
    var element, setBreadcrumbs, _ref3, _ref4, coreStart, I18nContext;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            element = _ref2.element, setBreadcrumbs = _ref2.setBreadcrumbs;
            _context.next = 3;
            return core.getStartServices();

          case 3:
            _ref3 = _context.sent;
            _ref4 = _slicedToArray(_ref3, 1);
            coreStart = _ref4[0];
            I18nContext = coreStart.i18n.Context;
            (0, _reactDom.render)(_react.default.createElement(I18nContext, null, _react.default.createElement(_public.KibanaContextProvider, {
              services: {
                setBreadcrumbs: setBreadcrumbs
              }
            }, _react.default.createElement(_reactRedux.Provider, {
              store: _store.rollupJobsStore
            }, _react.default.createElement(_app.App, null)))), element);
            return _context.abrupt("return", function () {
              (0, _reactDom.unmountComponentAtNode)(element);
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderApp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderApp = renderApp;