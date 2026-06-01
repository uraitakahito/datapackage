---
title: データの依存関係
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージ標準の有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock</td>
  </tr>
</table>

データパッケージが、たとえばすべてのデータを SQL データベースに読み込むようなツールチェーンの一部となっている状況を考えてみよう。このとき、パッケージ A を必要とし、その A がパッケージ B と C を必要とする、という状況が想定できる。

このような場合には、A が B と C に依存していること、そして A を「インストール」すると B と C もインストールされるべきであることを指定したい。これが `dataDependencies` プロパティの目的である。

## 仕様 {#specification}

`dataDependencies` はオブジェクトである。これは CommonJS Packages spec v1.1 と同じ形式に従う。各依存関係は、そのパッケージがテスト済みで動作が保証される、最も低い互換性のある MAJOR[.MINOR[.PATCH]] の依存バージョン(MAJOR バージョンごとに 1 つのみ)を定義する。バージョンは単純なバージョン文字列(許容される形式については version プロパティを参照)であってもよいし、あるいは依存関係のオブジェクトグループであってもよい。後者は一連の選択肢を定義し、そのいずれか 1 つが満たされれば依存関係が満たされたものとみなされる。グループの順序には意味があり、先に記載されたエントリほど優先度が高い。例:

```javascript
"dataDependencies": {
   "country-codes": "",
   "unemployment": "2.1",
   "geo-boundaries": {
     "acmecorp-geo-boundaries": ["1.0", "2.0"],
     "othercorp-geo-boundaries": "0.9.8",
   },
}
```

## 実装 {#implementations}

既知のものはない。
