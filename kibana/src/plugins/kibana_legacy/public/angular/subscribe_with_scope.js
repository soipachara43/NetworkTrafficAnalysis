"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeWithScope = subscribeWithScope;

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
function callInDigest($scope, fn, fatalError) {
  try {
    // this is terrible, but necessary to synchronously deliver subscription values
    // to angular scopes. This is required by some APIs, like the `config` service,
    // and beneficial for root level directives where additional digest cycles make
    // kibana sluggish to load.
    //
    // If you copy this code elsewhere you better have a good reason :)
    if ($scope.$root.$$phase) {
      fn();
    } else {
      $scope.$apply(function () {
        return fn();
      });
    }
  } catch (error) {
    if (fatalError) {
      fatalError(error);
    }
  }
}
/**
 * Subscribe to an observable at a $scope, ensuring that the digest cycle
 * is run for subscriber hooks and routing errors to fatalError if not handled.
 */


function subscribeWithScope($scope, observable, observer, fatalError) {
  return observable.subscribe({
    next: function next(value) {
      if (observer && observer.next) {
        callInDigest($scope, function () {
          return observer.next(value);
        }, fatalError);
      }
    },
    error: function (_error) {
      function error(_x) {
        return _error.apply(this, arguments);
      }

      error.toString = function () {
        return _error.toString();
      };

      return error;
    }(function (error) {
      callInDigest($scope, function () {
        if (observer && observer.error) {
          observer.error(error);
        } else {
          throw new Error("Uncaught error in subscribeWithScope(): ".concat(error ? error.stack || error.message : error));
        }
      }, fatalError);
    }),
    complete: function complete() {
      if (observer && observer.complete) {
        callInDigest($scope, function () {
          return observer.complete();
        }, fatalError);
      }
    }
  });
}