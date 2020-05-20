"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseArray = void 0;

var _react = require("react");

var _form_context = require("../form_context");

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
 * Use UseArray to dynamically add fields to your form.
 *
 * example:
 * If your form data looks like this:
 *
 * {
 *   users: []
 * }
 *
 * and you want to be able to add user objects ({ name: 'john', lastName. 'snow' }) inside
 * the "users" array, you would use UseArray to render rows of user objects with 2 fields in each of them ("name" and "lastName")
 *
 * Look at the README.md for some examples.
 */
const UseArray = ({
  path,
  initialNumberOfItems,
  readDefaultValueOnForm = true,
  children
}) => {
  const didMountRef = (0, _react.useRef)(false);
  const form = (0, _form_context.useFormContext)();
  const defaultValues = readDefaultValueOnForm && form.getFieldDefaultValue(path);
  const uniqueId = (0, _react.useRef)(0);

  const getInitialItemsFromValues = values => values.map((_, index) => ({
    id: uniqueId.current++,
    path: `${path}[${index}]`,
    isNew: false
  }));

  const getNewItemAtIndex = index => ({
    id: uniqueId.current++,
    path: `${path}[${index}]`,
    isNew: true
  });

  const initialState = defaultValues ? getInitialItemsFromValues(defaultValues) : new Array(initialNumberOfItems).fill('').map((_, i) => getNewItemAtIndex(i));
  const [items, setItems] = (0, _react.useState)(initialState);

  const updatePaths = _rows => _rows.map((row, index) => ({ ...row,
    path: `${path}[${index}]`
  }));

  const addItem = () => {
    setItems(previousItems => {
      const itemIndex = previousItems.length;
      return [...previousItems, getNewItemAtIndex(itemIndex)];
    });
  };

  const removeItem = id => {
    setItems(previousItems => {
      const updatedItems = previousItems.filter(item => item.id !== id);
      return updatePaths(updatedItems);
    });
  };

  (0, _react.useEffect)(() => {
    if (didMountRef.current) {
      setItems(updatePaths(items));
    } else {
      didMountRef.current = true;
    }
  }, [path]);
  return children({
    items,
    addItem,
    removeItem
  });
};

exports.UseArray = UseArray;