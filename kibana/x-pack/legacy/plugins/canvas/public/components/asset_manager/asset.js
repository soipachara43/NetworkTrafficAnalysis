"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Asset = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("../../../i18n");

var _clipboard = require("../clipboard");

var _download = require("../download");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.ComponentStrings.Asset;

var Asset = function Asset(props) {
  var asset = props.asset,
      onCreate = props.onCreate,
      _onCopy = props.onCopy,
      onDelete = props.onDelete;

  var createImage = _react.default.createElement(_eui.EuiFlexItem, {
    className: "asset-create-image",
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: strings.getCreateImageTooltip()
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "vector",
    "aria-label": strings.getCreateImageTooltip(),
    onClick: function onClick() {
      return onCreate(asset);
    }
  })));

  var downloadAsset = _react.default.createElement(_eui.EuiFlexItem, {
    className: "asset-download",
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: strings.getDownloadAssetTooltip()
  }, _react.default.createElement(_download.Download, {
    fileName: asset.id,
    content: asset.value
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "sortDown",
    "aria-label": strings.getDownloadAssetTooltip()
  }))));

  var copyAsset = _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: strings.getCopyAssetTooltip()
  }, _react.default.createElement(_clipboard.Clipboard, {
    content: asset.id,
    onCopy: function onCopy(result) {
      return result && _onCopy(asset);
    }
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "copyClipboard",
    "aria-label": strings.getCopyAssetTooltip()
  }))));

  var deleteAsset = _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: strings.getDeleteAssetTooltip()
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    color: "danger",
    iconType: "trash",
    "aria-label": strings.getDeleteAssetTooltip(),
    onClick: function onClick() {
      return onDelete(asset);
    }
  })));

  var thumbnail = _react.default.createElement("div", {
    className: "canvasAsset__thumb canvasCheckered"
  }, _react.default.createElement(_eui.EuiImage, {
    className: "canvasAsset__img",
    size: "original",
    url: props.asset.value,
    fullScreenIconColor: "dark",
    alt: strings.getThumbnailAltText()
  }));

  var assetLabel = _react.default.createElement(_eui.EuiText, {
    size: "xs",
    className: "eui-textBreakAll"
  }, _react.default.createElement("p", {
    className: "eui-textBreakAll"
  }, _react.default.createElement("strong", null, asset.id), _react.default.createElement("br", null), _react.default.createElement(_eui.EuiTextColor, {
    color: "subdued"
  }, _react.default.createElement("small", null, "(", Math.round(asset.value.length / 1024), " kb)"))));

  return _react.default.createElement(_eui.EuiFlexItem, {
    key: props.asset.id
  }, _react.default.createElement(_eui.EuiPanel, {
    className: "canvasAsset",
    paddingSize: "s"
  }, thumbnail, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), assetLabel, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "baseline",
    justifyContent: "center",
    responsive: false
  }, createImage, downloadAsset, copyAsset, deleteAsset)));
};

exports.Asset = Asset;