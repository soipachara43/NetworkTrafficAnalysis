"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeatDetailTagsTable = exports.TagsTableType = exports.BeatsTableType = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireDefault(require("react"));

var _connected_link = require("../navigation/connected_link");

var _tag = require("../tag");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var dynamicStatuses = {
  STARTING: {
    color: 'success',
    status: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.startingStatusLabel', {
      defaultMessage: 'Starting'
    }),
    details: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.startingTooltip', {
      defaultMessage: 'This Beat is starting.'
    })
  },
  IN_PROGRESS: {
    color: 'warning',
    status: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.updatingStatusLabel', {
      defaultMessage: 'Updating'
    }),
    details: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.progressTooltip', {
      defaultMessage: 'This Beat is currently reloading config from CM.'
    })
  },
  RUNNING: {
    color: 'success',
    status: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.runningStatusLabel', {
      defaultMessage: 'Running'
    }),
    details: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.runningTooltip', {
      defaultMessage: 'This Beat is running without issues.'
    })
  },
  CONFIG: {
    color: 'danger',
    status: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configErrorStatusLabel', {
      defaultMessage: 'Config error'
    })
  },
  FAILED: {
    color: 'danger',
    status: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.failedStatusLabel', {
      defaultMessage: 'Error'
    }),
    details: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.errorTooltip', {
      defaultMessage: 'There is an error on this beat, please check the logs for this host.'
    })
  },
  STOPPED: {
    color: 'danger',
    status: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.stoppedStatusLabel', {
      defaultMessage: 'stopped'
    }),
    details: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.errorTooltip', {
      defaultMessage: 'There is an error on this beat, please check the logs for this host.'
    })
  }
};
var BeatsTableType = {
  itemType: 'Beats',
  columnDefinitions: [{
    field: 'name',
    name: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.beatNameTitle', {
      defaultMessage: 'Beat name'
    }),
    render: function render(name, beat) {
      return _react.default.createElement(_connected_link.ConnectedLink, {
        path: "/beat/".concat(beat.id, "/details")
      }, name);
    },
    sortable: true
  }, {
    field: 'type',
    name: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.typeTitle', {
      defaultMessage: 'Type'
    }),
    sortable: true
  }, {
    field: 'full_tags',
    name: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.tagsTitle', {
      defaultMessage: 'Tags'
    }),
    render: function render(value, beat) {
      return _react.default.createElement(_eui.EuiFlexGroup, {
        wrap: true,
        responsive: true,
        gutterSize: "xs"
      }, ((0, _lodash.sortBy)(beat.tags, 'id') || []).map(function (tag) {
        return _react.default.createElement(_eui.EuiFlexItem, {
          key: tag.id,
          grow: false
        }, _react.default.createElement(_connected_link.ConnectedLink, {
          path: "/tag/edit/".concat(tag.id)
        }, _react.default.createElement(_tag.TagBadge, {
          tag: tag
        })));
      }));
    },
    sortable: false
  }, {
    field: 'config_status',
    name: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatusTitle', {
      defaultMessage: 'Config Status'
    }),
    render: function render(value, beat) {
      var color = 'success';

      var statusText = _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.okLabel', {
        defaultMessage: 'OK'
      });

      var tooltipText = _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.okTooltip', {
        defaultMessage: 'Beat successfully applied latest config'
      });

      if (beat.status && (0, _moment.default)().diff(beat.last_checkin, 'minutes') < 10) {
        color = dynamicStatuses[beat.status.event.type].color;
        statusText = dynamicStatuses[beat.status.event.type].status;
        tooltipText = dynamicStatuses[beat.status.event.type].details || beat.status.event.message;
      } else if (!beat.status && (0, _moment.default)().diff(beat.last_checkin, 'minutes') >= 10) {
        color = 'danger';
        statusText = _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.offlineLabel', {
          defaultMessage: 'Offline'
        });
        tooltipText = _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.noConnectionTooltip', {
          defaultMessage: 'This Beat has not connected to kibana in over 10min'
        });
      } else if (beat.status && (0, _moment.default)().diff(beat.last_checkin, 'minutes') >= 10) {
        color = 'subdued';
        tooltipText = _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.notStartedTooltip', {
          defaultMessage: 'This Beat has not yet been started.'
        });
        statusText = _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.notStartedLabel', {
          defaultMessage: 'Not started'
        });
      } else {
        color = 'subdued';
        statusText = _i18n.i18n.translate('xpack.beatsManagement.beatsTable.configStatus.offlineLabel', {
          defaultMessage: 'Offline'
        });
      }

      return _react.default.createElement(_eui.EuiFlexGroup, {
        wrap: true,
        responsive: true,
        gutterSize: "xs"
      }, _react.default.createElement(_eui.EuiToolTip, {
        content: tooltipText
      }, _react.default.createElement(_eui.EuiHealth, {
        color: color
      }, statusText)));
    },
    sortable: false
  }],
  controlDefinitions: function controlDefinitions(data) {
    return {
      actions: [{
        name: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.disenrollSelectedLabel', {
          defaultMessage: 'Unenroll Selected'
        }),
        action: 'delete',
        danger: true
      }],
      filters: [{
        type: 'field_value_selection',
        field: 'type',
        name: _i18n.i18n.translate('xpack.beatsManagement.beatsTable.typeLabel', {
          defaultMessage: 'Type'
        }),
        options: (0, _lodash.uniq)(data.map(function (_ref) {
          var type = _ref.type;
          return {
            value: type
          };
        }), 'value')
      }]
    };
  }
};
exports.BeatsTableType = BeatsTableType;
var TagsTableType = {
  itemType: 'Tags',
  columnDefinitions: [{
    field: 'id',
    name: _i18n.i18n.translate('xpack.beatsManagement.tagsTable.tagNameTitle', {
      defaultMessage: 'Tag name'
    }),
    render: function render(id, tag) {
      return _react.default.createElement(_connected_link.ConnectedLink, {
        path: "/tag/edit/".concat(tag.id)
      }, _react.default.createElement(_tag.TagBadge, {
        tag: tag
      }));
    },
    sortable: true,
    width: '45%'
  }, {
    align: 'right',
    field: 'last_updated',
    name: _i18n.i18n.translate('xpack.beatsManagement.tagsTable.lastUpdateTitle', {
      defaultMessage: 'Last update'
    }),
    render: function render(lastUpdate) {
      return _react.default.createElement("div", null, (0, _moment.default)(lastUpdate).fromNow());
    },
    sortable: true
  }],
  controlDefinitions: function controlDefinitions(data) {
    return {
      actions: [{
        name: _i18n.i18n.translate('xpack.beatsManagement.tagsTable.removeSelectedLabel', {
          defaultMessage: 'Remove Selected'
        }),
        action: 'delete',
        danger: true
      }],
      filters: []
    };
  }
};
exports.TagsTableType = TagsTableType;
var BeatDetailTagsTable = {
  itemType: 'Tags',
  columnDefinitions: [{
    field: 'id',
    name: _i18n.i18n.translate('xpack.beatsManagement.beatTagsTable.tagNameTitle', {
      defaultMessage: 'Tag name'
    }),
    render: function render(id, tag) {
      return _react.default.createElement(_connected_link.ConnectedLink, {
        path: "/tag/edit/".concat(tag.id)
      }, _react.default.createElement(_tag.TagBadge, {
        tag: tag
      }));
    },
    sortable: true,
    width: '55%'
  }, {
    align: 'right',
    field: 'last_updated',
    name: _i18n.i18n.translate('xpack.beatsManagement.beatTagsTable.lastUpdateTitle', {
      defaultMessage: 'Last update'
    }),
    render: function render(lastUpdate) {
      return _react.default.createElement("span", null, (0, _moment.default)(lastUpdate).fromNow());
    },
    sortable: true
  }],
  controlDefinitions: function controlDefinitions(data) {
    return {
      actions: [],
      filters: [],
      primaryActions: [{
        name: _i18n.i18n.translate('xpack.beatsManagement.beatTagsTable.addTagLabel', {
          defaultMessage: 'Add Tag'
        }),
        action: 'add',
        danger: false
      }, {
        name: _i18n.i18n.translate('xpack.beatsManagement.beatTagsTable.removeSelectedLabel', {
          defaultMessage: 'Remove Selected'
        }),
        action: 'remove',
        danger: true
      }]
    };
  }
};
exports.BeatDetailTagsTable = BeatDetailTagsTable;