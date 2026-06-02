---
title: 翻訳のサポート
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージスタンダードの有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Paul Walsh</td>
  </tr>
</table>

言語サポートの一般的なパターン、および Frictionless Data ディスクリプタ (descriptor) におけるメタデータ翻訳の明示的なサポートを踏まえると、ソースデータにおける翻訳もサポートできることが望ましい。

これについては現在 2 つのパターンが議論されている。どちらのパターンも、Frictionless Data に特に結びついているわけではない実世界の実装に由来する。

一方のパターンは、ソースデータとともにインラインで翻訳を提供することを示唆しており、フィールドの命名において翻訳を表すために `@` 記号を予約する。

もう一方は、ディスクリプタの `data` で記述された「ソース」ファイルと同じ場所に配置される、追加の翻訳ソースを保存するためのパターンを記述する。

## 実装 {#implementations}

現時点で Frictionless Data のコアライブラリにこのパターンの既知の実装はない。

## 仕様 {#specification}

### インライン {#inline}

**翻訳にアクセスするために列の命名規則を使用する**。

表形式リソースのディスクリプタは、翻訳されたフィールド名のために `{field_name}@{lang_code}` 構文を用いて翻訳をサポートする。`lang_code` は、リソースに適用される `languages` 配列に存在し`なければならない (MUST)`。

`@` 記号を持つフィールドは、別のデータフィールドのための翻訳フィールドで`なければならず (MUST)`、`{field_name}@{lang_code}` パターンに従って解析可能で`なければならない (MUST)`。

対応する `field` を持たない翻訳フィールドがデータ内に見つかった場合(例: `title@es` はあるが `title` がない)、その翻訳フィールドは無視される`べきである (SHOULD)`。

適用される `languages` 配列で宣言されて _いない_ `lang_code` を使用する翻訳フィールドがデータ内に見つかった場合、その翻訳フィールドは無視される`べきである (SHOULD)`。

翻訳フィールドは、スキーマの `fields` 配列に記述されて`はならない (MUST NOT)`。

翻訳フィールドは、それが翻訳する対象フィールドの `type`、`format`、`constraints` に一致し`なければならない (MUST)`。ただし 1 つだけ例外がある。翻訳フィールドは決して必須ではないため、翻訳フィールドの `constraints.required` は常に `false` である。

### 同じ場所に配置された翻訳ソース {#co-located-translation-sources}

**翻訳にアクセスするためにファイル保存の規則を使用する**。

@jheeffer によって寄稿される予定。

- ローカルおよびリモートのリソースを扱えなければならない
- 翻訳ファイルにおける翻訳のキー/値パターンについて明示的でなければならない

```
# local
data/file1.csv
data/lang/file1-en.csv
data/lang/file1-es.csv

# remote
http://example/com/data/file2.csv
http://example/com/data/lang/file2-en.csv
http://example/com/data/lang/file2-es.csv
```
