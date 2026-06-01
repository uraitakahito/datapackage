---
title: テーブルスキーマ内のメタデータ
sidebar:
  hidden: true
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージ標準の有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Christophe Benz, Johan Richer</td>
  </tr>
</table>

## 概要 {#overview}

テーブルスキーマは、他の文脈情報(たとえばデータパッケージのメタデータ)に依存することなく、独立して解釈されるために、それ自身のメタデータを必要とする。スキーマを構造化された方法で記述するメタデータを追加することは、利用者がスキーマを理解する助けとなり、その共有と再利用を促進するだろう。

現状でもテーブルスキーマにカスタムプロパティを追加することは可能であるが、それらのプロパティに関する合意の欠如が、共通のツール化とより広範な採用を妨げている。

## ユースケース {#use-cases}

- ドキュメント生成: スキーマそのものから Markdown ドキュメントを生成することは有用なユースケースであり、そのために文脈情報(説明、バージョン、著者など)を取得する必要がある。
- カタログ化: テーブルスキーマの共有可能性を高めること、たとえばカタログ内でスキーマを(キーワード、国、全文検索などで)検索・分類できるようにすることで、オープンデータの標準化を進めることができる。
- 機械可読性: Goodtables のようなツールは、利用者が既存のスキーマに対して表形式ファイルを検証する助けとするために、カタログを利用してテーブルスキーマにアクセスできる。ツールがそれらのスキーマを発見し読み取るためには、メタデータが必要となる。

## 仕様 {#specification}

このパターンは、テーブルスキーマ仕様に以下のプロパティを導入する([Frictionless Data コア辞書](https://github.com/frictionlessdata/specs/blob/master/schemas/dictionary/common.yml)を可能なかぎり活用している)。

- `name`: このスキーマの識別子文字列。
- `title`: このスキーマの人間可読なタイトル。
- `description`: このスキーマのテキストによる説明。
- `keywords`: このスキーマを表すキーワード。
  _タグはスキーマの分類とカタログ化に有用である。_
- `countryCode`: このスキーマが主に使用される国の ISO 3166-1 alpha-2 コード。
  _オープンデータのスキーマは国に強く依存することが多いため、この情報を構造化された方法で持つことは有用である。_
- `homepage`: このスキーマに関連する、ウェブ上のホーム。
- `path`: このスキーマの完全修飾 URL。
  _スキーマそのものへの直接のパスは、それへのアクセス(すなわち機械可読性)を助けるうえで有用となりうる。_
- `image`: このスキーマを表す画像。
  _任意のイラストは、たとえばカタログにおいて一覧の中でスキーマを区別するのに有用となりうる。_
- `licenses`: このスキーマが公開されるライセンス。
- `resources`: このスキーマに対して検証され、有効または無効と判定された、表形式データリソースの例。
  _スキーマはしばしば、それを例示するために、有効なファイルや、場合によっては無効なファイル(たとえば制約エラーを含むもの)とともに、例となるリソースを添えて共有される。_
- `sources`: このスキーマの作成に用いられたソース。
  _場合によっては、スキーマは法令文や、人間可読なドキュメントに記された何らかの仕様草案をもとに作成される。そうした場合、それらをスキーマとともに共有することは有用である。_
- `created`: このスキーマが作成された日時。
- `lastModified`: このスキーマが最後に変更された日時。
- `version`: このスキーマの一意なバージョン番号。
- `contributors`: このスキーマへの貢献者。

## スキーマの例 {#example-schema}

```
{
  "$schema": "https://specs.frictionlessdata.io/schemas/table-schema.json",
  "name": "irve",
  "title": "Infrastructures de recharge de véhicules électriques",
  "description": "Spécification du fichier d'échange relatif aux données concernant la localisation géographique et les caractéristiques techniques des stations et des points de recharge pour véhicules électriques",
  "keywords": [
      "electric vehicle",
      "ev",
      "charging station",
      "mobility"
  ],
  "countryCode": "FR",
  "homepage": "https://github.com/etalab/schema-irve",
  "path": "https://github.com/etalab/schema-irve/raw/v1.0.1/schema.json",
  "image": "https://github.com/etalab/schema-irve/raw/v1.0.1/irve.png",
  "licenses": [
    {
      "title": "Creative Commons Zero v1.0 Universal",
      "name": "CC0-1.0",
      "path": "https://creativecommons.org/publicdomain/zero/1.0/"
    }
  ],
  "resources": [
    {
      "title": "Valid resource",
      "name": "exemple-valide",
      "path": "https://github.com/etalab/schema-irve/raw/v1.0.1/exemple-valide.csv"
    },
    {
      "title": "Invalid resource",
      "name": "exemple-invalide",
      "path": "https://github.com/etalab/schema-irve/raw/v1.0.1/exemple-invalide.csv"
    }
  ],
  "sources": [
    {
      "title": "Arrêté du 12 janvier 2017 relatif aux données concernant la localisation géographique et les caractéristiques techniques des stations et des points de recharge pour véhicules électriques",
      "path": "https://www.legifrance.gouv.fr/eli/arrete/2017/1/12/ECFI1634257A/jo/texte"
    }
  ],
  "created": "2018-06-29",
  "lastModified": "2019-05-06",
  "version": "1.0.1",
  "contributors": [
    {
      "title": "John Smith",
      "email": "john.smith@etalab.gouv.fr",
      "organization": "Etalab",
      "role": "author"
    },
    {
      "title": "Jane Doe",
      "email": "jane.doe@aol.com",
      "organization": "Civil Society Organization X",
      "role": "contributor"
    }
  ],
  "fields": [ ]
}
```

## 実装 {#implementations}

以下のリンクは、すでにこのパターンを使用している実際の例であるが、我々の提案と 100 % 一致しているわけではない。要点は、仕様の変更を検討する前に、テーブルスキーマの利用者を共通のパターンへと収束させることにある。

- @OpenDataFrance は、フランスのよくあるオープンデータデータセットを標準化するために[テーブルスキーマ](http://git.opendatafrance.net/scdl/)の作成に着手した。[彼らの Markdown ドキュメント](http://scdl.opendatafrance.net/)は、文脈情報を含め、スキーマから自動的に生成されている([いくつかのスクリプトを用いて](https://git.opendatafrance.net/validata/validata-doc-generator/))。
- フランスのオープンデータ提供者がスキーマに従う助けとするために、Goodtables をベースとした [Validata](https://go.validata.fr/) というツールが開発された。これはスキーマのメタデータを利用してそれらを提示する。
- @Etalab は、フランスに特化した公式のオープンデータスキーマカタログである [schema.data.gouv.fr](http://schema.data.gouv.fr/) を立ち上げた。[これはスキーマを検証するために、スキーマ内の追加のメタデータを必要とする](https://schema.data.gouv.fr/documentation/validation-schemas#validations-sp%C3%A9cifiques-au-format-table-schema)。
- メタデータプロパティを使用している @Etalab の[テーブルスキーマの例](https://github.com/etalab/schema-irve/blob/master/schema.json)。
