---
title: MediaWiki Tabular Data との比較
sidebar:
  order: 3
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージスタンダードの有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>著者</th>
    <td>Jakob Voß</td>
  </tr>
</table>

[MediaWiki](https://www.mediawiki.org/) は、Wikipedia をはじめ、メディアファイルのリポジトリである [Wikimedia Commons](https://commons.wikimedia.org/) など、Wikimedia Foundation の関連プロジェクトを動かすために用いられているソフトウェアである。Commons はおもに画像をホストしているが、表形式データを伴うレコードもいくつか含む。[MediaWiki Tabular Data Model](https://www.mediawiki.org/wiki/Help:Tabular_data) はデータパッケージのバージョン 1 に着想を得たものだが、以下に述べるとおり現行のデータパッケージ仕様とはわずかに異なる。

## プロパティの比較 {#property-comparison}

[MediaWiki tabular data ページ](https://www.mediawiki.org/wiki/Help:Tabular_data)は、インラインの表形式データを伴う[データリソース](/standard/data-resource/)と同様に、個々のデータのテーブルを記述し、それを内包する。いずれも JSON オブジェクトとしてシリアライズされるが、前者は MediaWiki インスタンス(Wikimedia Commons など)上で一意な名前を持つページとして提供される。

### トップレベルのプロパティ {#top-level-properties}

MediaWiki Tabular Data には、3 つの必須のトップレベルプロパティと 2 つの省略可能なトップレベルプロパティがある。これらのプロパティの大半は、データリソースの対応するプロパティに対応づけられる。

| MediaWiki Tabular Data                                                                                                              | Data Package Table Schema                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| -(ページ名から暗黙に与えられる)                                                                                                     | [name](/standard/data-resource/#name)(必須)は文字列である                             |
| [description](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields)(省略可)はローカライズされた文字列である            | [description](/standard/data-resource/#description)(省略可)は CommonMark 文字列である |
| [data](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields)(必須)                                                     | [data](/standard/data-resource/#name)(省略可)                                         |
| [license](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields)(必須)は文字列 `CC0-1.0` あるいは別の既知の識別子である | [licenses](/standard/data-resource/#licenses)(省略可)は配列である                     |
| [schema](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields)(必須)は[後述](#schema-properties)のとおり               | [schema](/standard/data-resource/#schema)(省略可)は複数の形式をとりうる               |
| [sources](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields)(省略可)は Wiki マークアップを含む文字列である          | [sources](/standard/data-resource/#sources)(省略可)はオブジェクトの配列である         |

相違点は次のとおりである。

- プロパティ `name` は存在しないが、ページ名から暗黙に与えられる
- プロパティ `description` と `sources` は別の形式を持つ
- プロパティ `data` は常に配列の配列であり、個々の値の[データ型](#data-types)は異なりうる
- プロパティ `schema` は必須だが、その[スキーマプロパティ](#schema-properties)の定義が異なる
- プロパティ `licenses` は存在せず、代わりに `license` が単純な文字列値 `CC0-1.0` に固定される(他のライセンス指定子も可能な場合がある)

### データ型 {#data-types}

Tabular Data は、[テーブルスキーマのデータ型](/standard/table-schema/#field-types)と重なる 4 つのデータ型をサポートする。

- `number` はテーブルスキーマの [number](/standard/table-schema/#number) の部分集合(`NaN`・`INF`・`-INF` は不可)
- `boolean` はテーブルスキーマの [boolean](/standard/table-schema/#boolean) と同じ
- `string` はテーブルスキーマの [string](/standard/table-schema/#string) の部分集合(最大でも 400 文字までに制限され、`\n` や `\t` を含んではならない)
- `localized ` は、言語コードを文字列に対応づけるオブジェクトを指し、`string` 型と同じ制限を持つ。
  この型はテーブルスキーマではサポートされない。

MediaWiki Tabular Data のテーブルでは個々の値が常に `null` になりうるが、テーブルスキーマでは欠損とみなすべき値を [schema.missingValues](/standard/table-schema/#missingValues) に明示的に列挙する必要がある。

### スキーマプロパティ {#schema-properties}

MediaWiki tabular の `schema` プロパティは、[テーブルスキーマ](/standard/table-schema/)と同様にプロパティ `fields` を持つオブジェクトを含むが、それ以外のプロパティは許可されない。この配列の要素は、テーブルスキーマの[フィールドディスクリプタ](/standard/table-schema/#field)に似ているが、3 つのプロパティに限定され、値の取りうる範囲も異なる。

| MediaWiki Tabular Data                                                                                                                         | Data Package Table Schema                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [name](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields)(必須)は `^[a-zA-Z_][a-zA-Z_0-9]*` に一致する文字列でなければならない | [name](/standard/table-schema/#name)(必須)は任意の文字列でよい                    |
| [type](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields)(必須)は[上記のデータ型](#data-types)のいずれかである                 | [type](/standard/table-schema/#type)(省略可)は[異なるデータ型](#data-types)を持つ |
| [title](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields)(省略可)はローカライズされた文字列である                             | [title](/standard/table-schema/#title)(省略可)は単純な文字列である                |
