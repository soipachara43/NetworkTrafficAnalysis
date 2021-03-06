"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTicksProvider = generateTicksProvider;

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
function generateTicksProvider() {
  function floorInBase(n, base) {
    return base * Math.floor(n / base);
  }

  function generateTicks(axis) {
    var returnTicks = [];
    var tickSize = 2;
    var delta = axis.delta || 0;
    var steps = 0;
    var tickVal;
    var tickCount = 0; // Count the steps

    while (Math.abs(delta) >= 1024) {
      steps++;
      delta /= 1024;
    } // Set the tick size relative to the remaining delta


    while (tickSize <= 1024) {
      if (delta <= tickSize) {
        break;
      }

      tickSize *= 2;
    }

    axis.tickSize = tickSize * Math.pow(1024, steps); // Calculate the new ticks

    var tickMin = floorInBase(axis.min || 0, axis.tickSize);

    do {
      tickVal = tickMin + tickCount++ * axis.tickSize;
      returnTicks.push(tickVal);
    } while (tickVal < (axis.max || 0));

    return returnTicks;
  }

  return function (axis) {
    return generateTicks(axis);
  };
}