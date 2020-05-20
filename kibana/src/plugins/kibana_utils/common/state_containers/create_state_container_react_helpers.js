"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStateContainerReactHelpers = void 0;

var React = _interopRequireWildcard(require("react"));

var _useObservable = _interopRequireDefault(require("react-use/lib/useObservable"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
const {
  useContext,
  useLayoutEffect,
  useRef,
  createElement: h
} = React;

const createStateContainerReactHelpers = () => {
  const context = React.createContext(null);

  const useContainer = () => useContext(context);

  const useState = () => {
    const {
      state$,
      get
    } = useContainer();
    const value = (0, _useObservable.default)(state$, get());
    return value;
  };

  const useTransitions = () => useContainer().transitions;

  const useSelector = (selector, comparator = _fastDeepEqual.default) => {
    const {
      state$,
      get
    } = useContainer();
    const lastValueRef = useRef(get());
    const [value, setValue] = React.useState(() => {
      const newValue = selector(get());
      lastValueRef.current = newValue;
      return newValue;
    });
    useLayoutEffect(() => {
      const subscription = state$.subscribe(currentState => {
        const newValue = selector(currentState);

        if (!comparator(lastValueRef.current, newValue)) {
          lastValueRef.current = newValue;
          setValue(newValue);
        }
      });
      return () => subscription.unsubscribe();
    }, [state$, comparator]);
    return value;
  };

  const connect = mapStateToProp => component => props => h(component, { ...useSelector(mapStateToProp),
    ...props
  });

  return {
    Provider: context.Provider,
    Consumer: context.Consumer,
    context,
    useContainer,
    useState,
    useTransitions,
    useSelector,
    connect
  };
};

exports.createStateContainerReactHelpers = createStateContainerReactHelpers;