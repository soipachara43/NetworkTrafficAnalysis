/*! Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one or more contributor license agreements.
 * Licensed under the Elastic License; you may not use this file except in compliance with the Elastic License. */(function(modules){function webpackJsonpCallback(data){var chunkIds=data[0];var moreModules=data[1];var executeModules=data[2];var moduleId,chunkId,i=0,resolves=[];for(;i<chunkIds.length;i++){chunkId=chunkIds[i];if(Object.prototype.hasOwnProperty.call(installedChunks,chunkId)&&installedChunks[chunkId]){resolves.push(installedChunks[chunkId][0])}installedChunks[chunkId]=0}for(moduleId in moreModules){if(Object.prototype.hasOwnProperty.call(moreModules,moduleId)){modules[moduleId]=moreModules[moduleId]}}if(parentJsonpFunction)parentJsonpFunction(data);while(resolves.length){resolves.shift()()}deferredModules.push.apply(deferredModules,executeModules||[]);return checkDeferredModules()}function checkDeferredModules(){var result;for(var i=0;i<deferredModules.length;i++){var deferredModule=deferredModules[i];var fulfilled=true;for(var j=1;j<deferredModule.length;j++){var depId=deferredModule[j];if(installedChunks[depId]!==0)fulfilled=false}if(fulfilled){deferredModules.splice(i--,1);result=__webpack_require__(__webpack_require__.s=deferredModule[0])}}return result}var installedModules={};var installedCssChunks={10:0};var installedChunks={10:0};var deferredModules=[];function jsonpScriptSrc(chunkId){return __webpack_require__.p+""+({}[chunkId]||chunkId)+".bundle.js"}function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports}var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports}__webpack_require__.e=function requireEnsure(chunkId){var promises=[];var cssChunks={20:1};if(installedCssChunks[chunkId])promises.push(installedCssChunks[chunkId]);else if(installedCssChunks[chunkId]!==0&&cssChunks[chunkId]){promises.push(installedCssChunks[chunkId]=new Promise((function(resolve,reject){var href=""+({}[chunkId]||chunkId)+".style.css";var fullhref=__webpack_require__.p+href;var existingLinkTags=document.getElementsByTagName("link");for(var i=0;i<existingLinkTags.length;i++){var tag=existingLinkTags[i];var dataHref=tag.getAttribute("data-href")||tag.getAttribute("href");if(tag.rel==="stylesheet"&&(dataHref===href||dataHref===fullhref))return resolve()}var existingStyleTags=document.getElementsByTagName("style");for(var i=0;i<existingStyleTags.length;i++){var tag=existingStyleTags[i];var dataHref=tag.getAttribute("data-href");if(dataHref===href||dataHref===fullhref)return resolve()}var linkTag=document.createElement("link");linkTag.rel="stylesheet";linkTag.type="text/css";linkTag.onload=resolve;linkTag.onerror=function(event){var request=event&&event.target&&event.target.src||fullhref;var err=new Error("Loading CSS chunk "+chunkId+" failed.\n("+request+")");err.code="CSS_CHUNK_LOAD_FAILED";err.request=request;delete installedCssChunks[chunkId];linkTag.parentNode.removeChild(linkTag);reject(err)};linkTag.href=fullhref;var head=document.getElementsByTagName("head")[0];head.appendChild(linkTag)})).then((function(){installedCssChunks[chunkId]=0})))}var installedChunkData=installedChunks[chunkId];if(installedChunkData!==0){if(installedChunkData){promises.push(installedChunkData[2])}else{var promise=new Promise((function(resolve,reject){installedChunkData=installedChunks[chunkId]=[resolve,reject]}));promises.push(installedChunkData[2]=promise);var script=document.createElement("script");var onScriptComplete;script.charset="utf-8";script.timeout=120;if(__webpack_require__.nc){script.setAttribute("nonce",__webpack_require__.nc)}script.src=jsonpScriptSrc(chunkId);var error=new Error;onScriptComplete=function(event){script.onerror=script.onload=null;clearTimeout(timeout);var chunk=installedChunks[chunkId];if(chunk!==0){if(chunk){var errorType=event&&(event.type==="load"?"missing":event.type);var realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")";error.name="ChunkLoadError";error.type=errorType;error.request=realSrc;chunk[1](error)}installedChunks[chunkId]=undefined}};var timeout=setTimeout((function(){onScriptComplete({type:"timeout",target:script})}),12e4);script.onerror=script.onload=onScriptComplete;document.head.appendChild(script)}}return Promise.all(promises)};__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{enumerable:true,get:getter})}};__webpack_require__.r=function(exports){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(exports,"__esModule",{value:true})};__webpack_require__.t=function(value,mode){if(mode&1)value=__webpack_require__(value);if(mode&8)return value;if(mode&4&&typeof value==="object"&&value&&value.__esModule)return value;var ns=Object.create(null);__webpack_require__.r(ns);Object.defineProperty(ns,"default",{enumerable:true,value:value});if(mode&2&&typeof value!="string")for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module["default"]}:function getModuleExports(){return module};__webpack_require__.d(getter,"a",getter);return getter};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};__webpack_require__.p="__REPLACE_WITH_PUBLIC_PATH__";__webpack_require__.oe=function(err){console.error(err);throw err};var jsonpArray=window["webpackJsonp"]=window["webpackJsonp"]||[];var oldJsonpFunction=jsonpArray.push.bind(jsonpArray);jsonpArray.push=webpackJsonpCallback;jsonpArray=jsonpArray.slice();for(var i=0;i<jsonpArray.length;i++)webpackJsonpCallback(jsonpArray[i]);var parentJsonpFunction=oldJsonpFunction;deferredModules.push([3973,0]);return checkDeferredModules()})({0:function(module,exports){module.exports=__kbnSharedDeps__.React},1:function(module,exports){module.exports=__kbnSharedDeps__.KbnI18n},11:function(module,exports){module.exports=__kbnSharedDeps__.ReactDom},118:function(module,exports){module.exports=__kbnSharedDeps__.ElasticEuiDarkTheme},119:function(module,exports){module.exports=__kbnSharedDeps__.KbnI18nAngular},120:function(module,exports){module.exports=__kbnSharedDeps__.ElasticEuiChartsTheme},128:function(module,exports){module.exports=__kbnSharedDeps__.ReactDomServer},142:function(module,exports){module.exports=__kbnSharedDeps__.ElasticsearchBrowser},15:function(module,exports){module.exports=__kbnSharedDeps__.Moment},18:function(module,exports){module.exports=__kbnSharedDeps__.Rxjs},2:function(module,exports){module.exports=__kbnSharedDeps__.ElasticEui},21:function(module,exports){module.exports=__kbnSharedDeps__.ElasticEuiLightTheme},23:function(module,exports){module.exports=__kbnSharedDeps__.Jquery},31:function(module,exports){module.exports=__kbnSharedDeps__.RxjsOperators},32:function(module,exports){module.exports=vendors_3},33:function(module,exports){module.exports=__kbnSharedDeps__.ReactRouterDom},37:function(module,exports){module.exports=vendors_2},39:function(module,exports){module.exports=__kbnSharedDeps__.MomentTimezone},3973:function(module,exports,__webpack_require__){"use strict";var _i18n=__webpack_require__(1);var _kibanaCore__=__webpack_require__(92);var injectedMetadata=JSON.parse(document.querySelector("kbn-injected-metadata").getAttribute("data"));_i18n.i18n.load(injectedMetadata.i18n.translationsUrl).catch((function(e){return e})).then((function(i18nError){var coreSystem=new _kibanaCore__.CoreSystem({injectedMetadata:injectedMetadata,rootDomElement:document.body,browserSupportsCsp:!window.__kbnCspNotEnforced__,requireLegacyFiles:function requireLegacyFiles(){__webpack_require__(3974)}});coreSystem.setup().then((function(coreSetup){if(i18nError){coreSetup.fatalErrors.add(i18nError)}return coreSystem.start()}))}))},3974:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.start=exports.setup=void 0;var _new_platform=__webpack_require__(9);var _modules=__webpack_require__(20);var _=__webpack_require__(3975);var pluginInstance=(0,_.plugin)({});var setupPlugins={__LEGACY:{uiModules:_modules.uiModules},np:_new_platform.npSetup.plugins};var setup=pluginInstance.setup(_new_platform.npSetup.core,setupPlugins);exports.setup=setup;var start=pluginInstance.start(_new_platform.npStart.core,_new_platform.npStart.plugins);exports.start=start},3975:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.plugin=void 0;__webpack_require__(54);__webpack_require__(587);__webpack_require__(608);__webpack_require__(311);__webpack_require__(607);__webpack_require__(237);__webpack_require__(1215);__webpack_require__(782);__webpack_require__(3976);__webpack_require__(3981);var _plugin=__webpack_require__(783);var plugin=function plugin(initializerContext){return new _plugin.MapsPlugin};exports.plugin=plugin},3976:function(module,exports,__webpack_require__){"use strict";var _lodash=_interopRequireDefault(__webpack_require__(3));var _chrome=_interopRequireDefault(__webpack_require__(27));var _risonNode=_interopRequireDefault(__webpack_require__(295));__webpack_require__(1269);__webpack_require__(873);var _react=_interopRequireDefault(__webpack_require__(0));var _react2=__webpack_require__(4);var _i18n=__webpack_require__(1);var _capabilities=__webpack_require__(312);var _reactDom=__webpack_require__(11);var _modules=__webpack_require__(20);var _kibana_services=__webpack_require__(54);var _reactRedux=__webpack_require__(10);var _store=__webpack_require__(501);var _gis_map=__webpack_require__(780);var _help_menu_util=__webpack_require__(784);var _map_actions=__webpack_require__(76);var _ui=__webpack_require__(167);var _ui_actions=__webpack_require__(168);var _ui_selectors=__webpack_require__(169);var _util=__webpack_require__(220);var _map_selectors=__webpack_require__(58);var _non_serializable_instances=__webpack_require__(183);var _doc_title=__webpack_require__(274);var _notify=__webpack_require__(60);var _get_initial_layers=__webpack_require__(781);var _get_initial_query=__webpack_require__(3978);var _get_initial_time_filters=__webpack_require__(3979);var _get_initial_refresh_config=__webpack_require__(3980);var _constants=__webpack_require__(13);var _new_platform=__webpack_require__(9);var _public=__webpack_require__(8);var _public2=__webpack_require__(127);var _public3=__webpack_require__(51);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)}))}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}));keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach((function(key){_defineProperty(target,key,source[key])}))}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(source).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}}(0,_public3.loadKbnTopNavDirectives)(_new_platform.npStart.plugins.navigation.ui);var savedQueryService=_new_platform.npStart.plugins.data.query.savedQueries;var REACT_ANCHOR_DOM_ELEMENT_ID="react-maps-root";var app=_modules.uiModules.get(_constants.MAP_APP_PATH,[]);function getInitialLayersFromUrlParam(){var locationSplit=window.location.href.split("?");if(locationSplit.length<=1){return[]}var mapAppParams=new URLSearchParams(locationSplit[1]);if(!mapAppParams.has("initialLayers")){return[]}try{return _risonNode.default.decode_array(mapAppParams.get("initialLayers"))}catch(e){_notify.toastNotifications.addWarning({title:_i18n.i18n.translate("xpack.maps.initialLayers.unableToParseTitle",{defaultMessage:"Inital layers not added to map"}),text:_i18n.i18n.translate("xpack.maps.initialLayers.unableToParseMessage",{defaultMessage:"Unable to parse contents of 'initialLayers' parameter. Error: {errorMsg}",values:{errorMsg:e.message}})});return[]}}app.controller("GisMapController",(function($scope,$route,kbnUrl,localStorage,AppState,globalState){var filterManager=_new_platform.npStart.plugins.data.query.filterManager;var savedMap=$route.current.locals.map;$scope.screenTitle=savedMap.title;var unsubscribe;var initialLayerListConfig;var $state=new AppState;var store=(0,_store.createMapStore)();function getAppStateFilters(){return _lodash.default.get($state,"filters",[])}$scope.$listen(globalState,"fetch_with_changes",(function(diff){if(diff.includes("time")||diff.includes("filters")){onQueryChange({filters:[].concat(_toConsumableArray(globalState.filters),_toConsumableArray(getAppStateFilters())),time:globalState.time})}if(diff.includes("refreshInterval")){$scope.onRefreshChange({isPaused:globalState.pause,refreshInterval:globalState.value})}}));$scope.$listen($state,"fetch_with_changes",(function(diff){if((diff.includes("query")||diff.includes("filters"))&&$state.query){onQueryChange({filters:[].concat(_toConsumableArray(globalState.filters),_toConsumableArray(getAppStateFilters())),query:$state.query})}}));function syncAppAndGlobalState(){$scope.$evalAsync((function(){$state.query=$scope.query;$state.filters=filterManager.getAppFilters();$state.save();globalState.time=$scope.time;globalState.refreshInterval={pause:$scope.refreshConfig.isPaused,value:$scope.refreshConfig.interval};globalState.filters=filterManager.getGlobalFilters();globalState.save()}))}$scope.query=(0,_get_initial_query.getInitialQuery)({mapStateJSON:savedMap.mapStateJSON,appState:$state,userQueryLanguage:localStorage.get("kibana.userQueryLanguage")});$scope.time=(0,_get_initial_time_filters.getInitialTimeFilters)({mapStateJSON:savedMap.mapStateJSON,globalState:globalState});$scope.refreshConfig=(0,_get_initial_refresh_config.getInitialRefreshConfig)({mapStateJSON:savedMap.mapStateJSON,globalState:globalState});$scope.showSaveQuery=_capabilities.capabilities.get().maps.saveQuery;$scope.$watch((function(){return _capabilities.capabilities.get().maps.saveQuery}),(function(newCapability){$scope.showSaveQuery=newCapability}));$scope.onQuerySaved=function(savedQuery){$scope.savedQuery=savedQuery};$scope.onSavedQueryUpdated=function(savedQuery){$scope.savedQuery=_objectSpread({},savedQuery)};$scope.onClearSavedQuery=function(){delete $scope.savedQuery;delete $state.savedQuery;onQueryChange({filters:filterManager.getGlobalFilters(),query:{query:"",language:localStorage.get("kibana.userQueryLanguage")}})};function updateStateFromSavedQuery(savedQuery){var savedQueryFilters=savedQuery.attributes.filters||[];var globalFilters=filterManager.getGlobalFilters();var allFilters=[].concat(_toConsumableArray(savedQueryFilters),_toConsumableArray(globalFilters));if(savedQuery.attributes.timefilter){if(savedQuery.attributes.timefilter.refreshInterval){$scope.onRefreshChange({isPaused:savedQuery.attributes.timefilter.refreshInterval.pause,refreshInterval:savedQuery.attributes.timefilter.refreshInterval.value})}onQueryChange({filters:allFilters,query:savedQuery.attributes.query,time:savedQuery.attributes.timefilter})}else{onQueryChange({filters:allFilters,query:savedQuery.attributes.query})}}$scope.$watch("savedQuery",(function(newSavedQuery){if(!newSavedQuery)return;$state.savedQuery=newSavedQuery.id;updateStateFromSavedQuery(newSavedQuery)}));$scope.$watch((function(){return $state.savedQuery}),(function(newSavedQueryId){if(!newSavedQueryId){$scope.savedQuery=undefined;return}if($scope.savedQuery&&newSavedQueryId!==$scope.savedQuery.id){savedQueryService.getSavedQuery(newSavedQueryId).then((function(savedQuery){$scope.$evalAsync((function(){$scope.savedQuery=savedQuery;updateStateFromSavedQuery(savedQuery)}))}))}}));function onQueryChange(_x){return _onQueryChange.apply(this,arguments)}function _onQueryChange(){_onQueryChange=_asyncToGenerator(regeneratorRuntime.mark((function _callee2(_ref4){var filters,query,time,refresh;return regeneratorRuntime.wrap((function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:filters=_ref4.filters,query=_ref4.query,time=_ref4.time,refresh=_ref4.refresh;if(filters){filterManager.setFilters(filters);$scope.filters=filterManager.getFilters()}if(query){$scope.query=query}if(time){$scope.time=time}syncAppAndGlobalState();dispatchSetQuery(refresh);case 6:case"end":return _context2.stop()}}}),_callee2)})));return _onQueryChange.apply(this,arguments)}function dispatchSetQuery(refresh){store.dispatch((0,_map_actions.setQuery)({filters:$scope.filters,query:$scope.query,timeFilters:$scope.time,refresh:refresh}))}$scope.indexPatterns=[];$scope.onQuerySubmit=function(_ref){var dateRange=_ref.dateRange,query=_ref.query;onQueryChange({query:query,time:dateRange,refresh:true})};$scope.updateFiltersAndDispatch=function(filters){onQueryChange({filters:filters})};$scope.onRefreshChange=function(_ref2){var isPaused=_ref2.isPaused,refreshInterval=_ref2.refreshInterval;$scope.refreshConfig={isPaused:isPaused,interval:refreshInterval?refreshInterval:$scope.refreshConfig.interval};syncAppAndGlobalState();store.dispatch((0,_map_actions.setRefreshConfig)($scope.refreshConfig))};function addFilters(newFilters){newFilters.forEach((function(filter){filter.$state=_public.esFilters.FilterStateStore.APP_STATE}));$scope.updateFiltersAndDispatch([].concat(_toConsumableArray($scope.filters),_toConsumableArray(newFilters)))}function hasUnsavedChanges(){var state=store.getState();var layerList=(0,_map_selectors.getLayerListRaw)(state);var layerListConfigOnly=(0,_util.copyPersistentState)(layerList);var savedLayerList=savedMap.getLayerList();return!savedLayerList?!_lodash.default.isEqual(layerListConfigOnly,initialLayerListConfig):!_lodash.default.isEqual(JSON.parse(JSON.stringify(layerListConfigOnly)),savedLayerList)}function isOnMapNow(){return window.location.hash.startsWith("#/".concat(_constants.MAP_SAVED_OBJECT_TYPE))}function beforeUnload(event){if(!isOnMapNow()){return}var hasChanged=hasUnsavedChanges();if(hasChanged){event.preventDefault();event.returnValue="foobar"}}window.addEventListener("beforeunload",beforeUnload);function renderMap(){return _renderMap.apply(this,arguments)}function _renderMap(){_renderMap=_asyncToGenerator(regeneratorRuntime.mark((function _callee3(){var savedObjectFilters,mapState,uiState,layerList,initialFilters,root;return regeneratorRuntime.wrap((function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:store.dispatch((0,_map_actions.setSelectedLayer)(null));store.dispatch((0,_ui_actions.updateFlyout)(_ui.FLYOUT_STATE.NONE));store.dispatch((0,_ui_actions.setReadOnly)(!_capabilities.capabilities.get().maps.save));handleStoreChanges(store);unsubscribe=store.subscribe((function(){handleStoreChanges(store)}));savedObjectFilters=[];if(savedMap.mapStateJSON){mapState=JSON.parse(savedMap.mapStateJSON);store.dispatch((0,_map_actions.setGotoWithCenter)({lat:mapState.center.lat,lon:mapState.center.lon,zoom:mapState.zoom}));if(mapState.filters){savedObjectFilters=mapState.filters}}if(savedMap.uiStateJSON){uiState=JSON.parse(savedMap.uiStateJSON);store.dispatch((0,_ui_actions.setIsLayerTOCOpen)(_lodash.default.get(uiState,"isLayerTOCOpen",_ui.DEFAULT_IS_LAYER_TOC_OPEN)));store.dispatch((0,_ui_actions.setOpenTOCDetails)(_lodash.default.get(uiState,"openTOCDetails",[])))}layerList=(0,_get_initial_layers.getInitialLayers)(savedMap.layerListJSON,getInitialLayersFromUrlParam());initialLayerListConfig=(0,_util.copyPersistentState)(layerList);store.dispatch((0,_map_actions.replaceLayerList)(layerList));store.dispatch((0,_map_actions.setRefreshConfig)($scope.refreshConfig));initialFilters=[].concat(_toConsumableArray(_lodash.default.get(globalState,"filters",[])),_toConsumableArray(getAppStateFilters()),_toConsumableArray(savedObjectFilters));_context3.next=15;return onQueryChange({filters:initialFilters});case 15:root=document.getElementById(REACT_ANCHOR_DOM_ELEMENT_ID);(0,_reactDom.render)(_react.default.createElement(_reactRedux.Provider,{store:store},_react.default.createElement(_react2.I18nProvider,null,_react.default.createElement(_gis_map.GisMap,{addFilters:addFilters}))),root);case 17:case"end":return _context3.stop()}}}),_callee3)})));return _renderMap.apply(this,arguments)}renderMap();var prevIndexPatternIds;function updateIndexPatterns(_x2){return _updateIndexPatterns.apply(this,arguments)}function _updateIndexPatterns(){_updateIndexPatterns=_asyncToGenerator(regeneratorRuntime.mark((function _callee5(nextIndexPatternIds){var indexPatterns,getIndexPatternPromises;return regeneratorRuntime.wrap((function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:indexPatterns=[];getIndexPatternPromises=nextIndexPatternIds.map(function(){var _ref5=_asyncToGenerator(regeneratorRuntime.mark((function _callee4(indexPatternId){var indexPattern;return regeneratorRuntime.wrap((function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:_context4.prev=0;_context4.next=3;return(0,_kibana_services.getIndexPatternService)().get(indexPatternId);case 3:indexPattern=_context4.sent;indexPatterns.push(indexPattern);_context4.next=9;break;case 7:_context4.prev=7;_context4.t0=_context4["catch"](0);case 9:case"end":return _context4.stop()}}}),_callee4,null,[[0,7]])})));return function(_x4){return _ref5.apply(this,arguments)}}());_context5.next=4;return Promise.all(getIndexPatternPromises);case 4:if(!(prevIndexPatternIds!==nextIndexPatternIds)){_context5.next=6;break}return _context5.abrupt("return");case 6:$scope.$evalAsync((function(){$scope.indexPatterns=indexPatterns}));case 7:case"end":return _context5.stop()}}}),_callee5)})));return _updateIndexPatterns.apply(this,arguments)}$scope.isFullScreen=false;$scope.isSaveDisabled=false;function handleStoreChanges(store){var nextIsFullScreen=(0,_ui_selectors.getIsFullScreen)(store.getState());if(nextIsFullScreen!==$scope.isFullScreen){$scope.$evalAsync((function(){$scope.isFullScreen=nextIsFullScreen}))}var nextIndexPatternIds=(0,_map_selectors.getQueryableUniqueIndexPatternIds)(store.getState());if(nextIndexPatternIds!==prevIndexPatternIds){prevIndexPatternIds=nextIndexPatternIds;updateIndexPatterns(nextIndexPatternIds)}var nextIsSaveDisabled=(0,_map_selectors.hasDirtyState)(store.getState());if(nextIsSaveDisabled!==$scope.isSaveDisabled){$scope.$evalAsync((function(){$scope.isSaveDisabled=nextIsSaveDisabled}))}}$scope.$on("$destroy",(function(){window.removeEventListener("beforeunload",beforeUnload);if(unsubscribe){unsubscribe()}var node=document.getElementById(REACT_ANCHOR_DOM_ELEMENT_ID);if(node){(0,_reactDom.unmountComponentAtNode)(node)}}));var updateBreadcrumbs=function updateBreadcrumbs(){_chrome.default.breadcrumbs.set([{text:_i18n.i18n.translate("xpack.maps.mapController.mapsBreadcrumbLabel",{defaultMessage:"Maps"}),onClick:function onClick(){if(isOnMapNow()&&hasUnsavedChanges()){var navigateAway=window.confirm(_i18n.i18n.translate("xpack.maps.mapController.unsavedChangesWarning",{defaultMessage:"Your unsaved changes might not be saved"}));if(navigateAway){window.location.hash="#"}}else{window.location.hash="#"}}},{text:savedMap.title}])};updateBreadcrumbs();(0,_help_menu_util.addHelpMenuToAppChrome)(_chrome.default);function doSave(_x3){return _doSave.apply(this,arguments)}function _doSave(){_doSave=_asyncToGenerator(regeneratorRuntime.mark((function _callee6(saveOptions){var id;return regeneratorRuntime.wrap((function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:_context6.next=2;return store.dispatch((0,_map_actions.clearTransientLayerStateAndCloseFlyout)());case 2:savedMap.syncWithStore(store.getState());_context6.prev=3;_context6.next=6;return savedMap.save(saveOptions);case 6:id=_context6.sent;_doc_title.docTitle.change(savedMap.title);_context6.next=14;break;case 10:_context6.prev=10;_context6.t0=_context6["catch"](3);_notify.toastNotifications.addDanger({title:_i18n.i18n.translate("xpack.maps.mapController.saveErrorMessage",{defaultMessage:"Error on saving '{title}'",values:{title:savedMap.title}}),text:_context6.t0.message,"data-test-subj":"saveMapError"});return _context6.abrupt("return",{error:_context6.t0});case 14:if(id){_notify.toastNotifications.addSuccess({title:_i18n.i18n.translate("xpack.maps.mapController.saveSuccessMessage",{defaultMessage:"Saved '{title}'",values:{title:savedMap.title}}),"data-test-subj":"saveMapSuccess"});updateBreadcrumbs();if(savedMap.id!==$route.current.params.id){$scope.$evalAsync((function(){kbnUrl.change("map/{{id}}",{id:savedMap.id})}))}}return _context6.abrupt("return",{id:id});case 16:case"end":return _context6.stop()}}}),_callee6,null,[[3,10]])})));return _doSave.apply(this,arguments)}(0,_kibana_services.getTimeFilter)().disableTimeRangeSelector();(0,_kibana_services.getTimeFilter)().disableAutoRefreshSelector();$scope.showDatePicker=true;$scope.topNavMenu=[{id:"full-screen",label:_i18n.i18n.translate("xpack.maps.mapController.fullScreenButtonLabel",{defaultMessage:"full screen"}),description:_i18n.i18n.translate("xpack.maps.mapController.fullScreenDescription",{defaultMessage:"full screen"}),testId:"mapsFullScreenMode",run:function run(){store.dispatch((0,_ui_actions.enableFullScreen)())}},{id:"inspect",label:_i18n.i18n.translate("xpack.maps.mapController.openInspectorButtonLabel",{defaultMessage:"inspect"}),description:_i18n.i18n.translate("xpack.maps.mapController.openInspectorDescription",{defaultMessage:"Open Inspector"}),testId:"openInspectorButton",run:function run(){var inspectorAdapters=(0,_non_serializable_instances.getInspectorAdapters)(store.getState());(0,_kibana_services.getInspector)().open(inspectorAdapters,{})}}].concat(_toConsumableArray(_capabilities.capabilities.get().maps.save?[{id:"save",label:_i18n.i18n.translate("xpack.maps.mapController.saveMapButtonLabel",{defaultMessage:"save"}),description:_i18n.i18n.translate("xpack.maps.mapController.saveMapDescription",{defaultMessage:"Save map"}),testId:"mapSaveButton",disableButton:function disableButton(){return $scope.isSaveDisabled},tooltip:function tooltip(){if($scope.isSaveDisabled){return _i18n.i18n.translate("xpack.maps.mapController.saveMapDisabledButtonTooltip",{defaultMessage:"Save or Cancel your layer changes before saving"})}},run:function(){var _run=_asyncToGenerator(regeneratorRuntime.mark((function _callee(){var onSave,saveModal;return regeneratorRuntime.wrap((function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:onSave=function onSave(_ref3){var newTitle=_ref3.newTitle,newCopyOnSave=_ref3.newCopyOnSave,isTitleDuplicateConfirmed=_ref3.isTitleDuplicateConfirmed,onTitleDuplicate=_ref3.onTitleDuplicate;var currentTitle=savedMap.title;savedMap.title=newTitle;savedMap.copyOnSave=newCopyOnSave;var saveOptions={confirmOverwrite:false,isTitleDuplicateConfirmed:isTitleDuplicateConfirmed,onTitleDuplicate:onTitleDuplicate};return doSave(saveOptions).then((function(response){if(!response.id||response.error){savedMap.title=currentTitle}return response}))};saveModal=_react.default.createElement(_public2.SavedObjectSaveModal,{onSave:onSave,onClose:function onClose(){},title:savedMap.title,showCopyOnSave:savedMap.id?true:false,objectType:_constants.MAP_SAVED_OBJECT_TYPE,showDescription:false});(0,_public2.showSaveModal)(saveModal,_new_platform.npStart.core.i18n.Context);case 3:case"end":return _context.stop()}}}),_callee)})));function run(){return _run.apply(this,arguments)}return run}()}]:[]))}))},3978:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.getInitialQuery=getInitialQuery;var _chrome=_interopRequireDefault(__webpack_require__(27));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var settings=_chrome.default.getUiSettingsClient();function getInitialQuery(_ref){var mapStateJSON=_ref.mapStateJSON,_ref$appState=_ref.appState,appState=_ref$appState===void 0?{}:_ref$appState,userQueryLanguage=_ref.userQueryLanguage;if(appState.query){return appState.query}if(mapStateJSON){var mapState=JSON.parse(mapStateJSON);if(mapState.query){return mapState.query}}return{query:"",language:userQueryLanguage||settings.get("search:queryLanguage")}}},3979:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.getInitialTimeFilters=getInitialTimeFilters;var _chrome=_interopRequireDefault(__webpack_require__(27));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}));keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach((function(key){_defineProperty(target,key,source[key])}))}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(source).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var uiSettings=_chrome.default.getUiSettingsClient();function getInitialTimeFilters(_ref){var mapStateJSON=_ref.mapStateJSON,_ref$globalState=_ref.globalState,globalState=_ref$globalState===void 0?{}:_ref$globalState;if(mapStateJSON){var mapState=JSON.parse(mapStateJSON);if(mapState.timeFilters){return mapState.timeFilters}}var defaultTime=uiSettings.get("timepicker:timeDefaults");return _objectSpread({},defaultTime,{},globalState.time)}},3980:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.getInitialRefreshConfig=getInitialRefreshConfig;var _chrome=_interopRequireDefault(__webpack_require__(27));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}));keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach((function(key){_defineProperty(target,key,source[key])}))}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(source).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var uiSettings=_chrome.default.getUiSettingsClient();function getInitialRefreshConfig(_ref){var mapStateJSON=_ref.mapStateJSON,_ref$globalState=_ref.globalState,globalState=_ref$globalState===void 0?{}:_ref$globalState;if(mapStateJSON){var mapState=JSON.parse(mapStateJSON);if(mapState.refreshConfig){return mapState.refreshConfig}}var defaultRefreshConfig=uiSettings.get("timepicker:refreshIntervalDefaults");var refreshInterval=_objectSpread({},defaultRefreshConfig,{},globalState.refreshInterval);return{isPaused:refreshInterval.pause,interval:refreshInterval.value}}},3981:function(module,exports,__webpack_require__){"use strict";var _i18n=__webpack_require__(1);var _capabilities=__webpack_require__(312);var _chrome=_interopRequireDefault(__webpack_require__(27));var _routes=_interopRequireDefault(__webpack_require__(65));var _doc_title=__webpack_require__(274);var _listing_ng_wrapper=_interopRequireDefault(__webpack_require__(3982));var _map=_interopRequireDefault(__webpack_require__(3983));var _new_platform=__webpack_require__(9);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}_routes.default.enable();_routes.default.defaults(/.*/,{badge:function badge(uiCapabilities){if(uiCapabilities.maps.save){return undefined}return{text:_i18n.i18n.translate("xpack.maps.badge.readOnly.text",{defaultMessage:"Read only"}),tooltip:_i18n.i18n.translate("xpack.maps.badge.readOnly.tooltip",{defaultMessage:"Unable to save maps"}),iconType:"glasses"}}}).when("/",{template:_listing_ng_wrapper.default,controller:function controller($scope,gisMapSavedObjectLoader,config){$scope.listingLimit=config.get("savedObjects:listingLimit");$scope.find=function(search){return gisMapSavedObjectLoader.find(search,$scope.listingLimit)};$scope.delete=function(ids){return gisMapSavedObjectLoader.delete(ids)};$scope.readOnly=!_capabilities.capabilities.get().maps.save},resolve:{hasMaps:function hasMaps(kbnUrl){_chrome.default.getSavedObjectsClient().find({type:"map",perPage:1}).then((function(resp){if(resp.savedObjects.length===0){kbnUrl.redirect("/map")}return true}))}}}).when("/map",{template:_map.default,controller:"GisMapController",resolve:{map:function map(gisMapSavedObjectLoader,redirectWhenMissing){return gisMapSavedObjectLoader.get().catch(redirectWhenMissing({map:"/"}))}}}).when("/map/:id",{template:_map.default,controller:"GisMapController",resolve:{map:function map(gisMapSavedObjectLoader,redirectWhenMissing,$route){var id=$route.current.params.id;return gisMapSavedObjectLoader.get(id).then((function(savedMap){_new_platform.npStart.core.chrome.recentlyAccessed.add(savedMap.getFullPath(),savedMap.title,id);_doc_title.docTitle.change(savedMap.title);return savedMap})).catch(redirectWhenMissing({map:"/"}))}}}).otherwise({redirectTo:"/"})},3982:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_exports__["default"]='<map-listing\n  find="find"\n  delete="delete"\n  listing-limit="listingLimit"\n  read-only="readOnly"\n></map-listing>\n'},3983:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_exports__["default"]='<div id="maps-plugin"  ng-class="{mapFullScreen: isFullScreen}">\n\n  <div id="maps-top-nav">\n    <div>\n      <kbn-top-nav\n        ng-show="chrome.getVisible()"\n        app-name="\'maps\'"\n        config="topNavMenu"\n        show-search-bar="chrome.getVisible()"\n        show-filter-bar="chrome.getVisible()"\n        show-date-picker="showDatePicker"\n        show-save-query="showSaveQuery"\n        query="query"\n        saved-query="savedQuery"\n        on-query-submit="onQuerySubmit"\n        filters="filters"\n        on-filters-updated="updateFiltersAndDispatch"\n        index-patterns="indexPatterns"\n        date-range-from="time.from"\n        date-range-to="time.to"\n        is-refresh-paused="refreshConfig.isPaused"\n        refresh-interval="refreshConfig.interval"\n        on-refresh-change="onRefreshChange"\n        on-saved="onQuerySaved"\n        on-saved-query-updated="onSavedQueryUpdated"\n        on-clear-saved-query="onClearSavedQuery"\n      >\n      </kbn-top-nav>\n    </div>\n  </div>\n\n  <h1 class="euiScreenReaderOnly">{{screenTitle}}</h1>\n  <div id="react-maps-root"></div>\n\n</div>\n'},4:function(module,exports){module.exports=__kbnSharedDeps__.KbnI18nReact},40:function(module,exports){module.exports=vendors_1},41:function(module,exports){module.exports=vendors_0},42:function(module,exports){module.exports=__kbnSharedDeps__.Angular},48:function(module,exports){module.exports=__kbnSharedDeps__.ElasticCharts},77:function(module,exports){module.exports=__kbnSharedDeps__.ElasticEuiLibServices},95:function(module,exports){module.exports=__kbnSharedDeps__.Monaco}});