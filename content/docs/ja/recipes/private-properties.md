---
title: プライベートプロパティ
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージ標準の有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock, Paul Walsh</td>
  </tr>
</table>

Frictionless Data 仕様を実装するソフトウェアの中には、さまざまな Frictionless Data ディスクリプタ (descriptor) に追加情報を保存する必要が生じるものがある。

たとえば、`datapackage.json` を通じてメタデータを提供するデータレジストリは、システム固有の内部バージョンや識別子を設定したい場合があり、それはユーザーが生成したメタデータの一部とはみなされるべきではない。

そうした情報を保存するプロパティは「プライベート」とみなされるべきであり、慣例として、その名前はアンダースコア `_` を接頭辞とすべきである。

## 実装 {#implementations}

現時点で既知の実装はない。

## 仕様 {#specification}

任意の Frictionless Data ディスクリプタにおいて、作者・貢献者によって生成されたものではなく、データを扱うソフトウェアやシステムによって生成されたデータは、「プライベート」とみなされ、アンダースコア `_` を接頭辞とする`べきである (SHOULD)`。

これを示すため、データセットのメタデータを保存するために `datapackage.json` を実装したデータレジストリの例を取り上げる。

ユーザーは以下のような `datapackage.json` をアップロードするかもしれない。

```
{
  "name": "my-package",
  "resources": [
    {
      "name": "my-resource",
      "data": [ "my-resource.csv" ]
    }
  ]
}
```

レジストリ自体がプラットフォーム固有のバージョン管理システムを持ち、データが更新されるたびにバージョンを増分する場合がある。この情報をデータパッケージ自体に保存するため、プラットフォームは以下のように「プライベート」な `_platformVersion` プロパティにこの情報を保存できる。

```
{
  "name": "my-package",
  "_platformVersion": 7
  "resources": [
    {
      "name": "my-resource",
      "data": [ "my-resource.csv" ]
    }
  ]
}
```

「プライベート」プロパティを使用することで、ディスクリプタに保存されたデータのうち、ユーザー(作者・貢献者)が定義したものと、第三者によって保存される可能性のある追加データとを明確に区別できる。
