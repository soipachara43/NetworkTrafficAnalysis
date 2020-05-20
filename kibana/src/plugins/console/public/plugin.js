"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleUIPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../home/public");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConsoleUIPlugin =
/*#__PURE__*/
function () {
  function ConsoleUIPlugin() {
    _classCallCheck(this, ConsoleUIPlugin);
  }

  _createClass(ConsoleUIPlugin, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref, _ref2) {
        var notifications, getStartServices, devTools, home, usageCollection;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                notifications = _ref.notifications, getStartServices = _ref.getStartServices;
                devTools = _ref2.devTools, home = _ref2.home, usageCollection = _ref2.usageCollection;
                home.featureCatalogue.register({
                  id: 'console',
                  title: _i18n.i18n.translate('console.devToolsTitle', {
                    defaultMessage: 'Console'
                  }),
                  description: _i18n.i18n.translate('console.devToolsDescription', {
                    defaultMessage: 'Skip cURL and use this JSON interface to work with your data directly.'
                  }),
                  icon: 'consoleApp',
                  path: '/app/kibana#/dev_tools/console',
                  showOnHomePage: true,
                  category: _public.FeatureCatalogueCategory.ADMIN
                });
                devTools.register({
                  id: 'console',
                  order: 1,
                  title: _i18n.i18n.translate('console.consoleDisplayName', {
                    defaultMessage: 'Console'
                  }),
                  enableRouting: false,
                  mount: function () {
                    var _mount = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee(_ref3, _ref4) {
                      var _ref3$core, docLinks, i18nDep, element, _ref5, renderApp, _ref6, _ref7, injectedMetadata, elasticsearchUrl;

                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _ref3$core = _ref3.core, docLinks = _ref3$core.docLinks, i18nDep = _ref3$core.i18n;
                              element = _ref4.element;
                              _context.next = 4;
                              return import('./application');

                            case 4:
                              _ref5 = _context.sent;
                              renderApp = _ref5.renderApp;
                              _context.next = 8;
                              return getStartServices();

                            case 8:
                              _ref6 = _context.sent;
                              _ref7 = _slicedToArray(_ref6, 1);
                              injectedMetadata = _ref7[0].injectedMetadata;
                              elasticsearchUrl = injectedMetadata.getInjectedVar('elasticsearchUrl', 'http://localhost:9200');
                              return _context.abrupt("return", renderApp({
                                docLinkVersion: docLinks.DOC_LINK_VERSION,
                                I18nContext: i18nDep.Context,
                                notifications: notifications,
                                elasticsearchUrl: elasticsearchUrl,
                                usageCollection: usageCollection,
                                element: element
                              }));

                            case 13:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    function mount(_x3, _x4) {
                      return _mount.apply(this, arguments);
                    }

                    return mount;
                  }()
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function setup(_x, _x2) {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(core) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function start(_x5) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }]);

  return ConsoleUIPlugin;
}();

exports.ConsoleUIPlugin = ConsoleUIPlugin;