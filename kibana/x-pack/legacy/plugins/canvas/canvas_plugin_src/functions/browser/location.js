"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.location = location;

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const noop = () => {};

function location() {
  const {
    help
  } = (0, _i18n.getFunctionHelp)().location;
  return {
    name: 'location',
    type: 'datatable',
    inputTypes: ['null'],
    args: {},
    help,
    fn: () => {
      return new Promise(resolve => {
        function createLocation(geoposition) {
          const {
            latitude,
            longitude
          } = geoposition.coords;
          return resolve({
            type: 'datatable',
            columns: [{
              name: 'latitude',
              type: 'number'
            }, {
              name: 'longitude',
              type: 'number'
            }],
            rows: [{
              latitude,
              longitude
            }]
          });
        }

        return navigator.geolocation.getCurrentPosition(createLocation, noop, {
          maximumAge: 5000
        });
      });
    }
  };
}