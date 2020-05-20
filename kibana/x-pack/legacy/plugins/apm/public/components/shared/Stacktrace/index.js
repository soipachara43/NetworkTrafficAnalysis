"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stacktrace = Stacktrace;
exports.getGroupedStackframes = getGroupedStackframes;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _EmptyMessage = require("../../shared/EmptyMessage");

var _LibraryStacktrace = require("./LibraryStacktrace");

var _Stackframe = require("./Stackframe");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function Stacktrace(_ref) {
  var _ref$stackframes = _ref.stackframes,
      stackframes = _ref$stackframes === void 0 ? [] : _ref$stackframes,
      codeLanguage = _ref.codeLanguage;

  if ((0, _lodash.isEmpty)(stackframes)) {
    return _react.default.createElement(_EmptyMessage.EmptyMessage, {
      heading: _i18n.i18n.translate('xpack.apm.stacktraceTab.noStacktraceAvailableLabel', {
        defaultMessage: 'No stack trace available.'
      }),
      hideSubheading: true
    });
  }

  var groups = getGroupedStackframes(stackframes);
  return _react.default.createElement(_react.Fragment, null, groups.map(function (group, i) {
    // library frame
    if (group.isLibraryFrame && groups.length > 1) {
      return _react.default.createElement(_react.Fragment, {
        key: i
      }, _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_LibraryStacktrace.LibraryStacktrace, {
        id: i.toString(),
        stackframes: group.stackframes,
        codeLanguage: codeLanguage
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }));
    } // non-library frame


    return group.stackframes.map(function (stackframe, idx) {
      return _react.default.createElement(_react.Fragment, {
        key: "".concat(i, "-").concat(idx)
      }, idx > 0 && _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_Stackframe.Stackframe, {
        codeLanguage: codeLanguage,
        id: "".concat(i, "-").concat(idx),
        initialIsOpen: i === 0 && groups.length > 1,
        stackframe: stackframe
      }));
    });
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
}

function getGroupedStackframes(stackframes) {
  return stackframes.reduce(function (acc, stackframe) {
    var prevGroup = (0, _lodash.last)(acc);
    var shouldAppend = prevGroup && prevGroup.isLibraryFrame === stackframe.library_frame && !prevGroup.excludeFromGrouping && !stackframe.exclude_from_grouping; // append to group

    if (shouldAppend) {
      prevGroup.stackframes.push(stackframe);
      return acc;
    } // create new group


    acc.push({
      isLibraryFrame: Boolean(stackframe.library_frame),
      excludeFromGrouping: Boolean(stackframe.exclude_from_grouping),
      stackframes: [stackframe]
    });
    return acc;
  }, []);
}