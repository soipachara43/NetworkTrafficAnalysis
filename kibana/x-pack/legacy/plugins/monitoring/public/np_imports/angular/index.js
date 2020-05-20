"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AngularApp = void 0;

var _angular = _interopRequireDefault(require("angular"));

var _routes = _interopRequireDefault(require("plugins/monitoring/np_imports/ui/routes"));

var _chrome = _interopRequireDefault(require("plugins/monitoring/np_imports/ui/chrome"));

var _modules = require("plugins/monitoring/np_imports/ui/modules");

var _timefilter = require("plugins/monitoring/np_imports/ui/timefilter");

var _angular_config = require("./angular_config");

var _modules2 = require("./modules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AngularApp = function AngularApp(_ref, _ref2) {
  var _this = this;

  var core = _ref.core;
  var element = _ref2.element;

  _classCallCheck(this, AngularApp);

  _defineProperty(this, "injector", void 0);

  _defineProperty(this, "destroy", function () {
    if (_this.injector) {
      _this.injector.get('$rootScope').$destroy();
    }
  });

  _modules.uiModules.addToModule();

  var app = (0, _modules2.localAppModule)(core);
  app.config(function ($routeProvider) {
    $routeProvider.eagerInstantiationEnabled(false);

    _routes.default.addToProvider($routeProvider);
  });
  (0, _angular_config.configureAppAngularModule)(app, core);
  (0, _timefilter.registerTimefilterWithGlobalState)(app);
  var appElement = document.createElement('div');
  appElement.setAttribute('style', 'height: 100%');
  appElement.innerHTML = '<div ng-view style="height: 100%" id="monitoring-angular-app"></div>';
  this.injector = _angular.default.bootstrap(appElement, [_modules2.appModuleName]);

  _chrome.default.setInjector(this.injector);

  _angular.default.element(element).append(appElement);
};

exports.AngularApp = AngularApp;