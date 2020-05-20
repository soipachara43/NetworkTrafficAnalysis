(window["security_bundle_jsonpfunction"]=window["security_bundle_jsonpfunction"]||[]).push([[7],{352:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.OverwrittenSessionPage=OverwrittenSessionPage;exports.renderOverwrittenSessionPage=renderOverwrittenSessionPage;var _react=_interopRequireWildcard(__webpack_require__(0));var _reactDom=_interopRequireDefault(__webpack_require__(10));var _eui=__webpack_require__(1);var _react2=__webpack_require__(2);var _components=__webpack_require__(370);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc)}else{newObj[key]=obj[key]}}}}newObj.default=obj;return newObj}}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}function OverwrittenSessionPage(_ref){var authc=_ref.authc,basePath=_ref.basePath;var _useState=(0,_react.useState)(null),_useState2=_slicedToArray(_useState,2),username=_useState2[0],setUsername=_useState2[1];(0,_react.useEffect)((function(){authc.getCurrentUser().then((function(user){return setUsername(user.username)}))}),[authc]);if(username==null){return null}return _react.default.createElement(_components.AuthenticationStatePage,{title:_react.default.createElement(_react2.FormattedMessage,{id:"xpack.security.overwrittenSession.title",defaultMessage:"You previously logged in as a different user."})},_react.default.createElement(_eui.EuiButton,{href:basePath.prepend("/")},_react.default.createElement(_react2.FormattedMessage,{id:"xpack.security.overwrittenSession.continueAsUserText",defaultMessage:"Continue as {username}",values:{username:username}})))}function renderOverwrittenSessionPage(i18nStart,element,props){_reactDom.default.render(_react.default.createElement(i18nStart.Context,null,_react.default.createElement(OverwrittenSessionPage,props)),element);return function(){return _reactDom.default.unmountComponentAtNode(element)}}},370:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"AuthenticationStatePage",{enumerable:true,get:function get(){return _authentication_state_page.AuthenticationStatePage}});var _authentication_state_page=__webpack_require__(371)},371:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"AuthenticationStatePage",{enumerable:true,get:function get(){return _authentication_state_page.AuthenticationStatePage}});var _authentication_state_page=__webpack_require__(372)},372:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.AuthenticationStatePage=void 0;var _eui=__webpack_require__(1);var _react=_interopRequireDefault(__webpack_require__(0));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var AuthenticationStatePage=function AuthenticationStatePage(props){return _react.default.createElement("div",{className:"secAuthenticationStatePage"},_react.default.createElement("header",{className:"secAuthenticationStatePage__header"},_react.default.createElement("div",{className:"secAuthenticationStatePage__content eui-textCenter"},_react.default.createElement(_eui.EuiSpacer,{size:"xxl"}),_react.default.createElement("span",{className:"secAuthenticationStatePage__logo"},_react.default.createElement(_eui.EuiIcon,{type:"logoKibana",size:"xxl"})),_react.default.createElement(_eui.EuiTitle,{size:"l",className:"secAuthenticationStatePage__title"},_react.default.createElement("h1",null,props.title)),_react.default.createElement(_eui.EuiSpacer,{size:"xl"}))),_react.default.createElement("div",{className:"secAuthenticationStatePage__content eui-textCenter"},props.children))};exports.AuthenticationStatePage=AuthenticationStatePage}}]);