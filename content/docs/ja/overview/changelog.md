---
title: 変更履歴
sidebar:
  order: 10
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージスタンダードの有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

本書は、**データパッケージスタンダード**に加えられたすべての意味のある変更を記載する。Recipes や Guides といった他の文書への変更は対象としない。

## v2.0

このリリースには、データパッケージを完成された製品とするための、仕様に対する豊富な改善が含まれている([告知](https://frictionlessdata.io/blog/2023/11/15/frictionless-specs-update/)を参照)。すべての変更は Data Package Working Group によってレビューされ受理された。

> June 26, 2024

##### Tabular Data Package(削除) {#tabular-data-package-removed}

[Tabular Data Package](https://specs.frictionlessdata.io/tabular-data-package/)(`package.profile: "tabular-data-package"`)は削除された。これは、リソースに対して `type: "table"`(以前は `resource.profile: "tabular-data-resource"`)を定義することに比べて何の利点ももたらさず、後者のほうがモジュール性が高い([#52](https://github.com/frictionlessdata/datapackage-v2-draft/pull/52))。

##### `package.$schema`(新規) {#packageschema-new}

[`$schema`](/standard/data-package/#dollar-schema) は `profile` プロパティを置き換えるもので、拡張とバージョニングをより容易にする([#42](https://github.com/frictionlessdata/datapackage-v2-draft/pull/42))。

##### `package.contributors`(更新) {#packagecontributors-updated}

[`contributors`](/standard/data-package/#contributors) が更新された。

- `contributor.title` はもはや必須ではない([#7](https://github.com/frictionlessdata/datapackage-v2-draft/pull/7))。
- `contributor.givenName` と `contributor.familyName` は、貢献者が人物である場合にその名(given name)と姓(family name)を指定する新しいプロパティである([#20](https://github.com/frictionlessdata/datapackage-v2-draft/pull/20))。
- `contributor.role` は非推奨となり、`contributor.roles` が推奨される。詳細は後述([#18](https://github.com/frictionlessdata/datapackage-v2-draft/pull/18))。
- `contributor.roles` は、貢献者を重複させることなく、一人の貢献者に対して複数の役割を指定できる新しいプロパティである。確立された語彙に従うことが推奨され、非推奨となった `contributor.role` とは異なる推奨値を持つ([#18](https://github.com/frictionlessdata/datapackage-v2-draft/pull/18))。

##### `package.version`(更新) {#packageversion-updated}

[`version`](/standard/data-package/#version) は現在では仕様に含まれている。データパッケージ v1 では、これは誤ってドキュメントの一部にすぎなかった([#3](https://github.com/frictionlessdata/datapackage-v2-draft/pull/3))。

##### `package.sources`(更新) {#packagesources-updated}

[`sources`](/standard/data-package/#sources) が更新された。

- `source.title` はもはや必須ではない([#7](https://github.com/frictionlessdata/datapackage-v2-draft/pull/7))。
- `source.version` は、ソースのどのバージョンが用いられたかを指定する新しいプロパティである([#10](https://github.com/frictionlessdata/datapackage-v2-draft/pull/10))。

##### `resource.name`(更新) {#resourcename-updated}

[name](/standard/data-resource/#name) は現在では任意の文字列を許容する。以前は、名前が小文字の英数字に加えて `.`・`-`・`_` のみで構成されることを要求していた。このプロパティは依然として必須であり、リソース間で一意でなければならない([#27](https://github.com/frictionlessdata/datapackage-v2-draft/pull/27))。

##### `resource.path`(更新) {#resourcepath-updated}

[path](/standard/data-resource/#path-or-data-required) は現在では隠しフォルダ(ドット `.` で始まるもの)を明示的に禁止する([#19](https://github.com/frictionlessdata/datapackage-v2-draft/pull/19))。

##### `resource.type`(新規) {#resourcetype-new}

[`type`](/standard/data-resource/#type) はリソースの型を指定できるようにする([#51](https://github.com/frictionlessdata/datapackage-v2-draft/pull/51))。`resource.type: "table"` は `resource.profile: "tabular-data-resource"` を置き換える。

##### `resource.$schema`(新規) {#resourceschema-new}

[`$schema`](/standard/data-resource/#dollar-schema) は `profile` プロパティを置き換えるもので、拡張とバージョニングをより容易にする([#42](https://github.com/frictionlessdata/datapackage-v2-draft/pull/42))。[resource.type](#resourcetype-new) も参照。

##### `resource.encoding`(更新) {#resourceencoding-updated}

[encoding](/standard/data-resource/#encoding) の定義は、Parquet のようなバイナリ形式をサポートするよう更新された([#15](https://github.com/frictionlessdata/datapackage-v2-draft/pull/15))。

##### `resource.sources`(更新) {#resourcesources-updated}

[`sources`](/standard/data-resource/#sources) は現在では、それを内包するデータパッケージから継承する([#57](https://github.com/frictionlessdata/datapackage-v2-draft/pull/57))。

##### Table Dialect(新規) {#table-dialect-new}

[Table Dialect](/standard/table-dialect) は、CSV Dialect 仕様に取って代わりこれを拡張する新しい仕様である。JSON や Excel といった他の形式もサポートする([#41](https://github.com/frictionlessdata/datapackage-v2-draft/pull/41))。

##### `dialect.$schema`(新規) {#dialectschema-new}

[`$schema`](/standard/table-dialect/#dollar-schema) は拡張とバージョニングを可能にする([#42](https://github.com/frictionlessdata/datapackage-v2-draft/pull/42))。

##### `dialect.table`(新規) {#dialecttable-new}

[`table`](/standard/table-dialect/#table) はデータベース内のテーブルを指定できるようにする([#64](https://github.com/frictionlessdata/datapackage-v2-draft/pull/64))。

##### `schema.$schema`(新規) {#schemaschema-new}

[`$schema`](/standard/table-schema/#dollar-schema) は拡張とバージョニングを可能にする([#42](https://github.com/frictionlessdata/datapackage-v2-draft/pull/42))。

##### `schema.fieldsMatch`(新規) {#schemafieldsmatch-new}

[fieldsMatch](/standard/table-schema/#fieldsMatch) は、テーブルスキーマのフィールドがデータソースのフィールドとどのように対応するかを指定できるようにする。デフォルト(`exact`)はデータパッケージ v1 の挙動に一致するが、他の値(例: `subset`・`superset`)を用いると、より少ないまたはより多いフィールドを定義し、フィールド名で対応付けることができる。この新しいプロパティは、Frictionless Framework の `schema_sync` オプションを拡張し明示化するものである([#39](https://github.com/frictionlessdata/datapackage-v2-draft/pull/39))。

##### `schema.missingValues`(更新) {#schemamissingvalues-updated}

[`missingValues`](/standard/table-schema/#missingValues) は現在では、ラベル付きの欠損(labeled missingness)を指定できるようにする([#68](https://github.com/frictionlessdata/datapackage-v2-draft/pull/68))。

##### `schema.primaryKey`(更新) {#schemaprimarykey-updated}

[`primaryKey`](/standard/table-schema/#primaryKey) は現在では、文字列ではなく、常に文字列の配列であるべきである([#28](https://github.com/frictionlessdata/datapackage-v2-draft/pull/28))。

##### `schema.uniqueKeys`(新規) {#schemauniquekeys-new}

[`uniqueKeys`](/standard/table-schema/#uniqueKeys) は、どのフィールドが一意な論理値を持つことを要求されるかを指定できるようにする。これは `field.contraints.unique` の代替であり、対応する SQL の機能を模してモデル化されている([#30](https://github.com/frictionlessdata/datapackage-v2-draft/pull/30))。

##### `schema.foreignKeys`(更新) {#schemaforeignkeys-updated}

[`foreignKeys`](/standard/table-schema/#foreignKeys) が更新された。

- 現在では、文字列ではなく、常に文字列の配列であるべきである([#28](https://github.com/frictionlessdata/datapackage-v2-draft/pull/28))。
- `foreignKeys.reference.resource` は、自己参照する外部キーについては省略できるようになった。以前は `resource` を空文字列に設定することを要求していた([#29](https://github.com/frictionlessdata/datapackage-v2-draft/pull/29))。

##### `field.categories`(新規) {#fieldcategories-new}

[`categories`](/standard/table-schema/#categories) は、`string` および `integer` のフィールド型に対するカテゴリカルデータのサポートを追加する([#68](https://github.com/frictionlessdata/datapackage-v2-draft/pull/68))。

##### `field.categoriesOrdered`(新規) {#fieldcategoriesordered-new}

[`categoriesOrdered`](/standard/table-schema/#categoriesOrdered) は、`string` および `integer` のフィールド型に対する順序付きカテゴリカルデータのサポートを追加する([#68](https://github.com/frictionlessdata/datapackage-v2-draft/pull/68))。

##### `field.missingValues`(新規) {#fieldmissingvalues-new}

[`missingValues`](/standard/table-schema/#field-missingValues) は、フィールドごとに欠損値を指定できるようにし、リソースレベルで指定された `missingValues` を上書きする([#24](https://github.com/frictionlessdata/datapackage-v2-draft/pull/24))。

##### `integer` フィールド型(更新) {#integer-field-type-updated}

[`integer`](/standard/table-schema/#integer) は現在では `groupChar` プロパティを持つ。これは `number` ではすでに利用可能であった([#6](https://github.com/frictionlessdata/datapackage-v2-draft/pull/6))。

##### `list` フィールド型(新規) {#list-field-type-new}

[`list`](/standard/table-schema/#list) は、区切り文字で区切られたプリミティブ値の集合(例: `value1,value2`)を含むフィールドを指定できるようにする([#38](https://github.com/frictionlessdata/datapackage-v2-draft/pull/38))。

##### `datetime` フィールド型(更新) {#datetime-field-type-updated}

[`datetime`](/standard/table-schema/#datetime) のデフォルトの `format` は現在では、オプションのミリ秒部とタイムゾーン部を許容するよう拡張されている([#23](https://github.com/frictionlessdata/datapackage-v2-draft/pull/23))。

##### `geopoint` フィールド型(更新) {#geopoint-field-type-updated}

[`geopoint`](/standard/table-schema/#geopoint) の定義は現在では、座標の定義に浮動小数点数を使用できることを明確にしている([#14](https://github.com/frictionlessdata/datapackage-v2-draft/pull/14))。

##### `any` フィールド型(更新) {#any-field-type-updated}

[`any`](/standard/table-schema/#any) は現在ではデフォルトのフィールド型であり、フィールド型が指定されていない場合は推論すべきでないことを明確にしている([#13](https://github.com/frictionlessdata/datapackage-v2-draft/pull/13))。

##### `minimum` と `maximum` のフィールド制約(更新) {#minimum-and-maximum-field-constraints-updated}

[`minimum`](/standard/table-schema/#minimum) と [`maximum`](/standard/table-schema/#maximum) は現在では、`duration` フィールド型をサポートするよう拡張されている([#8](https://github.com/frictionlessdata/datapackage-v2-draft/pull/8))。

##### `exclusiveMinimum` と `exclusiveMaximum` のフィールド制約(新規) {#exclusiveminimum-and-exclusivemaximum-field-constraints-new}

[`exclusiveMinimum`](/standard/table-schema/#exclusiveMinimum) と [`exclusiveMaximum`](/standard/table-schema/#exclusiveMaximum) は、排他的な最小値と最大値を指定するために使用できる([#11](https://github.com/frictionlessdata/datapackage-v2-draft/pull/11))。

##### `jsonschema` フィールド制約(新規) {#jsonschema-field-constraint-new}

[`jsonSchema`](/standard/table-schema/#jsonSchema) は、`object` および `array` のフィールド型に対して使用できる([#32](https://github.com/frictionlessdata/datapackage-v2-draft/pull/32))。

## v1.0

> September 5, 2017

[Data Package (v1) のウェブサイト](https://specs.frictionlessdata.io/)を参照してほしい。
