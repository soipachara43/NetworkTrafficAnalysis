"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetModal = void 0;

var _eui = require("@elastic/eui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _i18n = require("../../../i18n");

var _constants = require("../../../common/lib/constants");

var _loading = require("../loading");

var _asset = require("./asset");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var strings = _i18n.ComponentStrings.AssetModal;

var AssetModal = function AssetModal(props) {
  var assetValues = props.assetValues,
      isLoading = props.isLoading,
      onAssetCopy = props.onAssetCopy,
      onAssetCreate = props.onAssetCreate,
      onAssetDelete = props.onAssetDelete,
      onClose = props.onClose,
      onFileUpload = props.onFileUpload;
  var assetsTotal = Math.round(assetValues.reduce(function (total, _ref) {
    var value = _ref.value;
    return total + value.length;
  }, 0) / 1024);
  var percentageUsed = Math.round(assetsTotal / _constants.ASSET_MAX_SIZE * 100);

  var emptyAssets = _react.default.createElement("div", {
    className: "canvasAssetManager__emptyPanel"
  }, _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "importAction",
    title: _react.default.createElement("h2", null, strings.getEmptyAssetsDescription()),
    titleSize: "xs"
  }));

  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    onClose: onClose,
    className: "canvasAssetManager canvasModal--fixedSize",
    maxWidth: "1000px"
  }, _react.default.createElement(_eui.EuiModalHeader, {
    className: "canvasAssetManager__modalHeader"
  }, _react.default.createElement(_eui.EuiModalHeaderTitle, {
    className: "canvasAssetManager__modalHeaderTitle"
  }, strings.getModalTitle()), _react.default.createElement(_eui.EuiFlexGroup, {
    className: "canvasAssetManager__fileUploadWrapper"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isLoading ? _react.default.createElement(_loading.Loading, {
    animated: true,
    text: strings.getLoadingText()
  }) : _react.default.createElement(_eui.EuiFilePicker, {
    initialPromptText: strings.getFilePickerPromptText(),
    compressed: true,
    multiple: true,
    onChange: onFileUpload,
    accept: "image/*"
  })))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement("p", null, strings.getDescription())), _react.default.createElement(_eui.EuiSpacer, null), assetValues.length ? _react.default.createElement(_eui.EuiFlexGrid, {
    columns: 4
  }, assetValues.map(function (asset) {
    return _react.default.createElement(_asset.Asset, {
      asset: asset,
      key: asset.id,
      onCopy: onAssetCopy,
      onCreate: onAssetCreate,
      onDelete: onAssetDelete
    });
  })) : emptyAssets), _react.default.createElement(_eui.EuiModalFooter, {
    className: "canvasAssetManager__modalFooter"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    className: "canvasAssetManager__meterWrapper",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiProgress, {
    value: assetsTotal,
    max: _constants.ASSET_MAX_SIZE,
    color: percentageUsed < 90 ? 'secondary' : 'danger',
    size: "s",
    "aria-labelledby": "CanvasAssetManagerLabel"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "eui-textNoWrap"
  }, _react.default.createElement(_eui.EuiText, {
    id: "CanvasAssetManagerLabel"
  }, strings.getSpaceUsedText(percentageUsed)))), _react.default.createElement(_eui.EuiButton, {
    size: "s",
    onClick: onClose
  }, strings.getModalCloseButtonLabel()))));
};

exports.AssetModal = AssetModal;
AssetModal.propTypes = {
  assetValues: _propTypes.default.array,
  isLoading: _propTypes.default.bool,
  onClose: _propTypes.default.func.isRequired,
  onFileUpload: _propTypes.default.func.isRequired,
  onAssetCopy: _propTypes.default.func.isRequired,
  onAssetCreate: _propTypes.default.func.isRequired,
  onAssetDelete: _propTypes.default.func.isRequired
};