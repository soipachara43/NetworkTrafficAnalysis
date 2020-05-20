"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBreadcrumbs = exports.editBreadcrumb = exports.addBreadcrumb = exports.listBreadcrumb = exports.setBreadcrumbSetter = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../../../../common/constants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var setBreadcrumbs;
exports.setBreadcrumbs = setBreadcrumbs;

var setBreadcrumbSetter = function setBreadcrumbSetter(_ref) {
  var __LEGACY = _ref.__LEGACY;

  exports.setBreadcrumbs = setBreadcrumbs = function setBreadcrumbs(crumbs) {
    __LEGACY.chrome.breadcrumbs.set([__LEGACY.MANAGEMENT_BREADCRUMB].concat(_toConsumableArray(crumbs)));
  };
};

exports.setBreadcrumbSetter = setBreadcrumbSetter;
var listBreadcrumb = {
  text: _i18n.i18n.translate('xpack.crossClusterReplication.homeBreadcrumbTitle', {
    defaultMessage: 'Cross-Cluster Replication'
  }),
  href: "#".concat(_constants.BASE_PATH)
};
exports.listBreadcrumb = listBreadcrumb;
var addBreadcrumb = {
  text: _i18n.i18n.translate('xpack.crossClusterReplication.addBreadcrumbTitle', {
    defaultMessage: 'Add'
  })
};
exports.addBreadcrumb = addBreadcrumb;
var editBreadcrumb = {
  text: _i18n.i18n.translate('xpack.crossClusterReplication.editBreadcrumbTitle', {
    defaultMessage: 'Edit'
  })
};
exports.editBreadcrumb = editBreadcrumb;