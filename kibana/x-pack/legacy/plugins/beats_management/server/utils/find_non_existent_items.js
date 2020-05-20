"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findNonExistentItems = findNonExistentItems;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function findNonExistentItems(items, requestedItems) {
  return requestedItems.reduce((nonExistentItems, requestedItem, idx) => {
    if (items.findIndex(item => item && item.id === requestedItem) === -1) {
      nonExistentItems.push(requestedItems[idx]);
    }

    return nonExistentItems;
  }, []);
}