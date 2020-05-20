"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForDuplicateTitle = checkForDuplicateTitle;

var _find_object_by_title = require("./find_object_by_title");

var _constants = require("../../constants");

var _display_duplicate_title_confirm_modal = require("./display_duplicate_title_confirm_modal");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * check for an existing SavedObject with the same title in ES
 * returns Promise<true> when it's no duplicate, or the modal displaying the warning
 * that's there's a duplicate is confirmed, else it returns a rejected Promise<ErrorMsg>
 * @param savedObject
 * @param isTitleDuplicateConfirmed
 * @param onTitleDuplicate
 * @param services
 */
function checkForDuplicateTitle(_x, _x2, _x3, _x4) {
  return _checkForDuplicateTitle.apply(this, arguments);
}

function _checkForDuplicateTitle() {
  _checkForDuplicateTitle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(savedObject, isTitleDuplicateConfirmed, onTitleDuplicate, services) {
    var savedObjectsClient, overlays, duplicate;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            savedObjectsClient = services.savedObjectsClient, overlays = services.overlays; // Don't check for duplicates if user has already confirmed save with duplicate title

            if (!isTitleDuplicateConfirmed) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", true);

          case 3:
            if (!(savedObject.title === savedObject.lastSavedTitle && !savedObject.copyOnSave)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", true);

          case 5:
            _context.next = 7;
            return (0, _find_object_by_title.findObjectByTitle)(savedObjectsClient, savedObject.getEsType(), savedObject.title);

          case 7:
            duplicate = _context.sent;

            if (!(!duplicate || duplicate.id === savedObject.id)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", true);

          case 10:
            if (!onTitleDuplicate) {
              _context.next = 13;
              break;
            }

            onTitleDuplicate();
            return _context.abrupt("return", Promise.reject(new Error(_constants.SAVE_DUPLICATE_REJECTED)));

          case 13:
            return _context.abrupt("return", (0, _display_duplicate_title_confirm_modal.displayDuplicateTitleConfirmModal)(savedObject, overlays));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkForDuplicateTitle.apply(this, arguments);
}