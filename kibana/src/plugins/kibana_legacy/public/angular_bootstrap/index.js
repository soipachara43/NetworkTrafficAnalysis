"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAngularBootstrap = void 0;

var _lodash = require("lodash");

var _angular = _interopRequireDefault(require("angular"));

var _bind_html = require("./bind_html/bind_html");

var _tooltip = require("./tooltip/tooltip");

var _tooltip_popup = _interopRequireDefault(require("./tooltip/tooltip_popup.html"));

var _tooltip_html_unsafe_popup = _interopRequireDefault(require("./tooltip/tooltip_html_unsafe_popup.html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
// @ts-ignore
// @ts-ignore
var initAngularBootstrap = (0, _lodash.once)(function () {
  /*
  * angular-ui-bootstrap
  * http://angular-ui.github.io/bootstrap/
  * Version: 0.12.1 - 2015-02-20
  * License: MIT
  */
  _angular.default.module('ui.bootstrap', ['ui.bootstrap.tpls', 'ui.bootstrap.bindHtml', 'ui.bootstrap.tooltip']);

  _angular.default.module('ui.bootstrap.tpls', ['template/tooltip/tooltip-html-unsafe-popup.html', 'template/tooltip/tooltip-popup.html']);

  (0, _bind_html.initBindHtml)();
  (0, _tooltip.initBootstrapTooltip)();

  _angular.default.module('template/tooltip/tooltip-html-unsafe-popup.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/tooltip/tooltip-html-unsafe-popup.html', _tooltip_html_unsafe_popup.default);
  }]);

  _angular.default.module('template/tooltip/tooltip-popup.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/tooltip/tooltip-popup.html', _tooltip_popup.default);
  }]);
});
exports.initAngularBootstrap = initAngularBootstrap;