---
title: 外部の外部キー
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージ標準の有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Stephen Gates</td>
  </tr>
</table>

外部キーとは、ある表形式データリソース内のフィールド(複数のフィールドの場合もある)の値が、同じ表形式データパッケージ内、または別の表形式データパッケージ内の表形式データリソースのフィールド(複数のフィールドの場合もある)の値を参照する、その参照のことである。

このパターンによって、ユーザーはある表形式データリソース内のフィールド(複数のフィールドの場合もある)の値を、別の表形式データパッケージ内の表形式データリソースのフィールド(複数のフィールドの場合もある)の値にリンクできる。

## 仕様 {#specification}

[`foreignKeys`](/standard/table-schema/#foreignkeys) 配列は、`package` プロパティを持ってもよい (`MAY`)。このプロパティは、次のいずれかでなければならない (`MUST`)。

- データパッケージの `datapackage.json` ファイルへの完全修飾 HTTP アドレスである文字列
- 正規のデータパッケージレジストリによって解決可能なデータパッケージの [`name`](/standard/data-package/#name)

参照先のデータパッケージが、完全修飾 HTTP アドレスである [`id`](/standard/data-package/#id) を持つ場合、それを `package` の値として使用すべきである (`SHOULD`)。

例:

```
"foreignKeys": [{
    "fields": ["code"],
    "reference": {
      "package": "https://raw.githubusercontent.com/frictionlessdata/example-data-packages/master/donation-codes/datapackage.json",
      "resource": "donation-codes",
      "fields": ["donation code"]
    }
  }]
```
