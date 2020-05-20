"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _public = require("../../../../../../src/plugins/home/public");

var _constants = require("../../common/constants");

var _new_platform_adapter = require("../lib/adapters/framework/new_platform_adapter");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(initializerContext) {
    _classCallCheck(this, Plugin);

    this.initializerContext = initializerContext;
  }

  _createClass(Plugin, [{
    key: "setup",
    value: function setup(_setup) {
      var core = _setup.core,
          plugins = _setup.plugins;
      var home = plugins.home;
      home.featureCatalogue.register({
        category: _public.FeatureCatalogueCategory.DATA,
        description: _constants.PLUGIN.DESCRIPTION,
        icon: 'uptimeApp',
        id: _constants.PLUGIN.ID,
        path: '/app/uptime#/',
        showOnHomePage: true,
        title: _constants.PLUGIN.TITLE
      });
      core.application.register({
        id: _constants.PLUGIN.ID,
        euiIconType: 'uptimeApp',
        order: 8900,
        title: 'Uptime',
        mount: function mount(params) {
          return _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _ref, _ref2, coreStart, element, libs;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return core.getStartServices();

                  case 2:
                    _ref = _context.sent;
                    _ref2 = _slicedToArray(_ref, 1);
                    coreStart = _ref2[0];
                    element = params.element;
                    libs = {
                      framework: (0, _new_platform_adapter.getKibanaFrameworkAdapter)(coreStart, plugins)
                    };
                    libs.framework.render(element);
                    return _context.abrupt("return", function () {});

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        }
      });
    }
  }]);

  return Plugin;
}();

exports.Plugin = Plugin;