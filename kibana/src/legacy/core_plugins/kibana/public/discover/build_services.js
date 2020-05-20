"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildServices = buildServices;

var _history = require("history");

var _public = require("../../../../../plugins/discover/public");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function buildServices(_x, _x2) {
  return _buildServices.apply(this, arguments);
}

function _buildServices() {
  _buildServices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(core, plugins) {
    var services, savedObjectService;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            services = {
              savedObjectsClient: core.savedObjects.client,
              indexPatterns: plugins.data.indexPatterns,
              chrome: core.chrome,
              overlays: core.overlays
            };
            savedObjectService = (0, _public.createSavedSearchesLoader)(services);
            return _context3.abrupt("return", {
              addBasePath: core.http.basePath.prepend,
              capabilities: core.application.capabilities,
              chrome: core.chrome,
              core: core,
              data: plugins.data,
              docLinks: core.docLinks,
              DocViewer: plugins.discover.docViews.DocViewer,
              history: (0, _history.createHashHistory)(),
              theme: plugins.charts.theme,
              filterManager: plugins.data.query.filterManager,
              getSavedSearchById: function () {
                var _getSavedSearchById = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(id) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", savedObjectService.get(id));

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function getSavedSearchById(_x3) {
                  return _getSavedSearchById.apply(this, arguments);
                }

                return getSavedSearchById;
              }(),
              getSavedSearchUrlById: function () {
                var _getSavedSearchUrlById = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee2(id) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          return _context2.abrupt("return", savedObjectService.urlFor(id));

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                function getSavedSearchUrlById(_x4) {
                  return _getSavedSearchUrlById.apply(this, arguments);
                }

                return getSavedSearchUrlById;
              }(),
              indexPatterns: plugins.data.indexPatterns,
              inspector: plugins.inspector,
              // @ts-ignore
              metadata: core.injectedMetadata.getLegacyMetadata(),
              share: plugins.share,
              timefilter: plugins.data.query.timefilter.timefilter,
              toastNotifications: core.notifications.toasts,
              uiSettings: core.uiSettings,
              visualizations: plugins.visualizations
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _buildServices.apply(this, arguments);
}