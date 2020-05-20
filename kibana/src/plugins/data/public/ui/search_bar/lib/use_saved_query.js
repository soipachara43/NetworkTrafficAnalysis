"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSavedQuery = void 0;

var _react = require("react");

var _i18n = require("@kbn/i18n");

var _populate_state_from_saved_query = require("./populate_state_from_saved_query");

var _clear_saved_query = require("./clear_saved_query");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSavedQuery = function useSavedQuery(props) {
  // Handle saved queries
  var defaultLanguage = props.defaultLanguage;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      savedQuery = _useState2[0],
      _setSavedQuery = _useState2[1]; // Effect is used to convert a saved query id into an object


  (0, _react.useEffect)(function () {
    var fetchSavedQuery =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(savedQueryId) {
        var newSavedQuery;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return props.queryService.savedQueries.getSavedQuery(savedQueryId);

              case 3:
                newSavedQuery = _context.sent;

                // Make sure we set the saved query to the most recent one
                if (newSavedQuery && newSavedQuery.id === savedQueryId) {
                  _setSavedQuery(newSavedQuery);

                  (0, _populate_state_from_saved_query.populateStateFromSavedQuery)(props.queryService, props.setQuery, newSavedQuery);
                }

                _context.next = 12;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                // Clear saved query
                _setSavedQuery(undefined);

                (0, _clear_saved_query.clearStateFromSavedQuery)(props.queryService, props.setQuery, defaultLanguage); // notify of saving error

                props.notifications.toasts.addWarning({
                  title: _i18n.i18n.translate('data.search.unableToGetSavedQueryToastTitle', {
                    defaultMessage: 'Unable to load saved query {savedQueryId}',
                    values: {
                      savedQueryId: savedQueryId
                    }
                  }),
                  text: "".concat(_context.t0.message)
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      return function fetchSavedQuery(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    if (props.savedQueryId) fetchSavedQuery(props.savedQueryId);else _setSavedQuery(undefined);
  }, [defaultLanguage, props.notifications.toasts, props.queryService, props.queryService.savedQueries, props.savedQueryId, props.setQuery]);
  return {
    savedQuery: savedQuery,
    setSavedQuery: function setSavedQuery(q) {
      _setSavedQuery(q);

      (0, _populate_state_from_saved_query.populateStateFromSavedQuery)(props.queryService, props.setQuery, q);
    },
    clearSavedQuery: function clearSavedQuery() {
      _setSavedQuery(undefined);

      (0, _clear_saved_query.clearStateFromSavedQuery)(props.queryService, props.setQuery, defaultLanguage);
    }
  };
};

exports.useSavedQuery = useSavedQuery;