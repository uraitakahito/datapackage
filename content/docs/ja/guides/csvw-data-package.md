---
title: CSVW との比較
sidebar:
  order: 3
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージスタンダードの有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>著者</th>
    <td>Peter Desmet, Evgeny Karev, Sara Petti</td>
  </tr>
</table>

2016 年、W3C により設立されたワーキンググループが、CSV ファイルを文書化しアクセスするための一連の勧告を作成した。これらは総称して [CSVW on the Web (CSVW)](https://www.w3.org/TR/2016/NOTE-tabular-data-primer-20160225/) と呼ばれる。CSVW はデータパッケージスタンダードと多くの類似点を示す。

以下では、CSVW とデータパッケージの(非)類似点の概観を示す。

## 適用範囲 {#scope}

CSVW は、区切りテキストファイル(CSV、TSV)のみを記述するための一連の仕様である(すなわち [Model for Tabular Data and Metadata on the Web](https://www.w3.org/TR/2015/REC-tabular-data-model-20151217/) と [Metadata Vocabulary for Tabular Data](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/))。

データパッケージは、データセット・データファイル・表形式データを記述するための一連の仕様である。表形式でないデータファイルを記述でき、表形式であるもののための追加の仕様(すなわち [Table Dialect](/standard/table-dialect/) と [テーブルスキーマ](/standard/table-schema/))も含む。

## 保守 {#maintenance}

CSVW は 2016 年に公開された。そのワーキンググループは当時すでに解散していた。現在はコミュニティグループが存在するものの、標準に変更を加える[権限を持たない](https://github.com/w3c/csvw?tab=readme-ov-file#the-present)。

データパッケージは 2012 年に公開され、2017 年に v1.0 へ、2024 年に v2.0 へと更新された。[Open Knowledge Foundation (OKFN)](https://okfn.org/) によって保守されている。変更の要望は誰でも [GitHub プルリクエスト](https://github.com/frictionlessdata/datapackage/pulls)として提案でき、複数の組織のメンバーからなる[ワーキンググループ](/overview/governance/)によって[決定される](/overview/governance/#decision-making)。

## 採用とソフトウェアの対応状況 {#adoption-and-software-support}

CSVW の採用に関する文書は見つけられなかったが、Swirrl が [csvw.org](https://csvw.org/) でウェブサイトを運営しており、標準の解説と[ソフトウェアツール](https://csvw.org/tools.html)の概観を提供している。これらの多くは変換ツールだが、4 つのプログラミング言語(Java、Python、R、Ruby)向けにソフトウェアライブラリが提供されており、[Python](https://github.com/cldf/csvw) がもっとも人気がある(37 スター)。注目すべきは [CSV lint](https://csvlint.io/) で、これは CSV ファイルを検証するオンラインツールである。

データパッケージは幅広い[組織やプロジェクト](/overview/adoption/)によって採用されており、その多くが標準を拡張しソフトウェアを作成してきた。[ソフトウェアライブラリ](/overview/software/)は 9 つのプログラミング言語(Go、Java、Javascript、Julia、PHP、Python、R、Ruby、Swift)向けに提供されており、[Python](https://github.com/frictionlessdata/frictionless-py) がもっとも人気がある(708 スター)。これらはすべて、GitHub 上の [Frictionless Data 組織](https://github.com/frictionlessdata)の下でオープンソースソフトウェアとして保守されている。注目すべきは [Open Data Editor](https://opendataeditor.okfn.org/) で、これは非技術者向けの、フル機能を備えたデータパッケージエディタである。

## 拡張性と他の標準の利用 {#extensibility-and-use-of-other-standards}

CSVW は他の標準([JSON-LD](https://www.w3.org/TR/json-ld/)、[XML Schema Datatypes](https://www.w3.org/TR/xmlschema11-2/)、Compact URIs など)を広範に利用し、それらの使い方を定義している。また、CSVW を [JSON](https://www.w3.org/TR/2015/REC-csv2json-20151217/) や [RDF](https://www.w3.org/TR/2015/REC-csv2rdf-20151217/) へ変換する方法に関する仕様も持つ。CSVW は JSON Schema としては定義されていない。

データパッケージは、よく使われるプロパティ(description、contributors、licences、sources など)について独自のプロパティを定義しているが、いずれも必須ではない。利用者は他の標準のプロパティを[カスタムプロパティ](/standard/glossary/#custom-properties)として含めることができる。データパッケージは JSON Schema として定義され、拡張可能となるよう設計されている。開発者は [$schema](/standard/data-package/#dollar-schema) で JSON スキーマを参照することでプロパティを追加または拡張でき、それらは検証ソフトウェアによって自動的に認識される。また、データパッケージを DataCite や DCAT といった他のメタデータ標準へ変換する[ソフトウェア](https://frictionlessdata.github.io/dplib-py/plugins/ckan/)も提供されている。

## データとメタデータのリンク {#linking-data-with-metadata}

CSVW はメタデータの所在を特定する[複数の方法](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#locating-metadata)を定義している。

データパッケージのメタデータは、`datapackage.json` という名前の[ディスクリプタファイル](/standard/data-package/#descriptor)に記述される。このファイルは [resource.path](/standard/data-resource/#path-or-data) を用いてデータファイルへリンクし、外部の dialect・スキーマ・(ドメイン固有の)仕様を参照できる。

## プロパティの比較 {#property-comparison}

以下は、CSVW の [Metadata Vocabulary for Tabular Data](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/)(バージョン 20151217)で定義されたすべてのプロパティと、それらがデータパッケージ(v2.0)でどのようにサポートされているかの一覧である。

### プロパティの構文 {#property-syntax}

| CSVW プロパティ                                                                                                      | データパッケージの対応 | 詳細                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Array properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#array-properties)                       | 対応                   |                                                                                                                                                                             |
| [Link properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#link-properties)                         | 部分的                 | [URL とパス](/standard/glossary/#url-or-path)はサポートされるが、`@context` 内の [@base](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dfn-base-url) URL は不可 |
| [URI template properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#uri-template-properties)         | 非対応                 |                                                                                                                                                                             |
| [Column reference properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-reference-properties) | 対応                   | 例:[schema.primaryKey](/standard/table-schema/#primaryKey)                                                                                                                  |
| [Object properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#object-properties)                     | 対応                   | 例:[resource.schema](/standard/data-resource/#schema)                                                                                                                       |
| [Natural language properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#natural-language-properties) | 対応                   | 例:[resource.path](/standard/data-resource/#path-or-data)                                                                                                                   |
| [Atomic properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#atomic-properties)                     | 対応                   |                                                                                                                                                                             |

### トップレベルのプロパティ {#top-level-properties}

| CSVW プロパティ                                                               | データパッケージの対応 | 詳細 |
| ----------------------------------------------------------------------------- | ---------------------- | ---- |
| [@context](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#context) | 非対応                 |      |

### テーブルグループ {#table-groups}

:::note
データパッケージはテーブルのグループ以上のものを定義できる。[パッケージ](/standard/data-package/)は任意の型のリソースの集合になりうる。したがって[データリソース](/standard/data-resource/)は、[format](/standard/data-resource/#format)・[mediatype](/standard/data-resource/#mediatype)・[hash](/standard/data-resource/#hash) のように、CSVW にはない機能をサポートする。
:::

| CSVW プロパティ                                                                                          | データパッケージの対応 | 詳細                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [tables](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-tables)                   | 対応                   | テーブルは `"type": "table"` を持つ [package.resources](/standard/data-package/#resources) として定義できる。<br><br>構造・形式・dialect などが同一のテーブルは、[resource.path](/standard/data-resource/#path-or-data) に複数のファイルを持つ単一のリソースとして定義できる。実装はそれらのテーブルを連結する。 |
| [dialect](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-dialect)                 | 対応                   | [resource.path](/standard/data-resource/#path-or-data) 内の複数ファイルに対する [resource.dialect](/standard/data-resource/#dialect) として                                                                                                                                                                      |
| [notes](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-notes)                     | カスタムプロパティ     |                                                                                                                                                                                                                                                                                                                  |
| [tableDirection](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-direction)        | 非対応                 |                                                                                                                                                                                                                                                                                                                  |
| [tableSchema](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-schema)                    | 対応                   | [resource.path](/standard/data-resource/#path-or-data) 内の複数ファイルに対する [resource.schema](/standard/data-resource/#schema) として                                                                                                                                                                        |
| [transformations](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-transformations) | 非対応                 |                                                                                                                                                                                                                                                                                                                  |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-ld-id)                       | カスタムプロパティ     |                                                                                                                                                                                                                                                                                                                  |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-ld-type)                   | 非対応                 |                                                                                                                                                                                                                                                                                                                  |

### テーブル {#tables}

| CSVW プロパティ                                                                                    | データパッケージの対応 | 詳細                                                                   |
| -------------------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------- |
| [url](http://table-url)                                                                            | 対応                   | [resource.path](/standard/data-resource/#path-or-data) として          |
| [dialect](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-dialect)                 | 対応                   | [resource.dialect](/standard/data-resource/#dialect) として            |
| [notes](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-notes)                     | カスタムプロパティ     |                                                                        |
| [suppressOutput](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-suppressOutput)   | 非対応                 |                                                                        |
| [tableDirection](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#tableDirection)         | 非対応                 |                                                                        |
| [tableSchema](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-schema)              | 対応                   | [resource.schema](/standard/data-resource/#schema) として              |
| [transformations](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-transformations) | 非対応                 |                                                                        |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-ld-id)                       | カスタムプロパティ     | テーブルは [resource.name](/standard/data-resource/#name) で識別される |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-ld-type)                   | 対応                   | [resource.type](/standard/data-resource/#type) として                  |

### スキーマ {#schemas}

:::note
データパッケージの[テーブルスキーマ](/standard/table-schema/)は、CSVW のスキーマにはない機能を持つ。たとえば、スキーマとデータを突き合わせる [fieldMatch](/standard/table-schema/#fieldsMatch)、複数の(かつラベル付きの)欠損値を扱う [missingValues](/standard/table-schema/#missingValues)、[uniqueKeys](/standard/table-schema/#uniqueKeys) などである。
:::

| CSVW プロパティ                                                                             | データパッケージの対応 | 詳細                                                                                     |
| ------------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------- |
| [columns](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-columns)         | 対応                   | [schema.fields](/standard/table-schema/#fields) として                                   |
| [foreignKeys](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-foreignKeys) | 対応                   | [schema.foreignKeys](/standard/table-schema/#foreignKeys) として                         |
| [primaryKey](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-primaryKey)   | 対応                   | [schema.primaryKey](/standard/table-schema/#primaryKey) として                           |
| [rowTitles](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-rowTitles)     | 非対応                 | タイトルはフィールドごとに [field.title](/standard/table-schema/#title) として定義される |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-ld-id)               | カスタムプロパティ     |                                                                                          |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-ld-type)           | 非対応                 |                                                                                          |

### 列 {#columns}

| CSVW プロパティ                                                                                   | データパッケージの対応 | 詳細                                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| [name](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-name)                     | 対応                   | [field.name](/standard/table-schema/#name) として             |
| [suppressOutput](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-suppressOutput) | 非対応                 |                                                               |
| [titles](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-titles)                 | 部分的                 | [field.title](/standard/table-schema/#title) として(単一の値) |
| [virtual](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-virtual)               | 非対応                 |                                                               |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-ld-id)                     | カスタムプロパティ     |                                                               |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-ld-type)                 | 非対応                 |                                                               |

### 継承されるプロパティ {#inherited-properties}

データパッケージのプロパティは、特に指定がない限り(たとえば [resource.sources](/standard/data-resource/#sources))、親から継承しない。以下に挙げるプロパティは、`missingValues` を除き、データパッケージでは 1 つの階層にのみ存在する。

| CSVW プロパティ                                                                               | データパッケージの対応 | 詳細                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [aboutUrl](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-aboutUrl)           | カスタムプロパティ     |                                                                                                                                                                                              |
| [datatype](http://cell-datatype)                                                              | 対応                   | [field.type](/standard/table-schema/#type-and-format) として                                                                                                                                 |
| [default](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-default)             | 非対応                 |                                                                                                                                                                                              |
| [lang](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-lang)                   | 非対応                 | [レシピ](/recipes/translation-support/)として提案されている                                                                                                                                  |
| [null](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-null)                   | 対応                   | [field.missingValues](/standard/table-schema/#field-missingValues) および [schema.missingValues](/standard/table-schema/#missingValues) として、複数の値とラベルを定義するオプションを備える |
| [ordered](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-ordered)             | 対応                   | [field.categoriesOrdered](/standard/table-schema/#categoriesOrdered) として                                                                                                                  |
| [propertyUrl](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-propertyUrl)     | 部分的                 | [field.rdfType](/standard/table-schema/#rdfType) として                                                                                                                                      |
| [required](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-required)           | 対応                   | [required](/standard/table-schema/#required) フィールド制約として                                                                                                                            |
| [separator](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-separator)         | 対応                   | `list` フィールド型における [delimiter](/standard/table-schema/#list) として                                                                                                                 |
| [textDirection](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-textDirection) | 非対応                 |                                                                                                                                                                                              |
| [valueUrl](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-valueUrl)           | 非対応                 |                                                                                                                                                                                              |

### 共通プロパティ {#common-properties}

共通プロパティは、データパッケージでは[カスタムプロパティ](/standard/glossary/#custom-properties)として追加できる。これは CSVW が推奨するのと同様に、接頭辞付きの名前を用いる。ただし、データパッケージはよく使われるプロパティ(description など)について独自の定義を持ち、それらはすべての階層に存在しうる点に注意されたい。

### Dialect の記述 {#dialect-descriptions}

:::note
データパッケージの [Table Dialect](/standard/table-dialect/) は CSVW の dialect の着想源として用いられた。区切りテキストファイルにとどまらず、スプレッドシートやデータベースなどの表形式データ形式も対象とするため、CSVW の dialect にはない機能を持つ。区切りテキストファイルについては、[headerJoin](/standard/table-dialect/#headerJoin)・[doubleQuote](/standard/table-dialect/#doubleQuote)・[escapeChar](/standard/table-dialect/#escapeChar)・[nullSequence](/standard/table-dialect/#nullSequence) をサポートするが、これらは CSVW にはない。
:::

| CSVW プロパティ                                                                                        | データパッケージの対応 | 詳細                                                                         |
| ------------------------------------------------------------------------------------------------------ | ---------------------- | ---------------------------------------------------------------------------- |
| [commentPrefix](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-commentPrefix)       | 対応                   | [dialect.commentChar](/standard/table-dialect/#commentChar) として           |
| [delimiter](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-delimiter)               | 対応                   | [dialect.delimiter](/standard/table-dialect/#delimiter) として               |
| [doubleQuote](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-doubleQuote)           | 対応                   | [dialect.doubleQuote](/standard/table-dialect/#doubleQuote) として           |
| [encoding](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-encoding)                 | 対応                   | [resource.encoding](/standard/data-resource/#encoding) として                |
| [header](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-header)                     | 対応                   | [dialect.header](/standard/table-dialect/#header) として                     |
| [headerRowCount](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-headerRowCount)     | 対応                   | [dialect.headerRows](/standard/table-dialect/#headerRows) として             |
| [lineTerminators](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-lineTerminators)   | 対応                   | [dialect.lineTerminator](/standard/table-dialect/#lineTerminator) として     |
| [quoteChar](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-quoteChar)               | 対応                   | [dialect.quoteChar](/standard/table-dialect/#quoteChar) として               |
| [skipBlankRows](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-skipBlankRows)       | 非対応                 |                                                                              |
| [skipColumns](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-skipColumns)           | 非対応                 |                                                                              |
| [skipInitialSpace](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-skipInitialSpace) | 対応                   | [dialect.skipInitialSpace](/standard/table-dialect/#skipInitialSpace) として |
| [skipRows](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-skipRows)                 | 非対応                 | [dialect.commentRows](/standard/table-dialect/#commentRows) として           |
| [trim](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-trim)                         | 非対応                 |                                                                              |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-ld-id)                         | カスタムプロパティ     |                                                                              |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-ld-type)                     | 非対応                 |                                                                              |

### 変換の定義 {#transformation-definitions}

データパッケージではサポートされない。

### データ型 {#data-types}

CSVW はデータ型を、組み込みデータ型と派生データ型として定義する。派生データ型は、組み込みデータ型をフォーマットや制約などで拡張したものである。データパッケージはこの区別を設けず、代わりにいくつかの[フィールド型](/standard/table-schema/#field-types)を定義する。型に応じて、`format` や[制約](/standard/table-schema/#field-constraints)で拡張できる。

:::note
データパッケージの[テーブルスキーマ](/standard/table-schema/)は、CSVW にはないデータ型をサポートする。たとえば(ラベル付きの)[categories](/standard/table-schema/#categories) や [geojson](/standard/table-schema/#geojson) などである。また、CSVW にはない制約もいくつかサポートする。たとえば、[unique](/standard/table-schema/#unique) な値、正規表現による比較のための [pattern](/standard/table-schema/#pattern)、統制された値のための [enum](/standard/table-schema/#enum) などであり、これらは厳密なデータ検証を可能にする。
:::

| CSVW プロパティ                                                                                 | データパッケージの対応 | 詳細                                                                                |
| ----------------------------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| [base](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-base)                 | 非対応                 | すべての型は [field.type](/standard/table-schema/#type-and-format) として定義される |
| [format](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-format)             | 対応                   | [field.format](/standard/table-schema/#type-and-format) として                      |
| [length](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-length)             | 非対応                 |                                                                                     |
| [minLength](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-minLength)       | 対応                   | [minLength](/standard/table-schema/#minLength) フィールド制約として                 |
| [maxLength](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-maxLength)       | 対応                   | [maxLength](/standard/table-schema/#maxLength) フィールド制約として                 |
| [minimum](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-minimum)           | 対応                   | [minimum](/standard/table-schema/#minimum) フィールド制約として                     |
| [maximum](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-maximum)           | 対応                   | [maximum](/standard/table-schema/#maximum) フィールド制約として                     |
| [minInclusive](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-minInclusive) | 対応                   | [minimum](/standard/table-schema/#minimum) フィールド制約として                     |
| [maxInclusive](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-maxInclusive) | 対応                   | [maximum](/standard/table-schema/#maximum) フィールド制約として                     |
| [minExclusive](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-minExclusive) | 対応                   | [exclusiveMinimum](/standard/table-schema/#exclusiveMinimum) フィールド制約として   |
| [maxExclusive](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-maxExclusive) | 対応                   | [exclusiveMaximum](/standard/table-schema/#exclusiveMaximum) フィールド制約として   |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-id)                    | カスタムプロパティ     |                                                                                     |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-type)                | 非対応                 |                                                                                     |
