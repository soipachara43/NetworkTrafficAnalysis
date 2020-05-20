"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRoleEnabled = isRoleEnabled;
exports.isRoleReserved = isRoleReserved;
exports.isRoleDeprecated = isRoleDeprecated;
exports.getExtendedRoleDeprecationNotice = getExtendedRoleDeprecationNotice;
exports.isRoleReadOnly = isRoleReadOnly;
exports.copyRole = copyRole;
exports.prepareRoleClone = prepareRoleClone;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Returns whether given role is enabled or not
 *
 * @param role Object Role JSON, as returned by roles API
 * @return Boolean true if role is enabled; false otherwise
 */
function isRoleEnabled(role) {
  var _ref, _role$transient_metad;

  return (_ref = (_role$transient_metad = role.transient_metadata) === null || _role$transient_metad === void 0 ? void 0 : _role$transient_metad.enabled) !== null && _ref !== void 0 ? _ref : true;
}
/**
 * Returns whether given role is reserved or not.
 *
 * @param role Role as returned by roles API
 */


function isRoleReserved(role) {
  var _ref2, _role$metadata;

  return (_ref2 = (_role$metadata = role.metadata) === null || _role$metadata === void 0 ? void 0 : _role$metadata._reserved) !== null && _ref2 !== void 0 ? _ref2 : false;
}
/**
 * Returns whether given role is deprecated or not.
 *
 * @param {role} the Role as returned by roles API
 */


function isRoleDeprecated(role) {
  var _ref3, _role$metadata2;

  return (_ref3 = (_role$metadata2 = role.metadata) === null || _role$metadata2 === void 0 ? void 0 : _role$metadata2._deprecated) !== null && _ref3 !== void 0 ? _ref3 : false;
}
/**
 * Returns the extended deprecation notice for the provided role.
 *
 * @param role the Role as returned by roles API
 */


function getExtendedRoleDeprecationNotice(role) {
  return _i18n.i18n.translate('xpack.security.common.extendedRoleDeprecationNotice', {
    defaultMessage: `The {roleName} role is deprecated. {reason}`,
    values: {
      roleName: role.name,
      reason: getRoleDeprecatedReason(role)
    }
  });
}
/**
 * Returns whether given role is editable through the UI or not.
 *
 * @param role the Role as returned by roles API
 */


function isRoleReadOnly(role) {
  var _ref4, _role$_transform_erro;

  return isRoleReserved(role) || ((_ref4 = (_role$_transform_erro = role._transform_error) === null || _role$_transform_erro === void 0 ? void 0 : _role$_transform_erro.length) !== null && _ref4 !== void 0 ? _ref4 : 0) > 0;
}
/**
 * Returns a deep copy of the role.
 *
 * @param role the Role to copy.
 */


function copyRole(role) {
  return (0, _lodash.cloneDeep)(role);
}
/**
 * Creates a deep copy of the role suitable for cloning.
 *
 * @param role the Role to clone.
 */


function prepareRoleClone(role) {
  const clone = copyRole(role);
  clone.name = '';
  return clone;
}
/**
 * Returns the reason this role is deprecated.
 *
 * @param role the Role as returned by roles API
 */


function getRoleDeprecatedReason(role) {
  var _ref5, _role$metadata3;

  return (_ref5 = (_role$metadata3 = role.metadata) === null || _role$metadata3 === void 0 ? void 0 : _role$metadata3._deprecated_reason) !== null && _ref5 !== void 0 ? _ref5 : '';
}