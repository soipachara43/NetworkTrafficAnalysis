(window["transform_bundle_jsonpfunction"]=window["transform_bundle_jsonpfunction"]||[]).push([[5],{251:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.wrapArray=wrapArray;exports.UnreachableCaseError=void 0;function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call}return _assertThisInitialized(self)}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function")}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass)}function _wrapNativeSuper(Class){var _cache=typeof Map==="function"?new Map:undefined;_wrapNativeSuper=function _wrapNativeSuper(Class){if(Class===null||!_isNativeFunction(Class))return Class;if(typeof Class!=="function"){throw new TypeError("Super expression must either be null or a function")}if(typeof _cache!=="undefined"){if(_cache.has(Class))return _cache.get(Class);_cache.set(Class,Wrapper)}function Wrapper(){return _construct(Class,arguments,_getPrototypeOf(this).constructor)}Wrapper.prototype=Object.create(Class.prototype,{constructor:{value:Wrapper,enumerable:false,writable:true,configurable:true}});return _setPrototypeOf(Wrapper,Class)};return _wrapNativeSuper(Class)}function isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],(function(){})));return true}catch(e){return false}}function _construct(Parent,args,Class){if(isNativeReflectConstruct()){_construct=Reflect.construct}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor;if(Class)_setPrototypeOf(instance,Class.prototype);return instance}}return _construct.apply(null,arguments)}function _isNativeFunction(fn){return Function.toString.call(fn).indexOf("[native code]")!==-1}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)};return _getPrototypeOf(o)}function wrapArray(subj){return Array.isArray(subj)?subj:[subj]}var UnreachableCaseError=function(_Error){_inherits(UnreachableCaseError,_Error);function UnreachableCaseError(val){_classCallCheck(this,UnreachableCaseError);return _possibleConstructorReturn(this,_getPrototypeOf(UnreachableCaseError).call(this,"Unreachable case: ".concat(val)))}return UnreachableCaseError}(_wrapNativeSuper(Error));exports.UnreachableCaseError=UnreachableCaseError},252:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.ReportStorageManager=void 0;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var ReportStorageManager=function(){function ReportStorageManager(storageKey,storage){_classCallCheck(this,ReportStorageManager);_defineProperty(this,"storageKey",void 0);_defineProperty(this,"storage",void 0);this.storageKey=storageKey;this.storage=storage}_createClass(ReportStorageManager,[{key:"get",value:function get(){if(!this.storage)return;return this.storage.get(this.storageKey)}},{key:"store",value:function store(report){if(!this.storage)return;this.storage.set(this.storageKey,report)}}]);return ReportStorageManager}();exports.ReportStorageManager=ReportStorageManager},253:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.ReportManager=void 0;var _momentTimezone=_interopRequireDefault(__webpack_require__(32));var _util=__webpack_require__(251);var _metrics=__webpack_require__(80);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var REPORT_VERSION=1;var ReportManager=function(){function ReportManager(report){_classCallCheck(this,ReportManager);_defineProperty(this,"report",void 0);this.report=report||ReportManager.createReport()}_createClass(ReportManager,[{key:"clearReport",value:function clearReport(){this.report=ReportManager.createReport()}},{key:"isReportEmpty",value:function isReportEmpty(){var _this$report=this.report,uiStatsMetrics=_this$report.uiStatsMetrics,userAgent=_this$report.userAgent,appUsage=_this$report.application_usage;var noUiStats=!uiStatsMetrics||Object.keys(uiStatsMetrics).length===0;var noUserAgent=!userAgent||Object.keys(userAgent).length===0;var noAppUsage=!appUsage||Object.keys(appUsage).length===0;return noUiStats&&noUserAgent&&noAppUsage}},{key:"incrementStats",value:function incrementStats(count,stats){var _ref=stats||{},_ref$min=_ref.min,min=_ref$min===void 0?0:_ref$min,_ref$max=_ref.max,max=_ref$max===void 0?0:_ref$max,_ref$sum=_ref.sum,sum=_ref$sum===void 0?0:_ref$sum;var newMin=Math.min(min,count);var newMax=Math.max(max,count);var newAvg=newMin+newMax/2;var newSum=sum+count;return{min:newMin,max:newMax,avg:newAvg,sum:newSum}}},{key:"assignReports",value:function assignReports(newMetrics){var _this=this;(0,_util.wrapArray)(newMetrics).forEach((function(newMetric){return _this.assignReport(_this.report,newMetric)}));return{report:this.report}}},{key:"assignReport",value:function assignReport(report,metric){var key=ReportManager.createMetricKey(metric);switch(metric.type){case _metrics.METRIC_TYPE.USER_AGENT:{var appName=metric.appName,type=metric.type,userAgent=metric.userAgent;if(userAgent){report.userAgent=_defineProperty({},key,{key:key,appName:appName,type:type,userAgent:metric.userAgent})}return}case _metrics.METRIC_TYPE.CLICK:case _metrics.METRIC_TYPE.LOADED:case _metrics.METRIC_TYPE.COUNT:{var _appName=metric.appName,_type=metric.type,eventName=metric.eventName,count=metric.count;report.uiStatsMetrics=report.uiStatsMetrics||{};var existingStats=(report.uiStatsMetrics[key]||{}).stats;report.uiStatsMetrics[key]={key:key,appName:_appName,eventName:eventName,type:_type,stats:this.incrementStats(count,existingStats)};return}case _metrics.METRIC_TYPE.APPLICATION_USAGE:var numberOfClicks=metric.numberOfClicks,startTime=metric.startTime;var minutesOnScreen=(0,_momentTimezone.default)().diff(startTime,"minutes",true);report.application_usage=report.application_usage||{};var appExistingData=report.application_usage[key]||{minutesOnScreen:0,numberOfClicks:0};report.application_usage[key]={minutesOnScreen:appExistingData.minutesOnScreen+minutesOnScreen,numberOfClicks:appExistingData.numberOfClicks+numberOfClicks};break;default:throw new _util.UnreachableCaseError(metric)}}}],[{key:"createReport",value:function createReport(){return{reportVersion:REPORT_VERSION}}},{key:"createMetricKey",value:function createMetricKey(metric){switch(metric.type){case _metrics.METRIC_TYPE.USER_AGENT:{var appName=metric.appName,type=metric.type;return"".concat(appName,"-").concat(type)}case _metrics.METRIC_TYPE.CLICK:case _metrics.METRIC_TYPE.LOADED:case _metrics.METRIC_TYPE.COUNT:{var _appName2=metric.appName,eventName=metric.eventName,_type2=metric.type;return"".concat(_appName2,"-").concat(_type2,"-").concat(eventName)}case _metrics.METRIC_TYPE.APPLICATION_USAGE:return metric.appId;default:throw new _util.UnreachableCaseError(metric)}}}]);return ReportManager}();exports.ReportManager=ReportManager;_defineProperty(ReportManager,"REPORT_VERSION",REPORT_VERSION)},80:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"UiStatsMetric",{enumerable:true,get:function get(){return _ui_stats.UiStatsMetric}});Object.defineProperty(exports,"createUiStatsMetric",{enumerable:true,get:function get(){return _ui_stats.createUiStatsMetric}});Object.defineProperty(exports,"UiStatsMetricType",{enumerable:true,get:function get(){return _ui_stats.UiStatsMetricType}});Object.defineProperty(exports,"ApplicationUsage",{enumerable:true,get:function get(){return _application_usage.ApplicationUsage}});Object.defineProperty(exports,"ApplicationUsageCurrent",{enumerable:true,get:function get(){return _application_usage.ApplicationUsageCurrent}});Object.defineProperty(exports,"Stats",{enumerable:true,get:function get(){return _stats.Stats}});Object.defineProperty(exports,"trackUsageAgent",{enumerable:true,get:function get(){return _user_agent.trackUsageAgent}});exports.METRIC_TYPE=void 0;var _ui_stats=__webpack_require__(804);var _application_usage=__webpack_require__(805);var _stats=__webpack_require__(806);var _user_agent=__webpack_require__(807);var METRIC_TYPE;exports.METRIC_TYPE=METRIC_TYPE;(function(METRIC_TYPE){METRIC_TYPE["COUNT"]="count";METRIC_TYPE["LOADED"]="loaded";METRIC_TYPE["CLICK"]="click";METRIC_TYPE["USER_AGENT"]="user_agent";METRIC_TYPE["APPLICATION_USAGE"]="application_usage"})(METRIC_TYPE||(exports.METRIC_TYPE=METRIC_TYPE={}))},802:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"ReportHTTP",{enumerable:true,get:function get(){return _reporter.ReportHTTP}});Object.defineProperty(exports,"Reporter",{enumerable:true,get:function get(){return _reporter.Reporter}});Object.defineProperty(exports,"ReporterConfig",{enumerable:true,get:function get(){return _reporter.ReporterConfig}});Object.defineProperty(exports,"UiStatsMetricType",{enumerable:true,get:function get(){return _metrics.UiStatsMetricType}});Object.defineProperty(exports,"METRIC_TYPE",{enumerable:true,get:function get(){return _metrics.METRIC_TYPE}});Object.defineProperty(exports,"Report",{enumerable:true,get:function get(){return _report.Report}});Object.defineProperty(exports,"ReportManager",{enumerable:true,get:function get(){return _report.ReportManager}});Object.defineProperty(exports,"Storage",{enumerable:true,get:function get(){return _storage.Storage}});var _reporter=__webpack_require__(803);var _metrics=__webpack_require__(80);var _report=__webpack_require__(253);var _storage=__webpack_require__(252)},803:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Reporter=void 0;var _util=__webpack_require__(251);var _metrics=__webpack_require__(80);var _storage=__webpack_require__(252);var _report=__webpack_require__(253);function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)}))}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var Reporter=function(){function Reporter(config){var _this=this;_classCallCheck(this,Reporter);_defineProperty(this,"checkInterval",void 0);_defineProperty(this,"interval",void 0);_defineProperty(this,"lastAppId",void 0);_defineProperty(this,"http",void 0);_defineProperty(this,"reportManager",void 0);_defineProperty(this,"storageManager",void 0);_defineProperty(this,"applicationUsage",void 0);_defineProperty(this,"debug",void 0);_defineProperty(this,"retryCount",0);_defineProperty(this,"maxRetries",3);_defineProperty(this,"started",false);_defineProperty(this,"start",(function(){if(!_this.interval){_this.interval=setTimeout((function(){_this.interval=undefined;_this.sendReports()}),_this.checkInterval)}if(_this.started){return}if(window&&document){window.addEventListener("beforeunload",(function(){return _this.reportApplicationUsage()}));document.addEventListener("visibilitychange",(function(){if(document.visibilityState==="visible"&&_this.lastAppId){_this.reportApplicationUsage(_this.lastAppId)}else if(document.visibilityState==="hidden"){_this.reportApplicationUsage();_this.sendReports()}}))}_this.started=true;_this.applicationUsage.start()}));_defineProperty(this,"reportUiStats",(function(appName,type,eventNames,count){var metrics=(0,_util.wrapArray)(eventNames).map((function(eventName){_this.log("".concat(type," Metric -> (").concat(appName,":").concat(eventName,"):"));var report=(0,_metrics.createUiStatsMetric)({type:type,appName:appName,eventName:eventName,count:count});_this.log(report);return report}));_this.saveToReport(metrics)}));_defineProperty(this,"reportUserAgent",(function(appName){_this.log("Reporting user-agent.");var report=(0,_metrics.trackUsageAgent)(appName);_this.saveToReport([report])}));_defineProperty(this,"sendReports",_asyncToGenerator(regeneratorRuntime.mark((function _callee(){var versionMismatch;return regeneratorRuntime.wrap((function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(_this.reportManager.isReportEmpty()){_context.next=13;break}_context.prev=1;_context.next=4;return _this.http(_this.reportManager.report);case 4:_this.flushReport();_context.next=13;break;case 7:_context.prev=7;_context.t0=_context["catch"](1);_this.log("Error Sending Metrics Report ".concat(_context.t0));_this.retryCount=_this.retryCount+1;versionMismatch=_this.reportManager.report.reportVersion!==_report.ReportManager.REPORT_VERSION;if(versionMismatch||_this.retryCount>_this.maxRetries){_this.flushReport()}case 13:_this.start();case 14:case"end":return _context.stop()}}}),_callee,null,[[1,7]])}))));var http=config.http,storage=config.storage,debug=config.debug,_config$checkInterval=config.checkInterval,checkInterval=_config$checkInterval===void 0?9e4:_config$checkInterval,_config$storageKey=config.storageKey,storageKey=_config$storageKey===void 0?"analytics":_config$storageKey;this.http=http;this.checkInterval=checkInterval;this.applicationUsage=new _metrics.ApplicationUsage;this.storageManager=new _storage.ReportStorageManager(storageKey,storage);var storedReport=this.storageManager.get();this.reportManager=new _report.ReportManager(storedReport);this.debug=!!debug}_createClass(Reporter,[{key:"saveToReport",value:function saveToReport(newMetrics){this.reportManager.assignReports(newMetrics);this.storageManager.store(this.reportManager.report)}},{key:"flushReport",value:function flushReport(){this.retryCount=0;this.reportManager.clearReport();this.storageManager.store(this.reportManager.report)}},{key:"log",value:function log(message){if(this.debug){console.debug(message)}}},{key:"reportApplicationUsage",value:function reportApplicationUsage(appId){this.log("Reporting application changed to ".concat(appId));this.lastAppId=appId||this.lastAppId;var appChangedReport=this.applicationUsage.appChanged(appId);if(appChangedReport)this.saveToReport([appChangedReport])}}]);return Reporter}();exports.Reporter=Reporter},804:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.createUiStatsMetric=createUiStatsMetric;function createUiStatsMetric(_ref){var type=_ref.type,appName=_ref.appName,eventName=_ref.eventName,_ref$count=_ref.count,count=_ref$count===void 0?1:_ref$count;return{type:type,appName:appName,eventName:eventName,count:count}}},805:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.ApplicationUsage=void 0;var _momentTimezone=_interopRequireDefault(__webpack_require__(32));var _=__webpack_require__(80);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var ApplicationUsage=function(){function ApplicationUsage(){_classCallCheck(this,ApplicationUsage);_defineProperty(this,"currentUsage",void 0)}_createClass(ApplicationUsage,[{key:"start",value:function start(){var _this=this;if(window)window.addEventListener("click",(function(){return _this.currentUsage&&_this.currentUsage.numberOfClicks++}))}},{key:"appChanged",value:function appChanged(appId){var currentUsage=this.currentUsage;if(appId){this.currentUsage={type:_.METRIC_TYPE.APPLICATION_USAGE,appId:appId,startTime:(0,_momentTimezone.default)(),numberOfClicks:0}}else{this.currentUsage=void 0}return currentUsage}}]);return ApplicationUsage}();exports.ApplicationUsage=ApplicationUsage},806:function(module,exports,__webpack_require__){"use strict"},807:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.trackUsageAgent=trackUsageAgent;var _=__webpack_require__(80);function trackUsageAgent(appName){var userAgent=window&&window.navigator&&window.navigator.userAgent||"";return{type:_.METRIC_TYPE.USER_AGENT,appName:appName,userAgent:userAgent}}},826:function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */(function defineMustache(global,factory){if(true&&exports&&typeof exports.nodeName!=="string"){factory(exports)}else if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==="function"?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__))}else{}})(this,(function mustacheFactory(mustache){var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function typeStr(obj){return isArray(obj)?"array":typeof obj}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return obj!=null&&typeof obj==="object"&&propName in obj}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeHtml(string){return String(string).replace(/[&<>"'`=\/]/g,(function fromEntityMap(s){return entityMap[s]}))}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length)}else{nonSpace=true}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n")stripSpace()}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);token=[type,value,start,scanner.pos];tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){value=context.view;names=name.split(".");index=0;while(value!=null&&index<names.length){if(index===names.length-1)lookupHit=hasProperty(value,names[index]);value=value[names[index++]]}}else{value=context.view[name];lookupHit=hasProperty(context.view,name)}if(lookupHit)break;context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.cache={}}Writer.prototype.clearCache=function clearCache(){this.cache={}};Writer.prototype.parse=function parse(template,tags){var cache=this.cache;var tokens=cache[template];if(tokens==null)tokens=cache[template]=parseTemplate(template,tags);return tokens};Writer.prototype.render=function render(template,view,partials){var tokens=this.parse(template);var context=view instanceof Context?view:new Context(view);return this.renderTokens(tokens,context,partials,template)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate);else if(symbol===">")value=this.renderPartial(token,context,partials,originalTemplate);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate)};Writer.prototype.renderPartial=function renderPartial(token,context,partials){if(!partials)return;var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null)return this.renderTokens(this.parse(value),context,partials,value)};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return mustache.escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};mustache.name="mustache.js";mustache.version="2.3.2";mustache.tags=["{{","}}"];var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials){if(typeof template!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+typeStr(template)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return defaultWriter.render(template,view,partials)};mustache.to_html=function to_html(template,view,partials,send){var result=mustache.render(template,view,partials);if(isFunction(send)){send(result)}else{return result}};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer;return mustache}))}}]);