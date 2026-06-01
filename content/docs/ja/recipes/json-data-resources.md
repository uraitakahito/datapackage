---
title: JSON データリソース
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージ標準の有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Michael Joseph Rosenthal</td>
  </tr>
</table>

単一の構造化された JSON データリソースを記述するためのシンプルな形式。著者やタイトルといったメタデータのサポートと、データを記述するための[スキーマ](https://json-schema.org/)のサポートの両方を含む。

## はじめに {#introduction}

**JSON データリソース**は、構造化された JSON データを記述することに特化した[データリソース][dr]の一種である。

JSON データリソースは、[データリソース][dr]を以下の重要な点で拡張する。

- `schema` プロパティは [JSON Schema](https://json-schema.org/) 仕様に従わなければならない (`MUST`)。プロパティの直下に JSON オブジェクトとして記述するか、あるいは JSON Schema を含む別の JSON ドキュメントを参照する文字列とする

## 例 {#examples}

外部の JSON ドキュメントを参照する、最小限の JSON データリソースは以下のようになる。

```javascript
// with data and a schema accessible via the local filesystem
{
  "profile": "json-data-resource",
  "name": "resource-name",
  "path": [ "resource-path.json" ],
  "schema": "jsonschema.json"
}

// with data accessible via http
{
  "profile": "json-data-resource",
  "name": "resource-name",
  "path": [ "http://example.com/resource-path.json" ],
  "schema": "http://example.com/jsonschema.json"
}
```

`data` プロパティを使ってデータをインライン化する、最小限の JSON データリソースの例は以下のようになる。

```javascript
{
  "profile": "json-data-resource",
  "name": "resource-name",
  "data": {
    "id": 1,
    "first_name": "Louise"
  },
  "schema": {
    "type": "object",
    "required": [
      "id"
    ],
    "properties": {
      "id": {
        "type": "integer"
      },
      "first_name": {
        "type": "string"
      }
    }
  }
}
```

必須・推奨・任意のすべてのプロパティを備えた、包括的な JSON データリソースの例は以下のようになる。

```javascript
{
  "profile": "json-data-resource",
  "name": "solar-system",
  "path": "http://example.com/solar-system.json",
  "title": "The Solar System",
  "description": "My favourite data about the solar system.",
  "format": "json",
  "mediatype": "application/json",
  "encoding": "utf-8",
  "bytes": 1,
  "hash": "",
  "schema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "required": [
      "id"
    ],
    "properties": {
      "id": {
        "type": "integer"
      },
      "name": {
        "type": "string"
      },
      "description": {
        "type": "string"
      }
    }
  },
  "sources": [{
    "title": "The Solar System - 2001",
    "path": "http://example.com/solar-system-2001.json",
    "email": ""
  }],
  "licenses": [{
    "name": "CC-BY-4.0",
    "title": "Creative Commons Attribution 4.0",
    "path": "https://creativecommons.org/licenses/by/4.0/"
  }]
}
```

## 仕様 {#specification}

JSON データリソースは[データリソース][dr]でなければならない (`MUST`)。すなわち、[データリソース仕様][dr]に準拠しなければならない (`MUST`)。

加えて以下のとおりである。

- データリソースの `schema` プロパティは [JSON Schema](https://json-schema.org/) 仕様に従わなければならない (`MUST`)。プロパティの直下に JSON オブジェクトとして記述するか、あるいは JSON Schema を含む別の JSON ドキュメントを参照する文字列とする
- 値が `json-data-resource` である `profile` プロパティが存在しなければならない (`MUST`)
- データリソースが記述するデータは、インラインでない場合、JSON ファイルでなければならない (`MUST`)

## JSON ファイルの要件 {#json-file-requirements}

`"format": "json"` の場合、ファイルは [JSON 仕様](https://www.json.org/)に厳密に従わなければならない。実装によっては `"format": "jsonc"` をサポートしてもよく (`MAY`)、その場合は非標準の単一行コメントおよびブロックコメント(それぞれ `//` と `/* */`)が許容される。

## 実装 {#implementations}

知られているものはない。
