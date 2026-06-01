---
title: フィールド間の関係
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージ標準の有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Philippe Thomy</td>
  </tr>
</table>

表形式データセットの構造は単純であり、テーブルにまとめられたフィールドの集合である。

しかし、そこに存在するデータはしばしば複雑であり、フィールド間の相互依存を反映している(Internet-Draft [NTV tabular format (NTV-TAB)](https://www.ietf.org/archive/id/draft-thomy-ntv-tab-00.html#section-2) の説明を参照)。

以下のデータセットの例を取り上げる。

| country | region         | code | population |
| ------- | -------------- | ---- | ---------- |
| France  | European Union | FR   | 449        |
| Spain   | European Union | ES   | 48         |
| Estonia | European Union | ES   | 449        |
| Nigeria | Africa         | NI   | 1460       |

このデータセットのデータスキーマには以下の `description` がある。

- `code` フィールドについて: "country code alpha-2"
- `population` フィールドについて: "region population in 2022 (millions)"

ここでデータを見てみると、このデータセットは 2 つの構造的な誤りを含んでいるため、一貫していないことがわかる。

- `code` フィールドの値は各国ごとに一意でなければならないため、"Spain" と "Estonia" の両方に "ES" を割り当てることはできない。
- "European Union" の `population` フィールドの値が 2 つの異なる値(449 と 48)を持つことはできない。

これらの構造的な誤りはデータを使用不能にするが、それでもデータセットの検証では検出されない(現行バージョンのテーブルスキーマには、この 2 つのフィールド間の依存関係を表現するディスクリプタが存在しない)。

したがってこの仕様の目的は、一方ではこれらの構造的制約をデータスキーマで表現すること、他方ではデータセットの検証に関連する制御を定義することである。

## コンテキスト {#context}

この主題はデータベースについて研究・取り扱われ、関係を仕様化するための方法論の定義と、一貫したリレーショナルデータベースの実装につながった。

この方法論は主に [Entity–relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model) に基づいている。

> _実体関連モデル(ER モデル)は、特定の知識領域における相互に関連する関心事を記述する。基本的な ER モデルは、(関心の対象を分類する)実体型から構成され、実体(それらの実体型のインスタンス)間に存在しうる関係を仕様化する。_

実体関連モデルは、概念・論理・物理の階層に従って分解される。

関係は、名前によって文字どおりに表現され、また [cardinality](<https://en.wikipedia.org/wiki/Cardinality_(data_modeling)>) によって構造的に表現される。

[Overview](#overview) で提示した例についての実体関連モデルは、[この NoteBook](https://nbviewer.org/github/loco-philippe/Environmental-Sensing/blob/main/property_relationship/example_schema.ipynb) で詳述されている。

## 原則 {#principles}

2 つの側面に取り組む必要がある。

- **関係の表現**:

  データベースに適用されるこの方法論は、構造がリレーショナルデータベースのテーブルと類似しているが関係の表現方法が異なる表形式データにも適用できる(表形式表現で用いられる[パターン](https://www.ietf.org/archive/id/draft-thomy-ntv-tab-00.html#section-2)を参照)。

  この差異は[リンク先のノートブック](https://github.com/loco-philippe/Environmental-Sensing/blob/main/property_relationship/methodology.ipynb)で説明され、[例](https://nbviewer.org/github/loco-philippe/Environmental-Sensing/blob/main/property_relationship/example_schema.ipynb)で示されている。

  データモデルを使用することは関係を表現する単純な方法であるが、必須ではない。関係はデータスキーマのレベルで直接表現することもできる。

- **データセットの妥当性**:

  定義されたデータセットについて関係の妥当性を確認することは、[表形式構造解析](https://github.com/loco-philippe/tab-analysis/blob/main/docs/tabular_analysis.pdf)の機能の 1 つである。これは任意の種類の言語で利用可能な計数関数のみを必要とする([実装例](https://github.com/loco-philippe/Environmental-Sensing/blob/main/property_relationship/example.ipynb)を参照)。

## 提案する拡張 {#proposed-extensions}

関係は以下の情報によって定義される。

- 関与する 2 つのフィールド(`derived` リンクではフィールドの順序が重要である)
- 関係のテキストによる表現
- 関係の性質

テーブルスキーマを拡張するための 3 つの提案が検討されている。

- 新しいフィールドディスクリプタ
- 新しい制約プロパティ
- 新しいテーブルディスクリプタ

議論の結果、3 番目のみが採用され(フィールドに関連付けられたフィールド間の関係)、以下に提示する。

- **新しいテーブルディスクリプタ**:

  `relationships` テーブルディスクリプタを追加する。
  このディスクリプタに関連付けられるプロパティは以下のとおりである。

  - `fields`: 関与する 2 つのフィールドの名前を持つ配列
  - `description`: 説明文字列(任意)
  - `link`: 関係の性質

  長所:

  - フィールドディスクリプタと混在しない

  短所:

  - 新しいテーブルディスクリプタを追加する必要がある
  - `derived` リンクでは配列内のフィールドの順序が重要である

  例:

  ```json
  {
    "fields": [ ],
    "relationships": [
      {
        "fields" : ["country", "code"],
        "description" : "is the country code alpha-2 of",
        "link" : "coupled"
      }
      {
        "fields" : ["region", "population"],
        "description" : "is the population of",
        "link" : "derived"
      }
    ]
  }
  ```

## 仕様 {#specification}

解決策 3(テーブルディスクリプタ)を前提とすると、仕様は以下のようになる。

`relationships` ディスクリプタは、フィールド間の依存関係を定義するために使用して`もよい (MAY)`。

`relationships` ディスクリプタは、存在する場合、配列で`なければならず (MUST)`、配列内の各エントリはオブジェクトであり、2 つの必須プロパティと 1 つの任意プロパティを含ま`なければならない (MUST)`。

- `fields`: リンクされる 2 つのフィールドの `name` プロパティを持つ配列(必須)
- `link`: それらの間の関係の性質を表す文字列(必須)
- `description`: 2 つのフィールド間の関係の説明を表す文字列(任意)

`link` プロパティの値は、以下の 3 つのいずれかで`なければならない (MUST)`。

- `derived`:

  - 子(配列の 2 番目の要素)フィールドの値は、親(配列の 1 番目の要素)フィールドの値に依存する(すなわち、親フィールドのある値は子フィールドの単一の値に関連付けられる)。
  - 例: `name` フィールド ["john", "paul", "leah", "paul"] と `nickname` フィールド ["jock", "paulo", "lili", "paulo"] は derived である。
  - すなわち、新しいエントリ "leah" が追加された場合、対応する `nickname` の値は "lili" でなければならない。

- `coupled`:

  - 一方のフィールドの値が、もう一方のフィールドの値に関連付けられる。
  - 例: `Country` フィールド ["france", "spain", "estonia", "spain"] と `code alpha-2` フィールド ["FR", "ES", "EE", "ES"] は coupled である。
  - すなわち、新しいエントリ "estonia" が追加された場合、対応する `code alpha-2` の値は "EE" でなければならず、同様に新しいエントリ "EE" が追加された場合、対応する `Country` の値は "estonia" でなければならない。

- `crossed`:

  - この関係は、一方のフィールドのすべての異なる値が、もう一方のフィールドのすべての異なる値に関連付けられることを意味する。
  - 例: `Year` フィールド [2020, 2020, 2021, 2021] と `Population` フィールド [ "estonia", "spain", "estonia", "spain"] は crossed である。
  - すなわち、2020 年は "spain" と "estonia" の population に関連付けられ、同様に "estonia" の population は 2020 年と 2021 年に関連付けられる。

## 実装 {#implementations}

新しいディスクリプタの実装はここでは論じない(取り組むべき特別な点はない)。

制御の実装は以下の原則に基づく。

- 2 つのフィールドについて異なる値の数を計算する
- 2 つのフィールドのそれぞれの値のタプルから構成される仮想フィールドについて異なる値の数を計算する
- これら 3 つの値を比較して関係の種類を推定する
- 計算された関係の種類と、データスキーマで定義された関係の種類とを比較する

[実装例](https://github.com/loco-philippe/Environmental-Sensing/blob/main/property_relationship/example.ipynb)では計算関数を提示している。

[解析ツール](https://github.com/loco-philippe/tab-analysis/blob/main/README.md)も利用可能であり、pandas のデータからアクセスできる。

`custom_check` としての実装例は[こちら](https://nbviewer.org/github/loco-philippe/Environmental-Sensing/blob/main/property_relationship/relationship_descriptor.ipynb)で利用できる。

## 注記 {#notes}

関係がデータモデルで定義されている場合、データスキーマにおける関係の生成は自動化できる。

[Overview](#overview) で提示した例と、データモデルをテーブルスキーマに変換する規則は、[この NoteBook](https://nbviewer.org/github/loco-philippe/Environmental-Sensing/blob/main/property_relationship/example_schema.ipynb) で詳述されている。

完全な例(60,000 行、50 フィールド)が、方法論とツールを検証するために用いられている: [open-data IRVE](https://www.data.gouv.fr/fr/reuses/les-donnees-irve-sont-elles-coherentes/)
