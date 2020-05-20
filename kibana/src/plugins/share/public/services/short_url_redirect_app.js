"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShortUrlRedirectApp = void 0;

var _short_url_routes = require("../../common/short_url_routes");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createShortUrlRedirectApp = function createShortUrlRedirectApp(core, location) {
  return {
    id: 'short_url_redirect',
    appRoute: _short_url_routes.GOTO_PREFIX,
    chromeless: true,
    title: 'Short URL Redirect',
    mount: function mount() {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var urlId, response, redirectUrl, _ref, hashUrl, hashedUrl, url;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                urlId = (0, _short_url_routes.getUrlIdFromGotoRoute)(location.pathname);

                if (urlId) {
                  _context.next = 3;
                  break;
                }

                throw new Error('Url id not present in path');

              case 3:
                _context.next = 5;
                return core.http.get((0, _short_url_routes.getUrlPath)(urlId));

              case 5:
                response = _context.sent;
                redirectUrl = response.url;
                _context.next = 9;
                return import('../../../kibana_utils/public');

              case 9:
                _ref = _context.sent;
                hashUrl = _ref.hashUrl;
                hashedUrl = hashUrl(redirectUrl);
                url = core.http.basePath.prepend(hashedUrl);
                location.href = url;
                return _context.abrupt("return", function () {});

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

exports.createShortUrlRedirectApp = createShortUrlRedirectApp;