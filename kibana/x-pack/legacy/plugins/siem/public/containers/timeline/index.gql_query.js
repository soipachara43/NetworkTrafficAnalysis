"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timelineQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetTimelineQuery(\n    $sourceId: ID!\n    $fieldRequested: [String!]!\n    $pagination: PaginationInput!\n    $sortField: SortField!\n    $filterQuery: String\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      Timeline(\n        fieldRequested: $fieldRequested\n        pagination: $pagination\n        sortField: $sortField\n        filterQuery: $filterQuery\n        defaultIndex: $defaultIndex\n      ) {\n        totalCount\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n        pageInfo {\n          endCursor {\n            value\n            tiebreaker\n          }\n          hasNextPage\n        }\n        edges {\n          node {\n            _id\n            _index\n            data {\n              field\n              value\n            }\n            ecs {\n              _id\n              _index\n              timestamp\n              message\n              system {\n                auth {\n                  ssh {\n                    signature\n                    method\n                  }\n                }\n                audit {\n                  package {\n                    arch\n                    entity_id\n                    name\n                    size\n                    summary\n                    version\n                  }\n                }\n              }\n              event {\n                action\n                category\n                code\n                created\n                dataset\n                duration\n                end\n                hash\n                id\n                kind\n                module\n                original\n                outcome\n                risk_score\n                risk_score_norm\n                severity\n                start\n                timezone\n                type\n              }\n              auditd {\n                result\n                session\n                data {\n                  acct\n                  terminal\n                  op\n                }\n                summary {\n                  actor {\n                    primary\n                    secondary\n                  }\n                  object {\n                    primary\n                    secondary\n                    type\n                  }\n                  how\n                  message_type\n                  sequence\n                }\n              }\n              file {\n                name\n                path\n                target_path\n                extension\n                type\n                device\n                inode\n                uid\n                owner\n                gid\n                group\n                mode\n                size\n                mtime\n                ctime\n              }\n              host {\n                id\n                name\n                ip\n              }\n              rule {\n                reference\n              }\n              source {\n                bytes\n                ip\n                packets\n                port\n                geo {\n                  continent_name\n                  country_name\n                  country_iso_code\n                  city_name\n                  region_iso_code\n                  region_name\n                }\n              }\n              destination {\n                bytes\n                ip\n                packets\n                port\n                geo {\n                  continent_name\n                  country_name\n                  country_iso_code\n                  city_name\n                  region_iso_code\n                  region_name\n                }\n              }\n              dns {\n                question {\n                  name\n                  type\n                }\n                resolved_ip\n                response_code\n              }\n              endgame {\n                exit_code\n                file_name\n                file_path\n                logon_type\n                parent_process_name\n                pid\n                process_name\n                subject_domain_name\n                subject_logon_id\n                subject_user_name\n                target_domain_name\n                target_logon_id\n                target_user_name\n              }\n              geo {\n                region_name\n                country_iso_code\n              }\n              signal {\n                original_time\n                rule {\n                  id\n                  saved_id\n                  timeline_id\n                  timeline_title\n                  output_index\n                  from\n                  index\n                  language\n                  query\n                  to\n                  filters\n                  note\n                }\n              }\n              suricata {\n                eve {\n                  proto\n                  flow_id\n                  alert {\n                    signature\n                    signature_id\n                  }\n                }\n              }\n              network {\n                bytes\n                community_id\n                direction\n                packets\n                protocol\n                transport\n              }\n              http {\n                version\n                request {\n                  method\n                  body {\n                    bytes\n                    content\n                  }\n                  referrer\n                }\n                response {\n                  status_code\n                  body {\n                    bytes\n                    content\n                  }\n                }\n              }\n              tls {\n                client_certificate {\n                  fingerprint {\n                    sha1\n                  }\n                }\n                fingerprints {\n                  ja3 {\n                    hash\n                  }\n                }\n                server_certificate {\n                  fingerprint {\n                    sha1\n                  }\n                }\n              }\n              url {\n                original\n                domain\n                username\n                password\n              }\n              user {\n                domain\n                name\n              }\n              winlog {\n                event_id\n              }\n              process {\n                hash {\n                  md5\n                  sha1\n                  sha256\n                }\n                pid\n                name\n                ppid\n                args\n                executable\n                title\n                working_directory\n              }\n              zeek {\n                session_id\n                connection {\n                  local_resp\n                  local_orig\n                  missed_bytes\n                  state\n                  history\n                }\n                notice {\n                  suppress_for\n                  msg\n                  note\n                  sub\n                  dst\n                  dropped\n                  peer_descr\n                }\n                dns {\n                  AA\n                  qclass_name\n                  RD\n                  qtype_name\n                  rejected\n                  qtype\n                  query\n                  trans_id\n                  qclass\n                  RA\n                  TC\n                }\n                http {\n                  resp_mime_types\n                  trans_depth\n                  status_msg\n                  resp_fuids\n                  tags\n                }\n                files {\n                  session_ids\n                  timedout\n                  local_orig\n                  tx_host\n                  source\n                  is_orig\n                  overflow_bytes\n                  sha1\n                  duration\n                  depth\n                  analyzers\n                  mime_type\n                  rx_host\n                  total_bytes\n                  fuid\n                  seen_bytes\n                  missing_bytes\n                  md5\n                }\n                ssl {\n                  cipher\n                  established\n                  resumed\n                  version\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var timelineQuery = (0, _graphqlTag.default)(_templateObject());
exports.timelineQuery = timelineQuery;