"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _i18n = require("@kbn/i18n");

var _home_app = require("./components/home_app");

var _kibana_services = require("./kibana_services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var renderApp =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(element) {
    var homeTitle, _getServices, featureCatalogue, chrome, directories;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            homeTitle = _i18n.i18n.translate('home.breadcrumbs.homeTitle', {
              defaultMessage: 'Home'
            });
            _getServices = (0, _kibana_services.getServices)(), featureCatalogue = _getServices.featureCatalogue, chrome = _getServices.chrome; // all the directories could be get in "start" phase of plugin after all of the legacy plugins will be moved to a NP

            directories = featureCatalogue.get();
            chrome.setBreadcrumbs([{
              text: homeTitle
            }]);
            (0, _reactDom.render)(_react.default.createElement(_home_app.HomeApp, {
              directories: directories
            }), element);
            return _context.abrupt("return", function () {
              (0, _reactDom.unmountComponentAtNode)(element);
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderApp(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderApp = renderApp;