"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureDefaultIndexPattern = ensureDefaultIndexPattern;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _public = require("../../../kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bannerId;
var timeoutId;
/**
 * Checks whether a default index pattern is set and exists and defines
 * one otherwise.
 *
 * If there are no index patterns, redirect to management page and show
 * banner. In this case the promise returned from this function will never
 * resolve to wait for the URL change to happen.
 */

function ensureDefaultIndexPattern(_x, _x2, _x3) {
  return _ensureDefaultIndexPattern.apply(this, arguments);
}

function _ensureDefaultIndexPattern() {
  _ensureDefaultIndexPattern = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(core, data, history) {
    var patterns, defaultId, defined, exists, canManageIndexPatterns, redirectTarget;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return data.indexPatterns.getIds();

          case 2:
            patterns = _context.sent;
            defaultId = core.uiSettings.get('defaultIndex');
            defined = !!defaultId;
            exists = (0, _lodash.contains)(patterns, defaultId);

            if (defined && !exists) {
              core.uiSettings.remove('defaultIndex');
              defaultId = defined = false;
            }

            if (!defined) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return");

          case 9:
            if (!(patterns.length >= 1)) {
              _context.next = 14;
              break;
            }

            defaultId = patterns[0];
            core.uiSettings.set('defaultIndex', defaultId);
            _context.next = 21;
            break;

          case 14:
            canManageIndexPatterns = core.application.capabilities.management.kibana.index_patterns;
            redirectTarget = canManageIndexPatterns ? '/management/kibana/index_pattern' : '/home';

            if (timeoutId) {
              clearTimeout(timeoutId);
            } // Avoid being hostile to new users who don't have an index pattern setup yet
            // give them a friendly info message instead of a terse error message


            bannerId = core.overlays.banners.replace(bannerId, (0, _public.toMountPoint)(_react.default.createElement(_eui.EuiCallOut, {
              color: "warning",
              iconType: "iInCircle",
              title: _i18n.i18n.translate('kibana_utils.indexPattern.bannerLabel', {
                defaultMessage: "In order to visualize and explore data in Kibana, you'll need to create an index pattern to retrieve data from Elasticsearch."
              })
            }))); // hide the message after the user has had a chance to acknowledge it -- so it doesn't permanently stick around

            timeoutId = setTimeout(function () {
              core.overlays.banners.remove(bannerId);
              timeoutId = undefined;
            }, 15000);
            history.push(redirectTarget); // return never-resolving promise to stop resolving and wait for the url change

            return _context.abrupt("return", new Promise(function () {}));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ensureDefaultIndexPattern.apply(this, arguments);
}