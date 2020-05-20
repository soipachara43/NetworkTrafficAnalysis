"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isErrorNonFatal = isErrorNonFatal;
exports.saveSavedObject = saveSavedObject;

var _constants = require("../../constants");

var _create_source = require("./create_source");

var _check_for_duplicate_title = require("./check_for_duplicate_title");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @param error {Error} the error
 * @return {boolean}
 */
function isErrorNonFatal(error) {
  if (!error) return false;
  return error.message === _constants.OVERWRITE_REJECTED || error.message === _constants.SAVE_DUPLICATE_REJECTED;
}
/**
 * Saves this object.
 *
 * @param {string} [esType]
 * @param {SavedObject} [savedObject]
 * @param {SavedObjectConfig} [config]
 * @param {object} [options={}]
 * @property {boolean} [options.confirmOverwrite=false] - If true, attempts to create the source so it
 * can confirm an overwrite if a document with the id already exists.
 * @property {boolean} [options.isTitleDuplicateConfirmed=false] - If true, save allowed with duplicate title
 * @property {func} [options.onTitleDuplicate] - function called if duplicate title exists.
 * When not provided, confirm modal will be displayed asking user to confirm or cancel save.
 * @param {SavedObjectKibanaServices} [services]
 * @return {Promise}
 * @resolved {String} - The id of the doc
 */


function saveSavedObject(_x, _x2) {
  return _saveSavedObject.apply(this, arguments);
}

function _saveSavedObject() {
  _saveSavedObject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(savedObject, config) {
    var _ref,
        _ref$confirmOverwrite,
        confirmOverwrite,
        _ref$isTitleDuplicate,
        isTitleDuplicateConfirmed,
        onTitleDuplicate,
        services,
        savedObjectsClient,
        chrome,
        esType,
        extractReferences,
        originalId,
        _savedObject$_seriali,
        attributes,
        references,
        _extractReferences,
        resp,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 2 && _args[2] !== undefined ? _args[2] : {}, _ref$confirmOverwrite = _ref.confirmOverwrite, confirmOverwrite = _ref$confirmOverwrite === void 0 ? false : _ref$confirmOverwrite, _ref$isTitleDuplicate = _ref.isTitleDuplicateConfirmed, isTitleDuplicateConfirmed = _ref$isTitleDuplicate === void 0 ? false : _ref$isTitleDuplicate, onTitleDuplicate = _ref.onTitleDuplicate;
            services = _args.length > 3 ? _args[3] : undefined;
            savedObjectsClient = services.savedObjectsClient, chrome = services.chrome;
            esType = config.type || '';
            extractReferences = config.extractReferences; // Save the original id in case the save fails.

            originalId = savedObject.id; // Read https://github.com/elastic/kibana/issues/9056 and
            // https://github.com/elastic/kibana/issues/9012 for some background into why this copyOnSave variable
            // exists.
            // The goal is to move towards a better rename flow, but since our users have been conditioned
            // to expect a 'save as' flow during a rename, we are keeping the logic the same until a better
            // UI/UX can be worked out.

            if (savedObject.copyOnSave) {
              delete savedObject.id;
            } // Here we want to extract references and set them within "references" attribute


            _savedObject$_seriali = savedObject._serialize(), attributes = _savedObject$_seriali.attributes, references = _savedObject$_seriali.references;

            if (extractReferences) {
              _extractReferences = extractReferences({
                attributes: attributes,
                references: references
              });
              attributes = _extractReferences.attributes;
              references = _extractReferences.references;
            }

            if (references) {
              _context.next = 11;
              break;
            }

            throw new Error('References not returned from extractReferences');

          case 11:
            _context.prev = 11;
            _context.next = 14;
            return (0, _check_for_duplicate_title.checkForDuplicateTitle)(savedObject, isTitleDuplicateConfirmed, onTitleDuplicate, services);

          case 14:
            savedObject.isSaving = true;

            if (!confirmOverwrite) {
              _context.next = 21;
              break;
            }

            _context.next = 18;
            return (0, _create_source.createSource)(attributes, savedObject, esType, savedObject.creationOpts({
              references: references
            }), services);

          case 18:
            _context.t0 = _context.sent;
            _context.next = 24;
            break;

          case 21:
            _context.next = 23;
            return savedObjectsClient.create(esType, attributes, savedObject.creationOpts({
              references: references,
              overwrite: true
            }));

          case 23:
            _context.t0 = _context.sent;

          case 24:
            resp = _context.t0;
            savedObject.id = resp.id;

            if (savedObject.showInRecentlyAccessed && savedObject.getFullPath) {
              chrome.recentlyAccessed.add(savedObject.getFullPath(), savedObject.title, String(savedObject.id));
            }

            savedObject.isSaving = false;
            savedObject.lastSavedTitle = savedObject.title;
            return _context.abrupt("return", savedObject.id);

          case 32:
            _context.prev = 32;
            _context.t1 = _context["catch"](11);
            savedObject.isSaving = false;
            savedObject.id = originalId;

            if (!isErrorNonFatal(_context.t1)) {
              _context.next = 38;
              break;
            }

            return _context.abrupt("return", '');

          case 38:
            return _context.abrupt("return", Promise.reject(_context.t1));

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 32]]);
  }));
  return _saveSavedObject.apply(this, arguments);
}