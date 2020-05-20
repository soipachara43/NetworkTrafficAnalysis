"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockGlobalState = void 0;

var _constants = require("../components/timeline/body/constants");

var _types = require("../graphql/types");

var _store = require("../store");

var _header = require("./header");

var _constants2 = require("../../common/constants");

var _queries, _queries2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mockGlobalState = {
  app: {
    notesById: {},
    errors: [{
      id: 'error-id-1',
      title: 'title-1',
      message: ['error-message-1']
    }, {
      id: 'error-id-2',
      title: 'title-2',
      message: ['error-message-2']
    }]
  },
  hosts: {
    page: {
      queries: {
        authentications: {
          activePage: 0,
          limit: 10
        },
        allHosts: {
          activePage: 0,
          limit: 10,
          direction: _types.Direction.desc,
          sortField: _types.HostsFields.lastSeen
        },
        events: {
          activePage: 0,
          limit: 10
        },
        uncommonProcesses: {
          activePage: 0,
          limit: 10
        },
        anomalies: null,
        alerts: {
          activePage: 0,
          limit: 10
        }
      }
    },
    details: {
      queries: {
        authentications: {
          activePage: 0,
          limit: 10
        },
        allHosts: {
          activePage: 0,
          limit: 10,
          direction: _types.Direction.desc,
          sortField: _types.HostsFields.lastSeen
        },
        events: {
          activePage: 0,
          limit: 10
        },
        uncommonProcesses: {
          activePage: 0,
          limit: 10
        },
        anomalies: null,
        alerts: {
          activePage: 0,
          limit: 10
        }
      }
    }
  },
  network: {
    page: {
      queries: (_queries = {}, _defineProperty(_queries, _store.networkModel.NetworkTableType.topCountriesDestination, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.NetworkTopTablesFields.bytes_out,
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries, _store.networkModel.NetworkTableType.topCountriesSource, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.NetworkTopTablesFields.bytes_out,
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries, _store.networkModel.NetworkTableType.topNFlowSource, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.NetworkTopTablesFields.bytes_out,
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries, _store.networkModel.NetworkTableType.topNFlowDestination, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.NetworkTopTablesFields.bytes_out,
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries, _store.networkModel.NetworkTableType.dns, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.NetworkDnsFields.queryCount,
          direction: _types.Direction.desc
        },
        isPtrIncluded: false
      }), _defineProperty(_queries, _store.networkModel.NetworkTableType.tls, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.TlsFields._id,
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries, _store.networkModel.NetworkTableType.http, {
        activePage: 0,
        limit: 10,
        sort: {
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries, _store.networkModel.NetworkTableType.alerts, {
        activePage: 0,
        limit: 10
      }), _queries)
    },
    details: {
      flowTarget: _types.FlowTarget.source,
      queries: (_queries2 = {}, _defineProperty(_queries2, _store.networkModel.IpDetailsTableType.topCountriesDestination, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.NetworkTopTablesFields.bytes_out,
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries2, _store.networkModel.IpDetailsTableType.topCountriesSource, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.NetworkTopTablesFields.bytes_out,
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries2, _store.networkModel.IpDetailsTableType.topNFlowSource, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.NetworkTopTablesFields.bytes_out,
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries2, _store.networkModel.IpDetailsTableType.topNFlowDestination, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.NetworkTopTablesFields.bytes_out,
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries2, _store.networkModel.IpDetailsTableType.tls, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.TlsFields._id,
          direction: _types.Direction.desc
        }
      }), _defineProperty(_queries2, _store.networkModel.IpDetailsTableType.users, {
        activePage: 0,
        limit: 10,
        sort: {
          field: _types.UsersFields.name,
          direction: _types.Direction.asc
        }
      }), _defineProperty(_queries2, _store.networkModel.IpDetailsTableType.http, {
        activePage: 0,
        limit: 10,
        sort: {
          direction: _types.Direction.desc
        }
      }), _queries2)
    }
  },
  inputs: {
    global: {
      timerange: {
        kind: 'relative',
        fromStr: _constants2.DEFAULT_FROM,
        toStr: _constants2.DEFAULT_TO,
        from: 0,
        to: 1
      },
      linkTo: ['timeline'],
      queries: [],
      policy: {
        kind: _constants2.DEFAULT_INTERVAL_TYPE,
        duration: _constants2.DEFAULT_INTERVAL_VALUE
      },
      query: {
        query: '',
        language: 'kuery'
      },
      filters: []
    },
    timeline: {
      timerange: {
        kind: 'relative',
        fromStr: _constants2.DEFAULT_FROM,
        toStr: _constants2.DEFAULT_TO,
        from: 0,
        to: 1
      },
      linkTo: ['global'],
      queries: [],
      policy: {
        kind: _constants2.DEFAULT_INTERVAL_TYPE,
        duration: _constants2.DEFAULT_INTERVAL_VALUE
      },
      query: {
        query: '',
        language: 'kuery'
      },
      filters: []
    }
  },
  dragAndDrop: {
    dataProviders: {}
  },
  timeline: {
    showCallOutUnauthorizedMsg: false,
    autoSavedWarningMsg: {
      timelineId: null,
      newTimelineModel: null
    },
    timelineById: {
      test: {
        deletedEventIds: [],
        id: 'test',
        savedObjectId: null,
        columns: _header.defaultHeaders,
        itemsPerPage: 5,
        dataProviders: [],
        description: '',
        eventIdToNoteIds: {},
        highlightedDropAndProviderId: '',
        historyIds: [],
        isFavorite: false,
        isLive: false,
        isSelectAllChecked: false,
        isLoading: false,
        kqlMode: 'filter',
        kqlQuery: {
          filterQuery: null,
          filterQueryDraft: null
        },
        loadingEventIds: [],
        title: '',
        noteIds: [],
        dateRange: {
          start: 0,
          end: 0
        },
        selectedEventIds: {},
        show: false,
        showRowRenderers: true,
        showCheckboxes: false,
        pinnedEventIds: {},
        pinnedEventsSaveObject: {},
        itemsPerPageOptions: [5, 10, 20],
        sort: {
          columnId: '@timestamp',
          sortDirection: _types.Direction.desc
        },
        width: _constants.DEFAULT_TIMELINE_WIDTH,
        isSaving: false,
        version: null
      }
    }
  }
};
exports.mockGlobalState = mockGlobalState;