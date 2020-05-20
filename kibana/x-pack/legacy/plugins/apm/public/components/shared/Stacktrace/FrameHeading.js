"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameHeading = void 0;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../style/variables");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FileDetails = _styledComponents.default.div.withConfig({
  displayName: "FileDetails",
  componentId: "kpezkn-0"
})(["color:", ";padding:", " 0;font-family:", ";font-size:", ";"], _eui_theme_light.default.euiColorDarkShade, (0, _variables.px)(_variables.units.half), _variables.fontFamilyCode, _variables.fontSize);

var LibraryFrameFileDetail = _styledComponents.default.span.withConfig({
  displayName: "LibraryFrameFileDetail",
  componentId: "kpezkn-1"
})(["color:", ";"], _eui_theme_light.default.euiColorDarkShade);

var AppFrameFileDetail = _styledComponents.default.span.withConfig({
  displayName: "AppFrameFileDetail",
  componentId: "kpezkn-2"
})(["color:", ";"], _eui_theme_light.default.euiColorFullShade);

var FrameHeading = function FrameHeading(_ref) {
  var _ref2, _stackframe$line;

  var stackframe = _ref.stackframe,
      isLibraryFrame = _ref.isLibraryFrame;
  var FileDetail = isLibraryFrame ? LibraryFrameFileDetail : AppFrameFileDetail;
  var lineNumber = (_ref2 = (_stackframe$line = stackframe.line) === null || _stackframe$line === void 0 ? void 0 : _stackframe$line.number) !== null && _ref2 !== void 0 ? _ref2 : 0;
  var name = 'filename' in stackframe ? stackframe.filename : stackframe.classname;
  return _react.default.createElement(FileDetails, null, _react.default.createElement(FileDetail, null, name), " in", ' ', _react.default.createElement(FileDetail, null, stackframe.function), lineNumber > 0 && _react.default.createElement(_react.Fragment, null, ' at ', _react.default.createElement(FileDetail, null, "line ", lineNumber)));
};

exports.FrameHeading = FrameHeading;