"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wildcardTemplate = exports.spanWithinTemplate = exports.spanContainingTemplate = exports.spanOrTemplate = exports.spanNotTemplate = exports.spanTermTemplate = exports.spanNearTemplate = exports.spanFirstTemplate = exports.rangeTemplate = exports.prefixTemplate = exports.fuzzyTemplate = exports.regexpTemplate = void 0;

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable @typescript-eslint/camelcase */
const regexpTemplate = {
  FIELD: 'REGEXP'
};
exports.regexpTemplate = regexpTemplate;
const fuzzyTemplate = {
  FIELD: {}
};
exports.fuzzyTemplate = fuzzyTemplate;
const prefixTemplate = {
  FIELD: {
    value: ''
  }
};
exports.prefixTemplate = prefixTemplate;
const rangeTemplate = {
  FIELD: {
    gte: 10,
    lte: 20
  }
};
exports.rangeTemplate = rangeTemplate;
const spanFirstTemplate = {
  match: {
    span_term: {
      FIELD: 'VALUE'
    }
  },
  end: 3
};
exports.spanFirstTemplate = spanFirstTemplate;
const spanNearTemplate = {
  clauses: [{
    span_term: {
      FIELD: {
        value: 'VALUE'
      }
    }
  }],
  slop: 12,
  in_order: false
};
exports.spanNearTemplate = spanNearTemplate;
const spanTermTemplate = {
  FIELD: {
    value: 'VALUE'
  }
};
exports.spanTermTemplate = spanTermTemplate;
const spanNotTemplate = {
  include: {
    span_term: {
      FIELD: {
        value: 'VALUE'
      }
    }
  },
  exclude: {
    span_term: {
      FIELD: {
        value: 'VALUE'
      }
    }
  }
};
exports.spanNotTemplate = spanNotTemplate;
const spanOrTemplate = {
  clauses: [{
    span_term: {
      FIELD: {
        value: 'VALUE'
      }
    }
  }]
};
exports.spanOrTemplate = spanOrTemplate;
const spanContainingTemplate = {
  little: {
    span_term: {
      FIELD: {
        value: 'VALUE'
      }
    }
  },
  big: {
    span_near: {
      clauses: [{
        span_term: {
          FIELD: {
            value: 'VALUE'
          }
        }
      }, {
        span_term: {
          FIELD: {
            value: 'VALUE'
          }
        }
      }],
      slop: 5,
      in_order: false
    }
  }
};
exports.spanContainingTemplate = spanContainingTemplate;
const spanWithinTemplate = {
  little: {
    span_term: {
      FIELD: {
        value: 'VALUE'
      }
    }
  },
  big: {
    span_near: {
      clauses: [{
        span_term: {
          FIELD: {
            value: 'VALUE'
          }
        }
      }, {
        span_term: {
          FIELD: {
            value: 'VALUE'
          }
        }
      }],
      slop: 5,
      in_order: false
    }
  }
};
exports.spanWithinTemplate = spanWithinTemplate;
const wildcardTemplate = {
  FIELD: {
    value: 'VALUE'
  }
};
exports.wildcardTemplate = wildcardTemplate;