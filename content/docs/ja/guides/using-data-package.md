---
title: データパッケージを使い始める方法
sidebar:
  order: 1
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージ標準の有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

データパッケージ標準の実装には数多くの選択肢がある。ここでは、出発点として適した、もっとも人気のある選択肢をいくつか取り上げる。

:::tip
他の実装を探すには、データパッケージの[ソフトウェア](/overview/software/)の全一覧も参照されたい。
:::

## Open Data Editor {#open-data-editor}

データパッケージ標準を使い始めるもっとも簡単な方法は、[Open Data Editor](https://opendataeditor.okfn.org/)(現在ベータ版)をインストールすることである。

[![Open Data Editor](../../../../assets/software/ode.png)](https://opendataeditor.okfn.org)

現代的な IDE で通常そうするように、ファイルの追加や移動、データの検証などをビジュアルなインターフェイスで行える。Open Data Editor は内部で、データセットのためのデータパッケージのディスクリプタ(descriptor)を作成し(データセットを作成することで明示的に行うこともできる)、メタデータやデータ型を推論する。データのキュレーション作業が完了すると、データパッケージを検証し、たとえば CKAN へ公開できる。

すべての機能については、[Open Data Editor のドキュメント](https://opendataeditor.okfn.org)を参照されたい。

## frictionless-py {#frictionless-py}

コマンドラインインターフェイスや Python を好むなら、データパッケージを管理するための完全なフレームワークである [frictionless-py](https://framework.frictionlessdata.io/) がある。CLI で利用できる主なコマンドは次のとおりである。

```bash
frictionless describe # to describe your data
frictionless explore # to explore your data
frictionless extract # to extract your data
frictionless index # to index your data
frictionless list # to list your data
frictionless publish # to publish your data
frictionless query # to query your data
frictionless script # to script your data
frictionless validate # to validate your data
frictionless --help # to get list of the command
frictionless --version # to get the version
```

すべての機能については、[frictionless-py のドキュメント](https://framework.frictionlessdata.io/)を参照されたい。

## frictionless-r {#frictionless-r}

R コミュニティ向けには、R 言語でデータパッケージを管理できる [frictionless-r](https://docs.ropensci.org/frictionless/) パッケージがある。たとえば次のとおりである。

```r
library(frictionless)

# Read the datapackage.json file
# This gives you access to all Data Resources of the Data Package without
# reading them, which is convenient and fast.
package <- read_package("https://zenodo.org/records/10053702/files/datapackage.json")

package

# List resources
resources(package)

# Read data from the resource "gps"
# This will return a single data frame, even though the data are split over
# multiple zipped CSV files.
read_resource(package, "gps")
```

すべての機能については、[frictionless-r のドキュメント](https://docs.ropensci.org/frictionless/)を参照されたい。
