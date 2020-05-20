"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternDataPanel = IndexPatternDataPanel;
exports.MemoizedDataPanel = exports.InnerIndexPatternDataPanel = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _drag_drop = require("../drag_drop");

var _field_item = require("./field_item");

var _lens_ui_telemetry = require("../lens_ui_telemetry");

var _loader = require("./loader");

var _pure_helpers = require("./pure_helpers");

var _loader2 = require("../loader");

var _public = require("../../../../../../src/plugins/data/public");

var _lens_field_icon = require("./lens_field_icon");

var _change_indexpattern = require("./change_indexpattern");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO the typings for EuiContextMenuPanel are incorrect - watchedItemProps is missing. This can be removed when the types are adjusted
var FixedEuiContextMenuPanel = _eui.EuiContextMenuPanel;

function sortFields(fieldA, fieldB) {
  return fieldA.name.localeCompare(fieldB.name, undefined, {
    sensitivity: 'base'
  });
}

var supportedFieldTypes = new Set(['string', 'number', 'boolean', 'date', 'ip', 'document']);
var PAGINATION_SIZE = 50;
var fieldTypeNames = {
  document: _i18n.i18n.translate('xpack.lens.datatypes.record', {
    defaultMessage: 'record'
  }),
  string: _i18n.i18n.translate('xpack.lens.datatypes.string', {
    defaultMessage: 'string'
  }),
  number: _i18n.i18n.translate('xpack.lens.datatypes.number', {
    defaultMessage: 'number'
  }),
  boolean: _i18n.i18n.translate('xpack.lens.datatypes.boolean', {
    defaultMessage: 'boolean'
  }),
  date: _i18n.i18n.translate('xpack.lens.datatypes.date', {
    defaultMessage: 'date'
  }),
  ip: _i18n.i18n.translate('xpack.lens.datatypes.ipAddress', {
    defaultMessage: 'IP'
  })
};

function IndexPatternDataPanel(_ref) {
  var setState = _ref.setState,
      state = _ref.state,
      dragDropContext = _ref.dragDropContext,
      core = _ref.core,
      query = _ref.query,
      filters = _ref.filters,
      dateRange = _ref.dateRange,
      changeIndexPattern = _ref.changeIndexPattern;
  var indexPatternRefs = state.indexPatternRefs,
      indexPatterns = state.indexPatterns,
      currentIndexPatternId = state.currentIndexPatternId;
  var onChangeIndexPattern = (0, _react.useCallback)(function (id) {
    return changeIndexPattern(id, state, setState);
  }, [state, setState]);
  var onToggleEmptyFields = (0, _react.useCallback)(function (showEmptyFields) {
    setState(function (prevState) {
      return _objectSpread({}, prevState, {
        showEmptyFields: showEmptyFields === undefined ? !prevState.showEmptyFields : showEmptyFields
      });
    });
  }, [setState]);
  var indexPatternList = (0, _lodash.uniq)(Object.values(state.layers).map(function (l) {
    return l.indexPatternId;
  }).concat(currentIndexPatternId)).sort(function (a, b) {
    return a.localeCompare(b);
  }).filter(function (id) {
    return !!indexPatterns[id];
  }).map(function (id) {
    return {
      id: id,
      title: indexPatterns[id].title,
      timeFieldName: indexPatterns[id].timeFieldName
    };
  });

  var dslQuery = _public.esQuery.buildEsQuery(indexPatterns[currentIndexPatternId], query, filters, _public.esQuery.getEsQueryConfig(core.uiSettings));

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_loader2.Loader, {
    load: function load() {
      return (0, _loader.syncExistingFields)({
        dateRange: dateRange,
        setState: setState,
        indexPatterns: indexPatternList,
        fetchJson: core.http.post,
        dslQuery: dslQuery
      });
    },
    loadDeps: [query, filters, dateRange.fromDate, dateRange.toDate, indexPatternList.map(function (x) {
      return "".concat(x.title, ":").concat(x.timeFieldName);
    }).join(',')]
  }), _react.default.createElement(MemoizedDataPanel, {
    currentIndexPatternId: currentIndexPatternId,
    indexPatternRefs: indexPatternRefs,
    indexPatterns: indexPatterns,
    query: query,
    dateRange: dateRange,
    filters: filters,
    dragDropContext: dragDropContext,
    showEmptyFields: state.showEmptyFields,
    onToggleEmptyFields: onToggleEmptyFields,
    core: core,
    onChangeIndexPattern: onChangeIndexPattern,
    existingFields: state.existingFields
  }));
}

var InnerIndexPatternDataPanel = function InnerIndexPatternDataPanel(_ref2) {
  var currentIndexPatternId = _ref2.currentIndexPatternId,
      indexPatternRefs = _ref2.indexPatternRefs,
      indexPatterns = _ref2.indexPatterns,
      query = _ref2.query,
      dateRange = _ref2.dateRange,
      filters = _ref2.filters,
      dragDropContext = _ref2.dragDropContext,
      _onChangeIndexPattern = _ref2.onChangeIndexPattern,
      showEmptyFields = _ref2.showEmptyFields,
      onToggleEmptyFields = _ref2.onToggleEmptyFields,
      core = _ref2.core,
      existingFields = _ref2.existingFields;

  if (Object.keys(indexPatterns).length === 0) {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "m",
      className: "lnsInnerIndexPatternDataPanel",
      direction: "column",
      responsive: false
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: null
    }, _react.default.createElement(_eui.EuiCallOut, {
      "data-test-subj": "indexPattern-no-indexpatterns",
      title: _i18n.i18n.translate('xpack.lens.indexPattern.noPatternsLabel', {
        defaultMessage: 'No index patterns'
      }),
      color: "warning",
      iconType: "alert"
    }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.lens.indexPattern.noPatternsDescription",
      defaultMessage: "Please create an index pattern or switch to another data source"
    })))));
  }

  var _useState = (0, _react.useState)({
    nameFilter: '',
    typeFilter: [],
    isTypeFilterOpen: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      localState = _useState2[0],
      setLocalState = _useState2[1];

  var _useState3 = (0, _react.useState)(PAGINATION_SIZE),
      _useState4 = _slicedToArray(_useState3, 2),
      pageSize = _useState4[0],
      setPageSize = _useState4[1];

  var _useState5 = (0, _react.useState)(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      scrollContainer = _useState6[0],
      setScrollContainer = _useState6[1];

  var currentIndexPattern = indexPatterns[currentIndexPatternId];
  var allFields = currentIndexPattern.fields;
  var fieldByName = (0, _lodash.indexBy)(allFields, 'name');

  var clearLocalState = function clearLocalState() {
    return setLocalState(function (s) {
      return _objectSpread({}, s, {
        nameFilter: '',
        typeFilter: []
      });
    });
  };

  var lazyScroll = function lazyScroll() {
    if (scrollContainer) {
      var nearBottom = scrollContainer.scrollTop + scrollContainer.clientHeight > scrollContainer.scrollHeight * 0.9;

      if (nearBottom) {
        setPageSize(Math.max(PAGINATION_SIZE, Math.min(pageSize * 1.5, allFields.length)));
      }
    }
  };

  (0, _react.useEffect)(function () {
    // Reset the scroll if we have made material changes to the field list
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
      setPageSize(PAGINATION_SIZE);
      lazyScroll();
    }
  }, [localState.nameFilter, localState.typeFilter, currentIndexPatternId, showEmptyFields]);
  var availableFieldTypes = (0, _lodash.uniq)(allFields.map(function (_ref3) {
    var type = _ref3.type;
    return type;
  })).filter(function (type) {
    return type in fieldTypeNames;
  });
  var displayedFields = allFields.filter(function (field) {
    if (!supportedFieldTypes.has(field.type)) {
      return false;
    }

    if (localState.nameFilter.length && !field.name.toLowerCase().includes(localState.nameFilter.toLowerCase())) {
      return false;
    }

    if (!showEmptyFields) {
      var indexField = currentIndexPattern && fieldByName[field.name];
      var exists = field.type === 'document' || indexField && (0, _pure_helpers.fieldExists)(existingFields, currentIndexPattern.title, indexField.name);

      if (localState.typeFilter.length > 0) {
        return exists && localState.typeFilter.includes(field.type);
      }

      return exists;
    }

    if (localState.typeFilter.length > 0) {
      return localState.typeFilter.includes(field.type);
    }

    return true;
  });
  var specialFields = displayedFields.filter(function (f) {
    return f.type === 'document';
  });
  var paginatedFields = displayedFields.filter(function (f) {
    return f.type !== 'document';
  }).sort(sortFields).slice(0, pageSize);
  var hilight = localState.nameFilter.toLowerCase();

  var filterByTypeLabel = _i18n.i18n.translate('xpack.lens.indexPatterns.filterByTypeLabel', {
    defaultMessage: 'Filter by type'
  });

  return _react.default.createElement(_drag_drop.ChildDragDropProvider, dragDropContext, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    className: "lnsInnerIndexPatternDataPanel",
    direction: "column",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: null
  }, _react.default.createElement("div", {
    className: "lnsInnerIndexPatternDataPanel__header"
  }, _react.default.createElement(_change_indexpattern.ChangeIndexPattern, {
    "data-test-subj": "indexPattern-switcher",
    trigger: {
      label: currentIndexPattern.title,
      title: currentIndexPattern.title,
      'data-test-subj': 'indexPattern-switch-link',
      className: 'lnsInnerIndexPatternDataPanel__triggerButton'
    },
    indexPatternId: currentIndexPatternId,
    indexPatternRefs: indexPatternRefs,
    onChangeIndexPattern: function onChangeIndexPattern(newId) {
      _onChangeIndexPattern(newId);

      clearLocalState();
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement("div", {
    className: "lnsInnerIndexPatternDataPanel__filterWrapper"
  }, _react.default.createElement(_eui.EuiFormControlLayout, {
    icon: "search",
    fullWidth: true,
    clear: {
      title: _i18n.i18n.translate('xpack.lens.indexPatterns.clearFiltersLabel', {
        defaultMessage: 'Clear name and type filters'
      }),
      'aria-label': _i18n.i18n.translate('xpack.lens.indexPatterns.clearFiltersLabel', {
        defaultMessage: 'Clear name and type filters'
      }),
      onClick: function onClick() {
        (0, _lens_ui_telemetry.trackUiEvent)('indexpattern_filters_cleared');
        clearLocalState();
      }
    }
  }, _react.default.createElement("input", {
    className: "euiFieldText euiFieldText--fullWidth lnsInnerIndexPatternDataPanel__textField",
    "data-test-subj": "lnsIndexPatternFieldSearch",
    placeholder: _i18n.i18n.translate('xpack.lens.indexPatterns.filterByNameLabel', {
      defaultMessage: 'Search field names',
      description: 'Search the list of fields in the index pattern for the provided text'
    }),
    value: localState.nameFilter,
    onChange: function onChange(e) {
      setLocalState(_objectSpread({}, localState, {
        nameFilter: e.target.value
      }));
    },
    "aria-label": _i18n.i18n.translate('xpack.lens.indexPatterns.filterByNameAriaLabel', {
      defaultMessage: 'Search fields'
    })
  }))), _react.default.createElement("div", {
    className: "lnsInnerIndexPatternDataPanel__filtersWrapper"
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "dataPanelTypeFilter",
    panelClassName: "euiFilterGroup__popoverPanel",
    panelPaddingSize: "none",
    anchorPosition: "rightDown",
    display: "block",
    isOpen: localState.isTypeFilterOpen,
    closePopover: function closePopover() {
      return setLocalState(function () {
        return _objectSpread({}, localState, {
          isTypeFilterOpen: false
        });
      });
    },
    button: _react.default.createElement(_eui.EuiFacetButton, {
      "data-test-subj": "lnsIndexPatternFiltersToggle",
      className: "lnsInnerIndexPatternDataPanel__filterButton",
      quantity: localState.typeFilter.length,
      icon: _react.default.createElement(_eui.EuiIcon, {
        type: "filter"
      }),
      isSelected: localState.typeFilter.length ? true : false,
      onClick: function onClick() {
        setLocalState(function (s) {
          return _objectSpread({}, s, {
            isTypeFilterOpen: !localState.isTypeFilterOpen
          });
        });
      }
    }, filterByTypeLabel)
  }, _react.default.createElement(_eui.EuiPopoverTitle, null, filterByTypeLabel), _react.default.createElement(FixedEuiContextMenuPanel, {
    watchedItemProps: ['icon', 'disabled'],
    "data-test-subj": "lnsIndexPatternTypeFilterOptions",
    items: availableFieldTypes.map(function (type) {
      return _react.default.createElement(_eui.EuiContextMenuItem, {
        className: "lnsInnerIndexPatternDataPanel__filterType",
        key: type,
        icon: localState.typeFilter.includes(type) ? 'check' : 'empty',
        "data-test-subj": "typeFilter-".concat(type),
        onClick: function onClick() {
          (0, _lens_ui_telemetry.trackUiEvent)('indexpattern_type_filter_toggled');
          setLocalState(function (s) {
            return _objectSpread({}, s, {
              typeFilter: localState.typeFilter.includes(type) ? localState.typeFilter.filter(function (t) {
                return t !== type;
              }) : [].concat(_toConsumableArray(localState.typeFilter), [type])
            });
          });
        }
      }, _react.default.createElement("span", {
        className: "lnsInnerIndexPatternDataPanel__filterTypeInner"
      }, _react.default.createElement(_lens_field_icon.LensFieldIcon, {
        type: type
      }), " ", fieldTypeNames[type]));
    })
  }), _react.default.createElement(_eui.EuiPopoverFooter, null, _react.default.createElement(_eui.EuiSwitch, {
    compressed: true,
    checked: !showEmptyFields,
    onChange: function onChange() {
      (0, _lens_ui_telemetry.trackUiEvent)('indexpattern_existence_toggled');
      onToggleEmptyFields();
    },
    label: _i18n.i18n.translate('xpack.lens.indexPatterns.toggleEmptyFieldsSwitch', {
      defaultMessage: 'Only show fields with data'
    }),
    "data-test-subj": "lnsEmptyFilter"
  })))), _react.default.createElement("div", {
    className: "lnsInnerIndexPatternDataPanel__listWrapper",
    ref: function ref(el) {
      if (el && !el.dataset.dynamicScroll) {
        el.dataset.dynamicScroll = 'true';
        setScrollContainer(el);
      }
    },
    onScroll: lazyScroll
  }, _react.default.createElement("div", {
    className: "lnsInnerIndexPatternDataPanel__list"
  }, specialFields.map(function (field) {
    return _react.default.createElement(_field_item.FieldItem, {
      core: core,
      key: field.name,
      indexPattern: currentIndexPattern,
      field: field,
      highlight: hilight,
      exists: paginatedFields.length > 0,
      dateRange: dateRange,
      query: query,
      filters: filters,
      hideDetails: true
    });
  }), specialFields.length > 0 && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFormLabel, null, _i18n.i18n.translate('xpack.lens.indexPattern.individualFieldsLabel', {
    defaultMessage: 'Individual fields'
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })), paginatedFields.map(function (field) {
    var overallField = fieldByName[field.name];
    return _react.default.createElement(_field_item.FieldItem, {
      core: core,
      indexPattern: currentIndexPattern,
      key: field.name,
      field: field,
      highlight: hilight,
      exists: overallField && (0, _pure_helpers.fieldExists)(existingFields, currentIndexPattern.title, overallField.name),
      dateRange: dateRange,
      query: query,
      filters: filters
    });
  }), paginatedFields.length === 0 && _react.default.createElement(_eui.EuiCallOut, {
    size: "s",
    color: "warning",
    title: localState.typeFilter.length || localState.nameFilter.length ? _i18n.i18n.translate('xpack.lens.indexPatterns.noFilteredFieldsLabel', {
      defaultMessage: 'No fields match the current filters.'
    }) : showEmptyFields ? _i18n.i18n.translate('xpack.lens.indexPatterns.noFieldsLabel', {
      defaultMessage: 'No fields exist in this index pattern.'
    }) : _i18n.i18n.translate('xpack.lens.indexPatterns.emptyFieldsWithDataLabel', {
      defaultMessage: 'Looks like you don’t have any data.'
    })
  }, (!showEmptyFields || localState.typeFilter.length || localState.nameFilter.length) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("strong", null, _i18n.i18n.translate('xpack.lens.indexPatterns.noFields.tryText', {
    defaultMessage: 'Try:'
  })), _react.default.createElement("ul", null, _react.default.createElement("li", null, _i18n.i18n.translate('xpack.lens.indexPatterns.noFields.extendTimeBullet', {
    defaultMessage: 'Extending the time range'
  })), _react.default.createElement("li", null, _i18n.i18n.translate('xpack.lens.indexPatterns.noFields.fieldFilterBullet', {
    defaultMessage: 'Using {filterByTypeLabel} {arrow} to show fields without data',
    values: {
      filterByTypeLabel: filterByTypeLabel,
      arrow: '↑'
    }
  }))))))))));
};

exports.InnerIndexPatternDataPanel = InnerIndexPatternDataPanel;
var MemoizedDataPanel = (0, _react.memo)(InnerIndexPatternDataPanel);
exports.MemoizedDataPanel = MemoizedDataPanel;