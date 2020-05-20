"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CATEGORY = exports.TOGGLE_COLUMN_TOOLTIP = exports.RESET_FIELDS = exports.NO_FIELDS_MATCH_INPUT = exports.NO_FIELDS_MATCH = exports.FILTER_PLACEHOLDER = exports.FIELDS_COUNT = exports.FIELDS = exports.FIELD = exports.DESCRIPTION = exports.CUSTOMIZE_COLUMNS = exports.COPY_TO_CLIPBOARD = exports.CATEGORIES_COUNT = exports.CATEGORIES = exports.CATEGORY = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CATEGORY = _i18n.i18n.translate('xpack.siem.fieldBrowser.categoryLabel', {
  defaultMessage: 'Category'
});

exports.CATEGORY = CATEGORY;

var CATEGORIES = _i18n.i18n.translate('xpack.siem.fieldBrowser.categoriesTitle', {
  defaultMessage: 'Categories'
});

exports.CATEGORIES = CATEGORIES;

var CATEGORIES_COUNT = function CATEGORIES_COUNT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.fieldBrowser.categoriesCountTitle', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: '{totalCount} {totalCount, plural, =1 {category} other {categories}}'
  });
};

exports.CATEGORIES_COUNT = CATEGORIES_COUNT;

var COPY_TO_CLIPBOARD = _i18n.i18n.translate('xpack.siem.fieldBrowser.copyToClipboard', {
  defaultMessage: 'Copy to Clipboard'
});

exports.COPY_TO_CLIPBOARD = COPY_TO_CLIPBOARD;

var CUSTOMIZE_COLUMNS = _i18n.i18n.translate('xpack.siem.fieldBrowser.customizeColumnsTitle', {
  defaultMessage: 'Customize Columns'
});

exports.CUSTOMIZE_COLUMNS = CUSTOMIZE_COLUMNS;

var DESCRIPTION = _i18n.i18n.translate('xpack.siem.fieldBrowser.descriptionLabel', {
  defaultMessage: 'Description'
});

exports.DESCRIPTION = DESCRIPTION;

var FIELD = _i18n.i18n.translate('xpack.siem.fieldBrowser.fieldLabel', {
  defaultMessage: 'Field'
});

exports.FIELD = FIELD;

var FIELDS = _i18n.i18n.translate('xpack.siem.fieldBrowser.fieldsTitle', {
  defaultMessage: 'Columns'
});

exports.FIELDS = FIELDS;

var FIELDS_COUNT = function FIELDS_COUNT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.fieldBrowser.fieldsCountTitle', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: '{totalCount} {totalCount, plural, =1 {field} other {fields}}'
  });
};

exports.FIELDS_COUNT = FIELDS_COUNT;

var FILTER_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.fieldBrowser.filterPlaceholder', {
  defaultMessage: 'Field name'
});

exports.FILTER_PLACEHOLDER = FILTER_PLACEHOLDER;

var NO_FIELDS_MATCH = _i18n.i18n.translate('xpack.siem.fieldBrowser.noFieldsMatchLabel', {
  defaultMessage: 'No fields match'
});

exports.NO_FIELDS_MATCH = NO_FIELDS_MATCH;

var NO_FIELDS_MATCH_INPUT = function NO_FIELDS_MATCH_INPUT(searchInput) {
  return _i18n.i18n.translate('xpack.siem.fieldBrowser.noFieldsMatchInputLabel', {
    defaultMessage: 'No fields match {searchInput}',
    values: {
      searchInput: searchInput
    }
  });
};

exports.NO_FIELDS_MATCH_INPUT = NO_FIELDS_MATCH_INPUT;

var RESET_FIELDS = _i18n.i18n.translate('xpack.siem.fieldBrowser.resetFieldsLink', {
  defaultMessage: 'Reset Fields'
});

exports.RESET_FIELDS = RESET_FIELDS;

var TOGGLE_COLUMN_TOOLTIP = _i18n.i18n.translate('xpack.siem.fieldBrowser.toggleColumnTooltip', {
  defaultMessage: 'Toggle column'
});

exports.TOGGLE_COLUMN_TOOLTIP = TOGGLE_COLUMN_TOOLTIP;

var VIEW_CATEGORY = function VIEW_CATEGORY(categoryId) {
  return _i18n.i18n.translate('xpack.siem.fieldBrowser.viewCategoryTooltip', {
    defaultMessage: 'View all {categoryId} fields',
    values: {
      categoryId: categoryId
    }
  });
};

exports.VIEW_CATEGORY = VIEW_CATEGORY;