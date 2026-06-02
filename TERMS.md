# 用語対訳表 (TERMS) — 日本語訳の正典

日本語訳の用語はこの表に従って統一する(本ファイルが単一の真実)。表記揺れを防ぐため、
翻訳者(人・subagent 問わず)は必ず参照すること。方針の全体は [TRANSLATION.md](./TRANSLATION.md)。

## 確定事項(議論のあった語)

- **Table Dialect** → **`Table Dialect`(英語のまま)**。テーブルスキーマ等とは異なり、
  この仕様コンポーネント名は英語表記を保持する。
- **descriptor** → **ディスクリプタ**。各ページ/節の**初出のみ**「ディスクリプタ(descriptor)」と英語併記し、
  以降は「ディスクリプタ」。
- **Data Package Standard**(仕様の固有名詞)→ **データパッケージスタンダード**(音訳)。
  一方、一般語の「標準」(標準プロパティ / 他の標準 / 標準化 / 標準的 / 「〜は標準です」 /
  本標準・この標準)は **そのまま「標準」** とし、スタンダードにしない。

## コア用語

| English                 | 日本語                       | 備考                                              |
| ----------------------- | ---------------------------- | ------------------------------------------------- |
| Data Package Standard   | データパッケージスタンダード | 固有名詞。"Standard" を音訳(一般語の「標準」は別) |
| Data Package            | データパッケージ             | 仕様/概念とも                                     |
| Data Resource           | データリソース               |                                                   |
| Table Schema            | テーブルスキーマ             |                                                   |
| Table Dialect           | Table Dialect                | **英語のまま**                                    |
| descriptor              | ディスクリプタ               | 初出のみ「ディスクリプタ(descriptor)」            |
| profile                 | プロファイル                 |                                                   |
| schema                  | スキーマ                     |                                                   |
| resource                | リソース                     |                                                   |
| field                   | フィールド                   |                                                   |
| row                     | 行                           |                                                   |
| column                  | 列                           |                                                   |
| constraint              | 制約                         |                                                   |
| property                | プロパティ                   | プロパティ名そのものは原文維持                    |
| custom property         | カスタムプロパティ           |                                                   |
| foreign key             | 外部キー                     |                                                   |
| primary key             | 主キー                       |                                                   |
| tabular data            | 表形式データ                 |                                                   |
| dataset                 | データセット                 |                                                   |
| metadata                | メタデータ                   |                                                   |
| package                 | パッケージ                   |                                                   |
| inline data             | インラインデータ             |                                                   |
| physical representation | 物理表現                     |                                                   |
| logical representation  | 論理表現                     |                                                   |
| URL or Path             | URL またはパス               |                                                   |
| extension               | 拡張(機能)/エクステンション  | 文脈に応じて。仕様名は「Extensions」              |
| implementation          | 実装                         |                                                   |
| validation / validate   | 検証 / 検証する              |                                                   |

## RFC 2119 キーワード

英語キーワードはバッククォートで原文維持し、日本語で意味を添える(specs と同方針)。

| English       | 日本語(意味)       | 例                                    |
| ------------- | ------------------ | ------------------------------------- |
| `MUST`        | しなければならない | 「検証されなければならない (`MUST`)」 |
| `MUST NOT`    | してはならない     |                                       |
| `REQUIRED`    | 必須               |                                       |
| `SHALL`       | しなければならない |                                       |
| `SHOULD`      | すべきである       |                                       |
| `SHOULD NOT`  | すべきでない       |                                       |
| `RECOMMENDED` | 推奨される         |                                       |
| `MAY`         | してもよい         |                                       |
| `OPTIONAL`    | 任意               |                                       |

## 触らないもの(原文のまま)

- コードブロック、JSON/コード中の値
- JSX / コンポーネント(`<table>`、`{frontmatter.*}`、`import` 文、`import` 先)
- frontmatter の `profile:` の値、`sidebar:`、`authors:` の値
- 見出しの `{#id}` アンカー
- プロパティ名(`resources`, `$schema`, `name`, `path` 等)
- 外部 URL、`MUST`/`SHOULD` 等のキーワード(バッククォート部分)

## 各ページ冒頭の注記(frontmatter 直後)

```md
> **非公式翻訳 (Unofficial translation).** これはデータパッケージスタンダードの有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。
```
