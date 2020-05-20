"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDirectAccessDashboardLinkGenerator = exports.DASHBOARD_APP_URL_GENERATOR = exports.GLOBAL_STATE_STORAGE_KEY = exports.STATE_STORAGE_KEY = void 0;

var _public = require("../../kibana_utils/public");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var STATE_STORAGE_KEY = '_a';
exports.STATE_STORAGE_KEY = STATE_STORAGE_KEY;
var GLOBAL_STATE_STORAGE_KEY = '_g';
exports.GLOBAL_STATE_STORAGE_KEY = GLOBAL_STATE_STORAGE_KEY;
var DASHBOARD_APP_URL_GENERATOR = 'DASHBOARD_APP_URL_GENERATOR';
exports.DASHBOARD_APP_URL_GENERATOR = DASHBOARD_APP_URL_GENERATOR;

var createDirectAccessDashboardLinkGenerator = function createDirectAccessDashboardLinkGenerator(getStartServices) {
  return {
    id: DASHBOARD_APP_URL_GENERATOR,
    createUrl: function () {
      var _createUrl = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(state) {
        var _state$useHash;

        var startServices, useHash, appBasePath, hash, appStateUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return getStartServices();

              case 2:
                startServices = _context.sent;
                useHash = (_state$useHash = state.useHash) !== null && _state$useHash !== void 0 ? _state$useHash : startServices.useHashedUrl;
                appBasePath = startServices.appBasePath;
                hash = state.dashboardId ? "dashboard/".concat(state.dashboardId) : "dashboard";
                appStateUrl = (0, _public.setStateToKbnUrl)(STATE_STORAGE_KEY, {
                  query: state.query,
                  filters: state.filters
                }, {
                  useHash: useHash
                }, "".concat(appBasePath, "#/").concat(hash));
                return _context.abrupt("return", (0, _public.setStateToKbnUrl)(GLOBAL_STATE_STORAGE_KEY, {
                  time: state.timeRange
                }, {
                  useHash: useHash
                }, appStateUrl));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createUrl(_x) {
        return _createUrl.apply(this, arguments);
      }

      return createUrl;
    }()
  };
};

exports.createDirectAccessDashboardLinkGenerator = createDirectAccessDashboardLinkGenerator;