---
title: リソースのキャッシュ
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージスタンダードの有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock, Paul Walsh</td>
  </tr>
</table>

すべての Frictionless Data 仕様では、http またはローカルファイルシステムを介してリソースを参照することが認められている。

http を介したリモートリソースの場合、リモートサーバが利用できなくなる可能性や、リソース自体が一時的もしくは恒久的に削除される可能性が常に存在する。実装システムがそのファイルを用いて何らかの処理や分析を行っている場合、正典となるデータソースとしてリモート URL を指し示しつつ、同時にローカルコピーを保持して参照したいと考えるかもしれない。

Frictionless Data 仕様で記述されたデータの永続的な保存を重視するアプリケーションは、`_cache` プロパティを利用できる。このプロパティは `path` や `data` プロパティの機能および用途を反映したものであり、正典のリソースが利用できない場合にアプリケーションがフォールバックできるデータの保存場所を指し示す。

## 実装 {#implementations}

現時点で、このパターンの既知の実装は存在しない。

## 仕様 {#specification}

実装は、`path` または `data` のいずれかのプロパティをサポートする任意のディスクリプタ(descriptor)上で、`_cache` プロパティを扱ってもよい (`MAY`)。`path` または `data` で参照されているデータが利用できない場合、`_cache` をデータへアクセスするためのフォールバックとして使用すべきである。`_cache` に保存されたデータの扱いは、本仕様の範囲外である。実装は、取り込み時に `path` または `data` のリソースのコピーを保存したり、一定間隔で更新したり、あるいは最新の永続的なコピーを保持するためのその他の任意の方法を採用したりしてもよい。

`_cache` プロパティの例をいくつか示す。

```
{
  "name": "my-package",
  "resources": [
    {
      "name": "my-resource",
      "path": "http://example.com/data/csv/my-resource.csv",
      "_cache": "my-resource.csv"
    },
    {
      "name": "my-resource",
      "path": "http://example.com/data/csv/my-resource.csv",
      "_cache": "http://data.registry.com/user/files/my-resource.csv"
    },
    {
      "name": "my-resource",
      "data": [
        "http://example.com/data/csv/my-resource.csv",
        "http://somewhere-else.com/data/csv/resource2.csv"
      ],
      "_cache": [
        "my-resource.csv",
        "resource2.csv"
      ]
    },
    {
      "name": "my-resource",
      "data": [ "http://example.com/data/csv/my-resource.csv" ],
      "_cache": "my-resource.csv"
    }
  ]
}
```
