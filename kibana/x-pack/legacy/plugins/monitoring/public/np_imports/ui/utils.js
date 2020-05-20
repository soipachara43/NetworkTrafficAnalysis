"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeWithScope = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Subscribe to an observable at a $scope, ensuring that the digest cycle
 * is run for subscriber hooks and routing errors to fatalError if not handled.
 */
var subscribeWithScope = function subscribeWithScope($scope, observable, observer) {
  return observable.subscribe({
    next: function next(value) {
      if (observer && observer.next) {
        $scope.$applyAsync(function () {
          return observer.next(value);
        });
      }
    },
    error: function error(_error) {
      $scope.$applyAsync(function () {
        if (observer && observer.error) {
          observer.error(_error);
        } else {
          throw new Error("Uncaught error in subscribeWithScope(): ".concat(_error ? _error.stack || _error.message : _error));
        }
      });
    },
    complete: function complete() {
      if (observer && observer.complete) {
        $scope.$applyAsync(function () {
          return observer.complete();
        });
      }
    }
  });
};

exports.subscribeWithScope = subscribeWithScope;