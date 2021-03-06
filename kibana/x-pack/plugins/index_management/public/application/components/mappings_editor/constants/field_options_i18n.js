"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LANGUAGE_OPTIONS_TEXT = exports.FIELD_OPTIONS_TEXTS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FIELD_OPTIONS_TEXTS = {
  'indexOptions.docs': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.indexOptions.docNumberTitle', {
      defaultMessage: 'Doc number'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.indexOptions.docNumberDescription', {
      defaultMessage: 'Index the doc number only. Used to verify the existence of a term in a field.'
    })
  },
  'indexOptions.freqs': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.indexOptions.termFrequencyTitle', {
      defaultMessage: 'Term frequencies'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.indexOptions.termFrequencyDescription', {
      defaultMessage: 'Index the doc number and term frequencies. Repeated terms score higher than single terms.'
    })
  },
  'indexOptions.positions': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.indexOptions.positionsTitle', {
      defaultMessage: 'Positions'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.indexOptions.positionsDescription', {
      defaultMessage: 'Index the doc number, term frequencies, positions, and start and end character offsets. Offsets map the term back to the original string.'
    })
  },
  'indexOptions.offsets': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.indexOptions.offsetsTitle', {
      defaultMessage: 'Offsets'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.indexOptions.offsetsDescription', {
      defaultMessage: 'Doc number, term frequencies, positions, and start and end character offsets (which map the term back to the original string) are indexed.'
    })
  },
  'analyzer.indexDefault': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.indexDefaultTitle', {
      defaultMessage: 'Index default'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.indexDefaultDescription', {
      defaultMessage: 'Use the analyzer defined for the index.'
    })
  },
  'analyzer.standard': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.standardTitle', {
      defaultMessage: 'Standard'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.standardDescription', {
      defaultMessage: 'The standard analyzer divides text into terms on word boundaries, as defined by the Unicode Text Segmentation algorithm.'
    })
  },
  'analyzer.simple': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.simpleTitle', {
      defaultMessage: 'Simple'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.simpleDescription', {
      defaultMessage: 'The simple analyzer divides text into terms whenever it encounters a character which is not a letter. '
    })
  },
  'analyzer.whitespace': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.whitespaceTitle', {
      defaultMessage: 'Whitespace'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.whitespaceDescription', {
      defaultMessage: 'The whitespace analyzer divides text into terms whenever it encounters any whitespace character.'
    })
  },
  'analyzer.stop': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.stopTitle', {
      defaultMessage: 'Stop'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.stopDescription', {
      defaultMessage: 'The stop analyzer is like the simple analyzer, but also supports removal of stop words.'
    })
  },
  'analyzer.keyword': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.keywordTitle', {
      defaultMessage: 'Keyword'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.keywordDescription', {
      defaultMessage: 'The keyword analyzer is a “noop” analyzer that accepts whatever text it is given and outputs the exact same text as a single term.'
    })
  },
  'analyzer.pattern': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.patternTitle', {
      defaultMessage: 'Pattern'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.patternDescription', {
      defaultMessage: 'The pattern analyzer uses a regular expression to split the text into terms. It supports lower-casing and stop words.'
    })
  },
  'analyzer.fingerprint': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.fingerprintTitle', {
      defaultMessage: 'Fingerprint'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.fingerprintDescription', {
      defaultMessage: 'The fingerprint analyzer is a specialist analyzer which creates a fingerprint which can be used for duplicate detection.'
    })
  },
  'analyzer.language': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.languageTitle', {
      defaultMessage: 'Language'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.languageDescription', {
      defaultMessage: 'Elasticsearch provides many language-specific analyzers like english or french.'
    })
  },
  'similarity.bm25': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.similarity.bm25Title', {
      defaultMessage: 'Okapi BM25'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.similarity.bm25Description', {
      defaultMessage: 'The default algorithm used in Elasticsearch and Lucene.'
    })
  },
  'similarity.boolean': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.similarity.booleanTitle', {
      defaultMessage: 'Boolean'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.similarity.booleanDescription', {
      defaultMessage: 'A boolean similarity to use when full text-ranking is not needed. The score is based on whether the query terms match.'
    })
  },
  'termVector.no': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.noTitle', {
      defaultMessage: 'No'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.noDescription', {
      defaultMessage: 'No term vectors are stored.'
    })
  },
  'termVector.yes': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.yesTitle', {
      defaultMessage: 'Yes'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.yesDescription', {
      defaultMessage: 'Just the terms in the field are stored.'
    })
  },
  'termVector.withPositions': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.withPositionsTitle', {
      defaultMessage: 'With positions'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.withPositionsDescription', {
      defaultMessage: 'Terms and positions are stored.'
    })
  },
  'termVector.withOffsets': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.withOffsetsTitle', {
      defaultMessage: 'With offsets'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.withOffsetsDescription', {
      defaultMessage: 'Terms and character offsets are stored.'
    })
  },
  'termVector.withPositionsOffsets': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.withPositionsOffsetsTitle', {
      defaultMessage: 'With positions and offsets'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.withPositionsOffsetsDescription', {
      defaultMessage: 'Terms, positions, and character offsets are stored.'
    })
  },
  'termVector.withPositionsPayloads': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.withPositionsPayloadsTitle', {
      defaultMessage: 'With positions and payloads'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.withPositionsPayloadsDescription', {
      defaultMessage: 'Terms, positions, and payloads are stored.'
    })
  },
  'termVector.withPositionsOffsetsPayloads': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.withPositionsOffsetsPayloadsTitle', {
      defaultMessage: 'With positions, offsets, and payloads'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.termVector.withPositionsOffsetsPayloadsDescription', {
      defaultMessage: 'Terms, positions, offsets and payloads are stored.'
    })
  },
  'orientation.counterclockwise': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.orientation.counterclockwiseTitle', {
      defaultMessage: 'Counterclockwise'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.orientation.counterclockwiseDescription', {
      defaultMessage: 'Defines outer polygon vertices in counterclockwise order and interior shape vertices in clockwise order. This is the Open Geospatial Consortium (OGC) and GeoJSON standard.'
    })
  },
  'orientation.clockwise': {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.orientation.clockwiseTitle', {
      defaultMessage: 'Clockwise'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.orientation.clockwiseDescription', {
      defaultMessage: 'Defines outer polygon vertices in clockwise order and interior shape vertices in counterclockwise order.'
    })
  }
};
exports.FIELD_OPTIONS_TEXTS = FIELD_OPTIONS_TEXTS;
var LANGUAGE_OPTIONS_TEXT = {
  arabic: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.arabic', {
    defaultMessage: 'Arabic'
  }),
  armenian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.armenian', {
    defaultMessage: 'Armenian'
  }),
  basque: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.basque', {
    defaultMessage: 'Basque'
  }),
  bengali: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.bengali', {
    defaultMessage: 'Bengali'
  }),
  brazilian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.brazilian', {
    defaultMessage: 'Brazilian'
  }),
  bulgarian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.bulgarian', {
    defaultMessage: 'Bulgarian'
  }),
  catalan: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.catalan', {
    defaultMessage: 'Catalan'
  }),
  cjk: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.cjk', {
    defaultMessage: 'Cjk'
  }),
  czech: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.czech', {
    defaultMessage: 'Czech'
  }),
  danish: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.danish', {
    defaultMessage: 'Danish'
  }),
  dutch: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.dutch', {
    defaultMessage: 'Dutch'
  }),
  english: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.english', {
    defaultMessage: 'English'
  }),
  finnish: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.finnish', {
    defaultMessage: 'Finnish'
  }),
  french: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.french', {
    defaultMessage: 'French'
  }),
  galician: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.galician', {
    defaultMessage: 'Galician'
  }),
  german: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.german', {
    defaultMessage: 'German'
  }),
  greek: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.greek', {
    defaultMessage: 'Greek'
  }),
  hindi: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.hindi', {
    defaultMessage: 'Hindi'
  }),
  hungarian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.hungarian', {
    defaultMessage: 'Hungarian'
  }),
  indonesian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.indonesian', {
    defaultMessage: 'Indonesian'
  }),
  irish: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.irish', {
    defaultMessage: 'Irish'
  }),
  italian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.italian', {
    defaultMessage: 'Italian'
  }),
  latvian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.latvian', {
    defaultMessage: 'Latvian'
  }),
  lithuanian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.lithuanian', {
    defaultMessage: 'Lithuanian'
  }),
  norwegian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.norwegian', {
    defaultMessage: 'Norwegian'
  }),
  persian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.persian', {
    defaultMessage: 'Persian'
  }),
  portuguese: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.portuguese', {
    defaultMessage: 'Portuguese'
  }),
  romanian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.romanian', {
    defaultMessage: 'Romanian'
  }),
  russian: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.russian', {
    defaultMessage: 'Russian'
  }),
  sorani: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.sorani', {
    defaultMessage: 'Sorani'
  }),
  spanish: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.spanish', {
    defaultMessage: 'Spanish'
  }),
  swedish: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.swedish', {
    defaultMessage: 'Swedish'
  }),
  thai: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.thai', {
    defaultMessage: 'Thai'
  }),
  turkish: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.languageAnalyzer.turkish', {
    defaultMessage: 'Turkish'
  })
};
exports.LANGUAGE_OPTIONS_TEXT = LANGUAGE_OPTIONS_TEXT;