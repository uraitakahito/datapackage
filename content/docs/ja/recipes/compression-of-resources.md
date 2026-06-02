---
title: リソースの圧縮
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージスタンダードの有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Michael Amadi</td>
  </tr>
</table>

データリソースに圧縮を適用することで、データパッケージの公開をより費用対効果が高く持続可能なものにできる、という主張が成り立つ。データリソースを圧縮することは、公開者にとってはストレージおよび帯域幅のコスト削減という利点をもたらし、利用者にとってはダウンロード時間の短縮という利点をもたらす。

## 実装 {#implementations}

- [tabulator-py (Gzip and Zip support)](https://github.com/frictionlessdata/tabulator-py)
- [datapackage-connector (Gzip support)](https://github.com/nimblelearn/datapackage-connector)
- [datapackage-m (Gzip support)](https://github.com/nimblelearn/datapackage-m)

## 仕様 {#specification}

すべての圧縮されたリソースは、`compression` プロパティを推論できるような `path` を持たなければならない (`MUST`)。`path` プロパティから圧縮形式を推論できない場合(例えば独自のファイル拡張子が使われている場合)は、圧縮形式を指定するために `compression` プロパティを使用しなければならない (`MUST`)。

サポートされる圧縮形式:

- gz
- zip

圧縮形式が暗黙的に示される圧縮リソースの例:

```
{
  "name": "data-resource-compression-example",
  "path": "http://example.com/large-data-file.csv.gz",
  "title": "Large Data File",
  "description": "This large data file benefits from compression.",
  "format": "csv",
  "mediatype": "text/csv",
  "encoding": "utf-8",
  "bytes": 1073741824
}
```

`compression` プロパティを用いた圧縮リソースの例:

```
{
  "name": "data-resource-compression-example",
  "path": "http://example.com/large-data-file.csv.gz",
  "title": "Large Data File",
  "description": "This large data file benefits from compression.",
  "format": "csv",
  "compression" : "gz",
  "mediatype": "text/csv",
  "encoding": "utf-8",
  "bytes": 1073741824
}
```

:::note
リソースのプロパティ(例: bytes、hash など)は、圧縮されたオブジェクトに適用されるものであり、元の非圧縮オブジェクトに適用されるものではない。
:::
