"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrePackagedRulesStatus = exports.fetchTags = exports.getRulesStatusByIds = exports.getRuleStatusById = exports.exportRules = exports.importRules = exports.createPrepackagedRules = exports.duplicateRules = exports.deleteRules = exports.enableRules = exports.fetchRuleById = exports.fetchRules = exports.addRule = void 0;

var _kibana = require("../../../lib/kibana");

var _constants = require("../../../../common/constants");

var i18n = _interopRequireWildcard(require("../../../pages/detection_engine/rules/translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Add provided Rule
 *
 * @param rule to add
 * @param signal to cancel request
 *
 * @throws An error if response is not OK
 */
var addRule =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var rule, signal;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            rule = _ref2.rule, signal = _ref2.signal;
            return _context.abrupt("return", _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_RULES_URL, {
              method: rule.id != null ? 'PUT' : 'POST',
              body: JSON.stringify(rule),
              signal: signal
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addRule(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Fetches all rules from the Detection Engine API
 *
 * @param filterOptions desired filters (e.g. filter/sortField/sortOrder)
 * @param pagination desired pagination options (e.g. page/perPage)
 * @param signal to cancel request
 *
 * @throws An error if response is not OK
 */


exports.addRule = addRule;

var fetchRules =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref4) {
    var _ref5, _filterOptions$tags;

    var _ref4$filterOptions, filterOptions, _ref4$pagination, pagination, signal, filters, query;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref4$filterOptions = _ref4.filterOptions, filterOptions = _ref4$filterOptions === void 0 ? {
              filter: '',
              sortField: 'enabled',
              sortOrder: 'desc',
              showCustomRules: false,
              showElasticRules: false,
              tags: []
            } : _ref4$filterOptions, _ref4$pagination = _ref4.pagination, pagination = _ref4$pagination === void 0 ? {
              page: 1,
              perPage: 20,
              total: 0
            } : _ref4$pagination, signal = _ref4.signal;
            filters = [].concat(_toConsumableArray(filterOptions.filter.length ? ["alert.attributes.name: ".concat(filterOptions.filter)] : []), _toConsumableArray(filterOptions.showCustomRules ? ["alert.attributes.tags: \"__internal_immutable:false\""] : []), _toConsumableArray(filterOptions.showElasticRules ? ["alert.attributes.tags: \"__internal_immutable:true\""] : []), _toConsumableArray((_ref5 = (_filterOptions$tags = filterOptions.tags) === null || _filterOptions$tags === void 0 ? void 0 : _filterOptions$tags.map(function (t) {
              return "alert.attributes.tags: ".concat(t);
            })) !== null && _ref5 !== void 0 ? _ref5 : []));
            query = _objectSpread({
              page: pagination.page,
              per_page: pagination.perPage,
              sort_field: filterOptions.sortField,
              sort_order: filterOptions.sortOrder
            }, filters.length ? {
              filter: filters.join(' AND ')
            } : {});
            return _context2.abrupt("return", _kibana.KibanaServices.get().http.fetch("".concat(_constants.DETECTION_ENGINE_RULES_URL, "/_find"), {
              method: 'GET',
              query: query,
              signal: signal
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchRules(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Fetch a Rule by providing a Rule ID
 *
 * @param id Rule ID's (not rule_id)
 * @param signal to cancel request
 *
 * @throws An error if response is not OK
 */


exports.fetchRules = fetchRules;

var fetchRuleById =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref7) {
    var id, signal;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = _ref7.id, signal = _ref7.signal;
            return _context3.abrupt("return", _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_RULES_URL, {
              method: 'GET',
              query: {
                id: id
              },
              signal: signal
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchRuleById(_x3) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Enables/Disables provided Rule ID's
 *
 * @param ids array of Rule ID's (not rule_id) to enable/disable
 * @param enabled to enable or disable
 *
 * @throws An error if response is not OK
 */


exports.fetchRuleById = fetchRuleById;

var enableRules =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref9) {
    var ids, enabled;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ids = _ref9.ids, enabled = _ref9.enabled;
            return _context4.abrupt("return", _kibana.KibanaServices.get().http.fetch("".concat(_constants.DETECTION_ENGINE_RULES_URL, "/_bulk_update"), {
              method: 'PATCH',
              body: JSON.stringify(ids.map(function (id) {
                return {
                  id: id,
                  enabled: enabled
                };
              }))
            }));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function enableRules(_x4) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Deletes provided Rule ID's
 *
 * @param ids array of Rule ID's (not rule_id) to delete
 *
 * @throws An error if response is not OK
 */


exports.enableRules = enableRules;

var deleteRules =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref11) {
    var ids;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ids = _ref11.ids;
            return _context5.abrupt("return", _kibana.KibanaServices.get().http.fetch("".concat(_constants.DETECTION_ENGINE_RULES_URL, "/_bulk_delete"), {
              method: 'DELETE',
              body: JSON.stringify(ids.map(function (id) {
                return {
                  id: id
                };
              }))
            }));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteRules(_x5) {
    return _ref10.apply(this, arguments);
  };
}();
/**
 * Duplicates provided Rules
 *
 * @param rules to duplicate
 *
 * @throws An error if response is not OK
 */


exports.deleteRules = deleteRules;

var duplicateRules =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_ref13) {
    var rules;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            rules = _ref13.rules;
            return _context6.abrupt("return", _kibana.KibanaServices.get().http.fetch("".concat(_constants.DETECTION_ENGINE_RULES_URL, "/_bulk_create"), {
              method: 'POST',
              body: JSON.stringify(rules.map(function (rule) {
                return _objectSpread({}, rule, {
                  name: "".concat(rule.name, " [").concat(i18n.DUPLICATE, "]"),
                  created_at: undefined,
                  created_by: undefined,
                  id: undefined,
                  rule_id: undefined,
                  updated_at: undefined,
                  updated_by: undefined,
                  enabled: rule.enabled,
                  immutable: undefined,
                  last_success_at: undefined,
                  last_success_message: undefined,
                  last_failure_at: undefined,
                  last_failure_message: undefined,
                  status: undefined,
                  status_date: undefined
                });
              }))
            }));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function duplicateRules(_x6) {
    return _ref12.apply(this, arguments);
  };
}();
/**
 * Create Prepackaged Rules
 *
 * @param signal AbortSignal for cancelling request
 *
 * @throws An error if response is not OK
 */


exports.duplicateRules = duplicateRules;

var createPrepackagedRules =
/*#__PURE__*/
function () {
  var _ref14 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(_ref15) {
    var signal;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            signal = _ref15.signal;
            _context7.next = 3;
            return _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_PREPACKAGED_URL, {
              method: 'PUT',
              signal: signal
            });

          case 3:
            return _context7.abrupt("return", true);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function createPrepackagedRules(_x7) {
    return _ref14.apply(this, arguments);
  };
}();
/**
 * Imports rules in the same format as exported via the _export API
 *
 * @param fileToImport File to upload containing rules to import
 * @param overwrite whether or not to overwrite rules with the same ruleId
 * @param signal AbortSignal for cancelling request
 *
 * @throws An error if response is not OK
 */


exports.createPrepackagedRules = createPrepackagedRules;

var importRules =
/*#__PURE__*/
function () {
  var _ref16 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(_ref17) {
    var fileToImport, _ref17$overwrite, overwrite, signal, formData;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            fileToImport = _ref17.fileToImport, _ref17$overwrite = _ref17.overwrite, overwrite = _ref17$overwrite === void 0 ? false : _ref17$overwrite, signal = _ref17.signal;
            formData = new FormData();
            formData.append('file', fileToImport);
            return _context8.abrupt("return", _kibana.KibanaServices.get().http.fetch("".concat(_constants.DETECTION_ENGINE_RULES_URL, "/_import"), {
              method: 'POST',
              headers: {
                'Content-Type': undefined
              },
              query: {
                overwrite: overwrite
              },
              body: formData,
              signal: signal
            }));

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function importRules(_x8) {
    return _ref16.apply(this, arguments);
  };
}();
/**
 * Export rules from the server as a file download
 *
 * @param excludeExportDetails whether or not to exclude additional details at bottom of exported file (defaults to false)
 * @param filename of exported rules. Be sure to include `.ndjson` extension! (defaults to localized `rules_export.ndjson`)
 * @param ruleIds array of rule_id's (not id!) to export (empty array exports _all_ rules)
 * @param signal AbortSignal for cancelling request
 *
 * @throws An error if response is not OK
 */


exports.importRules = importRules;

var exportRules =
/*#__PURE__*/
function () {
  var _ref18 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(_ref19) {
    var _ref19$excludeExportD, excludeExportDetails, _ref19$filename, filename, _ref19$ids, ids, signal, body;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _ref19$excludeExportD = _ref19.excludeExportDetails, excludeExportDetails = _ref19$excludeExportD === void 0 ? false : _ref19$excludeExportD, _ref19$filename = _ref19.filename, filename = _ref19$filename === void 0 ? "".concat(i18n.EXPORT_FILENAME, ".ndjson") : _ref19$filename, _ref19$ids = _ref19.ids, ids = _ref19$ids === void 0 ? [] : _ref19$ids, signal = _ref19.signal;
            body = ids.length > 0 ? JSON.stringify({
              objects: ids.map(function (rule) {
                return {
                  rule_id: rule
                };
              })
            }) : undefined;
            return _context9.abrupt("return", _kibana.KibanaServices.get().http.fetch("".concat(_constants.DETECTION_ENGINE_RULES_URL, "/_export"), {
              method: 'POST',
              body: body,
              query: {
                exclude_export_details: excludeExportDetails,
                file_name: filename
              },
              signal: signal
            }));

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function exportRules(_x9) {
    return _ref18.apply(this, arguments);
  };
}();
/**
 * Get Rule Status provided Rule ID
 *
 * @param id string of Rule ID's (not rule_id)
 * @param signal AbortSignal for cancelling request
 *
 * @throws An error if response is not OK
 */


exports.exportRules = exportRules;

var getRuleStatusById =
/*#__PURE__*/
function () {
  var _ref20 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(_ref21) {
    var id, signal;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = _ref21.id, signal = _ref21.signal;
            return _context10.abrupt("return", _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_RULES_STATUS_URL, {
              method: 'GET',
              query: {
                ids: JSON.stringify([id])
              },
              signal: signal
            }));

          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function getRuleStatusById(_x10) {
    return _ref20.apply(this, arguments);
  };
}();
/**
 * Return rule statuses given list of alert ids
 *
 * @param ids array of string of Rule ID's (not rule_id)
 * @param signal AbortSignal for cancelling request
 *
 * @throws An error if response is not OK
 */


exports.getRuleStatusById = getRuleStatusById;

var getRulesStatusByIds =
/*#__PURE__*/
function () {
  var _ref22 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(_ref23) {
    var ids, signal, res;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            ids = _ref23.ids, signal = _ref23.signal;
            _context11.next = 3;
            return _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_RULES_STATUS_URL, {
              method: 'GET',
              query: {
                ids: JSON.stringify(ids)
              },
              signal: signal
            });

          case 3:
            res = _context11.sent;
            return _context11.abrupt("return", res);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function getRulesStatusByIds(_x11) {
    return _ref22.apply(this, arguments);
  };
}();
/**
 * Fetch all unique Tags used by Rules
 *
 * @param signal to cancel request
 *
 * @throws An error if response is not OK
 */


exports.getRulesStatusByIds = getRulesStatusByIds;

var fetchTags =
/*#__PURE__*/
function () {
  var _ref24 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(_ref25) {
    var signal;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            signal = _ref25.signal;
            return _context12.abrupt("return", _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_TAGS_URL, {
              method: 'GET',
              signal: signal
            }));

          case 2:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function fetchTags(_x12) {
    return _ref24.apply(this, arguments);
  };
}();
/**
 * Get pre packaged rules Status
 *
 * @param signal AbortSignal for cancelling request
 *
 * @throws An error if response is not OK
 */


exports.fetchTags = fetchTags;

var getPrePackagedRulesStatus =
/*#__PURE__*/
function () {
  var _ref26 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(_ref27) {
    var signal;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            signal = _ref27.signal;
            return _context13.abrupt("return", _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_PREPACKAGED_RULES_STATUS_URL, {
              method: 'GET',
              signal: signal
            }));

          case 2:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function getPrePackagedRulesStatus(_x13) {
    return _ref26.apply(this, arguments);
  };
}();

exports.getPrePackagedRulesStatus = getPrePackagedRulesStatus;