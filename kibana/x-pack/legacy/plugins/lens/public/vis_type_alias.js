"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLensAliasConfig = void 0;

var _i18n = require("@kbn/i18n");

var _common = require("../../../../plugins/lens/common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getLensAliasConfig = function getLensAliasConfig() {
  return {
    aliasUrl: (0, _common.getBasePath)(),
    name: 'lens',
    promotion: {
      description: _i18n.i18n.translate('xpack.lens.visTypeAlias.promotion.description', {
        defaultMessage: 'Try Lens, our new, intuitive way to create visualizations.'
      }),
      buttonText: _i18n.i18n.translate('xpack.lens.visTypeAlias.promotion.buttonText', {
        defaultMessage: 'Go to Lens'
      })
    },
    title: _i18n.i18n.translate('xpack.lens.visTypeAlias.title', {
      defaultMessage: 'Lens'
    }),
    description: _i18n.i18n.translate('xpack.lens.visTypeAlias.description', {
      defaultMessage: "Lens is a simpler way to create basic visualizations"
    }),
    icon: 'lensApp',
    stage: 'beta',
    appExtensions: {
      visualizations: {
        docTypes: ['lens'],
        searchFields: ['title^3'],
        toListItem: function toListItem(savedObject) {
          var id = savedObject.id,
              type = savedObject.type,
              attributes = savedObject.attributes;
          var _ref = attributes,
              title = _ref.title;
          return {
            id: id,
            title: title,
            editUrl: (0, _common.getEditPath)(id),
            icon: 'lensApp',
            stage: 'beta',
            savedObjectType: type,
            typeTitle: _i18n.i18n.translate('xpack.lens.visTypeAlias.type', {
              defaultMessage: 'Lens'
            })
          };
        }
      }
    }
  };
};

exports.getLensAliasConfig = getLensAliasConfig;