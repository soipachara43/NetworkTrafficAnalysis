"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGenerateCsv = createGenerateCsv;

var _flatten_hit = require("./flatten_hit");

var _format_csv_values = require("./format_csv_values");

var _escape_value = require("./escape_value");

var _hit_iterator = require("./hit_iterator");

var _max_size_string_builder = require("./max_size_string_builder");

var _check_cells_for_formulas = require("./check_cells_for_formulas");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createGenerateCsv(logger) {
  const hitIterator = (0, _hit_iterator.createHitIterator)(logger);
  return async function generateCsv({
    searchRequest,
    fields,
    formatsMap,
    metaFields,
    conflictedTypesFields,
    callEndpoint,
    cancellationToken,
    settings
  }) {
    const escapeValue = (0, _escape_value.createEscapeValue)(settings.quoteValues);
    const builder = new _max_size_string_builder.MaxSizeStringBuilder(settings.maxSizeBytes);
    const header = `${fields.map(escapeValue).join(settings.separator)}\n`;

    if (!builder.tryAppend(header)) {
      return {
        size: 0,
        content: '',
        maxSizeReached: true
      };
    }

    const iterator = hitIterator(settings.scroll, callEndpoint, searchRequest, cancellationToken);
    let maxSizeReached = false;
    let csvContainsFormulas = false;
    const flattenHit = (0, _flatten_hit.createFlattenHit)(fields, metaFields, conflictedTypesFields);
    const formatCsvValues = (0, _format_csv_values.createFormatCsvValues)(escapeValue, settings.separator, fields, formatsMap);

    try {
      while (true) {
        const {
          done,
          value: hit
        } = await iterator.next();

        if (!hit) {
          break;
        }

        if (done) {
          break;
        }

        const flattened = flattenHit(hit);
        const rows = formatCsvValues(flattened);
        const rowsHaveFormulas = settings.checkForFormulas && (0, _check_cells_for_formulas.checkIfRowsHaveFormulas)(flattened, fields);

        if (rowsHaveFormulas) {
          csvContainsFormulas = true;
        }

        if (!builder.tryAppend(rows + '\n')) {
          logger.warn('max Size Reached');
          maxSizeReached = true;
          cancellationToken.cancel();
          break;
        }
      }
    } finally {
      await iterator.return();
    }

    const size = builder.getSizeInBytes();
    logger.debug(`finished generating, total size in bytes: ${size}`);
    return {
      content: builder.getString(),
      csvContainsFormulas,
      maxSizeReached,
      size
    };
  };
}