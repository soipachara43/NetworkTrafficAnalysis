"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiToReactComponent = void 0;

var _react = require("react");

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

/**
 * Transforms `UiComponent` into a React component.
 */
var uiToReactComponent = function uiToReactComponent(Comp) {
  var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  return function (props) {
    var ref = (0, _react.useRef)();
    var comp = (0, _react.useMemo)(function () {
      return Comp();
    }, [Comp]);
    (0, _react.useLayoutEffect)(function () {
      if (!ref.current) return;
      comp.render(ref.current, props);
    });
    (0, _react.useLayoutEffect)(function () {
      if (!comp.unmount) return;
      return function () {
        if (comp.unmount) comp.unmount();
      };
    }, [comp]);
    return (0, _react.createElement)(as, {
      ref: ref
    });
  };
};

exports.uiToReactComponent = uiToReactComponent;