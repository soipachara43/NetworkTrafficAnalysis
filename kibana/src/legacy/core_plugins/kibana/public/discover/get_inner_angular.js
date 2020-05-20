"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInnerAngularModule = getInnerAngularModule;
exports.getInnerAngularModuleEmbeddable = getInnerAngularModuleEmbeddable;
exports.initializeInnerAngularModule = initializeInnerAngularModule;

var _angular = _interopRequireDefault(require("angular"));

var _eui = require("@elastic/eui");

var _angular2 = require("@kbn/i18n/angular");

var _public = require("../../../../../plugins/kibana_utils/public");

var _doc_table = require("./np_ready/angular/doc_table/doc_table");

var _table_header = require("./np_ready/angular/doc_table/components/table_header");

var _pager = require("./np_ready/angular/doc_table/components/pager");

var _table_row = require("./np_ready/angular/doc_table/components/table_row");

var _pager_factory = require("./np_ready/angular/doc_table/lib/pager/pager_factory");

var _infinite_scroll = require("./np_ready/angular/doc_table/infinite_scroll");

var _doc_viewer = require("./np_ready/angular/doc_viewer");

var _discover_field_search_directive = require("./np_ready/components/field_chooser/discover_field_search_directive");

var _discover_index_pattern_directive = require("./np_ready/components/field_chooser/discover_index_pattern_directive");

var _string_progress_bar = require("./np_ready/components/field_chooser/string_progress_bar");

var _field_name = require("./np_ready/angular/directives/field_name");

var _field_chooser = require("./np_ready/components/field_chooser/field_chooser");

var _discover_field = require("./np_ready/components/field_chooser/discover_field");

var _collapsible_sidebar = require("./np_ready/angular/directives/collapsible_sidebar/collapsible_sidebar");

var _css_truncate = require("./np_ready/angular/directives/css_truncate");

var _fixed_scroll = require("./np_ready/angular/directives/fixed_scroll");

var _debounce = require("./np_ready/angular/directives/debounce/debounce");

var _render_complete = require("./np_ready/angular/directives/render_complete");

var _public2 = require("../../../../../plugins/kibana_legacy/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// inner angular imports
// these are necessary to bootstrap the local angular.
// They can stay even after NP cutover
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore

/**
 * returns the main inner angular module, it contains all the parts of Angular Discover
 * needs to render, so in the end the current 'kibana' angular module is no longer necessary
 */
function getInnerAngularModule(name, core, deps) {
  (0, _public2.initAngularBootstrap)();
  var module = initializeInnerAngularModule(name, core, deps.navigation, deps.data);
  (0, _public2.configureAppAngularModule)(module, core, true);
  return module;
}
/**
 * returns a slimmer inner angular module for embeddable rendering
 */


function getInnerAngularModuleEmbeddable(name, core, deps) {
  var module = initializeInnerAngularModule(name, core, deps.navigation, deps.data, true);
  (0, _public2.configureAppAngularModule)(module, core, true);
  return module;
}

var initialized = false;

function initializeInnerAngularModule() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'app/discover';
  var core = arguments.length > 1 ? arguments[1] : undefined;
  var navigation = arguments.length > 2 ? arguments[2] : undefined;
  var data = arguments.length > 3 ? arguments[3] : undefined;
  var embeddable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (!initialized) {
    createLocalI18nModule();
    createLocalPrivateModule();
    createLocalPromiseModule();
    createLocalTopNavModule(navigation);
    createLocalStorageModule();
    createElasticSearchModule(data);
    createPagerFactoryModule();
    createDocTableModule();
    initialized = true;
  }

  if (embeddable) {
    return _angular.default.module(name, ['ngSanitize', 'react', 'ui.bootstrap', 'discoverI18n', 'discoverPrivate', 'discoverDocTable', 'discoverPagerFactory', 'discoverPromise']).config(_public2.watchMultiDecorator).directive('icon', function (reactDirective) {
      return reactDirective(_eui.EuiIcon);
    }).directive('fieldName', _field_name.FieldNameDirectiveProvider).directive('renderComplete', _render_complete.createRenderCompleteDirective).service('debounce', ['$timeout', _debounce.DebounceProviderTimeout]);
  }

  return _angular.default.module(name, ['ngSanitize', 'ngRoute', 'react', 'ui.bootstrap', 'discoverI18n', 'discoverPrivate', 'discoverPromise', 'discoverTopNav', 'discoverLocalStorageProvider', 'discoverEs', 'discoverDocTable', 'discoverPagerFactory']).config(_public2.watchMultiDecorator).run(_public2.registerListenEventListener).directive('icon', function (reactDirective) {
    return reactDirective(_eui.EuiIcon);
  }).directive('kbnAccessibleClick', _public2.KbnAccessibleClickProvider).directive('fieldName', _field_name.FieldNameDirectiveProvider).directive('collapsibleSidebar', _collapsible_sidebar.CollapsibleSidebarProvider).directive('cssTruncate', _css_truncate.createCssTruncateDirective).directive('fixedScroll', _fixed_scroll.FixedScrollProvider).directive('renderComplete', _render_complete.createRenderCompleteDirective).directive('discoverFieldSearch', _discover_field_search_directive.createFieldSearchDirective).directive('discoverIndexPatternSelect', _discover_index_pattern_directive.createIndexPatternSelectDirective).directive('stringFieldProgressBar', _string_progress_bar.createStringFieldProgressBarDirective).directive('discoverField', _discover_field.createDiscoverFieldDirective).directive('discFieldChooser', _field_chooser.createFieldChooserDirective).service('debounce', ['$timeout', _debounce.DebounceProviderTimeout]);
}

function createLocalPromiseModule() {
  _angular.default.module('discoverPromise', []).service('Promise', _public2.PromiseServiceCreator);
}

function createLocalPrivateModule() {
  _angular.default.module('discoverPrivate', []).provider('Private', _public2.PrivateProvider);
}

function createLocalTopNavModule(navigation) {
  _angular.default.module('discoverTopNav', ['react']).directive('kbnTopNav', _public2.createTopNavDirective).directive('kbnTopNavHelper', (0, _public2.createTopNavHelper)(navigation.ui));
}

function createLocalI18nModule() {
  _angular.default.module('discoverI18n', []).provider('i18n', _angular2.I18nProvider).filter('i18n', _angular2.i18nFilter).directive('i18nId', _angular2.i18nDirective);
}

function createLocalStorageModule() {
  _angular.default.module('discoverLocalStorageProvider', ['discoverPrivate']).service('localStorage', createLocalStorageService('localStorage')).service('sessionStorage', createLocalStorageService('sessionStorage'));
}

var createLocalStorageService = function createLocalStorageService(type) {
  return function ($window) {
    return new _public.Storage($window[type]);
  };
};

function createElasticSearchModule(data) {
  _angular.default.module('discoverEs', []) // Elasticsearch client used for requesting data.  Connects to the /elasticsearch proxy
  .service('es', function () {
    return data.search.__LEGACY.esClient;
  });
}

function createPagerFactoryModule() {
  _angular.default.module('discoverPagerFactory', []).factory('pagerFactory', _pager_factory.createPagerFactory);
}

function createDocTableModule() {
  _angular.default.module('discoverDocTable', ['discoverPagerFactory', 'react']).directive('docTable', _doc_table.createDocTableDirective).directive('kbnTableHeader', _table_header.createTableHeaderDirective).directive('toolBarPagerText', _pager.createToolBarPagerTextDirective).directive('toolBarPagerText', _pager.createToolBarPagerTextDirective).directive('kbnTableRow', _table_row.createTableRowDirective).directive('toolBarPagerButtons', _pager.createToolBarPagerButtonsDirective).directive('kbnInfiniteScroll', _infinite_scroll.createInfiniteScrollDirective).directive('docViewer', _doc_viewer.createDocViewerDirective);
}