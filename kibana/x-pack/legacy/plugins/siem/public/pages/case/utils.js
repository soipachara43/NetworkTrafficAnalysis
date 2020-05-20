"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreadcrumbs = void 0;

var _fp = require("lodash/fp");

var _link_to = require("../../components/link_to");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getBreadcrumbs = function getBreadcrumbs(params, search) {
  var queryParameters = !(0, _fp.isEmpty)(search[0]) ? search[0] : null;
  var breadcrumb = [{
    text: i18n.PAGE_TITLE,
    href: (0, _link_to.getCaseUrl)(queryParameters)
  }];

  if (params.detailName === 'create') {
    breadcrumb = [].concat(_toConsumableArray(breadcrumb), [{
      text: i18n.CREATE_BC_TITLE,
      href: (0, _link_to.getCreateCaseUrl)(queryParameters)
    }]);
  } else if (params.detailName != null) {
    var _ref, _params$state;

    breadcrumb = [].concat(_toConsumableArray(breadcrumb), [{
      text: (_ref = (_params$state = params.state) === null || _params$state === void 0 ? void 0 : _params$state.caseTitle) !== null && _ref !== void 0 ? _ref : '',
      href: (0, _link_to.getCaseDetailsUrl)({
        id: params.detailName,
        search: queryParameters
      })
    }]);
  }

  return breadcrumb;
};

exports.getBreadcrumbs = getBreadcrumbs;