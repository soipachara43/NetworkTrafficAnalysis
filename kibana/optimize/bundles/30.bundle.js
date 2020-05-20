/*! Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one or more contributor license agreements.
 * Licensed under the Elastic License; you may not use this file except in compliance with the Elastic License. */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[30],{5216:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.renderApp=renderApp;var _angular=_interopRequireDefault(__webpack_require__(42));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)}))}}function renderApp(_x,_x2){return _renderApp.apply(this,arguments)}function _renderApp(){_renderApp=_asyncToGenerator(regeneratorRuntime.mark((function _callee(moduleName,element){var $injector;return regeneratorRuntime.wrap((function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return __webpack_require__.e(22).then(__webpack_require__.t.bind(null,7074,7));case 2:$injector=mountDiscoverApp(moduleName,element);return _context.abrupt("return",(function(){return $injector.get("$rootScope").$destroy()}));case 4:case"end":return _context.stop()}}}),_callee)})));return _renderApp.apply(this,arguments)}function mountDiscoverApp(moduleName,element){var mountpoint=document.createElement("div");var appWrapper=document.createElement("div");appWrapper.setAttribute("ng-view","");mountpoint.appendChild(appWrapper);var $injector=_angular.default.bootstrap(mountpoint,[moduleName]);element.appendChild(mountpoint);return $injector}}}]);