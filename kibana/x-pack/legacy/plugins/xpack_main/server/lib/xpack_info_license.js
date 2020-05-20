"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XPackInfoLicense = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * "View" for XPack Info license information.
 */
class XPackInfoLicense {
  /**
   * Function that retrieves license information from the XPack info object.
   * @type {Function}
   * @private
   */
  constructor(getRawLicense) {
    _defineProperty(this, "_getRawLicense", void 0);

    this._getRawLicense = getRawLicense;
  }
  /**
   * Returns unique identifier of the license.
   * @returns {string|undefined}
   */


  getUid() {
    var _this$_getRawLicense;

    return (_this$_getRawLicense = this._getRawLicense()) === null || _this$_getRawLicense === void 0 ? void 0 : _this$_getRawLicense.uid;
  }
  /**
   * Indicates whether license is still active.
   * @returns {boolean}
   */


  isActive() {
    var _this$_getRawLicense2;

    return Boolean((_this$_getRawLicense2 = this._getRawLicense()) === null || _this$_getRawLicense2 === void 0 ? void 0 : _this$_getRawLicense2.isActive);
  }
  /**
   * Returns license expiration date in ms.
   *
   * Note: A basic license created after 6.3 will have no expiration, thus returning undefined.
   *
   * @returns {number|undefined}
   */


  getExpiryDateInMillis() {
    var _this$_getRawLicense3;

    return (_this$_getRawLicense3 = this._getRawLicense()) === null || _this$_getRawLicense3 === void 0 ? void 0 : _this$_getRawLicense3.expiryDateInMillis;
  }
  /**
   * Checks if the license is represented in a specified license list.
   * @param {String} candidateLicenses List of the licenses to check against.
   * @returns {boolean}
   */


  isOneOf(candidateLicenses) {
    var _this$_getRawLicense4;

    const candidates = Array.isArray(candidateLicenses) ? candidateLicenses : [candidateLicenses];
    const mode = (_this$_getRawLicense4 = this._getRawLicense()) === null || _this$_getRawLicense4 === void 0 ? void 0 : _this$_getRawLicense4.mode;
    return Boolean(mode && candidates.includes(mode));
  }
  /**
   * Returns type of the license (basic, gold etc.).
   * @returns {string|undefined}
   */


  getType() {
    var _this$_getRawLicense5;

    return (_this$_getRawLicense5 = this._getRawLicense()) === null || _this$_getRawLicense5 === void 0 ? void 0 : _this$_getRawLicense5.type;
  }
  /**
   * Returns mode of the license (basic, gold etc.). This is the "effective" type of the license.
   * @returns {string|undefined}
   */


  getMode() {
    var _this$_getRawLicense6;

    return (_this$_getRawLicense6 = this._getRawLicense()) === null || _this$_getRawLicense6 === void 0 ? void 0 : _this$_getRawLicense6.mode;
  }
  /**
   * Determine if the current license is active and the supplied {@code type}.
   *
   * @param {Function} typeChecker The license type checker.
   * @returns {boolean}
   */


  isActiveLicense(typeChecker) {
    const license = this._getRawLicense();

    return Boolean((license === null || license === void 0 ? void 0 : license.isActive) && typeChecker(license.mode));
  }
  /**
   * Determine if the license is an active, basic license.
   *
   * Note: This also verifies that the license is active. Therefore it is not safe to assume that !isBasic() === isNotBasic().
   *
   * @returns {boolean}
   */


  isBasic() {
    return this.isActiveLicense(mode => mode === 'basic');
  }
  /**
   * Determine if the license is an active, non-basic license (e.g., standard, gold, platinum, or trial).
   *
   * Note: This also verifies that the license is active. Therefore it is not safe to assume that !isBasic() === isNotBasic().
   *
   * @returns {boolean}
   */


  isNotBasic() {
    return this.isActiveLicense(mode => mode !== 'basic');
  }

}

exports.XPackInfoLicense = XPackInfoLicense;