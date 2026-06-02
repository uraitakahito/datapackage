---
title: アーカイブ内のファイル
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージスタンダードの有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Carles Pina Estany</td>
  </tr>
</table>

データセットによっては、一連のファイルを含む Zip ファイル(あるいは tar やその他の形式)を内包する必要がある場合がある。

これは実務上の理由(数千個のファイルを含むデータセット)から生じることもあれば、技術的な制約から生じることもある(たとえば、現在 Zenodo はサブディレクトリをサポートしていないが、データセットが有用であるためにはサブディレクトリ構造を必要とする場合がある)。

## 実装 {#implementations}

現時点では既知の実装はない。

## 仕様 {#specification}

`data-package` 内の `resources` は、「再帰的なリソース (recursive resources)」を含むことができ、これによって新しいリソースを識別する。

## 例 {#example}

```json
{
  "profile": "data-package",
  "resources": [
    {
      "path": "https://zenodo.org/record/3247384/files/Sea-Bird_Processed_Data.zip",
      "format": "zip",
      "mediatype": "application/zip",
      "bytes": "294294242424",
      "hash": "a27063c614c183b502e5c03bd9c8931b",
      "resources": [
        {
          "path": "file_name.csv",
          "format": "csv",
          "mediatype": "text/csv",
          "bytes": 242421,
          "hash": "0300048878bb9b5804a1f62869d296bc",
          "profile": "tabular-data-resource",
          "schema": "tableschema.json"
        },
        {
          "path": "directory/file_name2.csv",
          "format": "csv",
          "mediatype": "text/csv",
          "bytes": 2424213,
          "hash": "ff9435e0ee350efbe8a4a8779a47caaa",
          "profile": "tabular-data-resource",
          "schema": "tableschema.json"
        }
      ]
    }
  ]
}
```

`.tar.gz` の場合も、`"format"` と `"mediatype"` を変更するだけで同様である。

## ファイルの種類 {#types-of-files}

`Zip` と `tar.gz` のサポートで十分かもしれない。これらの形式を使えば、おそらくすべてを再パッケージ化できるだろう。

実装とテストをシンプルに保つため、再帰のレベルは 1 段階のみ可能とする。`resource` は内部に `resources` を列挙できる(例のとおり)。ただし、内側のリソースがさらにリソースを含むことはできない。
